import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-xl bg-secondary navbar-dark fixed-bottom">
      {/*<h2>Navbar</h2>*/}
      <ul className="navbar-nav d-flex justify-content-around w-100">
        <li className="nav-item "> 
          <NavLink className="text-decoration-none text-light" to="/discover">Discover</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="text-decoration-none text-light" to="/ticket">Ticket</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="text-decoration-none text-light" to="/manage">Manage</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
