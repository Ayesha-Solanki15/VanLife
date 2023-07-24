import React from "react";
import { Link, NavLink } from "react-router-dom";
import loginIcon  from '../../assets/images/avatar-icon.png'

function Header() {
  const activeStyle = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161626",
  };
  return (
    <header>
      <Link to="/">#VANLIFE</Link>
      <nav>
        <NavLink
          to="/about"
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          About
        </NavLink>
        <NavLink
          to="/vans"
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          Vans
        </NavLink>
        <NavLink
          to="/host"
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          Host
        </NavLink>
        <Link to="login" className="login-link">
          <img src={loginIcon} className="login-icon" />
        </Link>
      </nav>
    </header>
  );
}

export default Header;
