import React, {CSSProperties} from 'react';
import {Patch, RemainingIncomeTimes} from './Patch';
import {PatchSVG} from "./PatchSVG";

interface PatchListProps {
    patches: Patch[];
    remainingIncomeTimes: RemainingIncomeTimes;
    placePatch: (patch: Patch) => void;
}

export function PatchList({remainingIncomeTimes, patches, placePatch}: PatchListProps) {
    return (
        <div style={styles.patchList}>
            {patches.map((patch, index) => {
                return (
                    <PatchContainer
                        key={patch.name}
                        patch={patch}
                        remainingIncomeTimes={remainingIncomeTimes}
                        index={index}
                        placePatch={placePatch}
                    />
                );
            })}
        </div>
    );
}

interface PatchContainerProps {
    patch: Patch;
    remainingIncomeTimes: RemainingIncomeTimes;
    index: number;
    placePatch: (patch: Patch) => void;
}

function PatchContainer({patch, remainingIncomeTimes, index, placePatch}: PatchContainerProps) {
    const backgroundColor = generateRandomColor(patch.name);
    const patchStyle = {...styles.patchContainer, background: backgroundColor};

    return (
        <div style={patchStyle}>
            <p><b>{patch.name}</b>
                <button style={{marginLeft: '4px'}} onClick={() => placePatch(patch)}>×</button>
            </p>
            <p>🔵{patch.buttonCost} ⌛{patch.timeCost}</p>
            <p>Profit: {patch.profit(remainingIncomeTimes)}</p>
            <p>Buttons/Cost: {floor(patch.buttonsPerCost())}</p>
            <p>Profit/Time: {floor(patch.profitPerTime(remainingIncomeTimes))}</p>
            <p><b>Evaluation: {floor(patch.evaluation(remainingIncomeTimes))}</b></p>
            <PatchSVG patch={patch}/>
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
