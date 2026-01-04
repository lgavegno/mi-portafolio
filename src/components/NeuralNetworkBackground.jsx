// src/components/NeuralNetworkBackground.jsx
// Animación de red neuronal con canvas - Fondo para Hero Banner

import React, { useRef, useEffect } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

const NeuralNetworkBackground = ({ 
  particleCount = 60,
  connectionDistance = 150,
  speed = 0.5
}) => {
  const canvasRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    const particles = [];

    // Clase Particle
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * speed;
        this.vy = (Math.random() - 0.5) * speed;
        this.radius = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(43, 255, 136, 1)'; // Mint bright
        
        // Glow effect más intenso
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#2BFF88';
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    // Configurar tamaño del canvas basado en el contenedor padre
    const setCanvasSize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      }
    };

    // Inicializar partículas
    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    // Conectar partículas con líneas
    const connectParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = 1 - distance / connectionDistance;
            ctx.strokeStyle = `rgba(0, 71, 171, ${opacity * 0.8})`; // Cobalt lines más visibles
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    // Loop de animación
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      connectParticles();
      animationId = requestAnimationFrame(animate);
    };

    // Event handlers
    const handleResize = () => {
      setCanvasSize();
      initParticles();
    };

    // Inicializar
    setCanvasSize();
    initParticles();

    // Event listeners
    window.addEventListener('resize', handleResize);

    // Iniciar animación
    if (!prefersReducedMotion) {
      animate();
    } else {
      // Dibujar un frame estático
      particles.forEach(particle => particle.draw());
      connectParticles();
    }

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [particleCount, connectionDistance, speed, prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ 
        opacity: 0.7
      }}
      aria-hidden="true"
    />
  );
};

export default NeuralNetworkBackground;
