import React from 'react';
import {RemainingIncomeTimes} from './Patch';

interface RemainingIncomeTimesButtonsProps {
    setRemainingIncomeTimes: (remainingIncomeTimes: RemainingIncomeTimes) => void;
}

export function RemainingIncomeTimesButtons({setRemainingIncomeTimes}: RemainingIncomeTimesButtonsProps) {
    const buttons: React.JSX.Element[] = [];
    for (let i = 9 as RemainingIncomeTimes; i >= 1; i-- as RemainingIncomeTimes) {
        buttons.push(<button key={i} onClick={() => setRemainingIncomeTimes(i)}>{i}</button>);
    }

    return (
        <div className="button-group">{buttons}</div>
    );
}