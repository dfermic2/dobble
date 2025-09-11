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
                Discover the fast-paced world of this exciting card game.
                Wheather you want to play online with your friends and family,
                print your own deck or simply learn the rules we've got you
                covered.
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
                New to Dobble? Or just need a quick refresher? Check out the
                rules page. You will find everything you need to know there -
                both how to play with physical cards and online. It only takes a
                few minutes to understand and you will be ready to start having
                fun.
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
              If you prefer playing games the old-school way, we have good news!
              Head over to the print page where you will find your very own
              downloadable deck. Grab the pdf, print it out, and cut out the
              cards to get your hands on a physical version of the game.
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
