import React from 'react';
import {SortType} from "./Patch";

interface SortTypeButtonsProps {
    sortType: SortType;
    setSortType: (sortType: SortType) => void;
    resortPatches: (sortType: SortType) => void;
}

export function SortTypeButtons({resortPatches, sortType, setSortType}: SortTypeButtonsProps) {
    return (
        <div style={buttonGroupStyle}>
            {sortButtons.map(({type, label}) => (
                <button
                    key={type}
                    className={`sort-type-button${sortType === type ? ' selected' : ''}`}
                    style={sortType === type ? selectedButtonStyle : buttonStyle}
                    onClick={() => {
                        setSortType(type);
                        resortPatches(type);
                    }}
                >
                    {label}
                </button>
            ))}
        </div>
    );
}

const sortButtons: {type: SortType; label: string}[] = [
    {type: 'evaluation', label: 'Evaluation'},
    {type: 'profit', label: 'Profit'},
];

const buttonGroupStyle: React.CSSProperties = {
    display: 'inline-flex',
    backgroundColor: '#f1f5f9',
    borderRadius: '8px',
    padding: '3px',
    gap: '2px',
};

const buttonStyle: React.CSSProperties = {
    padding: '7px 18px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: 'transparent',
    color: '#64748b',
    fontSize: '0.875rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.15s',
};

const selectedButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#ffffff',
    color: '#1e293b',
    fontWeight: 600,
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
};
