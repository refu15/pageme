import { CharacterCardData } from "@/lib/types";
import { Zap, AlertCircle, Terminal, User } from "lucide-react";

interface CharacterCardProps {
    data: CharacterCardData;
}

export function CharacterCard({ data }: CharacterCardProps) {
    return (
        <div className="w-full max-w-5xl mx-auto font-sans mb-12">
            {/* Bio Section */}
            <div className="flex flex-col md:flex-row items-center gap-6 mb-8 text-center md:text-left">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-100 shadow-sm shrink-0">
                    {data.avatar_url ? (
                        <img src={data.avatar_url} alt={data.name} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                            <User className="w-10 h-10" />
                        </div>
                    )}
                </div>
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">{data.name}</h2>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start mt-2">
                        {/* Placeholder for future tags */}
                    </div>
                </div>
            </div>

            {/* Attributes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Strengths / Infinite Fuel */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
                        <Zap className="w-5 h-5 text-blue-500" />
                        <h3 className="font-bold text-gray-700">無限にできること・得意 (Infinite Fuel)</h3>
                    </div>
                    <ul className="space-y-4">
                        {data.mp_skills.map((skill, i) => (
                            <li key={i}>
                                <h4 className="font-semibold text-gray-800 text-sm mb-1">{skill.title}</h4>
                                <p className="text-sm text-gray-500 leading-relaxed">{skill.description}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Weaknesses / Motivation Drains */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
                        <AlertCircle className="w-5 h-5 text-red-400" />
                        <h3 className="font-bold text-gray-700">やる気が削がれること・苦手 (Energy Drain)</h3>
                    </div>
                    <ul className="space-y-4">
                        {data.debuffs.map((debuff, i) => (
                            <li key={i}>
                                <h4 className="font-semibold text-gray-800 text-sm mb-1">{debuff.title}</h4>
                                <p className="text-sm text-gray-500 leading-relaxed">{debuff.description}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Activation Command (Minimal Footer) */}
            <div className="mt-6 bg-gray-50 rounded-xl p-4 flex flex-col md:flex-row items-center gap-4 border border-gray-100">
                <div className="flex items-center gap-2 text-gray-500 shrink-0">
                    <Terminal className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">Activation Command</span>
                </div>
                <div className="text-sm text-gray-600 flex-1">
                    <span className="font-mono text-xs bg-gray-200 px-2 py-0.5 rounded mr-2 text-gray-700">{data.activation_command.type}</span>
                    {data.activation_command.description}
                </div>
            </div>

        </div>
    );
}
