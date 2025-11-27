import React from 'react';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';

const Works = () => {
  const projects = [
    {
      title: "Proyecto 1",
      description: "Descripción del proyecto 1",
      image: "https://via.placeholder.com/400x300",
      technologies: ["React", "Node.js", "MongoDB"],
      link: "#"
    },
    {
      title: "Proyecto 2",
      description: "Descripción del proyecto 2",
      image: "https://via.placeholder.com/400x300",
      technologies: ["Vue.js", "Express", "PostgreSQL"],
      link: "#"
    },
    {
      title: "Proyecto 3",
      description: "Descripción del proyecto 3",
      image: "https://via.placeholder.com/400x300",
      technologies: ["React", "Django", "MySQL"],
      link: "#"
    },
    {
      title: "Proyecto 4",
      description: "Descripción del proyecto 4",
      image: "https://via.placeholder.com/400x300",
      technologies: ["React", "Django", "MySQL"],
      link: "#"
    }
  ]

  return (
    <ParallaxProvider>
    <div className="min-h-screen py-20 relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-5xl font-bold text-center mb-12 text-[#d3fd01]">Mis Proyectos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {projects.map((project, index) => (
            <Parallax 
              key={index}
              scale={[0.9, 1.1]}
              rotate={[-1, 1]}
              translateY={[5, -5]}
              className="relative rounded-xl backdrop-blur-md bg-gradient-to-br from-gray-800/30 to-gray-900/50 
                border border-gray-700 hover:border-[#d3fd01]/30
                shadow-lg shadow-gray-900/10 overflow-hidden
                transform transition-all duration-300 ease-in-out
                hover:shadow-[#d3fd01]/20 hover:-translate-y-1
                flex flex-col h-full"
            >
              <Parallax
                scale={[0.9, 1.2]}
                translateY={[0, 5]}
                className="overflow-hidden rounded-lg w-full"
              >
                <img 
                  src={`https://picsum.photos/400/300?random=${index}`}
                  alt={project.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </Parallax>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 text-[#d3fd01]">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
                <button className="w-full bg-[#d3fd01] hover:bg-[#b8e000] text-gray-900 font-bold py-2 px-4 rounded transition-colors">
                  Ver Proyecto
                </button>
              </div>
            </Parallax>
          ))}
        </div>
      </div>
      
      {/* Efectos de iluminación */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-10 w-72 h-72 bg-[#d3fd01]/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 -right-10 w-72 h-72 bg-[#d3fd01]/5 rounded-full filter blur-3xl"></div>
      </div>
    </div>
    </ParallaxProvider>
  )
}

export default Works