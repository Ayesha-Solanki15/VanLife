import React, { useEffect, useState } from "react";
import { Link, useLoaderData, useSearchParams } from "react-router-dom";
import { getVans } from "../../apis";

export function loader() {
  //name doesn't need to be 'loader'
  return getVans();
}

function Vans() {
  // const [vans, setVans] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  // const [loading, setLoading] = useState(false);
  //now I no longer need the loading state because the data is already fetched before the component is loaded.
  const [error, setError] = useState(null)
  // React router has a way of handling the error.
  const vans = useLoaderData();
  // console.log(data)
  //this is different from using useEffect because since we are not fetching the data inside the component react-router can delay the loading of the component till the loader has finished executing.

  const typeFilter = searchParams.get("type"); //if there's no query parameter then it will return null.
  // console.log(typeFilter);

  //we have been assuming that the fetch would work correctly and there will be no errors, but what if fetch doesn't return what we are expecting and nothing is displayed on the page then we must handle it. That's where data layer api comes into the picture.

  // useEffect(() => {
    //replaced by loader function
  //   // fetch("/api/vans")
  //   //   .then((response) => response.json())
  //   //   .then((data) => setVans(data.vans));
  //   async function loadVans() {
  //     setLoading(true)
  //     try {
  //       const data = await getVans();
  //       setVans(data)
  //     }
  //     catch (err) {
  //       setError(err)
  //     }
  //     finally{
  //       setLoading(false)
  //     }
  //   }
  //   loadVans();
  // }, []);

  const filteredVans = typeFilter
    ? vans.filter((van) => van.type === typeFilter)
    : vans;
  const vanElements = filteredVans.map((van) => (
    <div key={van.id} className="van-tile">
      <Link to={van.id} state={{ search : searchParams.toString(), type: typeFilter }}>
        {/* we are passing this link state="whatever", could be an object as well because if we click on back to -> gets us back to the URL that has search params in it , the above way is beneficial if we have multiple search params*/}
        <img src={van.imageUrl} />
        <div className="van-info">
          <h2>{van.name}</h2>
          <p>
            ${van.price}
            <span>/day</span>
          </p>
        </div>
        <i className={`van-type ${van.type} selected`}>{van.type}</i>
      </Link>
    </div>
  ));

  function handleFilterChange(key, value) {
    setSearchParams((prevParams) => {
      if (value === null) {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }
      return prevParams;
    });
  }

  // if(loading) {
  //   return <h1> Loading...</h1>
  // }

  if(error) {
    return <h1>There was an error: {error.message}</h1>
  }
  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      <div className="van-list-filter-buttons">
        {/* <Link className="van-type simple" to='?type=simple'>Simple</Link> */}
        {/* if we are gonna hardcode the search params then we don't need the setter function for that. */}
        {/* <Link className="van-type luxury" to='?type=luxury'>Luxury</Link>
        <Link className="van-type rugged" to='?type=rugged'>Rugged</Link>
        <Link className="van-type clear-filters" to='.'>Clear filter</Link> */}

        {/* <button
          onClick={() => setSearchParams({ type: "luxury" })}
          className={`van-type luxury ${
            typeFilter === "luxury" ? "selected" : ""
          }`}
        >
          Luxury
        </button>
        <button
          onClick={() => setSearchParams({ type: "simple" })}
          className={`van-type simple ${
            typeFilter === "simple" ? "selected" : ""
          }`}
        >
          Simple
        </button>
        <button
          onClick={() => setSearchParams({ type: "rugged" })}
          className={`van-type rugged ${
            typeFilter === "rugged" ? "selected" : ""
          }`}
        >
          Rugged
        </button> */}
        {/* </button>
        {typeFilter && (
          <button
            onClick={() => setSearchParams({})}
            className="van-type clear-filters"
          >
            Clear filter
          </button>
        */}

        <button
          onClick={() => handleFilterChange("type", "luxury")}
          className={`van-type luxury ${
            typeFilter === "luxury" ? "selected" : ""
          }`}
        >
          Luxury
        </button>
        <button
          onClick={() => handleFilterChange("type", "simple")}
          className={`van-type simple ${
            typeFilter === "simple" ? "selected" : ""
          }`}
        >
          Simple
        </button>
        <button
          onClick={() => handleFilterChange("type", "rugged")}
          className={`van-type rugged ${
            typeFilter === "rugged" ? "selected" : ""
          }`}
        >
          Rugged
        </button>
        {typeFilter && (
          <button
            onClick={() => handleFilterChange("type", null)}
            className="van-type clear-filters"
          >
            Clear filter
          </button>
        )}
      </div>
      <div className="van-list">{vanElements}</div>
    </div>
  );
}

export default Vans;

// Another way of adding search params is by te setter function as
// <button onClick={() => setSearchParams("type: rugged")}></button> or {type: "rugged"}
// <button onClick={() => setSearchParams("type: simple")}></button>
// <button onClick={() => setSearchParams("")}></button>  or {}
// We can pass a string, object to the setter function of search params, and there are many more ways to add search params.
