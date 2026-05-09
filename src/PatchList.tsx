import React, {CSSProperties} from 'react';
import {Patch, RemainingIncomeTimes, SortType} from './Patch';
import {PatchSVG} from "./PatchSVG";

interface PatchListProps {
    patches: Patch[];
    remainingIncomeTimes: RemainingIncomeTimes;
    placePatch: (patch: Patch) => void;
    sortType: SortType;
}

export function PatchList({remainingIncomeTimes, patches, placePatch, sortType}: PatchListProps) {
    return (
        <div style={styles.patchList}>
            {patches.map((patch) => (
                <PatchContainer
                    key={patch.name}
                    patch={patch}
                    remainingIncomeTimes={remainingIncomeTimes}
                    placePatch={placePatch}
                    sortType={sortType}
                />
            ))}
        </div>
    );
}

interface PatchContainerProps {
    patch: Patch;
    remainingIncomeTimes: RemainingIncomeTimes;
    placePatch: (patch: Patch) => void;
    sortType: SortType;
}

function PatchContainer({patch, remainingIncomeTimes, placePatch, sortType}: PatchContainerProps) {
    const patchColor = generatePatchColor(patch.name);

    return (
        <div className="patch-card" style={{...styles.patchContainer, borderTop: `4px solid ${patchColor}`}}>
            <div style={styles.patchHeader}>
                <span style={styles.patchName}>{patch.name}</span>
                <button
                    className="place-button"
                    style={styles.placeButton}
                    onClick={() => placePatch(patch)}
                    title="Mark as placed"
                >
                    ✓
                </button>
            </div>
            <div style={styles.svgContainer}>
                <PatchSVG patch={patch} fillColor={patchColor}/>
            </div>
            <div style={styles.costRow}>
                <span style={styles.costItem}>🔵 {patch.buttonCost}</span>
                <span style={styles.costItem}>⌛ {patch.timeCost}</span>
            </div>
            <div style={styles.stats}>
                <StatRow
                    label="Profit"
                    value={patch.profit(remainingIncomeTimes)}
                    highlighted={sortType === 'profit'}
                />
                <StatRow
                    label="Btn/Cost"
                    value={floor(patch.buttonsPerCost())}
                />
                <StatRow
                    label="Profit/t"
                    value={floor(patch.profitPerTime(remainingIncomeTimes))}
                />
                <StatRow
                    label="Eval"
                    value={floor(patch.evaluation(remainingIncomeTimes))}
                    highlighted={sortType === 'evaluation'}
                />
            </div>
        </div>
    );
}

interface StatRowProps {
    label: string;
    value: number;
    highlighted?: boolean;
}

function StatRow({label, value, highlighted}: StatRowProps) {
    const isNegative = value < 0;
    const valueStyle: CSSProperties = {
        ...styles.statValue,
        ...(isNegative
            ? {color: '#ef4444', fontWeight: 700}
            : highlighted
                ? {color: '#6366f1', fontWeight: 700}
                : {}),
    };
    const rowStyle: CSSProperties = {
        ...styles.statRow,
        ...(highlighted ? styles.statHighlight : {}),
    };

    return (
        <div style={rowStyle}>
            <span style={styles.statLabel}>{label}</span>
            <span style={valueStyle}>{value}</span>
        </div>
    );
}

function generatePatchColor(str: string): string {
    const seed1 = seedFromString(str);
    const seed2 = seedFromString(str + str);
    const seed3 = seedFromString(str + str + str);

    const hue = Math.abs(seed1) % 360;
    const saturation = 55 + (Math.abs(seed2) % 20);
    const lightness = 48 + (Math.abs(seed3) % 14);
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function seedFromString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0;
    }
    return hash;
}

function floor(n: number): number {
    return Math.floor(n * 100) / 100;
}

const styles: {[key: string]: CSSProperties} = {
    patchList: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: '12px',
    },
    patchContainer: {
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.08)',
        padding: '10px',
        width: '148px',
        flexShrink: 0,
        overflow: 'hidden',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
    },
    patchHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '4px',
    },
    patchName: {
        fontSize: '0.75rem',
        fontWeight: 600,
        color: '#1e293b',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        flex: 1,
        marginRight: '4px',
        fontVariantNumeric: 'tabular-nums',
    },
    placeButton: {
        width: '22px',
        height: '22px',
        borderRadius: '6px',
        border: '1px solid #e2e8f0',
        backgroundColor: '#f8fafc',
        color: '#64748b',
        fontSize: '0.7rem',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        flexShrink: 0,
    },
    svgContainer: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 0,
        padding: '4px 0',
    },
    costRow: {
        display: 'flex',
        gap: '8px',
        justifyContent: 'center',
        fontSize: '0.75rem',
        color: '#64748b',
        margin: '4px 0',
    },
    costItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '2px',
        fontVariantNumeric: 'tabular-nums',
    },
    stats: {
        borderTop: '1px solid #f1f5f9',
        paddingTop: '6px',
        marginTop: '4px',
    },
    statRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '2px 0',
        borderRadius: '4px',
    },
    statHighlight: {
        backgroundColor: '#eef2ff',
        padding: '2px 4px',
        margin: '0 -4px',
        borderRadius: '4px',
    },
    statLabel: {
        fontSize: '0.7rem',
        color: '#94a3b8',
        fontWeight: 500,
    },
    statValue: {
        fontSize: '0.75rem',
        color: '#1e293b',
        fontWeight: 600,
        fontVariantNumeric: 'tabular-nums',
    },
};
