import React from "react";
import { NavLink, Outlet } from "react-router-dom";

function HostLayout() {
  const activeStyle = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616"
  }
  return (
    <>
      <nav className="host-nav">
        {/* <Link to="/host">Dashboard</Link>
        <Link to="/host/income">Income</Link>
        <Link to="/host/reviews">Reviews</Link> */}
        {/* <NavLink to="/host" className={ ({isActive}) => isActive ? "my-link" : null}>Dashboard</NavLink> */}
        {/* Initially we used something like this i.e. applied className to all the Navlink, and now replacing it with inline style that NavLink allows us to use as a prop */}
        {/* <NavLink to="/host" style={ ({isActive}) => isActive ? activeStyle : null} end >Dashboard</NavLink>
        <NavLink to="/host/income" style={ ({isActive}) => isActive ? activeStyle : null}>Income</NavLink>
        <NavLink to="/host/vans" style={ ({isActive}) =>isActive ? activeStyle : null}>Vans</NavLink>
        <NavLink to="/host/reviews" style={ ({isActive}) =>isActive ? activeStyle : null}>Reviews</NavLink> */}
        <NavLink to="." style={ ({isActive}) => isActive ? activeStyle : null} end >Dashboard</NavLink>
        {/* '.' represents the current path we are in or where the host layout is being rendered, as in directory terms it represents the current directory */}
        <NavLink to="income" style={ ({isActive}) => isActive ? activeStyle : null}>Income</NavLink>
        <NavLink to="vans" style={ ({isActive}) =>isActive ? activeStyle : null}>Vans</NavLink>
        <NavLink to="reviews" style={ ({isActive}) =>isActive ? activeStyle : null}>Reviews</NavLink>
      </nav>
      <Outlet />
    </>
  );
}

export default HostLayout;

// A small bug that we encountered here is we we are on /host/anything, the router is matching 3 routes i.e. '/', 'host', 'something', if we are on the reviews page then also we the dashboard and reviews both will have CSS applied so we fixed it by 'end' which tells react router to end the matching for dashboard(here) if other routes also matches


//We can make the links as relative because it's getting displayed as a part of route having path of '/host'. So the path is already known and thus we are not required to give the relative paths