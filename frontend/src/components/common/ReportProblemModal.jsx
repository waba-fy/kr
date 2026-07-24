import { useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaEnvelope,
  FaExclamationTriangle,
  FaTimes,
} from "react-icons/fa";
import "../../styles/report-problem-modal.css";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const ISSUE_OPTIONS = [
  {
    value: "delete-my-data",
    label: "Delete my personal data",
  },
  {
    value: "correct-my-data",
    label: "Correct or update my personal data",
  },
  {
    value: "website-content",
    label: "Content issue on the website",
  },
  {
    value: "privacy-concern",
    label: "Privacy or data protection concern",
  },
  {
    value: "cookies",
    label: "Cookies or tracking concern",
  },
  {
    value: "copyright",
    label: "Copyright or intellectual property issue",
  },
  {
    value: "technical",
    label: "Technical problem",
  },
  {
    value: "accessibility",
    label: "Accessibility issue",
  },
  {
    value: "security",
    label: "Security concern",
  },
  {
    value: "incorrect-information",
    label: "Incorrect or misleading information",
  },
  {
    value: "other",
    label: "Other issue",
  },
];

const initialForm = {
  name: "",
  email: "",
  issueType: "",
  pageUrl: "",
  description: "",
  consent: false,
};

const ReportProblemModal = ({
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState({
    type: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    setFormData((current) => ({
      ...current,
      pageUrl:
        current.pageUrl ||
        (typeof window !== "undefined"
          ? window.location.href
          : ""),
    }));

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const updateField = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (status.message) {
      setStatus({
        type: "",
        message: "",
      });
    }
  };

  const validateForm = () => {
    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!formData.name.trim()) {
      return "Please enter your name.";
    }

    if (!formData.email.trim()) {
      return "Please enter your email address.";
    }

    if (!emailPattern.test(formData.email.trim())) {
      return "Please enter a valid email address.";
    }

    if (!formData.issueType) {
      return "Please select the type of issue.";
    }

    if (formData.description.trim().length < 15) {
      return "Please provide at least 15 characters describing the issue.";
    }

    if (!formData.consent) {
      return "Please confirm that KeyRoutes may contact you about this report.";
    }

    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationMessage = validateForm();

    if (validationMessage) {
      setStatus({
        type: "error",
        message: validationMessage,
      });
      return;
    }

    try {
      setLoading(true);
      setStatus({
        type: "",
        message: "",
      });

      const response = await fetch(
        `${API_BASE_URL}/support/report-problem`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.trim().toLowerCase(),
            issueType: formData.issueType,
            pageUrl: formData.pageUrl.trim(),
            description: formData.description.trim(),
            submittedAt: new Date().toISOString(),
          }),
        }
      );

      const result = await response.json().catch(() => ({}));

      if (!response.ok || result.success === false) {
        throw new Error(
          result.message ||
            "Unable to submit your report right now."
        );
      }

      setStatus({
        type: "success",
        message:
          result.message ||
          "Thank you. Your report has been submitted successfully.",
      });

      setFormData({
        ...initialForm,
        pageUrl:
          typeof window !== "undefined"
            ? window.location.href
            : "",
      });
    } catch (error) {
      console.error("Report problem error:", error);

      setStatus({
        type: "error",
        message:
          error.message ||
          "Unable to submit your report. Please email hello@keyroutes.co.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="kr-problem-modal-overlay"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        className="kr-problem-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="kr-problem-modal-title"
      >
        <button
          type="button"
          className="kr-problem-modal-close"
          onClick={onClose}
          aria-label="Close report a problem form"
        >
          <FaTimes />
        </button>

        <header className="kr-problem-modal-header">
          <span className="kr-problem-modal-icon">
            <FaExclamationTriangle />
          </span>

          <div>
            <span className="kr-problem-modal-eyebrow">
              WEBSITE SUPPORT
            </span>

            <h2 id="kr-problem-modal-title">
              Report a Problem
            </h2>

            <p>
              Report a website issue, request correction or
              deletion of your personal data, or raise a privacy,
              content, accessibility, copyright, or technical
              concern.
            </p>
          </div>
        </header>

        <form
          className="kr-problem-form"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="kr-problem-form-grid">
            <div className="kr-problem-field">
              <label htmlFor="problem-name">
                Name <span>*</span>
              </label>

              <input
                id="problem-name"
                name="name"
                type="text"
                value={formData.name}
                onChange={updateField}
                placeholder="Enter your full name"
                autoComplete="name"
                disabled={loading}
              />
            </div>

            <div className="kr-problem-field">
              <label htmlFor="problem-email">
                Email address <span>*</span>
              </label>

              <input
                id="problem-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={updateField}
                placeholder="you@example.com"
                autoComplete="email"
                disabled={loading}
              />
            </div>
          </div>

          <div className="kr-problem-field">
            <label htmlFor="problem-issue-type">
              Select the issue <span>*</span>
            </label>

            <select
              id="problem-issue-type"
              name="issueType"
              value={formData.issueType}
              onChange={updateField}
              disabled={loading}
            >
              <option value="">
                Choose an issue type
              </option>

              {ISSUE_OPTIONS.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="kr-problem-field">
            <label htmlFor="problem-page-url">
              Related page URL
            </label>

            <input
              id="problem-page-url"
              name="pageUrl"
              type="url"
              value={formData.pageUrl}
              onChange={updateField}
              placeholder="https://keyroutes.co/page"
              disabled={loading}
            />

            <small>
              The current page is added automatically. You may
              replace it with another KeyRoutes page.
            </small>
          </div>

          <div className="kr-problem-field">
            <label htmlFor="problem-description">
              Description <span>*</span>
            </label>

            <textarea
              id="problem-description"
              name="description"
              rows="6"
              value={formData.description}
              onChange={updateField}
              placeholder="Describe the problem, the information involved, and the action you would like us to take."
              disabled={loading}
            />

            <small>
              Do not include passwords, payment details, government
              identification numbers, or other highly sensitive
              information.
            </small>
          </div>

          <label className="kr-problem-consent">
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={updateField}
              disabled={loading}
            />

            <span>
              I confirm that the information provided is accurate
              and permit KeyRoutes to contact me regarding this
              report.
            </span>
          </label>

          {status.message && (
            <div
              className={`kr-problem-status ${
                status.type === "success"
                  ? "is-success"
                  : "is-error"
              }`}
              role={
                status.type === "error"
                  ? "alert"
                  : "status"
              }
              aria-live="polite"
            >
              {status.type === "success" ? (
                <FaCheckCircle />
              ) : (
                <FaExclamationTriangle />
              )}

              <span>{status.message}</span>
            </div>
          )}

          <div className="kr-problem-form-footer">
            <p >
              You can also contact us directly at{" "}
              <a href="mailto:hello@keyroutes.co">
                <FaEnvelope />
                hello@keyroutes.co
              </a>
            </p>

            <div className="kr-problem-form-actions">
              <button
                type="button"
                className="kr-problem-cancel"
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="kr-problem-submit"
                disabled={loading}
              >
                {loading
                  ? "Submitting..."
                  : "Submit Report"}
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export default ReportProblemModal;