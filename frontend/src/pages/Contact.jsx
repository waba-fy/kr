import "../styles/contact.css";

const Contact = () => {
  return (
    <section className="contact-page">
      <div className="container">
        <h1 className="page-title">Contact Us</h1>
        <p className="page-subtitle">
          Let’s discuss how we can help your business grow.
        </p>

        <div className="contact-grid">
          <div className="contact-info">
            <h3>Get in Touch</h3>
            <p>Email: hello@keyroutes.com</p>
            <p>Phone: +91 90000 00000</p>
            <p>Location: India</p>
          </div>

          <form className="contact-form">
            <input type="text" placeholder="Full Name" required />
            <input type="email" placeholder="Email Address" required />
            <input type="tel" placeholder="Phone Number" />
            <textarea placeholder="Your Message"></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
