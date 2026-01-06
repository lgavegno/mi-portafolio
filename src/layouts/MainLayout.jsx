// src/layouts/MainLayout.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { Header, Footer } from '../components'

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 overflow-x-hidden">
      <Header />
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-[100vw] overflow-x-hidden pt-16 md:pt-20"
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  )
}

export default MainLayout