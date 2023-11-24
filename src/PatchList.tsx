import React from 'react';
import {Patch, Patches} from './Patch';
import {CSSProperties} from 'react';

interface PatchListProps {
    remaining_income_times: number;
}

function floor(n: number): number {
    return Math.floor(n * 100) / 100
}

export function PatchList(props: PatchListProps) {
    const { remaining_income_times } = props;

    return (
        <div style={styles.container}>
            {Patches.map((patch: Patch) => (
                <div key={patch.name()} style={styles.patch}>
                    <h1>{patch.name()}</h1>
                    <p>total score: {patch.totalScores(remaining_income_times)}</p>
                    <p>button rate: {floor(patch.buttonRate(remaining_income_times))}</p>
                    <p>time rate: {floor(patch.timeRate(remaining_income_times))}</p>
                    <img src={patch.image} alt={patch.name()} style={styles.image} />
                </div>
            ))}
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