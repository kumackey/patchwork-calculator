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
            {placedPatches.map((patch: Patch) => {
                return (
                    <PatchSVG key={patch.name} patch={patch} onClick={() => restorePlacedPatch(patch)}/>
                );
            })}
        </div>
    );
}

const styles: {
    [key: string]: CSSProperties
} = {
    archivedList: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        marginLeft: '4px',
    },
};

