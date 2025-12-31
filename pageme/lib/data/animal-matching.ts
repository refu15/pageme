// 動物マッチング - プロフィールデータからユーザーに合った動物を選ぶ

export interface AnimalMatch {
    animal: string;
    emoji: string;
    description: string;
    traits: string[];
}

// 動物リスト（Nano Banana スタイル）
export const ANIMALS: AnimalMatch[] = [
    {
        animal: 'cat',
        emoji: '🐱',
        description: '独立心が強く、自分のペースを大切にするタイプ',
        traits: ['マイペース', '観察力', '独立心', '夜型']
    },
    {
        animal: 'dog',
        emoji: '🐕',
        description: '協調性があり、チームワークを大切にするタイプ',
        traits: ['協調性', '忠誠心', '社交的', '行動力']
    },
    {
        animal: 'owl',
        emoji: '🦉',
        description: '知識欲が強く、深く考えるタイプ',
        traits: ['分析力', '知識欲', '夜型', '冷静']
    },
    {
        animal: 'fox',
        emoji: '🦊',
        description: '頭の回転が速く、柔軟に対応するタイプ',
        traits: ['柔軟性', '適応力', '創造性', '独立心']
    },
    {
        animal: 'bear',
        emoji: '🐻',
        description: '力強く、包容力があるタイプ',
        traits: ['包容力', 'リーダーシップ', '安定感', '信頼性']
    },
    {
        animal: 'rabbit',
        emoji: '🐰',
        description: 'スピード感があり、繊細な感性を持つタイプ',
        traits: ['敏捷性', '繊細さ', '直感力', '朝型']
    },
    {
        animal: 'dolphin',
        emoji: '🐬',
        description: 'コミュニケーション上手で、知的好奇心が旺盛なタイプ',
        traits: ['コミュニケーション', '知的好奇心', '遊び心', '協調性']
    },
    {
        animal: 'eagle',
        emoji: '🦅',
        description: '高い視点を持ち、目標に向かって突き進むタイプ',
        traits: ['ビジョン', '決断力', '集中力', 'リーダーシップ']
    },
    {
        animal: 'penguin',
        emoji: '🐧',
        description: 'チームプレーが得意で、粘り強いタイプ',
        traits: ['粘り強さ', 'チームワーク', '忍耐力', '安定感']
    },
    {
        animal: 'lion',
        emoji: '🦁',
        description: '堂々としたリーダーシップを発揮するタイプ',
        traits: ['リーダーシップ', '自信', '決断力', '行動力']
    },
    {
        animal: 'panda',
        emoji: '🐼',
        description: '穏やかでマイペース、癒しを与えるタイプ',
        traits: ['穏やか', 'マイペース', '癒し', 'バランス']
    },
    {
        animal: 'wolf',
        emoji: '🐺',
        description: '戦略的思考と仲間を大切にするタイプ',
        traits: ['戦略性', '協調性', '忠誠心', '直感力']
    }
];

// プロフィールから動物を決定するロジック
export function matchAnimal(profile: {
    work_style?: {
        time_preference?: number; // 1=朝型, 5=夜型
        communication_preference?: number; // 1=非同期, 5=同期
        decision_style?: string; // 'data' | 'intuition' | 'collaborative'
        feedback_preference?: string; // 'direct' | 'written' | 'gentle'
    };
    infinite_fuel?: string[];
    energy_drain?: string[];
    skills?: string[];
}): AnimalResult {
    // スコアリングシステム
    const scores: Record<string, number> = {};
    ANIMALS.forEach(a => scores[a.animal] = 0);

    const workStyle = profile.work_style || {};

    // 時間帯の好み
    if (workStyle.time_preference) {
        if (workStyle.time_preference >= 4) {
            // 夜型
            scores['owl'] += 3;
            scores['cat'] += 2;
            scores['fox'] += 1;
        } else if (workStyle.time_preference <= 2) {
            // 朝型
            scores['rabbit'] += 3;
            scores['eagle'] += 2;
            scores['dog'] += 1;
        }
    }

    // コミュニケーションスタイル
    if (workStyle.communication_preference) {
        if (workStyle.communication_preference >= 4) {
            // 同期重視（リアルタイム）
            scores['dolphin'] += 3;
            scores['dog'] += 2;
            scores['lion'] += 1;
        } else if (workStyle.communication_preference <= 2) {
            // 非同期重視
            scores['cat'] += 3;
            scores['owl'] += 2;
            scores['fox'] += 1;
        }
    }

    // 意思決定スタイル
    if (workStyle.decision_style === 'data') {
        scores['owl'] += 2;
        scores['eagle'] += 1;
    } else if (workStyle.decision_style === 'intuition') {
        scores['fox'] += 2;
        scores['rabbit'] += 1;
    } else if (workStyle.decision_style === 'collaborative') {
        scores['dog'] += 2;
        scores['penguin'] += 2;
        scores['wolf'] += 1;
    }

    // フィードバックスタイル
    if (workStyle.feedback_preference === 'direct') {
        scores['lion'] += 2;
        scores['eagle'] += 1;
    } else if (workStyle.feedback_preference === 'written') {
        scores['owl'] += 2;
        scores['cat'] += 1;
    } else if (workStyle.feedback_preference === 'gentle') {
        scores['panda'] += 2;
        scores['rabbit'] += 1;
    }

    // Infinite Fuelからのキーワードマッチング
    const fuelKeywords: Record<string, string[]> = {
        'owl': ['分析', '調査', 'リサーチ', '学習', '知識', '読書'],
        'eagle': ['目標', '達成', 'リード', '戦略', '計画'],
        'fox': ['問題解決', '創造', 'アイデア', '改善', '効率'],
        'dog': ['チーム', '協力', 'サポート', '教える', 'メンバー'],
        'lion': ['リーダー', '影響', '説得', 'プレゼン', '決断'],
        'dolphin': ['コミュニケーション', '交流', 'ネットワーク', '楽しい'],
        'cat': ['独立', '自律', '集中', '没頭', 'ゾーン'],
        'rabbit': ['スピード', '素早い', '反応', '直感'],
        'bear': ['保護', 'メンタリング', '育成', '安心'],
        'penguin': ['粘り強い', '継続', 'コツコツ', '地道'],
        'panda': ['バランス', '調和', '穏やか', 'リラックス'],
        'wolf': ['戦略', 'チーム', '信頼', '仲間']
    };

    (profile.infinite_fuel || []).forEach(fuel => {
        Object.entries(fuelKeywords).forEach(([animal, keywords]) => {
            keywords.forEach(keyword => {
                if (fuel.includes(keyword)) {
                    scores[animal] += 1;
                }
            });
        });
    });

    // スコアを集計してソート
    const totalScore = Object.values(scores).reduce((a, b) => a + b, 0) || 1; // 0除算防止

    const rankedAnimals = ANIMALS.map(animal => ({
        animal: animal, // AnimalMatch object
        score: scores[animal.animal],
        percentage: Math.round((scores[animal.animal] / totalScore) * 100)
    })).sort((a, b) => b.score - a.score);

    // 最高スコアの動物
    const bestMatch = rankedAnimals[0].score > 0 ? rankedAnimals[0].animal : (ANIMALS.find(a => a.animal === 'fox') || ANIMALS[0]);

    return {
        best: bestMatch,
        matches: rankedAnimals
    };
}

export type AnimalResult = {
    best: AnimalMatch;
    matches: {
        animal: AnimalMatch;
        score: number;
        percentage: number;
    }[];
};

// DiceBear APIでアバターURLを生成
export function getAnimalAvatarUrl(animal: string, seed: string): string {
    // DiceBear の bottts や lorelei スタイルを使用
    // 動物に応じたカスタムシード
    return `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${animal}-${seed}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;
}
