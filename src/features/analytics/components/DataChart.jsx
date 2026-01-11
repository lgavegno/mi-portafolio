
import React from 'react';

const DataChart = () => {
    // Datos simulados para el placeholder visual
    const bars = [40, 75, 55, 90, 65, 80, 45];

    return (
        <div className="w-full h-48 flex items-end justify-between gap-2 px-2">
            {bars.map((height, index) => (
                <div key={index} className="flex flex-col items-center gap-2 group w-full">
                    {/* Valor numérico (visible en hover o siempre, según diseño) */}
                    <span className="text-xs font-mono text-cyan-institutional/60 opacity-0 group-hover:opacity-100 transition-opacity">
                        {height}%
                    </span>

                    {/* Barra del gráfico */}
                    <div
                        style={{ height: `${height}%` }}
                        className="w-full bg-cyan-institutional/10 border-t border-x border-cyan-institutional/30 rounded-t-sm relative transition-all duration-500 group-hover:bg-cyan-institutional/20"
                    >
                        {/* Línea de brillo superior */}
                        <div className="absolute top-0 inset-x-0 h-[1px] bg-cyan-institutional/50 shadow-[0_0_8px_rgba(0,255,255,0.5)]" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DataChart;
