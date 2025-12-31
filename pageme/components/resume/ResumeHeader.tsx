import { BasicInfo } from "@/lib/types";
import { GraduationCap, Link as LinkIcon, Award, ExternalLink } from "lucide-react";

interface ResumeHeaderProps {
    data: BasicInfo;
}

export function ResumeHeader({ data }: ResumeHeaderProps) {
    return (
        <div className="w-full max-w-4xl mx-auto mb-8">
            {/* Title */}
            <div className="mb-4">
                <h1 className="text-4xl font-bold tracking-wider text-gray-800">
                    RESUME <span className="text-lg font-normal text-gray-500 ml-4">- 職務経歴書 -</span>
                </h1>
                <div className="w-12 h-1 bg-gray-300 mt-2 mx-auto sm:mx-0 sm:ml-24" />{/* Decorative line under/near title? Image has a small bar */}
            </div>

            {/* Gray Profile Card */}
            <div className="bg-gray-400/30 backdrop-blur-sm rounded-xl p-6 relative overflow-hidden text-gray-700">
                {/* Background decoration or texture could go here */}

                <div className="flex flex-col md:flex-row gap-6 justify-between relative z-10">
                    {/* Left: Affiliation (Student or Professional) */}
                    <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-2">
                            <GraduationCap className="w-5 h-5" />
                            <span className="font-semibold">
                                {data.affiliation.status === 'student' ? '学校' : '所属'}：
                                {data.affiliation.organization}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-5 flex justify-center text-gray-400">•</span>
                            <span>
                                {data.affiliation.status === 'student' ? '学部/学科' : '部署'}：
                                {data.affiliation.department}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-5 flex justify-center text-gray-400">•</span>
                            <span>
                                {data.affiliation.status === 'student' ? '学年' : '役職'}：
                                {data.affiliation.role}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 opacity-75 text-sm">
                            <span className="w-5 flex justify-center text-gray-400">•</span>
                            <span>
                                {data.affiliation.status === 'student' ? '卒業予定' : '期間'}：
                                {data.affiliation.period}
                            </span>
                        </div>
                    </div>
                    {/* Right: Links & Avatar */}
                    <div className="flex-1 flex flex-col items-start md:items-end space-y-3">
                        {data.links.map((link, i) => (
                            <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
                                <LinkIcon className="w-4 h-4" />
                                <span>{link.label}</span>
                                <ExternalLink className="w-3 h-3" />
                            </a>
                        ))}

                        <div className="flex items-center gap-2 mt-2">
                            <Award className="w-4 h-4" />
                            <span className="font-semibold">資格</span>
                        </div>
                        <div className="flex flex-wrap gap-2 justify-end">
                            {data.qualifications.map((q, i) => (
                                <span key={i} className="bg-white/50 px-3 py-1 rounded-full text-sm border border-white/60">
                                    # {q}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Buttons Area - Purely Visual Mockup based on image */}
                <div className="flex gap-4 mt-8 md:mt-12 justify-center md:justify-start">
                    <button className="flex-1 max-w-[200px] bg-sky-200/40 hover:bg-sky-200/60 text-sky-800 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
                        <span>ワークログ</span>
                        <ExternalLink className="w-4 h-4" />
                    </button>
                    <button className="flex-1 max-w-[200px] bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-md">
                        <span>面談申請</span>
                        <ExternalLink className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
