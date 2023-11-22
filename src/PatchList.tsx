import React from 'react';
import {Patch, Patches} from './Patch';

export function PatchList() {
    return (
        <div>
            {Patches.map((patch: Patch) => (
                <div key={patch.name()}>
                    <h1>{patch.name()}</h1>
                    <p>{patch.totalScores(9)}</p>
                </div>
            ))}
        </div>
    );
}