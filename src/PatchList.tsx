import React from 'react';
import {Patch, Patches} from './Patch';
import {CSSProperties} from 'react';

interface PatchListProps {
    remaining_income_times: number;
}

function floor(n: number): number {
    return Math.floor(n * 100) / 100
}

export function PatchList({remaining_income_times}: PatchListProps) {
    return (
        <div style={styles.container}>
            {Patches.map((patch: Patch) => {
                const patchName = patch.name();
                return (
                    <div key={patchName} style={styles.patch}>
                        <p><b>name: {patchName}</b></p>
                        {/*<p>button cost: {patch.buttonCost}, time cost: {patch.timeCost}</p>*/}
                        <p>total score: {patch.totalScores(remaining_income_times)}</p>
                        <p>button rate: {Math.floor(patch.buttonRate(remaining_income_times))}</p>
                        <p>time rate: {Math.floor(patch.timeRate(remaining_income_times))}</p>
                        <img src={patch.image} alt={patchName} style={styles.image}/>
                    </div>
                );
            })}
        </div>
    );
}

const styles: { [key: string]: CSSProperties } = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    },
    patch: {
        margin: '10px',
        textAlign: 'center',
        flexBasis: 'auto',
        flexGrow: 1,
        maxWidth: '160px',
    },
    image: {
        width: '100%',
        height: 'auto',
    }
};