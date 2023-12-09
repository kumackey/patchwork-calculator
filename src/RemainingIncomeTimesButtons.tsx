import React from 'react';
import {RemainingIncomeTimes} from './Patch';

interface Props {
    setRemainingIncomeTimes: (remainingIncomeTimes: RemainingIncomeTimes) => void;
    resortPatches: (remainingIncomeTimes: RemainingIncomeTimes) => void;
}

export function RemainingIncomeTimesButtons({setRemainingIncomeTimes, resortPatches}: Props) {
    const buttons: React.JSX.Element[] = [];
    for (let i = 9 as RemainingIncomeTimes; i >= 1; i-- as RemainingIncomeTimes) {
        buttons.push(<button key={i} onClick={
            () => {
                setRemainingIncomeTimes(i);
                resortPatches(i);
            }
        }>{i}</button>);
    }

    return (
        <div className="button-group">{buttons}</div>
    );
}