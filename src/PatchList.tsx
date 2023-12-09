import React, {useCallback, CSSProperties} from 'react';
import {Patch, RemainingIncomeTimes} from './Patch';
import {useDrag, useDrop} from 'react-dnd';
import {PatchSVG} from "./PatchSVG";

const PatchType = 'patch';

interface PatchListProps {
    patches: Patch[];
    remainingIncomeTimes: RemainingIncomeTimes;
    setPatches: (patches: Patch[]) => void;
    addToPlacedPatches: (patch: Patch) => void;
}

export function PatchList({remainingIncomeTimes, patches, setPatches, addToPlacedPatches}: PatchListProps) {
    const movePatch = useCallback((dragIndex: number, hoverIndex: number) => {
        const dragPatch = patches[dragIndex];
        const newPatches = [...patches];
        newPatches.splice(dragIndex, 1);
        newPatches.splice(hoverIndex, 0, dragPatch);
        setPatches(newPatches);
    }, [patches, setPatches]);

    return (
        <div style={styles.patchList}>
            {patches.map((patch, index) => {
                return (
                    <PatchContainer
                        key={patch.name}
                        patch={patch}
                        remainingIncomeTimes={remainingIncomeTimes}
                        index={index}
                        movePatch={movePatch}
                        handlePlace={handlePlaceFunc(setPatches, addToPlacedPatches, patches)}
                    />
                );
            })}
        </div>
    );
}

function handlePlaceFunc(setPatches: (patches: Patch[]) => void, addToPlacedPatches: (patch: Patch) => void, patches: Patch[]) {
    return (patch: Patch) => {
        setPatches(patches.filter(p => p.name !== patch.name));
        addToPlacedPatches(patch);
    }
}

interface PatchContainerProps {
    patch: Patch;
    remainingIncomeTimes: RemainingIncomeTimes;
    index: number;
    movePatch: (from: number, to: number) => void;
    handlePlace: (patch: Patch) => void;
}

function PatchContainer({patch, remainingIncomeTimes, index, movePatch, handlePlace}: PatchContainerProps) {
    const [, dragRef] = useDrag({
        type: PatchType,
        item: {type: PatchType, index},
    });

    const [, dropRef] = useDrop({
        accept: PatchType,
        hover(item: {
            type: string;
            index: number
        }, monitor) {
            if (item.index !== index) {
                movePatch(item.index, index);
                item.index = index;
            }
        },
    });

    const backgroundColor = generateRandomColor(patch.name);
    const patchStyle = {...styles.patchContainer, background: backgroundColor};

    return (
        <div ref={(node) => dragRef(dropRef(node))} style={patchStyle}>
            <p><b>{patch.name}</b>
                <button style={{marginLeft: '4px'}} onClick={() => handlePlace(patch)}>
                    ×
                </button>
            </p>
            <p>🔵{patch.buttonCost} ⌛{patch.timeCost}</p>
            <p>Profit: {patch.profit(remainingIncomeTimes)}</p>
            <p>Buttons/Cost: {floor(patch.buttonsPerCost())}</p>
            <p>Profit/Time: {floor(patch.profitPerTime(remainingIncomeTimes))}</p>
            <p>Evaluation: {floor(patch.evaluation(remainingIncomeTimes))}</p>
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
