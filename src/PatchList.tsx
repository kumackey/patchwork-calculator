import React from 'react';
import {Patch, Patches} from './Patch';
import {CSSProperties} from 'react';

interface PatchListProps {
    remaining_income_times: number;
}

export function PatchList({remaining_income_times}: PatchListProps) {
    return (
        <div style={styles.container}>
            {Patches.map((patch: Patch) => {
                return (
                    <PatchContainer key={patch.name()} patch={patch} remaining_income_times={remaining_income_times}/>
                );
            })}
        </div>
    );
}

interface PatchContainerProps {
    patch: Patch;
    remaining_income_times: number;
}

function PatchContainer({patch, remaining_income_times}: PatchContainerProps) {
    const patchName = patch.name();
    return (
        <div style={styles.patch}>
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