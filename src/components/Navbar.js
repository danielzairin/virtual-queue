import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-xl bg-secondary navbar-dark fixed-bottom">
      <ul className="navbar-nav d-flex justify-content-around w-100 flex-row">
        <li className="nav-item">
          <NavLink className="nav-link" to="/discover">
            🔎 Discover
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/ticket">
            🎫 Ticket
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/manage">
            👔 Manage
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
