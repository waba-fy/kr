import { FaDownload, FaExternalLinkAlt } from "react-icons/fa";

const DownloadButton = ({
  href = "",
  title = "Download PDF",
  description = "",
  external = true,
  className = "",
}) => {
  if (!href) {
    return null;
  }

  return (
    <div className={`kr-download-card ${className}`}>
      <div className="kr-download-info">
        <h4>{title}</h4>

        {description && (
          <p>{description}</p>
        )}
      </div>

      <a
        href={href}
        target={external ? "_blank" : "_self"}
        rel={
          external
            ? "noopener noreferrer"
            : undefined
        }
        className="kr-download-btn"
      >
        <FaDownload />

        <span>Open PDF</span>

        <FaExternalLinkAlt className="kr-download-external" />
      </a>
    </div>
  );
};

export default DownloadButton;