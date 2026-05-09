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
                className={`income-time-button${isSelected ? ' selected' : ''}`}
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

    return <div style={buttonGroupStyle}>{buttons}</div>;
}

const buttonGroupStyle: React.CSSProperties = {
    display: 'flex',
    gap: '4px',
    flexWrap: 'wrap',
};

const buttonStyle: React.CSSProperties = {
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    backgroundColor: '#ffffff',
    color: '#64748b',
    fontSize: '0.875rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.15s',
    padding: 0,
};

const selectedButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#6366f1',
    color: '#ffffff',
    border: '1px solid #6366f1',
    fontWeight: 600,
    boxShadow: '0 1px 4px rgba(99,102,241,0.4)',
};
