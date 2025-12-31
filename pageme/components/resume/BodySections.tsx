import { WorkExperience, AboutMe } from "@/lib/types";

// WORK EXPERIENCE COMPONENT
interface WorkExperienceSectionProps {
    experiences: WorkExperience[];
}

export function WorkExperienceSection({ experiences }: WorkExperienceSectionProps) {
    return (
        <div className="mb-12">
            <h2 className="text-2xl font-bold tracking-widest text-gray-800 border-b-4 border-blue-200 inline-block mb-6 uppercase">
                Work Experience
            </h2>

            <div className="space-y-8">
                {experiences.map((exp, index) => (
                    <div key={index}>
                        <div className="mb-2">
                            <h3 className="text-xl font-bold text-gray-700">{exp.company}</h3>
                            <p className="text-sm text-gray-500">{exp.period}</p>
                        </div>
                        {/* Position if available */}
                        {exp.position && (
                            <p className="text-md font-semibold text-gray-600 mb-2">{exp.position}</p>
                        )}

                        <p className="text-sm leading-relaxed text-gray-600 whitespace-pre-wrap">
                            {exp.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ABOUT ME COMPONENT
interface AboutSectionProps {
    data: AboutMe;
}

export function AboutSection({ data }: AboutSectionProps) {
    return (
        <div>
            <h2 className="text-2xl font-bold tracking-widest text-gray-800 border-b-4 border-teal-200 inline-block mb-6 uppercase">
                About Me
            </h2>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <h3 className="text-lg font-bold text-gray-700 mb-3 border-l-4 border-gray-400 pl-3">
                    自分の強み
                </h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
                    {data.strengths.map((str, i) => (
                        <li key={i}>{str}</li>
                    ))}
                </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-bold text-gray-700 mb-3 border-l-4 border-gray-400 pl-3">
                    将来のビジョン
                </h3>
                <p className="text-sm leading-relaxed text-gray-600 whitespace-pre-wrap">
                    {data.vision}
                </p>
            </div>
        </div>
    );
}
