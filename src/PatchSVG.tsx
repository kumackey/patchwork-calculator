import {Patch} from "./Patch";
import React from "react";

export const PatchSVG = ({patch}: {
    patch: Patch
}) => {
    const cellSize = 20;
    const buttonRadius = 6;
    const buttonStrokeWidth = 1;

    const shape = patch.shape;

    // determines the position of the buttons
    const buttonPositions = [];
    let buttonsPlaced = 0;
    for (let rowIndex = 0; rowIndex < shape.length; rowIndex++) {
        for (let colIndex = 0; colIndex < shape[rowIndex].length; colIndex++) {
            if (shape[rowIndex][colIndex] && buttonsPlaced < patch.buttonsEarned) {
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
        >
            {shape.map((row: boolean[], rowIndex: number) =>
                row.map((cell: boolean, colIndex: number) => (
                    <rect
                        key={`${rowIndex}-${colIndex}`}
                        x={colIndex * cellSize}
                        y={rowIndex * cellSize}
                        width={cellSize}
                        height={cellSize}
                        fill={cell ? '#003200' : 'none'} // patch color
                        stroke="none"
                    />
                ))
            )}
            {buttonPositions.map((position: {
                x: number;
                y: number
            }, index: number) => (
                <circle
                    key={`button-${index}`}
                    cx={position.x}
                    cy={position.y}
                    r={buttonRadius}
                    fill="#55acee" // button color on patch
                    stroke="black"
                    strokeWidth={buttonStrokeWidth}
                />
            ))}
        </svg>
    );
};
