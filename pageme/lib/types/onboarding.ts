// Type definitions for the User Manual / Onboarding Form (自分図鑑)

export type AffiliationType = 'employee' | 'student' | 'freelance' | 'other';
export type DecisionStyle = 'data' | 'intuition' | 'collaborative';
export type FeedbackPreference = 'direct' | 'written' | 'gentle';
export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night';

export interface WorkStyle {
    timePreference: number; // 1-5 (1=朝型, 5=夜型)
    communicationPreference: number; // 1-5 (1=非同期, 5=同期)
    decisionStyle: DecisionStyle;
    feedbackPreference: FeedbackPreference;
}

export interface Communication {
    preferredTools: string[];
    customTool: string; // その他の入力欄
    bestTimeToReach: TimeOfDay[]; // 複数選択可に変更
    stressSigns: string[]; // 複数選択可に変更
}

export interface UserManual {
    // Step 1: 基本情報
    name: string;
    affiliationType: AffiliationType;
    industry: string; // 産業分類を追加
    affiliationName: string;
    role: string; // 選択式に変更

    // Step 2: スキル・得意領域
    skills: string[];

    // Step 3: 働き方スタイル
    workStyle: WorkStyle;

    // Step 4: Infinite Fuel / Energy Drain (旧Step 5)
    infiniteFuel: string[];
    energyDrain: string[];

    // Step 5: コミュニケーション (旧Step 6)
    communication: Communication;

    // Step 6: 起動コマンド (旧Step 7)
    activationCommand: string;
}

export const initialUserManual: UserManual = {
    name: '',
    affiliationType: 'employee',
    industry: '',
    affiliationName: '',
    role: '',
    skills: [],
    workStyle: {
        timePreference: 3,
        communicationPreference: 3,
        decisionStyle: 'collaborative',
        feedbackPreference: 'direct',
    },
    infiniteFuel: [],
    energyDrain: [],
    communication: {
        preferredTools: [],
        customTool: '',
        bestTimeToReach: [],
        stressSigns: [],
    },
    activationCommand: '',
};

// 実績ステップは削除（旧Step 4）
// 以下は後方互換性のために残すが、新しいデータファイルから読み込む
export { INITIAL_SKILLS as SKILL_OPTIONS } from '@/lib/data/skills';
export { INITIAL_INFINITE_FUEL as INFINITE_FUEL_OPTIONS, INITIAL_ENERGY_DRAIN as ENERGY_DRAIN_OPTIONS } from '@/lib/data/fuel-drain';
export { EXTENDED_COMMUNICATION_TOOLS as COMMUNICATION_TOOL_OPTIONS, INITIAL_STRESS_SIGNS as STRESS_SIGN_OPTIONS } from '@/lib/data/communication';
