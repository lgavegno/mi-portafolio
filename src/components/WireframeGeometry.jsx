// src/components/WireframeGeometry.jsx
// 3D Wireframe geometric figure with rotation and mouse interaction

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const WireframeGeometry = () => {
    const containerRef = useRef(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });

    useEffect(() => {
        let animationFrame;
        let time = 0;

        const animate = () => {
            time += 0.005;

            // Continuous rotation on all axes
            setRotation(() => ({
                x: time * 20,
                y: time * 30,
                z: time * 15,
            }));

            animationFrame = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        };
    }, []);

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;

        setMousePos({ x: x * 20, y: y * 20 });
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="w-full h-full flex items-center justify-center perspective-1000"
            style={{ perspective: '1000px' }}
        >
            <motion.div
                className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96"
                style={{
                    transformStyle: 'preserve-3d',
                    transform: `rotateX(${rotation.x + mousePos.y}deg) rotateY(${rotation.y + mousePos.x}deg) rotateZ(${rotation.z}deg)`,
                }}
            >
                {/* Outer diamond/rhombus wireframe */}
                <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 200 200"
                    style={{
                        filter: 'drop-shadow(0 0 8px rgba(150, 182, 197, 0.5))',
                    }}
                >
                    {/* Diamond outer frame */}
                    <path
                        d="M 100 20 L 180 100 L 100 180 L 20 100 Z"
                        fill="none"
                        stroke="#96B6C5"
                        strokeWidth="1.5"
                        opacity="0.8"
                    />

                    {/* Inner connecting lines */}
                    <line x1="100" y1="20" x2="100" y2="100" stroke="#96B6C5" strokeWidth="1" opacity="0.6" />
                    <line x1="180" y1="100" x2="100" y2="100" stroke="#96B6C5" strokeWidth="1" opacity="0.6" />
                    <line x1="100" y1="180" x2="100" y2="100" stroke="#96B6C5" strokeWidth="1" opacity="0.6" />
                    <line x1="20" y1="100" x2="100" y2="100" stroke="#96B6C5" strokeWidth="1" opacity="0.6" />

                    {/* Corner nodes */}
                    <circle cx="100" cy="20" r="3" fill="#96B6C5" opacity="0.9">
                        <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="180" cy="100" r="3" fill="#96B6C5" opacity="0.9">
                        <animate attributeName="r" values="3;5;3" dur="2s" begin="0.5s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="100" cy="180" r="3" fill="#96B6C5" opacity="0.9">
                        <animate attributeName="r" values="3;5;3" dur="2s" begin="1s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="20" cy="100" r="3" fill="#96B6C5" opacity="0.9">
                        <animate attributeName="r" values="3;5;3" dur="2s" begin="1.5s" repeatCount="indefinite" />
                    </circle>

                    {/* Center node */}
                    <circle cx="100" cy="100" r="5" fill="#96B6C5" opacity="1">
                        <animate attributeName="r" values="5;8;5" dur="3s" repeatCount="indefinite" />
                    </circle>

                    {/* Inner circle */}
                    <circle
                        cx="100"
                        cy="100"
                        r="40"
                        fill="none"
                        stroke="#96B6C5"
                        strokeWidth="1"
                        opacity="0.4"
                    />

                    {/* Orbital rings */}
                    <ellipse
                        cx="100"
                        cy="100"
                        rx="60"
                        ry="30"
                        fill="none"
                        stroke="#96B6C5"
                        strokeWidth="0.8"
                        opacity="0.3"
                        transform="rotate(45 100 100)"
                    />
                    <ellipse
                        cx="100"
                        cy="100"
                        rx="60"
                        ry="30"
                        fill="none"
                        stroke="#96B6C5"
                        strokeWidth="0.8"
                        opacity="0.3"
                        transform="rotate(-45 100 100)"
                    />
                </svg>
            </motion.div>
        </div>
    );
};

export default WireframeGeometry;
