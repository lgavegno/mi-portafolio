// src/layouts/MainLayout.jsx
import { motion } from 'framer-motion';
import React, { useEffect } from 'react'
import { useLocation, Outlet } from 'react-router-dom'
import { Header, Footer } from '../components'
import PageTransition from '../components/ui/PageTransition'
import BackToTop from '../components/ui/BackToTop'
import WhatsAppFloat from '../components/WhatsAppFloat'


const MainLayout = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  useEffect(() => {
    // Reset menu on route change
    setIsMenuOpen(false);

    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100); // Pequeño delay para asegurar renderizado
      }
    } else if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else if (location.pathname === '/') {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-[#F1F0E8] text-[#2C3340] overflow-x-hidden relative">
      <Header isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />

      {/* Content wrapper with blur effect */}
      <motion.main
        className="w-full max-w-[100vw] overflow-x-hidden pt-16 md:pt-20"
        animate={{
          filter: isMenuOpen ? 'blur(8px)' : 'blur(0px)',
          opacity: isMenuOpen ? 0.4 : 1,
          scale: isMenuOpen ? 0.98 : 1, // Subtle scale effect for depth
        }}
        transition={{ duration: 0.3 }}
      >
        <Outlet />
      </motion.main>

      {/* Footer also gets blurred */}
      <motion.div
        animate={{
          filter: isMenuOpen ? 'blur(8px)' : 'blur(0px)',
          opacity: isMenuOpen ? 0.4 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        <Footer />
      </motion.div>

      <BackToTop />
      <WhatsAppFloat />
    </div>
  )
}

export default MainLayout