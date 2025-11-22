import React from 'react'
import Blog from './components/Blog';
import MainLayout from './layouts/MainLayout'
import Home from './components/Home'
import Works from './components/Works'
import Services from './components/Services'
import Contact from './components/Contact'

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
      <section id="blog">
        <Blog />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </MainLayout>
  )
}

export default App
