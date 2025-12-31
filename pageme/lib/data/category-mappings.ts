import { ALL_INFINITE_FUEL, ALL_ENERGY_DRAIN } from './fuel-drain';

// Define categories for Infinite Fuel
export const FUEL_CATEGORIES: Record<string, string> = {};

// Helper to bulk assign
const assignFuel = (items: string[], category: string) => {
    items.forEach(item => FUEL_CATEGORIES[item] = category);
};

// Based on the comments in fuel-drain.ts
assignFuel(ALL_INFINITE_FUEL.slice(0, 10), 'Problem Solving'); // 問題解決・分析系
assignFuel(ALL_INFINITE_FUEL.slice(10, 20), 'Creativity'); // 創造・企画系
assignFuel(ALL_INFINITE_FUEL.slice(20, 30), 'Learning'); // 学習・成長系
assignFuel(ALL_INFINITE_FUEL.slice(30, 40), 'Mentoring'); // 人との関わり系
assignFuel(ALL_INFINITE_FUEL.slice(40, 50), 'Communication'); // コミュニケーション系
assignFuel(ALL_INFINITE_FUEL.slice(50, 60), 'Management'); // 組織・マネジメント系
assignFuel(ALL_INFINITE_FUEL.slice(60, 70), 'Outreach'); // 対外活動系
assignFuel(ALL_INFINITE_FUEL.slice(70, 80), 'Operations'); // 実務・オペレーション系
assignFuel(ALL_INFINITE_FUEL.slice(80, 90), 'Deep Focus'); // 集中作業系
assignFuel(ALL_INFINITE_FUEL.slice(90, 100), 'Achievement'); // その他

// Define categories for Energy Drain
export const DRAIN_CATEGORIES: Record<string, string> = {};

const assignDrain = (items: string[], category: string) => {
    items.forEach(item => DRAIN_CATEGORIES[item] = category);
};

// Based on the comments in fuel-drain.ts
assignDrain(ALL_ENERGY_DRAIN.slice(0, 10), 'Communication Issues'); // コミュニケーション系
assignDrain(ALL_ENERGY_DRAIN.slice(10, 20), 'Unclear Direction'); // 指示・方針系
assignDrain(ALL_ENERGY_DRAIN.slice(20, 30), 'Poor Environment'); // 作業環境系
assignDrain(ALL_ENERGY_DRAIN.slice(30, 40), 'Boring Work'); // 仕事内容系
assignDrain(ALL_ENERGY_DRAIN.slice(40, 50), 'Toxic Relationships'); // 対人関係系
assignDrain(ALL_ENERGY_DRAIN.slice(50, 60), 'Unfair Treatment'); // 評価・待遇系
assignDrain(ALL_ENERGY_DRAIN.slice(60, 70), 'Time Pressure'); // 時間・ペース系
assignDrain(ALL_ENERGY_DRAIN.slice(70, 80), 'Psychological Safety'); // 心理的負担系
assignDrain(ALL_ENERGY_DRAIN.slice(80, 90), 'Lack of Transparency'); // 情報・透明性系
assignDrain(ALL_ENERGY_DRAIN.slice(90, 100), 'Restrictions'); // その他

// Helper to get category
export function getItemCategory(item: string, type: 'fuel' | 'drain'): string {
    if (type === 'fuel') {
        return FUEL_CATEGORIES[item] || 'General';
    } else {
        return DRAIN_CATEGORIES[item] || 'General';
    }
}

// Helper to analyze dominant categories
export function getDominantCategory(items: string[], type: 'fuel' | 'drain'): string {
    const counts: Record<string, number> = {};
    items.forEach(item => {
        const cat = getItemCategory(item, type);
        counts[cat] = (counts[cat] || 0) + 1;
    });

    // Sort by count
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    return sorted.length > 0 ? sorted[0][0] : '';
}

export const CATEGORY_DETAILS: Record<string, { label: string, emoji: string, color: string }> = {
    // Fuel
    'Problem Solving': { label: '問題解決', emoji: '🧩', color: '#E9D5FF' },
    'Creativity': { label: '創造', emoji: '✨', color: '#FEF08A' },
    'Learning': { label: '学習', emoji: '📚', color: '#BFDBFE' },
    'Mentoring': { label: '育成', emoji: '🌱', color: '#BBF7D0' },
    'Communication': { label: '対話', emoji: '💬', color: '#DDD6FE' },
    'Management': { label: '統率', emoji: '⚖️', color: '#FECACA' },
    'Outreach': { label: '発信', emoji: '📢', color: '#FDBA74' },
    'Operations': { label: '基盤', emoji: '⚙️', color: '#E2E8F0' },
    'Deep Focus': { label: '没頭', emoji: '🔭', color: '#A7F3D0' },
    'Achievement': { label: '達成', emoji: '🏆', color: '#FDE68A' },
    'General': { label: '全般', emoji: '🌟', color: '#F3F4F6' },

    // Drain
    'Communication Issues': { label: '意思疎通', emoji: '🔇', color: '#E5E7EB' },
    'Unclear Direction': { label: '方向性', emoji: '🧭', color: '#E5E7EB' },
    'Poor Environment': { label: '環境', emoji: '🏚️', color: '#E5E7EB' },
    'Boring Work': { label: '単調', emoji: '💤', color: '#E5E7EB' },
    'Toxic Relationships': { label: '人間関係', emoji: '💢', color: '#E5E7EB' },
    'Unfair Treatment': { label: '不公平', emoji: '⚖️', color: '#E5E7EB' },
    'Time Pressure': { label: '切迫', emoji: '⏳', color: '#E5E7EB' },
    'Psychological Safety': { label: '心理的不安', emoji: '😨', color: '#E5E7EB' },
    'Lack of Transparency': { label: '不透明', emoji: '🌫️', color: '#E5E7EB' },
    'Restrictions': { label: '制限', emoji: '⛓️', color: '#E5E7EB' },
};
