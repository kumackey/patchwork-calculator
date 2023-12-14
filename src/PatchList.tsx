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
            {patches.map((patch) => {
                return (
                    <PatchContainer
                        key={patch.name}
                        patch={patch}
                        remainingIncomeTimes={remainingIncomeTimes}
                        placePatch={placePatch}
                        sortType={sortType}
                    />
                );
            })}
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
    const backgroundColor = generateRandomColor(patch.name);
    const patchStyle = {...styles.patchContainer, background: backgroundColor};

    return (
        <div style={patchStyle}>
            <p><b>{patch.name}</b>
                <button style={{marginLeft: '4px'}} onClick={() => placePatch(patch)}>×</button>
            </p>
            <PatchSVG patch={patch}/>
            <p>🔵{patch.buttonCost} ⌛{patch.timeCost}</p>
            <p style={sortType === 'profit' ? emphasizedStyle : undefined}>
                Profit: {patch.profit(remainingIncomeTimes)}
            </p>
            <p>Buttons/Cost: {floor(patch.buttonsPerCost())}</p>
            <p>Profit/Time: {floor(patch.profitPerTime(remainingIncomeTimes))}</p>
            <p style={sortType === 'evaluation' ? emphasizedStyle : undefined}>
                Evaluation: {floor(patch.evaluation(remainingIncomeTimes))}
            </p>
        </div>
    );
}

function generateRandomColor(str: string): string {
    const seeds = [
        // HACK: use the same seed
        seedFromString(str),
        seedFromString(str + str),
        seedFromString(str + str + str),
    ];

    const randomNums = seeds.map(seed => Math.abs(seed) % 16);
    const hexParts = randomNums.map(num => num.toString(16));

    // e.g. #faf1fe
    return `#f${hexParts[0]}f${hexParts[1]}f${hexParts[2]}`;
}

// HACK: Probably better to use a library
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
    // e.g. 1.3333... -> 1.33
    return Math.floor(n * 100) / 100
}

// HACK: I don't know anything about CSS... Help me...
const styles: {
    [key: string]: CSSProperties
} = {
    patchList: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    },
    patchContainer: {
        margin: '1px',
        textAlign: 'center',
        flexBasis: 'auto',
        flexGrow: 1,
        maxWidth: '160px',
        border: '1px solid black',
    },
};

const emphasizedStyle: React.CSSProperties = {fontWeight: 'bold'};
