import React, {useCallback} from 'react';
import {Patch, PatchShape, RemainingIncomeTimes} from './Patch';
import {CSSProperties} from 'react';
import {useDrag, useDrop} from 'react-dnd';

const PatchType = 'patch';

interface PatchListProps {
    patches: Patch[];
    remainingIncomeTimes: RemainingIncomeTimes;
    setPatches: (patches: Patch[]) => void;
}

export function PatchList({remainingIncomeTimes, patches, setPatches}: PatchListProps) {
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
    movePatch: (from: number, to: number) => void;
}

function PatchContainer({patch, remainingIncomeTimes, index, movePatch}: PatchContainerProps) {
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
            <p><b>{patch.name}</b></p>
            <p>🔵{patch.buttonCost} ⌛{patch.timeCost}</p>
            <p>total score: {patch.totalScores(remainingIncomeTimes)}</p>
            <p>button rate: {floor(patch.buttonRate(remainingIncomeTimes))}</p>
            <p>time rate: {floor(patch.timeRate(remainingIncomeTimes))}</p>
            <PatchSVG shape={patch.shape} buttons={patch.buttonsEarned}/>
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

export const PatchSVG = ({shape, buttons}: {
    shape: PatchShape;
    buttons: number
}) => {
    const cellSize = 20;
    const buttonRadius = 6;
    const buttonStrokeWidth = 1;

    // determines the position of the buttons
    const buttonPositions = [];
    let buttonsPlaced = 0;
    for (let rowIndex = 0; rowIndex < shape.length; rowIndex++) {
        for (let colIndex = 0; colIndex < shape[rowIndex].length; colIndex++) {
            if (shape[rowIndex][colIndex] && buttonsPlaced < buttons) {
                buttonPositions.push({x: colIndex * cellSize + cellSize / 2, y: rowIndex * cellSize + cellSize / 2});
                buttonsPlaced++;
            }
        }
    }

    return (
        <svg
            width={shape[0].length * cellSize}
            height={shape.length * cellSize}
            xmlns="http://www.w3.org/2000/svg"
        >
            {shape.map((row: boolean[], rowIndex: number) =>
                row.map((cell: boolean, colIndex: number) => (
                    <rect
                        key={`${rowIndex}-${colIndex}`}
                        x={colIndex * cellSize}
                        y={rowIndex * cellSize}
                        width={cellSize}
                        height={cellSize}
                        fill={cell ? '#003200' : 'none'} // patch color
                        stroke="none"
                    />
                ))
            )}
            {buttonPositions.map((position: {
                x: number;
                y: number
            }, index: number) => (
                <circle
                    key={`button-${index}`}
                    cx={position.x}
                    cy={position.y}
                    r={buttonRadius}
                    fill="#55acee" // button color on patch
                    stroke="black"
                    strokeWidth={buttonStrokeWidth}
                />
            ))}
        </svg>
    );
};

// HACK: I don't know anything about CSS... Help me...
const styles: {
    [key: string]: CSSProperties
} = {
    patchList: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        columnGap: '4px',
    },
    patchContainer: {
        margin: '4px',
        textAlign: 'center',
        flexBasis: 'auto',
        flexGrow: 1,
        maxWidth: '160px',
        border: '1px solid black',
    },
};
