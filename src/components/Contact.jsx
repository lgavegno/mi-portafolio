import React, { useState } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar el formulario
    console.log('Form data:', formData)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">Contacto</h2>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Envíame un mensaje</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-2">Nombre</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 mb-2">Mensaje</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Enviar Mensaje
                </button>
              </form>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Información de Contacto</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">📧</span>
                  <p className="text-gray-700 dark:text-gray-300">ongevag@gmail.com</p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">📍</span>
                  <p className="text-gray-700 dark:text-gray-300">Rafaela, Santa Fe, Argentina</p>
                </div>
              </div>
              <div className="mt-8">
                <h4 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Sígueme en redes sociales</h4>
                <div className="flex space-x-4">
                 {/* <a href="" className="text-2xl hover:text-blue-500 transition-colors">📱</a>
                  <a href="#" className="text-2xl hover:text-blue-500 transition-colors">💼</a>
                  <a href="#" className="text-2xl hover:text-blue-500 transition-colors">🐦</a> */}
                  <a href="https://github.com/lgavegno" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-blue-500 transition-colors" title="GitHub">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span className="sr-only">GitHub</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact 