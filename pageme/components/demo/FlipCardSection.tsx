"use client";

import { useState } from 'react';
import { getItemCategory, getDominantCategory, CATEGORY_DETAILS } from '@/lib/data/category-mappings';
import { LucideIcon, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FlipCardSectionProps {
    title: string;
    items: string[];
    type: 'fuel' | 'drain';
    icon: React.ComponentType<{ className?: string }>;
    iconColor: string;
}

export function FlipCardSection({ title, items, type, icon: Icon, iconColor }: FlipCardSectionProps) {
    // Determine dominant category for the summary
    const dominantCatKey = getDominantCategory(items, type);
    const dominantCat = CATEGORY_DETAILS[dominantCatKey] || CATEGORY_DETAILS['General'];

    const summaryText = type === 'fuel'
        ? `あなたの原動力は「${dominantCat.label}」にあるようです。`
        : `「${dominantCat.label}」に関する要素が、あなたのエネルギーを奪うようです。`;

    return (
        <section className="px-0 md:px-6 py-20 max-w-full mx-auto relative z-10 overflow-hidden">
            <div className="max-w-3xl mx-auto px-6 mb-8">
                <div className="flex items-center gap-3 mb-4">
                    <Icon className={`w-8 h-8 ${iconColor}`} />
                    <h2 className="text-3xl font-bold text-[#0A0A0A]">{title}</h2>
                </div>
                <div className="flex items-center gap-2 text-lg font-bold text-[#666]">
                    <span className="text-2xl">{dominantCat.emoji}</span>
                    <p>{summaryText}</p>
                </div>
            </div>

            {/* Horizontal Scroll Container */}
            <div className="flex overflow-x-auto pb-12 px-6 gap-4 md:gap-6 snap-x snap-mandatory scrollbar-hide -mx-6 md:mx-0 px-6 md:px-0 scroll-padding-x-6">
                {/* Spacer for mobile left padding */}
                <div className="w-2 shrink-0 md:hidden" />

                {items.map((item, i) => (
                    <FlipCard key={i} item={item} type={type} index={i} />
                ))}

                {/* Spacer for mobile right padding */}
                <div className="w-6 shrink-0 md:hidden" />
            </div>

            {/* Scroll Indicator Hint */}
            <div className="max-w-3xl mx-auto px-6 text-right text-sm text-[#888] font-bold">
                スクロールしてカードをめくる →
            </div>
        </section>
    );
}

function FlipCard({ item, type, index }: { item: string, type: 'fuel' | 'drain', index: number }) {
    const [isFlipped, setIsFlipped] = useState(false);
    const categoryKey = getItemCategory(item, type);
    const category = CATEGORY_DETAILS[categoryKey] || CATEGORY_DETAILS['General'];

    // Random slight rotation for playful feel
    const rotation = (index % 2 === 0 ? 1 : -1) * ((index % 3) + 1);

    return (
        <div
            className="group relative w-64 h-80 shrink-0 cursor-pointer snap-center perspective-1000"
            onClick={() => setIsFlipped(!isFlipped)}
            style={{ transform: `rotate(${rotation}deg)` }}
        >
            <motion.div
                className="w-full h-full relative preserve-3d transition-all duration-500"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Front Side */}
                <div className="absolute inset-0 backface-hidden">
                    <div className={`
                        w-full h-full bg-white border-2 border-[#0A0A0A] 
                        shadow-[8px_8px_0px_0px_rgba(10,10,10,1)] 
                        flex flex-col items-center justify-center p-6 text-center
                        group-hover:translate-x-[2px] group-hover:translate-y-[2px] 
                        group-hover:shadow-[6px_6px_0px_0px_rgba(10,10,10,1)]
                        transition-all
                    `}>
                        <div
                            className="w-24 h-24 rounded-full flex items-center justify-center text-5xl mb-6 border-2 border-[#0A0A0A]"
                            style={{ backgroundColor: category.color }}
                        >
                            {category.emoji}
                        </div>
                        <h3 className="text-xl font-bold text-[#0A0A0A] mb-2">{category.label}</h3>
                        <p className="text-sm text-[#888] font-bold">TAP TO FLIP</p>

                        {/* Decorative Pattern */}
                        <div className="absolute top-2 right-2 opacity-20">
                            <Sparkles className="w-6 h-6 text-[#0A0A0A]" />
                        </div>
                    </div>
                </div>

                {/* Back Side */}
                <div
                    className="absolute inset-0 backface-hidden"
                    style={{ transform: 'rotateY(180deg)' }}
                >
                    <div className={`
                        w-full h-full border-2 border-[#0A0A0A] 
                        shadow-[8px_8px_0px_0px_rgba(10,10,10,1)]
                        flex flex-col items-center justify-center p-6 text-center
                        ${type === 'fuel' ? 'bg-[#0A0A0A] text-white' : 'bg-white text-[#0A0A0A]'}
                    `}>
                        <div className="mb-4">
                            <span className="text-4xl">{type === 'fuel' ? '🔥' : '💧'}</span>
                        </div>
                        <p className="text-xl font-bold leading-relaxed">
                            {item}
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
