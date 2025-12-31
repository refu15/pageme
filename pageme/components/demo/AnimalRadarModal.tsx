"use client";

import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Parameter {
    label: string;
    value: number;
}

interface AnimalRadarModalProps {
    isOpen: boolean;
    onClose: () => void;
    animalName: string;
    animalEmoji: string;
    reason: string;
    parameters: Parameter[];
}

export function AnimalRadarModal({ isOpen, onClose, animalName, animalEmoji, reason, parameters = [] }: AnimalRadarModalProps) {
    if (!isOpen) return null;

    // Use default parameters if none provided
    const safeParameters = parameters.length > 0 ? parameters : [
        { label: "論理性", value: 50 },
        { label: "行動力", value: 50 },
        { label: "協調性", value: 50 },
        { label: "独創性", value: 50 },
        { label: "柔軟性", value: 50 }
    ];

    // Calc coordinates for radar chart
    const numPoints = safeParameters.length;
    const radius = 100;
    const center = { x: 150, y: 140 }; // Increased Y slightly for spacing

    const getPoint = (index: number, value: number) => {
        const angle = (Math.PI * 2 * index) / numPoints - Math.PI / 2;
        const r = (value / 100) * radius;
        return {
            x: center.x + r * Math.cos(angle),
            y: center.y + r * Math.sin(angle)
        };
    };

    const radarPath = safeParameters.map((p, i) => {
        const point = getPoint(i, p.value);
        return `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`;
    }).join(' ') + ' Z';

    const bgPath = safeParameters.map((_, i) => {
        const point = getPoint(i, 100);
        return `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`;
    }).join(' ') + ' Z';

    // Grid lines (20%, 40%, 60%, 80%)
    const gridLevels = [20, 40, 60, 80];
    const gridPaths = gridLevels.map(level => {
        return safeParameters.map((_, i) => {
            const point = getPoint(i, level);
            return `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`;
        }).join(' ') + ' Z';
    });

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={onClose}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white w-full max-w-md rounded-2xl p-6 relative shadow-[8px_8px_0px_0px_rgba(10,10,10,1)] border-2 border-[#0A0A0A]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
                            >
                                <X className="w-6 h-6 text-[#0A0A0A]" />
                            </button>

                            <div className="text-center mb-6">
                                <div className="text-6xl mb-2">{animalEmoji}</div>
                                <h2 className="text-2xl font-bold text-[#0A0A0A]">{animalName}</h2>
                                <p className="text-[#666] text-sm font-bold mt-1">選定理由パラメータ分析</p>
                            </div>

                            <div className="relative w-full aspect-square max-h-[320px] mx-auto">
                                <svg viewBox="0 0 300 300" className="w-full h-full overflow-visible">
                                    {/* Background Hexagon */}
                                    <path d={bgPath} fill="#FAFAFA" stroke="#E0E0E0" strokeWidth="1" />

                                    {/* Grid Lines */}
                                    {gridPaths.map((d, i) => (
                                        <path key={i} d={d} fill="none" stroke="#E0E0E0" strokeWidth="1" strokeDasharray="4 2" />
                                    ))}

                                    {/* Axis Lines */}
                                    {safeParameters.map((_, i) => {
                                        const end = getPoint(i, 100);
                                        return (
                                            <line
                                                key={i}
                                                x1={center.x}
                                                y1={center.y}
                                                x2={end.x}
                                                y2={end.y}
                                                stroke="#E0E0E0"
                                                strokeWidth="1"
                                            />
                                        );
                                    })}

                                    {/* Data Shape */}
                                    <motion.path
                                        initial={{ d: safeParameters.map((_, i) => `${i === 0 ? 'M' : 'L'} ${center.x} ${center.y}`).join(' ') + ' Z', opacity: 0 }}
                                        animate={{ d: radarPath, opacity: 0.6 }}
                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                        fill="#E63946"
                                        stroke="#E63946"
                                        strokeWidth="2"
                                    />

                                    {/* Border for Data Shape (stronger outline) */}
                                    <motion.path
                                        initial={{ d: safeParameters.map((_, i) => `${i === 0 ? 'M' : 'L'} ${center.x} ${center.y}`).join(' ') + ' Z' }}
                                        animate={{ d: radarPath }}
                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                        fill="none"
                                        stroke="#E63946"
                                        strokeWidth="3"
                                    />

                                    {/* Labels */}
                                    {safeParameters.map((p, i) => {
                                        const point = getPoint(i, 120); // Labels slightly outside
                                        return (
                                            <g key={i}>
                                                <text
                                                    x={point.x}
                                                    y={point.y}
                                                    textAnchor="middle"
                                                    dominantBaseline="middle"
                                                    className="text-xs font-bold fill-[#0A0A0A]"
                                                    style={{ fontSize: '12px' }}
                                                >
                                                    {p.label}
                                                </text>
                                                <text
                                                    x={point.x}
                                                    y={point.y + 14}
                                                    textAnchor="middle"
                                                    dominantBaseline="middle"
                                                    className="text-xs font-bold fill-[#E63946]"
                                                    style={{ fontSize: '10px' }}
                                                >
                                                    {p.value}
                                                </text>
                                            </g>
                                        );
                                    })}
                                </svg>
                            </div>

                            <p className="text-center text-[#444] text-sm mt-4 font-medium px-4">
                                {reason}
                            </p>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
