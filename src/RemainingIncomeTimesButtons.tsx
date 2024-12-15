import React from 'react';
import {RemainingIncomeTimes} from './Patch';

interface RemainingIncomeTimesButtonsProps {
    remainingIncomeTimes: RemainingIncomeTimes;
    resortPatches: (remainingIncomeTimes: RemainingIncomeTimes) => void;
    setRemainingIncomeTimes: (remainingIncomeTimes: RemainingIncomeTimes) => void;
}

export function RemainingIncomeTimesButtons({
                                                remainingIncomeTimes,
                                                resortPatches,
                                                setRemainingIncomeTimes,
                                            }: RemainingIncomeTimesButtonsProps) {
    const buttons: React.JSX.Element[] = [];
    for (let i = 9 as RemainingIncomeTimes; i >= 1; i-- as RemainingIncomeTimes) {
        const isSelected = remainingIncomeTimes === i;
        buttons.push(
            <button
                key={i}
                style={isSelected ? selectedButtonStyle : buttonStyle}
                onClick={() => {
                    setRemainingIncomeTimes(i);
                    resortPatches(i);
                }}
            >
                {i}
            </button>
        );
    }

    return (
        <div style={buttonGroupStyle}>{buttons}</div>
    );
}

const buttonGroupStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
};

const buttonStyle: React.CSSProperties = {
    backgroundColor: '#f0f0f0',
    border: '1px solid #ddd',
    padding: '10px 15px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.2s',
};

const selectedButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#55acee',
    color: 'white',
    transform: 'scale(1.1)',
};

