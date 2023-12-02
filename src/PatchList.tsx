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
            <PatchSVG shape={patch.shape}/>
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
        justifyContent: 'space-around'
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

const PatchSVG = ({ shape }: { shape: PatchShape }) => {
    const cellSize = 20;

    return (
        <svg
            width={shape[0].length * cellSize}
            height={shape.length * cellSize}
            xmlns="http://www.w3.org/2000/svg"
        >
            {shape.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                    <rect
                        key={`${rowIndex}-${colIndex}`}
                        x={colIndex * cellSize}
                        y={rowIndex * cellSize}
                        width={cellSize}
                        height={cellSize}
                        fill={cell ? 'black' : 'none'}
                        stroke="none"
                    />
                ))
            )}
        </svg>
    );
};