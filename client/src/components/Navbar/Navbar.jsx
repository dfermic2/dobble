import { NavLink } from "react-router";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbar-container">
      <nav className="header-font">
        <div className="logo">
          <NavLink to="/" className="nav-link">
            <img src="../../../images/logoBlack.png" alt="Temp Logo" />
          </NavLink>
        </div>
        <ul>
          <li>
            <NavLink to="/rules" className="nav-link">
              Rules
            </NavLink>
          </li>
          <li>
            <NavLink to="/print" className="nav-link">
              Print
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className="nav-link">
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink to="/play">
              <button className="header-font play-button">Play</button>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
