import React from 'react';

interface LinePreviewProps {
    title?: string;
    deadline?: string;
    rank?: string;
    summary?: string;
}

export default function LinePreview({
    title = "西部地区 舗装復旧工事",
    deadline = "2024/05/20",
    rank = "土木A",
    summary = "・古志田町地内の市道での水道管工事後の舗装復旧。\n・アスファルト舗装工 約350m2。\n・工期は契約日から約3ヶ月間。"
}: LinePreviewProps) {
    return (
        <div className="w-[300px] h-auto bg-[#849EB8] p-4 rounded-xl shadow-xl overflow-hidden font-sans mx-auto">
            {/* LINE Chat Senders Info */}
            <div className="flex items-center mb-2 space-x-2">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-xs font-bold text-gray-700">
                    秘書
                </div>
                <div className="text-xs text-white">AI秘書</div>
            </div>

            {/* Flex Message Bubble */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                {/* Header - Red Background for Urgency */}
                <div className="bg-[#D32F2F] p-3 text-white">
                    <div className="flex justify-between items-center text-xs font-bold">
                        <span className="flex-1">🔴 期限: {deadline}</span>
                        <span className="flex-none">ランク: {rank}</span>
                    </div>
                </div>

                {/* Body */}
                <div className="p-4">
                    <h3 className="text-base font-bold text-[#111111] mb-3 leading-tight">
                        {title}
                    </h3>

                    <div className="border-t border-gray-200 my-3"></div>

                    <div className="space-y-2">
                        <p className="text-[10px] font-bold text-[#aaaaaa]">【3行要約】</p>
                        <p className="text-sm text-[#555555] leading-relaxed whitespace-pre-wrap">
                            {summary}
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 pt-0 space-y-2">
                    <button className="w-full bg-[#212121] text-white font-bold py-2 rounded-md text-sm hover:opacity-90 transition-opacity">
                        詳細PDFを開く
                    </button>
                    <button className="w-full text-[#1E88E5] font-bold py-2 text-sm hover:underline">
                        カレンダー登録
                    </button>
                </div>
            </div>

            {/* Time stamp */}
            <div className="text-[10px] text-white text-right mt-1">
                07:00
            </div>
        </div>
    );
}
