"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";

interface Parameter {
    label: string;
    value: number;
}

interface ExpandableBioProps {
    text: string;
    parameters?: Parameter[];
}

export function ExpandableBio({ text, parameters = [] }: ExpandableBioProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    // Radar Chart Logic
    const radius = 60;
    const center = { x: 80, y: 80 };
    const numPoints = parameters.length || 6;

    const getPoint = (index: number, value: number) => {
        const angle = (Math.PI * 2 * index) / numPoints - Math.PI / 2;
        const r = (value / 100) * radius;
        return {
            x: center.x + r * Math.cos(angle),
            y: center.y + r * Math.sin(angle)
        };
    };

    const radarPath = parameters.length > 0
        ? parameters.map((p, i) => {
            const point = getPoint(i, p.value);
            return `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`;
        }).join(' ') + ' Z'
        : '';

    const bgPath = parameters.length > 0
        ? parameters.map((_, i) => {
            const point = getPoint(i, 100);
            return `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`;
        }).join(' ') + ' Z'
        : '';

    return (
        <section className="px-6 py-12 max-w-2xl mx-auto relative z-10">
            <div className="text-center mb-8">
                <span className="inline-block px-3 py-1 bg-[#F0F0F0] text-[#666] text-sm font-bold rounded-full mb-2">
                    AI PROFILE ANALYSIS
                </span>
            </div>

            <div className="relative">
                <motion.div
                    initial={false}
                    animate={{ height: isExpanded ? "auto" : "100px" }}
                    className="overflow-hidden relative text-[#0A0A0A]"
                >
                    <p className="text-lg leading-relaxed font-medium whitespace-pre-wrap">
                        {text}
                    </p>

                    {/* 6-Axis Parameters Section - Only visible when expanded */}
                    {isExpanded && parameters.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mt-8 pt-8 border-t-2 border-[#E0E0E0]"
                        >
                            <h3 className="text-center text-lg font-bold mb-6 text-[#0A0A0A]">
                                パーソナリティ・マップ
                            </h3>

                            <div className="flex flex-col md:flex-row items-center gap-6">
                                {/* Radar Chart */}
                                <div className="flex-shrink-0">
                                    <svg viewBox="0 0 160 160" className="w-40 h-40">
                                        {/* Background Shape */}
                                        <path d={bgPath} fill="#F5F5F5" stroke="#E0E0E0" strokeWidth="1" />

                                        {/* Grid Lines */}
                                        {[33, 66].map(level => (
                                            <path
                                                key={level}
                                                d={parameters.map((_, i) => {
                                                    const pt = getPoint(i, level);
                                                    return `${i === 0 ? 'M' : 'L'} ${pt.x} ${pt.y}`;
                                                }).join(' ') + ' Z'}
                                                fill="none"
                                                stroke="#E8E8E8"
                                                strokeWidth="1"
                                            />
                                        ))}

                                        {/* Axes */}
                                        {parameters.map((_, i) => {
                                            const end = getPoint(i, 100);
                                            return <line key={i} x1={center.x} y1={center.y} x2={end.x} y2={end.y} stroke="#E0E0E0" strokeWidth="1" />;
                                        })}

                                        {/* Data Shape */}
                                        <motion.path
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.3, duration: 0.5 }}
                                            d={radarPath}
                                            fill="rgba(230, 57, 70, 0.3)"
                                            stroke="#E63946"
                                            strokeWidth="2"
                                        />

                                        {/* Labels */}
                                        {parameters.map((p, i) => {
                                            const pt = getPoint(i, 130);
                                            return (
                                                <text
                                                    key={i}
                                                    x={pt.x}
                                                    y={pt.y}
                                                    textAnchor="middle"
                                                    dominantBaseline="middle"
                                                    fontSize="9"
                                                    fontWeight="bold"
                                                    fill="#333"
                                                >
                                                    {p.label}
                                                </text>
                                            );
                                        })}
                                    </svg>
                                </div>

                                {/* Parameter Bars */}
                                <div className="flex-1 w-full space-y-3">
                                    {parameters.map((param, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.3 + i * 0.1 }}
                                            className="flex items-center gap-3"
                                        >
                                            <span className="w-16 text-xs font-bold text-[#666] text-right flex-shrink-0">
                                                {param.label}
                                            </span>
                                            <div className="flex-1 h-3 bg-[#F0F0F0] rounded-full overflow-hidden border border-[#E0E0E0]">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${param.value}%` }}
                                                    transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                                                    className="h-full rounded-full"
                                                    style={{
                                                        backgroundColor: param.value >= 70 ? '#E63946' :
                                                            param.value >= 40 ? '#FFB347' : '#8BC34A'
                                                    }}
                                                />
                                            </div>
                                            <span className="w-8 text-xs font-bold text-[#0A0A0A]">
                                                {param.value}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Fade overlay when collapsed */}
                    {!isExpanded && (
                        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#FAFAFA] to-transparent" />
                    )}
                </motion.div>

                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="mx-auto mt-4 px-6 py-2 flex items-center gap-2 text-[#E63946] font-bold hover:bg-[#FFF0F0] rounded-full transition-colors"
                >
                    {isExpanded ? (
                        <>
                            閉じる <ChevronUp className="w-4 h-4" />
                        </>
                    ) : (
                        <>
                            続きを読む <ChevronDown className="w-4 h-4" />
                        </>
                    )}
                </button>
            </div>
        </section>
    );
}
