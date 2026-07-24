import { Link } from "react-router-dom";
import "../styles/thank-you.css";

const ThankYou = () => {
  return (
    <main className="kr-thank-page">
      <div className="kr-thank-box">
        <span>THANK YOU</span>
        <h1>Your consultation request has been received.</h1>
        <p>
          Our team will review your details and contact you shortly.
        </p>

        <Link to="/">Back to Home ›</Link>
      </div>
    </main>
  );
};

export default ThankYou;