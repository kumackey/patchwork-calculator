import React, {useCallback} from 'react';
import {Patch, Patches} from './Patch';
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
            {/*<p>button cost: {patch.buttonCost}, time cost: {patch.timeCost}</p>*/}
            <p>total score: {patch.totalScores(remaining_income_times)}</p>
            <p>button rate: {floor(patch.buttonRate(remaining_income_times))}</p>
            <p>time rate: {floor(patch.timeRate(remaining_income_times))}</p>
            <img src={patch.image} alt={patchName} style={styles.image}/>
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
    },
    image: {
        width: '100%',
        height: 'auto',
    }
};