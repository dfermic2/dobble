import "./Form.css";

function ContactForm() {
  return (
    <div className="contact-form-container">
      <form action="submit" className="contact-form">
        <input type="text" placeholder="Your name" required />
        <input type="email" placeholder="Your email" required />
        <textarea type="text" placeholder="Your message..." required></textarea>
        <button className="btn play-button header-font" type="submit">
          Send message
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
