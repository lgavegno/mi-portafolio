// src/App.jsx
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './features/home/Home'
import Services from './features/services/Services'
import Works from './features/works/Works'
import Contact from './features/contact/Contact'

function App() {
  return (
    <Router>
      <MainLayout>
        <Home />
        <Services />
        <Works />
        <Contact />
      </MainLayout>
    </Router>
  )
}

export default App