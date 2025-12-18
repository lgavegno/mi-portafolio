// src/layouts/MainLayout.jsx
import React from 'react'
import { Header, Footer } from '../components'

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Header />
      <main className="pt-16 md:pt-20 w-full max-w-[100vw] overflow-x-hidden">
        {children}
      </main>
      <Footer />
    </div>
  )
}

// Fix this line - remove the 's' from MainLayouts
export default MainLayout