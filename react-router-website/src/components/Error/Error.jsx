import React from 'react'
import { useRouteError } from 'react-router-dom'

//this component is being rendered as a part of errorElement prop in the Route
// ***IMP: instead of adding errorElement prop to the specific route, we can add the prop to the parent route so if any of the child route throws an error it will be handled by the component rendered via errorElement prop. ***
function Error() {
  //to get the info from the error thrown we can make use of useRouteError() hook
  const error = useRouteError();
  // console.log(error)
  return (
    <>
      <h1>Error: {error.message}</h1>
      <pre>{error.status} - {error.statusText}</pre>
    </>
  )
}

export default Error