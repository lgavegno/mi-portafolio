// src/components/DataVisualization.jsx
// Abstract data network visualization for ONGEVAG brand

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const DataVisualization = () => {
    const canvasRef = useRef(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    // Network nodes configuration
    const nodes = [
        { x: 20, y: 30, size: 4 },
        { x: 40, y: 20, size: 6 },
        { x: 60, y: 40, size: 5 },
        { x: 80, y: 25, size: 4 },
        { x: 30, y: 60, size: 5 },
        { x: 50, y: 70, size: 6 },
        { x: 70, y: 60, size: 4 },
        { x: 45, y: 45, size: 8 },
    ];

    // Connections between nodes
    const connections = [
        [0, 1], [1, 2], [2, 3], [0, 4],
        [4, 5], [5, 6], [2, 6], [1, 7],
        [4, 7], [7, 6],
    ];

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();

        // Set canvas size
        canvas.width = rect.width * window.devicePixelRatio;
        canvas.height = rect.height * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

        const draw = () => {
            ctx.clearRect(0, 0, rect.width, rect.height);

            // Draw connections
            ctx.strokeStyle = 'rgba(0, 255, 255, 0.2)';
            ctx.lineWidth = 1;
            connections.forEach(([start, end]) => {
                const startNode = nodes[start];
                const endNode = nodes[end];
                ctx.beginPath();
                ctx.moveTo(
                    (startNode.x / 100) * rect.width,
                    (startNode.y / 100) * rect.height
                );
                ctx.lineTo(
                    (endNode.x / 100) * rect.width,
                    (endNode.y / 100) * rect.height
                );
                ctx.stroke();
            });

            // Draw nodes
            nodes.forEach((node) => {
                const x = (node.x / 100) * rect.width;
                const y = (node.y / 100) * rect.height;

                // Calculate distance from mouse
                const dx = mousePos.x - x;
                const dy = mousePos.y - y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxDistance = 150;
                const proximity = Math.max(0, 1 - distance / maxDistance);

                // Node glow
                const gradient = ctx.createRadialGradient(x, y, 0, x, y, node.size * 3);
                gradient.addColorStop(0, `rgba(0, 255, 255, ${0.6 + proximity * 0.4})`);
                gradient.addColorStop(1, 'rgba(0, 255, 255, 0)');

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(x, y, node.size * 3, 0, Math.PI * 2);
                ctx.fill();

                // Node core
                ctx.fillStyle = '#00FFFF';
                ctx.beginPath();
                ctx.arc(x, y, node.size * (1 + proximity * 0.5), 0, Math.PI * 2);
                ctx.fill();
            });
        };

        draw();
    }, [connections, nodes, mousePos]);

    const handleMouseMove = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full h-full flex items-center justify-center"
            onMouseMove={handleMouseMove}
        >
            <canvas
                ref={canvasRef}
                className="w-full h-full"
                style={{ maxHeight: '500px' }}
            />
        </motion.div>
    );
};

export default DataVisualization;
