import React, { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";

//we worked around the problem that whenever the user clicks anywhere on the any page it takes the user to that particular van detail page. So to work around with that we have wrapped each item in a Link.
function VanDetail() {
  const [van, setVan] = useState(null);
  const params = useParams();
  // console.log(params)
  //this will display an object with an id as a key, why id? because we have added ':id' in the route so whatever we write after ':' will be used as a key of an object. If we need multiple parameters we can set it route path as '/:id/:type/:.... so the returned params object would have {id: ...., type: ......, .....: .....}

  useEffect(() => {
    fetch(`/api/vans/${params.id}`)
      .then((res) => res.json())
      .then((data) => setVan(data.vans))
  }, [params.id])
  return (
    <div className="van-detail-container">
      {van ? (
      <div className="van-detail">
        <img src={van.imageUrl} />
        <i className={`van-type ${van.type} selected`}>{van.type}</i>
        <h2>{van.name}</h2>
        <p className="van-price">
          ${van.price}
          <span>/day</span>
        </p>
        <p>{van.description}</p>
        <button className="link-button">Rent this van</button>
      </div>
      ) : <h2>Loading...</h2>}
      
    </div>
  );
}

export default VanDetail;
