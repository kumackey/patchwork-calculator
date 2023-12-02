import React, {useCallback} from 'react';
import {Patch, PatchShape} from './Patch';
import {CSSProperties} from 'react';
import {useDrag, useDrop} from 'react-dnd';

const PatchType = 'patch';

interface PatchListProps {
    patches: Patch[];
    remaining_income_times: number;
    setPatches: (patches: Patch[]) => void;
}

export function PatchList({remaining_income_times, patches, setPatches}: PatchListProps) {
    const movePatch = useCallback((dragIndex: number, hoverIndex: number) => {
        const dragPatch = patches[dragIndex];
        const newPatches = [...patches];
        newPatches.splice(dragIndex, 1);
        newPatches.splice(hoverIndex, 0, dragPatch);
        setPatches(newPatches);
    }, [patches, setPatches]);


    return (
        <div style={styles.container}>
            {patches.map((patch, index) => (
                <PatchContainer
                    key={patch.name()}
                    patch={patch}
                    remaining_income_times={remaining_income_times}
                    index={index}
                    movePatch={movePatch}
                />
            ))}
        </div>
    );
}

interface PatchContainerProps {
    patch: Patch;
    remaining_income_times: number;
    index: number;
    movePatch: (from: number, to: number) => void;
}

function PatchContainer({patch, remaining_income_times, index, movePatch}: PatchContainerProps) {
    const [, dragRef] = useDrag({
        type: PatchType,
        item: {type: PatchType, index},
    });

    const [, dropRef] = useDrop({
        accept: PatchType,
        hover(item: { type: string; index: number }, monitor) {
            if (item.index !== index) {
                movePatch(item.index, index);
                item.index = index;
            }
        },
    });

    const patchName = patch.name();
    return (
        <div ref={(node) => dragRef(dropRef(node))} style={styles.patch}>
            <p><b>name: {patchName}</b></p>
            <p>🔵{patch.buttonCost} ⌛{patch.timeCost}</p>
            <p>total score: {patch.totalScores(remaining_income_times)}</p>
            <p>button rate: {floor(patch.buttonRate(remaining_income_times))}</p>
            <p>time rate: {floor(patch.timeRate(remaining_income_times))}</p>
            <PatchSVG shape={patch.shape} buttons={patch.buttonsEarned}/>
        </div>
    );
}

function floor(n: number): number {
    return Math.floor(n * 100) / 100
}

const styles: { [key: string]: CSSProperties } = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        columnGap: '4px',
    },
    patch: {
        margin: '4px',
        textAlign: 'center',
        flexBasis: 'auto',
        flexGrow: 1,
        maxWidth: '160px',
        border: '2px solid black',
        background: 'floralwhite'
    },
    image: {
        width: '100%',
        height: 'auto',
    }
};

export const PatchSVG = ({shape, buttons}: { shape: PatchShape; buttons: number }) => {
    const cellSize = 20;
    const buttonRadius = 6;
    const buttonStrokeWidth = 1;

    // ボタンの位置を決定
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
                        fill={cell ? '#003200' : 'none'}
                        stroke="none"
                    />
                ))
            )}
            {buttonPositions.map((position: { x: number; y: number }, index: number) => (
                <circle
                    key={`button-${index}`}
                    cx={position.x}
                    cy={position.y}
                    r={buttonRadius}
                    fill="#55acee"
                    stroke="black"
                    strokeWidth={buttonStrokeWidth}
                />
            ))}
        </svg>
    );
};