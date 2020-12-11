import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <h2>Navbar</h2>
      <ul>
        <li>
          <NavLink to="/discover">Discover</NavLink>
        </li>
        <li>
          <NavLink to="/ticket">Ticket</NavLink>
        </li>
        <li>
          <NavLink to="/manage">Manage</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
