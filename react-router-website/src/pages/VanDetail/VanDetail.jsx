import React, { Suspense, useEffect, useState } from "react";
import {
  useParams,
  Link,
  useLocation,
  useLoaderData,
  defer,
  Await,
} from "react-router-dom";
import { getVans } from "../../apis";

export function loader({ params }) {
  // console.log(params)
  // return getVans(params.id);
  return defer({ vanDetail: getVans(params.id) });
}

//we worked around the problem that whenever the user clicks anywhere on the any page it takes the user to that particular van detail page. So to work around with that we have wrapped each item in a Link.
function VanDetail() {
  // const [van, setVan] = useState(null);
  // const params = useParams(); do not params anymore because we are doing that in the loader function
  // console.log(params)
  //this will display an object with an id as a key, why id? because we have added ':id' in the route so whatever we write after ':' will be used as a key of an object. If we need multiple parameters we can set it route path as '/:id/:type/:.... so the returned params object would have {id: ...., type: ......, .....: .....}

  const location = useLocation();
  // console.log(location); is an object with a lot of properties in it, one being state: {search: "type=luxury"}, this is relative to what we passed to the state prop in the Link.
  //We are making use of the useLocation hook so that we can have access to the query parameter passed via. Link and can back to the correct filter state whenever the back button is pressed.

  // const van = useLoaderData();
  const vanDetailPromise = useLoaderData();

  // useEffect(() => {
  //   fetch(`/api/vans/${params.id}`)
  //     .then((res) => res.json())
  //     .then((data) => setVan(data.vans))
  // }, [params.id])

  const search = location.state?.search || "";
  const type = location.state?.type || "all";
  //optional chaining
  // return (
  //   <div className="van-detail-container">
  //     {/* <Link to='..' relative="path" className="back-button">
  //     &larr; <span>Back to all the vans</span>
  //     </Link> */}
  //     <Link to={`..?${search} `} relative="path" className="back-button">
  //     &larr; <span>Back to {type} vans</span>
  //     </Link>

  //     {/* {van ? (
  //     <div className="van-detail">
  //       <img src={van.imageUrl} />
  //       <i className={`van-type ${van.type} selected`}>{van.type}</i>
  //       <h2>{van.name}</h2>
  //       <p className="van-price">
  //         ${van.price}
  //         <span>/day</span>
  //       </p>
  //       <p>{van.description}</p>
  //       <button className="link-button">Rent this van</button>
  //     </div>
  //     ) : <h2>Loading...</h2>} */}

  //     <div className="van-detail">
  //       <img src={van.imageUrl} />
  //       <i className={`van-type ${van.type} selected`}>{van.type}</i>
  //       <h2>{van.name}</h2>
  //       <p className="van-price">
  //         ${van.price}
  //         <span>/day</span>
  //       </p>
  //       <p>{van.description}</p>
  //       <button className="link-button">Rent this van</button>
  //     </div>

  //   </div>
  // );
  function getVanDetailPage(van) {
    return (
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
    )
  }

  return (
    <div className="van-detail-container">
      <Link to={`..?${search} `} relative="path" className="back-button">
        &larr; <span>Back to {type} vans</span>
      </Link>
      <Suspense fallback={<h2>Loading...</h2>}>
        <Await resolve={vanDetailPromise.vanDetail}>
          {getVanDetailPage}
        </Await>
      </Suspense>
    </div>
  );
}

export default VanDetail;
