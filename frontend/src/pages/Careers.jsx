import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBriefcase,
  FaUsers,
  FaRocket,
  FaLaptopCode,
  FaCheckCircle,
  FaUpload,
  FaArrowRight,
} from "react-icons/fa";

import SEO from "../components/seo/SEO";
import Schema from "../components/seo/Schema";

import organizationSchema from "../seo/organizationSchema";
import {
  createCollectionPageSchema,
} from "../seo/schemaHelper";
import {
  careersBreadcrumbSchema,
} from "../seo/breadcrumbSchema";

import "../styles/careers.css";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  role: "",
  message: "",
};

const allowedFileExtensions = [".pdf", ".doc", ".docx"];

const allowedMimeTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const MAX_RESUME_SIZE = 5 * 1024 * 1024;

const lifeItems = [
  {
    icon: <FaRocket />,
    title: "Growth-Focused Culture",
    desc: "Work with a team that values learning, ownership and practical execution across strategy, marketing and technology.",
  },
  {
    icon: <FaUsers />,
    title: "Collaborative Team",
    desc: "We encourage open communication, shared ideas and teamwork across projects, campaigns and client growth systems.",
  },
  {
    icon: <FaLaptopCode />,
    title: "Real Projects",
    desc: "You will work on websites, SEO, campaigns, automation, CRM and digital systems for real businesses.",
  },
];

const whyJoin = [
  "Work on real client projects",
  "Learn strategy, marketing and automation",
  "Collaborative and supportive environment",
  "Opportunities to grow with the company",
  "Exposure to real estate and business growth systems",
  "Hands-on experience with websites, SEO, CRM and campaigns",
];

const openings = [
  {
    role: "Digital Marketing Executive",
    type: "Full Time",
    location: "Hyderabad / Remote",
    desc: "Support SEO, Google Ads, Meta Ads, social media planning and campaign reporting for client projects.",
    skills: ["SEO", "Google Ads", "Meta Ads", "Reporting"],
  },
  {
    role: "Frontend Developer",
    type: "Full Time / Internship",
    location: "Hyderabad / Remote",
    desc: "Build responsive websites, landing pages and business dashboards using React, CSS and modern frontend practices.",
    skills: ["React", "CSS", "Responsive UI", "API Integration"],
  },
  {
    role: "Business Development Executive",
    type: "Full Time",
    location: "Hyderabad",
    desc: "Connect with businesses, understand requirements, coordinate demos and support growth consultation conversations.",
    skills: ["Communication", "Lead Follow-up", "Sales", "CRM"],
  },
];

const careersDescription =
  "Join KeyRoutes and work on real estate growth systems, SEO, websites, campaigns, CRM and automation projects. Explore open positions and submit your CV.";

const careersPageSchema =
  createCollectionPageSchema({
    name: "Careers at KeyRoutes",
    description: careersDescription,
    url: "/careers",
  });

const Careers = () => {
  const fileInputRef = useRef(null);

  const [form, setForm] = useState(initialForm);
  const [resume, setResume] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    type: "",
    message: "",
  });

  const clearFieldError = (fieldName) => {
    setErrors((currentErrors) => {
      if (!currentErrors[fieldName]) {
        return currentErrors;
      }

      const nextErrors = {
        ...currentErrors,
      };

      delete nextErrors[fieldName];

      return nextErrors;
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    let nextValue = value;

    if (name === "phone") {
      nextValue = value
        .replace(/[^\d+\s()-]/g, "")
        .slice(0, 30);
    }

    setForm((currentForm) => ({
      ...currentForm,
      [name]: nextValue,
    }));

    clearFieldError(name);

    if (submitStatus.message) {
      setSubmitStatus({
        type: "",
        message: "",
      });
    }
  };

  const handleResumeChange = (event) => {
    const selectedFile = event.target.files?.[0] || null;

    clearFieldError("resume");

    if (!selectedFile) {
      setResume(null);
      return;
    }

    const filename = selectedFile.name.toLowerCase();

    const extension = allowedFileExtensions.find((item) =>
      filename.endsWith(item)
    );

    const hasValidExtension = Boolean(extension);

    const hasValidMimeType =
      allowedMimeTypes.includes(selectedFile.type) ||
      selectedFile.type === "";

    if (!hasValidExtension || !hasValidMimeType) {
      setResume(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setErrors((currentErrors) => ({
        ...currentErrors,
        resume: "Please upload a PDF, DOC or DOCX resume.",
      }));

      return;
    }

    if (selectedFile.size > MAX_RESUME_SIZE) {
      setResume(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setErrors((currentErrors) => ({
        ...currentErrors,
        resume: "Resume size cannot exceed 5 MB.",
      }));

      return;
    }

    if (selectedFile.size === 0) {
      setResume(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setErrors((currentErrors) => ({
        ...currentErrors,
        resume: "The selected resume file is empty.",
      }));

      return;
    }

    setResume(selectedFile);

    if (submitStatus.message) {
      setSubmitStatus({
        type: "",
        message: "",
      });
    }
  };

  const validateForm = () => {
    const validationErrors = {};

    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();
    const phoneDigits = form.phone.replace(/\D/g, "");
    const role = form.role.trim();
    const message = form.message.trim();

    const namePattern = /^[A-Za-zÀ-ÿ.' -]{2,120}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!name) {
      validationErrors.name = "Full name is required.";
    } else if (!namePattern.test(name)) {
      validationErrors.name = "Please enter a valid full name.";
    }

    if (!email) {
      validationErrors.email = "Email address is required.";
    } else if (!emailPattern.test(email)) {
      validationErrors.email = "Please enter a valid email address.";
    }

    if (!form.phone.trim()) {
      validationErrors.phone = "Phone number is required.";
    } else if (phoneDigits.length < 7 || phoneDigits.length > 15) {
      validationErrors.phone = "Please enter a valid phone number.";
    }

    if (!role) {
      validationErrors.role = "Please select a role.";
    }

    if (message.length > 3000) {
      validationErrors.message =
        "Cover note cannot exceed 3000 characters.";
    }

    if (!resume) {
      validationErrors.resume =
        "Please upload your CV or resume.";
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const handleRoleSelection = (role) => {
    setForm((currentForm) => ({
      ...currentForm,
      role,
    }));

    clearFieldError("role");

    window.setTimeout(() => {
      document
        .getElementById("submit-cv")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 0);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      setSubmitStatus({
        type: "error",
        message:
          "Please correct the highlighted fields before submitting.",
      });

      return;
    }

    try {
      setIsSubmitting(true);

      setSubmitStatus({
        type: "",
        message: "",
      });

      const formData = new FormData();

      formData.append("name", form.name.trim());
      formData.append("email", form.email.trim().toLowerCase());
      formData.append("phone", form.phone.trim());
      formData.append("role", form.role.trim());
      formData.append("message", form.message.trim());
      formData.append("source", "Website Careers Page");
      formData.append("pageUrl", window.location.href);
      formData.append("resume", resume);

      const response = await fetch(
        `${API_BASE_URL}/careers/apply`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      console.log("Career application response:", result);

      if (!response.ok || !result.success) {
        if (result.errors) {
          setErrors((currentErrors) => ({
            ...currentErrors,
            ...result.errors,
          }));
        }

        throw new Error(
          result.message ||
            "Unable to submit your career application."
        );
      }

      setSubmitStatus({
        type: "success",
        message:
          result.message ||
          "Your application has been submitted successfully. Please check your email for confirmation.",
      });

      setForm(initialForm);
      setResume(null);
      setErrors({});

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error(
        "Career application submission failed:",
        error
      );

      setSubmitStatus({
        type: "error",
        message:
          error.message ||
          "Unable to submit your application. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="kr-careers-page">
      <SEO
        title="Careers at KeyRoutes"
        description={careersDescription}
        canonical="/careers"
        keywords={[
          "KeyRoutes careers",
          "digital marketing jobs Hyderabad",
          "frontend developer jobs Hyderabad",
          "business development jobs Hyderabad",
          "SEO jobs",
          "React jobs",
          "marketing careers",
          "real estate marketing jobs",
        ]}
      />

      <Schema
        data={[
          organizationSchema,
          careersPageSchema,
          careersBreadcrumbSchema,
        ]}
      />

      <section className="kr-careers-hero">
        <div className="kr-careers-bg" />

        <div className="kr-careers-container">
          <div className="kr-careers-breadcrumb">
            <Link to="/">Home</Link>
            <span>›</span>
            Careers
          </div>

          <span>CAREERS AT KEYROUTES</span>

          <h1>
            Build Your Career With a Team Focused on{" "}
            <strong>
              Growth, Strategy and Technology.
            </strong>
          </h1>

          <p>
            Join KeyRoutes to work on real business growth systems including
            websites, SEO, campaigns, CRM, automation and lead generation
            solutions for clients.
          </p>

          <div className="kr-careers-actions">
            <a href="#open-positions">
              Open Positions
            </a>

            <a href="#submit-cv">
              Submit Your CV
            </a>
          </div>
        </div>
      </section>

      <section
        className="kr-careers-life"
        id="life-at-keyroutes"
      >
        <div className="kr-careers-container">
          <div className="kr-careers-head center">
            <span>LIFE AT KEYROUTES</span>

            <h2>
              Learn, Build and Grow With{" "}
              <strong>Real Client Work</strong>
            </h2>

            <p>
              We are building a team that understands business growth,
              technology and execution. Every project gives you practical
              exposure and real learning.
            </p>
          </div>

          <div className="kr-careers-life-grid">
            {lifeItems.map((item) => (
              <article
                className="kr-careers-life-card"
                key={item.title}
              >
                <div>{item.icon}</div>

                <h3>{item.title}</h3>

                <p>{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="kr-careers-why">
        <div className="kr-careers-container kr-careers-why-grid">
          <div>
            <span>WHY JOIN US</span>

            <h2>
              A Place to Learn Strategy, Execution and Digital Growth.
            </h2>

            <p>
              KeyRoutes is ideal for people who want hands-on exposure to
              websites, marketing, CRM, automation and real business growth
              projects.
            </p>
          </div>

          <div className="kr-careers-check-grid">
            {whyJoin.map((item) => (
              <p key={item}>
                <FaCheckCircle />
                {item}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section
        className="kr-careers-openings"
        id="open-positions"
      >
        <div className="kr-careers-container">
          <div className="kr-careers-head center">
            <span>OPEN POSITIONS</span>

            <h2>
              Current Opportunities at{" "}
              <strong>KeyRoutes</strong>
            </h2>

            <p>
              Explore our current opportunities and apply for the role that
              best matches your experience and interests.
            </p>
          </div>

          <div className="kr-careers-job-grid">
            {openings.map((job) => (
              <article
                className="kr-careers-job-card"
                key={job.role}
              >
                <div className="kr-careers-job-icon">
                  <FaBriefcase />
                </div>

                <div className="kr-careers-job-meta">
                  <span>{job.type}</span>
                  <span>{job.location}</span>
                </div>

                <h3>{job.role}</h3>

                <p>{job.desc}</p>

                <div className="kr-careers-skill-wrap">
                  {job.skills.map((skill) => (
                    <small key={skill}>
                      {skill}
                    </small>
                  ))}
                </div>

                <button
                  type="button"
                  className="kr-careers-apply-link"
                  onClick={() =>
                    handleRoleSelection(job.role)
                  }
                >
                  Apply Now
                  <FaArrowRight />
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>
            <section
        className="kr-careers-submit"
        id="submit-cv"
      >
        <div className="kr-careers-container kr-careers-submit-grid">
          <div className="kr-careers-submit-content">
            <span>SUBMIT YOUR CV</span>

            <h2>
              Interested in Working With{" "}
              <strong>KeyRoutes?</strong>
            </h2>

            <p>
              Share your details and upload your CV. Our team will review your
              profile and contact you when a suitable opportunity is available.
            </p>

            <div className="kr-careers-submit-points">
              <p>
                <FaCheckCircle />
                Resume accepted in PDF, DOC or DOCX format.
              </p>

              <p>
                <FaCheckCircle />
                Maximum file size is 5 MB.
              </p>

              <p>
                <FaCheckCircle />
                A confirmation email will be sent after successful submission.
              </p>
            </div>
          </div>

          <form
            className="kr-careers-form"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="kr-careers-form-row">
              <div className="kr-careers-field">
                <label htmlFor="career-name">
                  Full Name
                </label>

                <input
                  id="career-name"
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  autoComplete="name"
                />

                {errors.name && (
                  <small className="kr-careers-error">
                    {errors.name}
                  </small>
                )}
              </div>

              <div className="kr-careers-field">
                <label htmlFor="career-email">
                  Email Address
                </label>

                <input
                  id="career-email"
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  autoComplete="email"
                />

                {errors.email && (
                  <small className="kr-careers-error">
                    {errors.email}
                  </small>
                )}
              </div>
            </div>

            <div className="kr-careers-form-row">
              <div className="kr-careers-field">
                <label htmlFor="career-phone">
                  Phone Number
                </label>

                <input
                  id="career-phone"
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  autoComplete="tel"
                />

                {errors.phone && (
                  <small className="kr-careers-error">
                    {errors.phone}
                  </small>
                )}
              </div>

              <div className="kr-careers-field">
                <label htmlFor="career-role">
                  Role Interested In
                </label>

                <select
                  id="career-role"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  disabled={isSubmitting}
                >
                  <option value="">
                    Role Interested In
                  </option>

                  <option value="Digital Marketing Executive">
                    Digital Marketing Executive
                  </option>

                  <option value="Frontend Developer">
                    Frontend Developer
                  </option>

                  <option value="Business Development Executive">
                    Business Development Executive
                  </option>

                  <option value="Internship">
                    Internship
                  </option>

                  <option value="Other">
                    Other
                  </option>
                </select>

                {errors.role && (
                  <small className="kr-careers-error">
                    {errors.role}
                  </small>
                )}
              </div>
            </div>

            <div className="kr-careers-field">
              <label htmlFor="career-resume">
                Upload CV / Resume
              </label>

              <div
                className={`kr-careers-upload ${
                  errors.resume ? "has-error" : ""
                }`}
              >
                <label htmlFor="career-resume">
                  <FaUpload />

                  <span>
                    {resume
                      ? resume.name
                      : "Choose PDF, DOC or DOCX file"}
                  </span>
                </label>

                <input
                  ref={fileInputRef}
                  id="career-resume"
                  type="file"
                  name="resume"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeChange}
                  disabled={isSubmitting}
                />
              </div>

              {resume && (
                <small className="kr-careers-file-info">
                  Selected file: {resume.name}{" "}
                  ({(resume.size / 1024 / 1024).toFixed(2)} MB)
                </small>
              )}

              {errors.resume && (
                <small className="kr-careers-error">
                  {errors.resume}
                </small>
              )}
            </div>

            <div className="kr-careers-field">
              <label htmlFor="career-message">
                Short Message / Cover Note
              </label>

              <textarea
                id="career-message"
                name="message"
                placeholder="Tell us briefly about your experience, interests or availability."
                value={form.message}
                onChange={handleChange}
                disabled={isSubmitting}
                maxLength={3000}
              />

              <div className="kr-careers-message-meta">
                <span>
                  {form.message.length}/3000
                </span>
              </div>

              {errors.message && (
                <small className="kr-careers-error">
                  {errors.message}
                </small>
              )}
            </div>

            {submitStatus.message && (
              <div
                className={`kr-careers-submit-message ${
                  submitStatus.type === "success"
                    ? "is-success"
                    : "is-error"
                }`}
                role={
                  submitStatus.type === "error"
                    ? "alert"
                    : "status"
                }
                aria-live="polite"
              >
                {submitStatus.message}
              </div>
            )}

            <button
              type="submit"
              className="kr-careers-submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Submitting Application..."
                : "Submit Application ›"}
            </button>

            <small className="kr-careers-privacy-note">
              By submitting this form, you agree that KeyRoutes may review and
              retain your application details for recruitment purposes.
            </small>
          </form>
        </div>
      </section>

      <section className="kr-careers-cta">
        <div className="kr-careers-container">
          <h2>
            Want to Grow Your Career With KeyRoutes?
          </h2>

          <p>
            We are always looking for people who are curious, responsible and
            excited to work on strategy, marketing and technology.
          </p>

          <a
            href="https://wa.me/918309436998"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact HR on WhatsApp ›
          </a>
        </div>
      </section>
    </main>
  );
};

export default Careers;