import { NavLink } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./HomePage.css";

function HomePage() {
  return (
    <div>
      <div className="home-container">
        <div className="hero-container">
          <Navbar />
          <section className="hero-home-container section-general">
            <div className="hero-home-text">
              <h1 className="header-font">Welcome to Dobble!</h1>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Laborum obcaecati et, repudiandae repellat modi maxime!
                Laboriosam ipsa adipisci explicabo aliquid dicta fuga non
                maiores saepe, eveniet, accusamus nulla architecto blanditiis.
              </p>
              <NavLink to="/play">
                <button className="header-font play-button">play</button>
              </NavLink>
            </div>
            <div className="hero-img">
              <img src="../../../images/pizza.png" alt="illustration" />
            </div>
          </section>
        </div>
        <section className="instrucition-video-container">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/n3s_H3EfrPg?si=JYJ7Ps5iX69NU3Wz"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen="true"
          ></iframe>
        </section>
        <section className="rules-container section-general">
          <div className="rules-img">
            <img src="../../../images/profilna.png" alt="illustration" />
          </div>

          <div>
            <h1 className="header-font">Learn the rules</h1>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum
              obcaecati et, repudiandae repellat modi maxime! Laboriosam ipsa
              adipisci explicabo aliquid dicta fuga non maiores saepe, eveniet,
              accusamus nulla architecto blanditiis.
            </p>
            <NavLink to="/rules">
              <button className="header-font play-button btn">rules</button>
            </NavLink>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
