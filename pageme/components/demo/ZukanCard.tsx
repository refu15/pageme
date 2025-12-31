"use client";

import React from 'react';
import { BrushWave } from '@/components/brush/BrushElements';

interface Parameter {
    label: string;
    value: number;
}

interface ZukanCardProps {
    name: string;
    role: string;
    avatarUrl?: string | null;
    animal: {
        type: string;
        emoji: string;
        english_name: string;
        reason: string;
    };
    parameters: Parameter[];
    energyDrain: string[];
    infiniteFuel: string[];
}

export const ZukanCard = React.forwardRef<HTMLDivElement, ZukanCardProps>(({
    name,
    role,
    avatarUrl,
    animal,
    parameters,
    energyDrain,
    infiniteFuel
}, ref) => {

    // Radar Chart Logic (simplified for static rendering)
    const radius = 80;
    const center = { x: 100, y: 100 };
    const numPoints = parameters.length || 6;

    const getPoint = (index: number, value: number) => {
        const angle = (Math.PI * 2 * index) / numPoints - Math.PI / 2;
        const r = (value / 100) * radius;
        return {
            x: center.x + r * Math.cos(angle),
            y: center.y + r * Math.sin(angle)
        };
    };

    const radarPath = parameters.map((p, i) => {
        const point = getPoint(i, p.value);
        return `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`;
    }).join(' ') + ' Z';

    const bgPath = parameters.map((_, i) => {
        const point = getPoint(i, 100);
        return `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`;
    }).join(' ') + ' Z';

    return (
        <div
            ref={ref}
            data-zukan-card="true"
            style={{
                width: '600px',
                height: '840px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: '#FAFAFA',
                color: '#0A0A0A',
                border: '12px solid #0A0A0A',
                padding: '32px',
                fontFamily: 'sans-serif',
                boxSizing: 'border-box',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            }}
        >
            {/* Texture Overlay */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'url(/texture.png)',
                    backgroundSize: 'cover',
                    opacity: 0.02,
                    backgroundColor: '#000000',
                    pointerEvents: 'none'
                }}
            />

            {/* Header */}
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingBottom: '16px', marginBottom: '24px', position: 'relative', zIndex: 10, borderBottom: '4px solid #0A0A0A' }}>
                <div>
                    <p style={{ color: '#666666', fontWeight: 'bold', fontSize: '18px', marginBottom: '4px', margin: 0 }}>{role}</p>
                    <h2 style={{ color: '#0A0A0A', fontWeight: 'bold', fontSize: '30px', margin: 0 }}>{name}</h2>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <p style={{ color: '#888888', fontWeight: 'bold', fontSize: '14px', margin: 0 }}>GENUS</p>
                    <p style={{ color: '#0A0A0A', fontWeight: 'bold', fontSize: '20px', margin: 0 }}>{animal.english_name || 'UNKNOWN'}</p>
                </div>
            </div>

            {/* Main Visual: Animal & Radar */}
            <div style={{ width: '100%', display: 'flex', gap: '24px', marginBottom: '24px', position: 'relative', zIndex: 10 }}>
                {/* Animal Display */}
                <div style={{ flex: 1, backgroundColor: '#0A0A0A', color: '#FFFFFF', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '4px solid #0A0A0A' }}>
                    {avatarUrl ? (
                        <img
                            src={avatarUrl}
                            alt={animal.type}
                            style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', marginBottom: '16px', border: '4px solid #FFFFFF' }}
                        />
                    ) : (
                        <div style={{ fontSize: '96px', marginBottom: '16px', lineHeight: 1 }}>{animal.emoji}</div>
                    )}
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'center', margin: 0 }}>{animal.type}</h3>
                </div>

                {/* Radar Chart */}
                <div style={{ flex: 1, backgroundColor: '#FFFFFF', border: '4px solid #0A0A0A', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                    <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%' }}>
                        <path d={bgPath} fill="#F0F0F0" stroke="#DDDDDD" strokeWidth="1" />
                        {/* Grid */}
                        {[20, 50, 80].map(level => (
                            <path key={level} d={parameters.map((_, i) => {
                                const pt = getPoint(i, level);
                                return `${i === 0 ? 'M' : 'L'} ${pt.x} ${pt.y}`;
                            }).join(' ') + ' Z'} fill="none" stroke="#EEEEEE" strokeWidth="1" />
                        ))}
                        {/* Axes */}
                        {parameters.map((_, i) => {
                            const end = getPoint(i, 100);
                            return <line key={i} x1={center.x} y1={center.y} x2={end.x} y2={end.y} stroke="#DDDDDD" strokeWidth="1" />;
                        })}
                        {/* Shape */}
                        <path d={radarPath} fill="rgba(230, 57, 70, 0.6)" stroke="#E63946" strokeWidth="3" />
                        {/* Labels */}
                        {parameters.map((p, i) => {
                            const pt = getPoint(i, 125);
                            return <text key={i} x={pt.x} y={pt.y} textAnchor="middle" dominantBaseline="middle" fontSize="10" fontWeight="bold" fill="#333333">{p.label}</text>;
                        })}
                    </svg>
                </div>
            </div>

            {/* Reason */}
            <div style={{ width: '100%', marginBottom: '24px', position: 'relative', zIndex: 10 }}>
                <p style={{ color: '#E63946', fontWeight: 'bold', fontSize: '14px', marginBottom: '4px', margin: 0 }}>生態分析</p>
                <p style={{ color: '#333333', fontWeight: 'bold', fontSize: '18px', lineHeight: 1.6, borderLeft: '4px solid #E63946', paddingLeft: '16px', margin: 0 }}>
                    "{animal.reason}"
                </p>
            </div>

            {/* Stats Grid */}
            <div style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', position: 'relative', zIndex: 10, flex: 1 }}>
                {/* Energy Drain */}
                <div style={{ backgroundColor: '#FFFFFF', border: '4px solid #0A0A0A', padding: '16px' }}>
                    <h4 style={{ fontWeight: 'bold', textAlign: 'center', borderBottom: '2px solid #0A0A0A', paddingBottom: '8px', marginBottom: '12px', margin: 0 }}>やる気が削がれること</h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {energyDrain.slice(0, 4).map((drain, i) => (
                            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ width: '8px', height: '8px', backgroundColor: '#666666', display: 'inline-block', flexShrink: 0 }}></span>
                                <span style={{ fontWeight: 'bold', fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{drain}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Fuel */}
                <div style={{ backgroundColor: '#FFFFFF', border: '4px solid #0A0A0A', padding: '16px' }}>
                    <h4 style={{ fontWeight: 'bold', textAlign: 'center', borderBottom: '2px solid #0A0A0A', paddingBottom: '8px', marginBottom: '12px', margin: 0 }}>無限エネルギー</h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {infiniteFuel.slice(0, 4).map((fuel, i) => (
                            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontSize: '12px', flexShrink: 0 }}>🔥</span>
                                <span style={{ fontWeight: 'bold', fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{fuel}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Footer */}
            <div style={{ width: '100%', marginTop: '24px', paddingTop: '16px', borderTop: '4px solid #0A0A0A', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '32px', height: '32px', backgroundColor: '#0A0A0A', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontSize: '12px' }}>
                        図
                    </div>
                    <span style={{ fontWeight: 'bold', fontSize: '20px', letterSpacing: '-0.05em' }}>自分図鑑</span>
                </div>
                <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#888888' }}>
                    GENERATED BY MY-ZUKAN
                </div>
            </div>
        </div>
    );
});

ZukanCard.displayName = 'ZukanCard';
