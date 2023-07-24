import React, { useEffect, useState } from "react";
import { Outlet, Link, useParams, NavLink, useLoaderData } from "react-router-dom";
import { getHostVans } from "../../apis";

export function loader({params}) {
  return getHostVans(params.id)
}

function HostVanDetail() {
  // const [vanDetail, setVanDetail] = useState(null);
  // const { id } = useParams();

  // useEffect(() => {
  //   fetch(`/api/host/vans/${id}`)
  //     .then((res) => res.json())
  //     .then((data) => setVanDetail(data.vans));
  // }, [])
  const vanDetail = useLoaderData();
  
  // if (!vanDetail) {
  //   return <h1>Loading...</h1>;
  // }

  const activeStyle = {
    fontWeight: 'bold',
    textDecoration: 'underline',
    color: '#161626'
  }

  return (
    <section>
      {/* What to place in the 'to' prop to get back to the previous route?
       Hint: the concept of 'cd .' and 'cd ..' in terminal and how '.' represents the current route */}
      {/* '..' takes us back to the parent route so here it will take us to /host and not /host/vans and this will not work because the links are relative to the routes and not the path, and we can specify a prop called 'relative' for it being relative to path and not the routes */}
      <Link to='..' relative="path" className="back-button">
      &larr; <span>Back to all the vans</span>
      </Link>
      <div className="host-van-detail-layout-container">
        <div className="host-van-detail">
          <img src={vanDetail.imageUrl} />
          <div className="host-van-detail-info-text">
            <i className={`van-type van-type-${vanDetail.type}`}>
              {vanDetail.type}
            </i>
            <h3>{vanDetail.name}</h3>
            <h4>${vanDetail.price}/day</h4>
          </div>
        </div>
        <nav className="host-van-detail-nav" >
          <NavLink to='.' style={({isActive}) => isActive ? activeStyle : null } end> Details </NavLink>
          {/* dot represents the current path */}
          <NavLink to='pricing' style={({isActive}) => isActive ? activeStyle : null } > Pricing </NavLink>
          <NavLink to='photo' style={({isActive}) => isActive ? activeStyle : null } > Photo </NavLink>
          {/* adding className will not work because in .css files we have rules that would overwrite the existing rules for the 'active-link' so switched to inline style as it has higher priority than external css */}
        </nav>
        {/* the data needs to be shown in the outlet context provider and since we are fetching the data in this page so we are going to provide the context and the consumer will use the useOutletContext() hook */}
        <Outlet context={vanDetail}/>
      </div>
    </section>
  );
}

export default HostVanDetail;
