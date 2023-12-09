import React from 'react';
import {RemainingIncomeTimes} from './Patch';

interface Props {
    resortPatches: (remainingIncomeTimes: RemainingIncomeTimes) => void;
}

export function RemainingIncomeTimesButtons({resortPatches}: Props) {
    const buttons: React.JSX.Element[] = [];
    for (let i = 9 as RemainingIncomeTimes; i >= 1; i-- as RemainingIncomeTimes) {
        buttons.push(<button key={i} onClick={() => {
            resortPatches(i)
        }}>{i}</button>);
    }

    return (
        <div className="button-group">{buttons}</div>
    );
}