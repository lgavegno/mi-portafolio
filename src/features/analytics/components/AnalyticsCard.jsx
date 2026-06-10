
import React from 'react';
import { fadeInUp } from '../../../config/motionConfig';

const AnalyticsCard = ({ title, children, className = '' }) => {
    return (
        <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className={`relative overflow-hidden rounded-xl border border-cyan-institutional/20 bg-obsidian/80 backdrop-blur-md p-6 ${className}`}
        >
            {/* Decorative Glow */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-institutional/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="mb-6 border-b border-cyan-institutional/10 pb-4">
                <h3 className="text-xl font-bold text-white tracking-wide">
                    {title}
                </h3>
            </div>

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
};

export default AnalyticsCard;
