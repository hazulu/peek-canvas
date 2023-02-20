import React from 'react'
import {
  Routes,
  Route,
  HashRouter,
} from "react-router-dom";

import ApplicationPage from './pages/application';

import './App.css'

function App() {

  return (
    <HashRouter>
      <Routes>
        <Route path = "/" element={ <ApplicationPage /> } />
      </Routes>
    </HashRouter>
  )
}

export default App
