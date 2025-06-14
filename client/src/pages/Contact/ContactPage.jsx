import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ContactForm from "../../components/Form/ContactForm";
import ScrollToTop from "../../utils/SrollToTop";
import "./ContactPage.css";

function ContactPage() {
  return (
    <div>
      <ScrollToTop />
      <div className="contact-container">
        <Navbar />
        <div className="contact-hero-bg">
          <section className="contact-hero">
            <div className="contact-hero-text">
              <h1 className="header-font">We'd Love to Hear from You!</h1>
              <p>
                Have a question or just want to say hello? Fill out the form
                below and we'll get back to you shortly!
              </p>
            </div>
          </section>
        </div>
        <div className="form-footer-container">
          <section className="contact-page-form">
            <ContactForm />
          </section>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
