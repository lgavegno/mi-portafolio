import React from 'react'
import MainLayout from './layouts/MainLayout'
import Home from './features/home/Home'
import Works from './features/works/Works'
import Services from './features/services/Services'
import Contact from './features/contact/Contact'

function App() {
  return (
    <MainLayout>
      <section id="home">
        <Home />
      </section>
      <section id="works">
        <Works />
      </section>
      <section id="services">
        <Services />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </MainLayout>
  )
}

export default App
