"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, FileText } from 'lucide-react';
import { ZukanCard } from './ZukanCard';

interface Parameter {
    label: string;
    value: number;
}

interface ExportPreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    onExportPNG: () => void;
    onExportPDF: () => void;
    isExporting: boolean;
    // ZukanCard props (for preview display only)
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

export function ExportPreviewModal({
    isOpen,
    onClose,
    onExportPNG,
    onExportPDF,
    isExporting,
    name,
    role,
    avatarUrl,
    animal,
    parameters,
    energyDrain,
    infiniteFuel
}: ExportPreviewModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="relative max-w-4xl w-full max-h-[90vh] overflow-auto bg-white rounded-lg shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="sticky top-0 z-10 flex justify-between items-center p-4 bg-white border-b-2 border-[#0A0A0A]">
                            <h2 className="text-xl font-bold">プレビュー</h2>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                aria-label="Close"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Preview Area - Display only, not used for actual export */}
                        <div className="p-6 flex justify-center overflow-auto" style={{ backgroundColor: '#f0f0f0' }}>
                            <div className="transform scale-[0.5] origin-top" style={{ minHeight: '420px' }}>
                                <ZukanCard
                                    name={name}
                                    role={role}
                                    avatarUrl={avatarUrl}
                                    animal={animal}
                                    parameters={parameters}
                                    energyDrain={energyDrain}
                                    infiniteFuel={infiniteFuel}
                                />
                            </div>
                        </div>

                        {/* Footer with Actions */}
                        <div className="sticky bottom-0 z-10 flex justify-center gap-4 p-4 bg-white border-t-2 border-[#0A0A0A]">
                            <button
                                onClick={onExportPNG}
                                disabled={isExporting}
                                className="flex items-center gap-2 px-6 py-3 bg-[#0A0A0A] text-white font-bold border-2 border-[#0A0A0A] shadow-[4px_4px_0px_0px_rgba(230,57,70,1)] hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(230,57,70,1)] transition-all disabled:opacity-50"
                            >
                                <Download className="w-5 h-5" />
                                {isExporting ? '保存中...' : 'PNGで保存'}
                            </button>
                            <button
                                onClick={onExportPDF}
                                disabled={isExporting}
                                className="flex items-center gap-2 px-6 py-3 bg-white text-[#0A0A0A] font-bold border-2 border-[#0A0A0A] shadow-[4px_4px_0px_0px_rgba(10,10,10,1)] hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(10,10,10,1)] transition-all disabled:opacity-50"
                            >
                                <FileText className="w-5 h-5" />
                                {isExporting ? '保存中...' : 'PDFで保存'}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
