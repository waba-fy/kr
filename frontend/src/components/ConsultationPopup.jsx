import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import "../styles/consultation-popup.css";



const countryCodes = [
  { code: "+91", label: "India +91", min: 10, max: 10 },
  { code: "+44", label: "UK +44", min: 10, max: 11 },
  { code: "+1", label: "USA +1", min: 10, max: 10 },
  { code: "+971", label: "UAE +971", min: 9, max: 9 },
  { code: "+61", label: "Australia +61", min: 9, max: 9 },
];

const ConsultationPopup = ({ open, onClose }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    phone: "",
    company: "",
    service: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  if (!open) return null;

  const selectedCountry = countryCodes.find(
    (item) => item.code === form.countryCode
  );

  const validateForm = () => {
    const newErrors = {};

    const nameRegex = /^[A-Za-z\s]{3,60}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const phoneRegex = /^[0-9]+$/;

    if (!form.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (!nameRegex.test(form.name.trim())) {
      newErrors.name = "Enter a valid name with minimum 3 letters.";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(form.email.trim())) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Mobile number is required.";
    } else if (!phoneRegex.test(form.phone.trim())) {
      newErrors.phone = "Mobile number should contain digits only.";
    } else if (
      form.phone.length < selectedCountry.min ||
      form.phone.length > selectedCountry.max
    ) {
      newErrors.phone = `Mobile number should be ${selectedCountry.min}${
        selectedCountry.min !== selectedCountry.max
          ? `-${selectedCountry.max}`
          : ""
      } digits for ${selectedCountry.label}.`;
    }

    if (!form.service) {
      newErrors.service = "Please select your requirement.";
    }

    if (form.message && form.message.length > 500) {
      newErrors.message = "Message should not exceed 500 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const onlyDigits = value.replace(/\D/g, "");
      const maxLength = selectedCountry?.max || 10;

      setForm({ ...form, phone: onlyDigits.slice(0, maxLength) });
      return;
    }

    setForm({ ...form, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  try {
    const response = await fetch(
     `${import.meta.env.VITE_API_URL}/consultations`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          fullPhone: `${form.countryCode}${form.phone}`,
          pageUrl: window.location.href,
        }),
      }
    );

    const result = await response.json();

    console.log("Consultation API response:", result);

    if (!response.ok || !result.success) {
      if (result.errors) {
        setErrors(result.errors);
      }

      throw new Error(
        result.message ||
          "Unable to submit consultation request."
      );
    }

    setForm({
      name: "",
      email: "",
      countryCode: "+91",
      phone: "",
      company: "",
      service: "",
      message: "",
    });

    setErrors({});

    onClose();

    window.location.href =
      "/thank-you?source=consultation";
  } catch (error) {
    console.error(
      "Consultation submission failed:",
      error
    );

    alert(
      error.message ||
        "Something went wrong. Please try again."
    );
  }
};
  return (
    <div className="kr-consult-overlay">
      <div className="kr-consult-popup">
        <button className="kr-consult-close" onClick={onClose}>
          <FaTimes />
        </button>

        <div className="kr-consult-head">
          <span>FREE CONSULTATION</span>
          <h2>Let’s Understand Your Growth Requirement</h2>
          <p>
            Share your details. Our team will review your business, website,
            campaigns or automation requirement and get back to you.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="kr-consult-form">
          <div className="kr-consult-row">
            <div>
              <input
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
              />
              {errors.name && <small>{errors.name}</small>}
            </div>

            <div>
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && <small>{errors.email}</small>}
            </div>
          </div>

          <div className="kr-consult-phone-grid">
            <select
              name="countryCode"
              value={form.countryCode}
              onChange={(e) => {
                setForm({
                  ...form,
                  countryCode: e.target.value,
                  phone: "",
                });
                setErrors({ ...errors, phone: "" });
              }}
            >
              {countryCodes.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.label}
                </option>
              ))}
            </select>

            <div>
              <input
                name="phone"
                placeholder="Mobile Number"
                value={form.phone}
                onChange={handleChange}
              />
              {errors.phone && <small>{errors.phone}</small>}
            </div>
          </div>

          <div className="kr-consult-row">
            <input
              name="company"
              placeholder="Company / Project Name"
              value={form.company}
              onChange={handleChange}
            />

            <div>
              <select
                name="service"
                value={form.service}
                onChange={handleChange}
              >
                <option value="">Select Requirement</option>
                <option>Strategy Consulting</option>
                <option>Website Development</option>
                <option>SEO & GEO</option>
                <option>Google Ads / Meta Ads</option>
                <option>CRM & Automation</option>
                <option>WhatsApp API</option>
                <option>Other</option>
              </select>
              {errors.service && <small>{errors.service}</small>}
            </div>
          </div>

          <div>
            <textarea
              name="message"
              placeholder="Tell us briefly about your requirement"
              value={form.message}
              onChange={handleChange}
              maxLength="500"
            />
            {errors.message && <small>{errors.message}</small>}
          </div>

          <button type="submit">Submit Consultation Request ›</button>
        </form>
      </div>
    </div>
  );
};

export default ConsultationPopup;