import React from 'react'
import { Header, Footer } from '../components'

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="pt-20">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout 