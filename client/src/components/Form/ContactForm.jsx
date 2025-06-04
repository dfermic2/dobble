import "./Form.css";
import { useState } from "react";
import { useEffect } from "react";

function ContactForm() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [message, setMessage] = useState();

  const [isOk, setIsOk] = useState(false);
  const [isFail, setIsFail] = useState(false);

  const sendEmail = async () => {
    const data = { name: name, email: email, message: message };

    try {
      const response = await fetch("/api/email/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
      }
    } catch (error) {}
  };

  return (
    <div className="contact-form-container">
      <form action="submit" className="contact-form">
        <input type="text" placeholder="Your name" required />
        <input type="email" placeholder="Your email" required />
        <textarea type="text" placeholder="Your message..." required></textarea>
        <button
          className="btn play-button header-font"
          type="submit"
          onClick={sendEmail}
        >
          Send message
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
