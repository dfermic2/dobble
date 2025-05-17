import { NavLink } from "react-router";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbar-container">
      <nav className="header-font">
        <div className="logo">
          <NavLink to="/">Home</NavLink>
        </div>
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
      </nav>
    </div>
  );
}

export default Navbar;
