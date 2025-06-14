import { NavLink } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ScrollToTop from "../../utils/SrollToTop";
import "./HomePage.css";

function HomePage() {
  return (
    <div>
      <ScrollToTop />
      <div className="home-container">
        <div className="hero-container">
          <Navbar />
          <section className="hero-home-container">
            <div className="banana-img">
              <img
                src="../../../images/home/banana-pointer.png"
                alt="illustration"
              />
            </div>
            <div className="hero-home-text">
              <h1 className="header-font">Welcome to </h1>
              <h1 className="header-font dobble-header">Dobble!</h1>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Laborum obcaecati et, repudiandae repellat modi maxime!
                Laboriosam ipsa adipisci explicabo aliquid dicta fuga non
                maiores saepe, eveniet.
              </p>
              <NavLink to="/play">
                <button className="header-font play-button">play</button>
              </NavLink>
            </div>
            <div className="pizza-img">
              <img
                src="../../../images/home/pizza-hand.png"
                alt="illustration"
              />
            </div>
          </section>
        </div>

        <section className="rules-container">
          <div className="section-general rules-content">
            <div className="rules-img">
              <img
                src="../../../images/home/home-book.png"
                alt="illustration"
              />
            </div>

            <div className="rules-text">
              <h2 className="header-font">Wondering how to play?</h2>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Laborum obcaecati et, repudiandae repellat modi maxime!
                Laboriosam ipsa adipisci explicabo aliquid dicta fuga non
                maiores saepe, eveniet, accusamus nulla architecto blanditiis.
              </p>
              <NavLink to="/rules">
                <button className="header-font play-button btn">rules</button>
              </NavLink>
            </div>
          </div>
        </section>

        <section className="instrucition-video-container">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/n3s_H3EfrPg?si=JYJ7Ps5iX69NU3Wz"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen={true}
          ></iframe>
        </section>

        <section className="home-print section-general">
          <div className="home-print-img">
            <img src="../../../images/cutCard.png" alt="temp" />
          </div>
          <div className="home-print-text">
            <h2 className="header-font">Get a printable deck</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum ab
              itaque quo. Aspernatur, iusto! Reiciendis, illo ratione! Assumenda
              minus eligendi nostrum, magni porro doloremque unde cumque
              temporibus quia suscipit maiores.
            </p>
            <NavLink to="/print">
              <button className="header-font play-button btn">print</button>
            </NavLink>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
