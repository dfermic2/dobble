import "./ContactForm.css";
import { useState } from "react";

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [isSuccess, setIsSuccess] = useState(false);
  const [isFail, setIsFail] = useState(false);

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [messageError, setMessageError] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();
    const data = { name: name, email: email, message: message };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/email/send-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        setIsFail(false);
        setIsSuccess(true);
      } else {
        setIsSuccess(false);
        setIsFail(true);
      }
    } catch (error) {}
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    setIsSuccess(false);
    setIsFail(false);

    if (value === "") {
      setNameError("Name is required.");
    } else {
      setNameError("");
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setIsSuccess(false);
    setIsFail(false);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (value === "") {
      setEmailError("Email is required.");
    } else if (!emailRegex.test(value)) {
      setEmailError("Email adress is not valid.");
    } else {
      setEmailError("");
    }
  };

  const handleMessageChange = (e) => {
    const value = e.target.value;
    setMessage(value);
    setIsSuccess(false);
    setIsFail(false);

    if (value === "") {
      setMessageError("Message is required.");
    } else {
      setMessageError("");
    }
  };

  return (
    <div className="contact-form-container">
      <form
        action="submit"
        onSubmit={(e) => sendEmail(e)}
        className="contact-form"
      >
        <div className="input-container">
          <input
            id="name"
            type="text"
            placeholder="Your name"
            onChange={(e) => handleNameChange(e)}
            required
          />
          {nameError && <p>{nameError}</p>}
        </div>

        <div className="input-container">
          <input
            id="email"
            type="email"
            placeholder="Your email"
            onChange={(e) => handleEmailChange(e)}
            required
          />
          {emailError && <p>{emailError}</p>}
        </div>

        <div className="input-container">
          <textarea
            id="message"
            type="text"
            placeholder="Your message..."
            onChange={(e) => handleMessageChange(e)}
            required
          ></textarea>
          {messageError && <p>{messageError}</p>}
        </div>

        {isSuccess && (
          <label className="success-msg">
            Your email has been successfully sent!
          </label>
        )}
        {isFail && (
          <label className="fail-msg">
            Something went wrong. Please try again.
          </label>
        )}

        <button className="btn play-button header-font" type="submit">
          Send message
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
