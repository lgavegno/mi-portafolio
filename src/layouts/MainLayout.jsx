// src/layouts/MainLayout.jsx
import React from 'react'
import { Header, Footer } from '../components'

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Header />
      <main className="pt-16 md:pt-20 w-full max-w-[100vw] overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}

// Fix this line - remove the 's' from MainLayouts
export default MainLayout