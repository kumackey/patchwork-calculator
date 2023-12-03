import React from 'react';
import {Patch} from './Patch';
import {PatchSVG} from "./PatchSVG";

interface PatchListProps {
    archivedPatches: Patch[];
}

export function ArchivedPatchList({archivedPatches}: PatchListProps) {
    return (
        <div>
            {archivedPatches.map((patch, index) => {
                return (
                    <PatchSVG key={patch.name} patch={patch}/>
                );
            })}
        </div>
    );
}
