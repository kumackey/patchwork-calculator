import React, {CSSProperties} from 'react';
import {Patch} from './Patch';
import {PatchSVG} from "./PatchSVG";

interface PatchListProps {
    placedPatches: Patch[];
    restorePlacedPatch: (patch: Patch) => void;
}

export function PlacedPatchList({placedPatches, restorePlacedPatch}: PatchListProps) {
    return (
        <div style={styles.archivedList}>
            {placedPatches.map((patch: Patch) => (
                <div
                    key={patch.name}
                    className="placed-item"
                    style={styles.placedItem}
                    title={`${patch.name} — click to restore`}
                >
                    <PatchSVG patch={patch} onClick={() => restorePlacedPatch(patch)}/>
                </div>
            ))}
        </div>
    );
}

const styles: {[key: string]: CSSProperties} = {
    archivedList: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: '8px',
    },
    placedItem: {
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        opacity: 0.7,
        cursor: 'pointer',
        overflow: 'hidden',
    },
};
