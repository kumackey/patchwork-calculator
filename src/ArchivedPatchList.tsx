import React, {CSSProperties} from 'react';
import {Patch} from './Patch';
import {PatchSVG} from "./PatchSVG";

interface PatchListProps {
    archivedPatches: Patch[];
}

export function ArchivedPatchList({archivedPatches}: PatchListProps) {
    return (
        <div style={styles.archivedList}>
            {archivedPatches.map((patch: Patch) => {
                return (
                    <PatchSVG key={patch.name} patch={patch}/>
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
        gap: '4px',
    },
};

