// 筆致（ブラシストローク）SVGコンポーネント
// 禅・精神性・"人間の痕跡"を表現

interface BrushProps {
    className?: string;
    color?: string;
}

// 筆致の円（エンソ）- アバター背景用
export function BrushCircle({ className = "", color = "currentColor" }: BrushProps) {
    return (
        <svg
            viewBox="0 0 200 200"
            className={className}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M100 10 C 150 10, 190 50, 190 100 C 190 150, 150 190, 100 190 C 50 190, 10 150, 10 100 C 10 50, 45 15, 95 12"
                stroke={color}
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
                style={{
                    strokeDasharray: "1000",
                    strokeDashoffset: "50",
                    filter: "url(#roughness)"
                }}
            />
            <defs>
                <filter id="roughness">
                    <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
                </filter>
            </defs>
        </svg>
    );
}

// 波線 - セクション区切り
export function BrushWave({ className = "", color = "currentColor" }: BrushProps) {
    return (
        <svg
            viewBox="0 0 400 20"
            className={className}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M0 10 Q 50 0, 100 10 T 200 10 T 300 10 T 400 10"
                stroke={color}
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
            />
        </svg>
    );
}

// 筆致のアンダーライン
export function BrushUnderline({ className = "", color = "currentColor" }: BrushProps) {
    return (
        <svg
            viewBox="0 0 200 10"
            className={className}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M5 5 Q 50 8, 100 5 T 195 6"
                stroke={color}
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
            />
        </svg>
    );
}

// 小さなドット装飾
export function BrushDot({ className = "", color = "currentColor" }: BrushProps) {
    return (
        <svg
            viewBox="0 0 20 20"
            className={className}
            fill={color}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M10 2C6 2 2 5 3 10C4 16 9 18 13 16C17 14 18 8 16 4C14 1 12 2 10 2Z" />
        </svg>
    );
}

// ハートアイコン（感情・Infinite Fuel用）- 手書き風
export function BrushHeart({ className = "", color = "#E63946" }: BrushProps) {
    return (
        <svg
            viewBox="0 0 32 32"
            className={className}
            fill={color}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M16 28C16 28 3 20 3 11C3 7 6 4 10 4C13 4 15 6 16 8C17 6 19 4 22 4C26 4 29 7 29 11C29 20 16 28 16 28Z"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill={color}
            />
        </svg>
    );
}

// 星アイコン（スキル・輝き用）- 手書き風
export function BrushStar({ className = "", color = "currentColor" }: BrushProps) {
    return (
        <svg
            viewBox="0 0 32 32"
            className={className}
            fill={color}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M16 2 L19 12 L29 12 L21 18 L24 28 L16 22 L8 28 L11 18 L3 12 L13 12 Z"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill={color}
            />
        </svg>
    );
}

// スパイラル（渦）- ロゴ的要素
export function BrushSpiral({ className = "", color = "currentColor" }: BrushProps) {
    return (
        <svg
            viewBox="0 0 100 100"
            className={className}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M50 50 C 50 45, 55 40, 60 40 C 70 40, 75 50, 75 55 C 75 65, 65 75, 50 75 C 30 75, 20 60, 20 45 C 20 25, 35 10, 55 10 C 80 10, 95 30, 95 55 C 95 85, 70 100, 45 100"
                stroke={color}
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
            />
        </svg>
    );
}

// 縦線（リスト装飾用）- 手書き風
export function BrushVerticalLine({ className = "", color = "#E63946" }: BrushProps) {
    return (
        <svg
            viewBox="0 0 10 100"
            className={className}
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M5 2 Q 8 25, 5 50 T 5 98"
                stroke={color}
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
            />
        </svg>
    );
}
