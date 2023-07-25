import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { getHostVans } from '../../apis';
import { requireAuth } from '../../utils';

export async function loader() {
    await requireAuth();
    return getHostVans();
}

function HostVans() {
//   const [hostVans, setHostVans]  = useState([]);
//   useEffect( () => {
//     fetch('/api/host/vans')
//     .then( res => res.json())
//     .then(data => setHostVans(data.vans))
//   }, [])
const hostVans = useLoaderData();
  const hostVansEls = hostVans.map(van => (
    <Link
        to={van.id}
        key={van.id}
        className="host-van-link-wrapper"
    >
        <div className="host-van-single" key={van.id}>
            <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
            <div className="host-van-info">
                <h3>{van.name}</h3>
                <p>${van.price}/day</p>
            </div>
        </div>
    </Link>
))

return (
    <section>
        <h1 className="host-vans-title">Your listed vans</h1>
        <div className="host-vans-list">
            {/* {
                hostVans.length > 0 ? (
                    <section>
                        {hostVansEls}
                    </section>

                ) : (
                        <h2>Loading...</h2>
                    )
            } */}
            {hostVansEls}
        </div>
    </section>
)
}

export default HostVans