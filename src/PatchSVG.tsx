import {Patch} from "./Patch";
import React from "react";

interface PatchSVGProps {
    patch: Patch;
    onClick?: () => void;
    fillColor?: string;
}

export const PatchSVG = ({patch, onClick, fillColor = '#334155'}: PatchSVGProps) => {
    const cellSize = 20;
    const buttonRadius = 5;

    const shape = patch.shape;

    const buttonPositions = [];
    let buttonsPlaced = 0;
    for (let rowIndex = 0; rowIndex < shape.length; rowIndex++) {
        for (let colIndex = 0; colIndex < shape[rowIndex].length; colIndex++) {
            if (shape[rowIndex][colIndex] && buttonsPlaced < patch.buttons) {
                buttonPositions.push({x: colIndex * cellSize + cellSize / 2, y: rowIndex * cellSize + cellSize / 2});
                buttonsPlaced++;
            }
        }
    }

    return (
        <svg
            width={shape[0].length * cellSize}
            height={shape.length * cellSize}
            xmlns="http://www.w3.org/2000/svg"
            style={{margin: '4px', cursor: onClick ? 'pointer' : 'default'}}
            onClick={onClick}
        >
            {shape.map((row: boolean[], rowIndex: number) =>
                row.map((cell: boolean, colIndex: number) => (
                    <rect
                        key={`${rowIndex}-${colIndex}`}
                        x={colIndex * cellSize}
                        y={rowIndex * cellSize}
                        width={cellSize}
                        height={cellSize}
                        fill={cell ? fillColor : 'rgba(0,0,0,0.04)'}
                        stroke="none"
                    />
                ))
            )}
            {buttonPositions.map((position: {x: number; y: number}, index: number) => (
                <circle
                    key={`button-${index}`}
                    cx={position.x}
                    cy={position.y}
                    r={buttonRadius}
                    fill="rgba(255,255,255,0.85)"
                    stroke="rgba(0,0,0,0.25)"
                    strokeWidth={1}
                />
            ))}
        </svg>
    );
};
