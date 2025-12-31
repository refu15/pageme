import { TimelineItem } from "@/lib/types";

interface TimelineProps {
    items: TimelineItem[];
}

export function Timeline({ items }: TimelineProps) {
    return (
        <div className="py-4 relative">
            {/* Vertical Line */}
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-300 ml-3" />

            <div className="space-y-12">
                {items.map((item, index) => (
                    <div key={index} className="relative pl-12 group">
                        {/* Dot */}
                        <div className="absolute left-0 top-1.5 w-6 h-6 bg-gray-800 rounded-full border-4 border-white shadow-sm z-10" />

                        {/* Content Card */}
                        <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-xl font-bold mb-3 text-gray-800">
                                {item.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap text-sm">
                                {item.content}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
