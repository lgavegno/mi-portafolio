// src/components/TechnicalTicker.jsx
// Infinite scrolling ticker displaying technical skills

import React from 'react';

const TechnicalTicker = () => {
    const skills = [
        'REACT',
        'SQL',
        'JAVA',
        'PYTHON',
        'POWER BI',
        'MICROSOFT 365',
    ];

    // Duplicate skills for seamless loop
    const displaySkills = [...skills, ...skills];

    return (
        <div className="w-full overflow-hidden bg-[#2C3340] border-t border-[#ADC4CE]/20 py-4">
            <div className="relative flex">
                <div className="flex animate-ticker">
                    {displaySkills.map((skill, index) => (
                        <div
                            key={index}
                            className="flex items-center whitespace-nowrap px-8"
                        >
                            <span style={{color: '#ffffff'}} className="font-mono text-xs md:text-sm tracking-widest">
                                {skill}
                            </span>
                            <span className="mx-4 text-[#FFFFFF]/40">•</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TechnicalTicker;
