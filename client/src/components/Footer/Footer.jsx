import { NavLink } from "react-router";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer-container">
      <footer>
        <div className="top">
          <div className="left">
            <NavLink to="/">
              <img
                src="../../../images/logoWhite.png"
                alt="Temp Logo"
                className="logo-img"
              />
            </NavLink>
            <p>Developed and illustrated by Dijana Fermić</p>
            <p>
              Github account:{" "}
              <a href="https://github.com/dfermic2">github.com/dfermic2</a>
            </p>
            <p>Email: dijanafer@gmail.com</p>
          </div>
          <div className="middle header-font">
            <ul>
              <li>
                <NavLink to="/rules">Rules</NavLink>
              </li>
              <li>
                <NavLink to="/print">Print</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>
              <li>
                <NavLink to="/play">Play</NavLink>
              </li>
            </ul>
          </div>
          <div className="right">
            <img
              src="../../../images/DobbleBox.png"
              alt="Dobble Box"
              className="dobble-box-img"
            />
          </div>
        </div>
        <div className="bottom">
          <p>Built using the MERN stack | For educational purposes only</p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
