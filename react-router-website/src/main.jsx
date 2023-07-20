import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import {BrowserRouter, Route, Routes} from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>}/>      */}
      {/* defines which component to render if the path in the url matches the path defined in route */}
    {/* </Routes>
    </BrowserRouter> */}
    <App/>
  </React.StrictMode>
)
