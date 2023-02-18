import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import ApplicationPage from './pages/application';

import './App.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <ApplicationPage />,
  },
]);


function App() {

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  )
}

export default App
