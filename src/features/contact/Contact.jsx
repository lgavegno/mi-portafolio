// src/features/contact/Contact.jsx
import React, { useState } from 'react'
import { FaPaperPlane } from 'react-icons/fa'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  return (
    <section id="contacto" className="w-full relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-[#d3fd01]">
          Contáctame
        </h2>
        
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 sm:p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#d3fd01] focus:border-transparent text-white placeholder-gray-400"
                placeholder="Tu nombre"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#d3fd01] focus:border-transparent text-white placeholder-gray-400"
                placeholder="tu@email.com"
                required
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#d3fd01] focus:border-transparent text-white placeholder-gray-400"
                placeholder="Tu mensaje..."
                required
              ></textarea>
            </div>
            
            <div className="text-center">
              <button
                type="submit"
                className="inline-flex items-center justify-center px-8 py-3 bg-[#d3fd01] text-gray-900 font-bold rounded-lg hover:bg-[#b8e000] transition-colors"
              >
                <FaPaperPlane className="mr-2" />
                Enviar Mensaje
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact