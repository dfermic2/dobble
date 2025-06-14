import { NavLink } from "react-router";
import { useState } from "react";
import { FaBars, FaXmark } from "react-icons/fa6";
import "./Navbar.css";

function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const openNavigation = () => {
    document.getElementById("nav-links").style.display = "flex";
    setIsNavOpen(true);
  };

  const closeNavigation = () => {
    document.getElementById("nav-links").style.display = "none";
    setIsNavOpen(false);
  };

  return (
    <div className="navbar-container">
      <nav className="header-font">
        <div className="logo">
          <NavLink to="/" className="nav-link">
            <img src="../../../images/logoBlack.png" alt="Temp Logo" />
          </NavLink>
        </div>
        {!isNavOpen && (
          <FaBars className="hamburger" onClick={openNavigation} />
        )}
        <div id="nav-links" className="nav-links-container">
          {isNavOpen && <FaXmark className="close" onClick={closeNavigation} />}
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
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
