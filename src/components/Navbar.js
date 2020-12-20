import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-sm bg-secondary navbar-dark fixed-bottom">
      {/*<h2>Navbar</h2>*/}
      <ul className="navbar-nav d-flex justify-content-around w-100">
        <li className="nav-item"> 
          <NavLink to="/discover">Discover</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/ticket">Ticket</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/manage">Manage</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
