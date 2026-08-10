import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import "../styles/consultation-popup.css";

const countryCodes = [
  {
    code: "+91",
    label: "India +91",
    min: 10,
    max: 10,
  },
  {
    code: "+44",
    label: "UK +44",
    min: 10,
    max: 11,
  },
  {
    code: "+1",
    label: "USA +1",
    min: 10,
    max: 10,
  },
  {
    code: "+971",
    label: "UAE +971",
    min: 9,
    max: 9,
  },
  {
    code: "+61",
    label: "Australia +61",
    min: 9,
    max: 9,
  },
];

const initialForm = {
  name: "",
  email: "",
  countryCode: "+91",
  phone: "",
  company: "",
  service: "",
  message: "",
};

const ConsultationPopup = ({
  open,
  onClose,
}) => {
  const [form, setForm] = useState(initialForm);

  const [errors, setErrors] = useState({});

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  if (!open) {
    return null;
  }

  const selectedCountry =
    countryCodes.find(
      (item) =>
        item.code === form.countryCode
    ) || countryCodes[0];

  /* =====================================================
     VALIDATION
  ===================================================== */

  const validateForm = () => {
    const newErrors = {};

    const nameRegex =
      /^[A-Za-z\s]{3,60}$/;

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    const phoneRegex =
      /^[0-9]+$/;

    if (!form.name.trim()) {
      newErrors.name =
        "Name is required.";
    } else if (
      !nameRegex.test(form.name.trim())
    ) {
      newErrors.name =
        "Enter a valid name with minimum 3 letters.";
    }

    if (!form.email.trim()) {
      newErrors.email =
        "Email is required.";
    } else if (
      !emailRegex.test(form.email.trim())
    ) {
      newErrors.email =
        "Enter a valid email address.";
    }

    if (!form.phone.trim()) {
      newErrors.phone =
        "Mobile number is required.";
    } else if (
      !phoneRegex.test(form.phone.trim())
    ) {
      newErrors.phone =
        "Mobile number should contain digits only.";
    } else if (
      form.phone.length <
        selectedCountry.min ||
      form.phone.length >
        selectedCountry.max
    ) {
      newErrors.phone =
        `Mobile number should be ${
          selectedCountry.min
        }${
          selectedCountry.min !==
          selectedCountry.max
            ? `-${selectedCountry.max}`
            : ""
        } digits for ${
          selectedCountry.label
        }.`;
    }

    if (!form.service) {
      newErrors.service =
        "Please select your requirement.";
    }

    if (
      form.message &&
      form.message.length > 500
    ) {
      newErrors.message =
        "Message should not exceed 500 characters.";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  /* =====================================================
     INPUT CHANGE
  ===================================================== */

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    if (name === "phone") {
      const onlyDigits =
        value.replace(/\D/g, "");

      const maxLength =
        selectedCountry?.max || 10;

      setForm((current) => ({
        ...current,
        phone: onlyDigits.slice(
          0,
          maxLength
        ),
      }));

      if (errors.phone) {
        setErrors((current) => ({
          ...current,
          phone: "",
        }));
      }

      return;
    }

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((current) => ({
        ...current,
        [name]: "",
      }));
    }
  };

  /* =====================================================
     COUNTRY CHANGE
  ===================================================== */

  const handleCountryChange = (
    event
  ) => {
    const countryCode =
      event.target.value;

    setForm((current) => ({
      ...current,
      countryCode,
      phone: "",
    }));

    setErrors((current) => ({
      ...current,
      phone: "",
    }));
  };

  /* =====================================================
     SUBMIT
  ===================================================== */

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    /*
     * Prevent accidental double submissions.
     */
    if (isSubmitting) {
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/consultations`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            ...form,

            fullPhone:
              `${form.countryCode}${form.phone}`,

            pageUrl:
              window.location.href,
          }),
        }
      );

      let result = {};

      try {
        result =
          await response.json();
      } catch {
        result = {};
      }

      console.log(
        "Consultation API response:",
        result
      );

      if (
        !response.ok ||
        !result.success
      ) {
        if (result.errors) {
          setErrors(
            result.errors
          );
        }

        throw new Error(
          result.message ||
            "Unable to submit consultation request."
        );
      }

      /*
       * Reset form only after successful API submission.
       */
      setForm(initialForm);

      setErrors({});

      /*
       * Close popup before redirecting.
       */
      if (
        typeof onClose ===
        "function"
      ) {
        onClose();
      }

      /*
       * Successful submission.
       */
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

      /*
       * Only re-enable the button when submission fails.
       *
       * On success the browser redirects to the
       * thank-you page anyway.
       */
      setIsSubmitting(false);
    }
  };

  /* =====================================================
     CLOSE
  ===================================================== */

  const handleClose = () => {
    /*
     * Don't allow the popup to be accidentally closed
     * while the request is being submitted.
     */
    if (isSubmitting) {
      return;
    }

    if (
      typeof onClose === "function"
    ) {
      onClose();
    }
  };

  return (
    <div
      className="kr-consult-overlay"
      role="presentation"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          handleClose();
        }
      }}
    >
      <div
        className="kr-consult-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="consultation-popup-title"
      >
        {/* =============================================
            CLOSE
        ============================================= */}

        <button
          type="button"
          className="kr-consult-close"
          onClick={handleClose}
          disabled={isSubmitting}
          aria-label="Close consultation form"
        >
          <FaTimes
            aria-hidden="true"
          />
        </button>

        {/* =============================================
            HEADER
        ============================================= */}

        <div className="kr-consult-head">
          <span>
            FREE CONSULTATION
          </span>

          <h2 id="consultation-popup-title">
            Let&apos;s Understand Your
            Growth Requirement
          </h2>

          <p>
            Share your details. Our team
            will review your business,
            website, campaigns or
            automation requirement and
            get back to you.
          </p>
        </div>

        {/* =============================================
            FORM
        ============================================= */}

        <form
          onSubmit={handleSubmit}
          className="kr-consult-form"
          noValidate
        >
          <fieldset
            disabled={isSubmitting}
            className="kr-consult-fieldset"
          >
            {/* NAME + EMAIL */}

            <div className="kr-consult-row">
              <div>
                <input
                  name="name"
                  type="text"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  autoComplete="name"
                />

                {errors.name && (
                  <small>
                    {errors.name}
                  </small>
                )}
              </div>

              <div>
                <input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                />

                {errors.email && (
                  <small>
                    {errors.email}
                  </small>
                )}
              </div>
            </div>

            {/* PHONE */}

            <div className="kr-consult-phone-grid">
              <select
                name="countryCode"
                value={
                  form.countryCode
                }
                onChange={
                  handleCountryChange
                }
                aria-label="Country calling code"
              >
                {countryCodes.map(
                  (item) => (
                    <option
                      key={item.code}
                      value={item.code}
                    >
                      {item.label}
                    </option>
                  )
                )}
              </select>

              <div>
                <input
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  placeholder="Mobile Number"
                  value={form.phone}
                  onChange={handleChange}
                  autoComplete="tel"
                />

                {errors.phone && (
                  <small>
                    {errors.phone}
                  </small>
                )}
              </div>
            </div>

            {/* COMPANY + SERVICE */}

            <div className="kr-consult-row">
              <input
                name="company"
                type="text"
                placeholder="Company / Project Name"
                value={form.company}
                onChange={handleChange}
                autoComplete="organization"
              />

              <div>
                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                >
                  <option value="">
                    Select Requirement
                  </option>

                  <option>
                    Strategy Consulting
                  </option>

                  <option>
                    Website Development
                  </option>

                  <option>
                    SEO & GEO
                  </option>

                  <option>
                    Google Ads / Meta Ads
                  </option>

                  <option>
                    CRM & Automation
                  </option>

                  <option>
                    WhatsApp API
                  </option>

                  <option>
                    Other
                  </option>
                </select>

                {errors.service && (
                  <small>
                    {errors.service}
                  </small>
                )}
              </div>
            </div>

            {/* MESSAGE */}

            <div>
              <textarea
                name="message"
                placeholder="Tell us briefly about your requirement"
                value={form.message}
                onChange={handleChange}
                maxLength={500}
              />

              {errors.message && (
                <small>
                  {errors.message}
                </small>
              )}
            </div>

            {/* SUBMIT */}

            <button
              type="submit"
              className={`kr-consult-submit ${
                isSubmitting
                  ? "is-submitting"
                  : ""
              }`}
              aria-busy={
                isSubmitting
              }
            >
              {isSubmitting
                ? "Submitting..."
                : "Submit Consultation Request ›"}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default ConsultationPopup;