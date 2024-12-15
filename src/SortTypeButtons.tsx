import React from 'react';
import {SortType} from "./Patch";

interface SortTypeButtonsProps {
    sortType: SortType;
    setSortType: (sortType: SortType) => void;
    resortPatches: (sortType: SortType) => void;
}

export function SortTypeButtons({
                                    resortPatches,
                                    sortType,
                                    setSortType,
                                }: SortTypeButtonsProps) {
    return (
        <div style={buttonGroupStyle}>
            {sortButtons.map(({type, label}) => (
                <button
                    key={type}
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

const sortButtons: { type: SortType, label: string }[] = [
    {type: 'evaluation', label: 'Evaluation'},
    {type: 'profit', label: 'Profit'},
];

const buttonGroupStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '4px',
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

