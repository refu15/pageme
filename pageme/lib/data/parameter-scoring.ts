export interface ParameterScore {
    label: string;
    value: number;
}

export interface ProfileData {
    basic_info: {
        role: string;
    };
    skills: string[];
    work_style: {
        time_preference: number;
        communication_preference: number;
        decision_style: string;
        feedback_preference: string;
    };
    infinite_fuel: string[];
    energy_drain: string[];
}

export function calculateParameterScores(profile: ProfileData): ParameterScore[] {
    // Initial scores (Base 30)
    let scores = {
        logic: 30,
        empathy: 30,
        vision: 30,
        drive: 30,
        steady: 30,
        flexible: 30
    };

    // Helper to add points (max 100)
    const add = (key: keyof typeof scores, amount: number) => {
        scores[key] = Math.min(100, scores[key] + amount);
    };

    // --- 1. Work Style & Time Preference ---
    // Time: 1=Morning (Steady), 5=Night (Vision)
    const time = profile.work_style.time_preference;
    if (time <= 2) add('steady', 15);
    if (time >= 4) add('vision', 15);

    // Comm: 1=Async (Logic), 5=Sync (Empathy)
    const comm = profile.work_style.communication_preference;
    if (comm <= 2) add('logic', 15);
    if (comm >= 4) add('empathy', 15);

    // Decision Style
    const decision = profile.work_style.decision_style; // specific values depend on form
    // Assuming keywords or simple string matching if exact values aren't strictly typed yet
    if (decision.includes('論理') || decision.includes('データ')) add('logic', 10);
    if (decision.includes('直感') || decision.includes('走りながら')) add('flexibility', 15); // Note: key is 'flexible'
    if (decision.includes('慎重') || decision.includes('計画')) add('steady', 10);

    // --- 2. Roles (Simple Keyword Match) ---
    const role = profile.basic_info.role;
    if (/エンジニア|Engineer|Dev|CTO/.test(role)) add('logic', 10);
    if (/デザイナー|Designer|Art|Creative/.test(role)) add('vision', 10);
    if (/営業|Sales|CS|HR|人事/.test(role)) add('empathy', 10);
    if (/PM|Manager|Director|Lead|Founder|CEO/.test(role)) add('drive', 15);
    if (/Admin|Ops|事務|経理/.test(role)) add('steady', 10);

    // --- 3. Keywords in Arrays (Skills, Fuel) ---
    const keywords = [
        ...profile.skills,
        ...profile.infinite_fuel
    ].join(' ').toLowerCase();

    // Logic Keywords
    if (/分析|解析|データ|論理|math|logic|data|struct/.test(keywords)) add('logic', 10);
    if (/戦略|strategy|planning/.test(keywords)) add('logic', 5);

    // Empathy Keywords
    if (/チーム|team|listening|ヒアリング|相談|育成|mentoring/.test(keywords)) add('empathy', 10);
    if (/communication|対話|人間関係/.test(keywords)) add('empathy', 5);

    // Vision Keywords
    if (/アイデア|idea|new|fresh|future|未来|新規|0to1/.test(keywords)) add('vision', 10);
    if (/art|design|表現|world/.test(keywords)) add('vision', 5);

    // Drive Keywords
    if (/実行|action|speed|スピード|達成|goal|win|leader/.test(keywords)) add('drive', 10);
    if (/challenge|挑戦|hard/.test(keywords)) add('drive', 5);

    // Steady Keywords
    if (/改善|kaizen|routine|習慣|継続|quality|品質|accuracy/.test(keywords)) add('steady', 10);
    if (/support|支える|基盤/.test(keywords)) add('steady', 5);

    // Flexibility Keywords
    if (/chaos|カオス|change|変化|travel|移動|multi|マルチ/.test(keywords)) add('flexible', 10);
    if (/adapt|適応|free|自由/.test(keywords)) {
        add('flexible', 5);
        // "Freedom" might also imply vision
        add('vision', 5);
    }

    // Check Energy Drain for inverse hints
    const drains = profile.energy_drain.join(' ').toLowerCase();
    if (/micro|細か|管理|rule|ルール/.test(drains)) add('flexible', 5); // Hates rules -> Flexible
    if (/routine|ルーチン|単調/.test(drains)) add('vision', 5); // Hates routine -> Vision/Drive
    if (/chaos|急な|変更/.test(drains)) add('steady', 5); // Hates chaos -> Steady

    return [
        { label: "論理性", value: scores.logic },
        { label: "行動力", value: scores.drive },
        { label: "協調性", value: scores.empathy },
        { label: "独創性", value: scores.vision },
        { label: "自律性", value: scores.steady },
        { label: "柔軟性", value: scores.flexible }
    ];
}
