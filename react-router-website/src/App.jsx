import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import "./server";
import Vans, { loader as vansLoader } from "./pages/Vans/Vans";
import VanDetail, { loader as vanDetailLoader} from "./pages/VanDetail/VanDetail";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Host/Dashboard";
import Reviews from "./pages/Host/Reviews";
import Income from "./pages/Host/Income";
import HostLayout from "./components/HostLayout/HostLayout";
import HostVans, { loader as hostVansLoader} from "./pages/Host/HostVans";
import HostVanDetail, {loader as hostVanDetailLoader} from "./pages/Host/HostVanDetail";
import HostVanPhoto from "./pages/Host/HostVanPhoto";
import HostVanPricing from "./pages/Host/HostVanPricing";
import HostVanInfo from "./pages/Host/HostVanInfo";
import NotFound from "./pages/PageNotfound/NotFound";
import Error from "./components/Error/Error";
import Login from "./pages/Login/Login";

//can have multiple errorElements and the route where the errorElement has been placed catch up an error if occurred will not render it's element as well. So placing the errorElement correctly is crucial. Note: the routes lying above the route having an errorElement will not have access to that error element.
const router = createBrowserRouter(
  createRoutesFromElements(
    // <Route path="/" element={<Layout />} errorElement={<Error/>}>
    <Route path="/" element={<Layout />} errorElement={<Error />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="login" element={<Login />} />
      <Route
        path="vans"
        loader={vansLoader}
        element={<Vans />}
        errorElement={<Error />}
      />
      {/* <Route path="vans" loader={vansLoader} element={<Vans />} /> */}
      {/* for data layer api , errorElement will run if there's an error either inside the loader function or inside the element prop's component.*/}
      {/* ***IMP: instead of adding errorElement prop to the specific route, we can add the prop to the parent route so if any of the child/deeply nested child route throws an error it will be bubble-up to the route handling the error and will be handled by the component rendered via errorElement prop. *** */}
      <Route path="vans/:id" element={<VanDetail /> } loader= {vanDetailLoader} />
      <Route path="host" element={<HostLayout />}>
        {/* <Route index element={<Dashboard />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="income" element={<Income />} />
        <Route path="vans" element={<HostVans />} />
        <Route path="vans/:id" element={<HostVanDetail />}>
          <Route index element={<HostVanInfo />} />
          <Route path="photo" element={<HostVanPhoto />} />
          <Route path="pricing" element={<HostVanPricing />} />
        </Route> */}
        <Route
          index
          element={<Dashboard />}
          loader={async () => {
            return null;
          }}
        />
        <Route
          path="reviews"
          element={<Reviews />}
          loader={async () => {
            return null;
          }}
        />
        <Route
          path="income"
          element={<Income />}
          loader={async () => {
            return null;
          }}
        />
        <Route
          path="vans"
          element={<HostVans />}
          loader={hostVansLoader}
        />
        <Route
          path="vans/:id"
          element={<HostVanDetail />}
          loader={hostVanDetailLoader}
        >
          <Route
            index
            element={<HostVanInfo />}
            loader={async () => {
              return null;
            }}
          />
          <Route
            path="photo"
            element={<HostVanPhoto />}
            loader={async () => {
              return null;
            }}
          />
          <Route
            path="pricing"
            element={<HostVanPricing />}
            loader={async () => {
              return null;
            }}
          />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return (
    <>
      {/* <BrowserRouter> */}
      {/* <Routes>
          <Route element={<Layout />}> */}
      {/* if we leave it here something like this then only the layout component will be displayed, and if we want out inner route to be displayed based on url the we can make use of the <Outlet /> component in the Layout component, which in turn renders the route that is a child of the parent route and matches the url. The behavior is such because react-router sees the wrapping route to not having any path so renders the layout component for any url.*/}
      {/* <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/vans" element={<Vans />} />
            <Route path="/vans/:id" element={<VanDetail />} />
            <Route path="/host" element={<HostLayout />}>
               <Route path="/host" element={<Dashboard />} /> */}
      {/* this above line is not recommended to use */}
      {/* <Route path="/host/reviews" element={<Reviews />} />
              <Route path="/host/income" element={<Income />} />
            </Route>
          </Route> */}
      {/* this :id(means something) creates a variable and this single route will handle whatever van detail page we might have */}
      {/* if I want something to not have navbar that I can move that outside of the wrapping route */}
      {/* </Routes> */}

      {/* NOW THE CODE USING RELATIVE ROUTES */}
      {/* IF WE DON'T PROVIDE THE SLASHES THEN REACT-ROUTER ASSUMES THAT THE PATH IS RELATIVE TO THE PARENT */}
      {/* <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="vans" element={<Vans />} />
            <Route path="vans/:id" element={<VanDetail />} />
            <Route path="host" element={<HostLayout />}> */}
      {/* HERE THE BELOW CODE WON'T WORK BECAUSE NOW THE PATHS ARE RELATIVE TO THE PARENT AND TO GET TO THE DASHBOARD WE HAVE TO TYPE IN '/host/host' */}
      {/* <Route path="host" element={<Dashboard />} /> */}
      {/* <Route path="/" element={<Dashboard />} /> */}
      {/* this will also not work because if the path starts with '/' it becomes an absolute path and will be rendered only when the initial path is localhost..... */}
      {/* <Route index element={<Dashboard />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="income" element={<Income />} />
              <Route path="vans" element={<HostVans />} />
              <Route path="vans/:id" element={<HostVanDetail />}>
                <Route index element={<HostVanInfo />} />
                <Route path="photo" element={<HostVanPhoto />} />
                <Route path="pricing" element={<HostVanPricing />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} /> */}
      {/* this will be matched if no other child route matches called as catch-all route */}
      {/* </Route>
        </Routes>
      </BrowserRouter> */}

      <RouterProvider router={router} />
    </>
  );
}

export default App;
