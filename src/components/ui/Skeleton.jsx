// src/components/ui/Skeleton.jsx
// Componentes Skeleton para loading states

import React from 'react';
import { skeletonPulse } from '../../config/motionConfig';

// Skeleton base con animación de pulso
export const Skeleton = ({ className = '', ...props }) => (
  <motion.div
    variants={skeletonPulse}
    initial="initial"
    animate="animate"
    className={`bg-gray-700/50 rounded ${className}`}
    {...props}
  />
);

// Skeleton para texto (línea)
export const SkeletonText = ({ lines = 1, className = '' }) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton
        key={i}
        className="h-4 rounded"
        style={{ width: i === lines - 1 && lines > 1 ? '70%' : '100%' }}
      />
    ))}
  </div>
);

// Skeleton para títulos
export const SkeletonTitle = ({ className = '' }) => (
  <Skeleton className={`h-8 w-3/4 rounded ${className}`} />
);

// Skeleton para avatares/imágenes circulares
export const SkeletonAvatar = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };
  
  return <Skeleton className={`${sizes[size]} rounded-full ${className}`} />;
};

// Skeleton para cards de proyecto
export const SkeletonProjectCard = ({ className = '' }) => (
  <div 
    className={`
      rounded-2xl p-6 
      backdrop-blur-xl bg-white/5 
      border border-white/10
      ${className}
    `}
  >
    {/* Imagen placeholder */}
    <Skeleton className="w-full h-40 rounded-xl mb-4" />
    
    {/* Badge de estado */}
    <Skeleton className="w-24 h-5 rounded-full mb-3" />
    
    {/* Título */}
    <Skeleton className="w-full h-6 rounded mb-2" />
    
    {/* Descripción */}
    <SkeletonText lines={2} className="mb-4" />
    
    {/* Stack tecnológico */}
    <div className="flex gap-2 mb-4">
      <Skeleton className="w-16 h-6 rounded-full" />
      <Skeleton className="w-20 h-6 rounded-full" />
      <Skeleton className="w-14 h-6 rounded-full" />
    </div>
    
    {/* Progress bar */}
    <Skeleton className="w-full h-2 rounded-full" />
  </div>
);

// Skeleton para Hero section
export const SkeletonHero = ({ className = '' }) => (
  <div className={`min-h-screen flex items-center justify-center p-8 ${className}`}>
    <div className="max-w-4xl w-full text-center">
      {/* Badge */}
      <Skeleton className="w-48 h-8 rounded-full mx-auto mb-6" />
      
      {/* Título principal */}
      <Skeleton className="w-full h-16 rounded-lg mb-4" />
      <Skeleton className="w-3/4 h-16 rounded-lg mx-auto mb-8" />
      
      {/* Subtítulo */}
      <Skeleton className="w-2/3 h-6 rounded mx-auto mb-12" />
      
      {/* Botones CTA */}
      <div className="flex gap-4 justify-center mb-12">
        <Skeleton className="w-40 h-14 rounded-xl" />
        <Skeleton className="w-36 h-14 rounded-xl" />
      </div>
      
      {/* Cards grid */}
      <div className="grid md:grid-cols-3 gap-6 mt-16">
        <SkeletonProjectCard />
        <SkeletonProjectCard />
        <SkeletonProjectCard />
      </div>
    </div>
  </div>
);

// Skeleton para página completa
export const SkeletonPage = () => (
  <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
    <SkeletonHero />
  </div>
);

export default Skeleton;
