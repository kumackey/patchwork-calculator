import {useState} from 'react';
import {PatchList} from './PatchList';
import {ArchivedPatchList} from './ArchivedPatchList';
import './App.css';
import {defaultPatches, Patch, RemainingIncomeTimes} from "./Patch";

function App() {
    const defaultRemainingIncomeTimes: RemainingIncomeTimes = 9;
    const [remainingIncomeTimes, setRemainingIncomeTimes] = useState<RemainingIncomeTimes>(defaultRemainingIncomeTimes);
    const [patches, setPatches] = useState(defaultPatches(defaultRemainingIncomeTimes));
    const [archivedPatches, setArchivedPatches] = useState<Patch[]>([]);

    const buttons = [];
    for (let i = 9 as RemainingIncomeTimes; i >= 1; i-- as RemainingIncomeTimes) {
        buttons.push(<button key={i} onClick={() => setRemainingIncomeTimes(i)}>{i}</button>);
    }

    const addArchivedPatches = (patch: Patch) => {
        archivedPatches.push(patch);
    }

    return (
        <div className="App">
            <div className="button-group">
                {buttons}
            </div>
            <PatchList patches={patches}
                       remainingIncomeTimes={remainingIncomeTimes}
                       setPatches={setPatches}
                       addArchivedPatches={addArchivedPatches}
            />
            <hr/>
            <ArchivedPatchList archivedPatches={archivedPatches}/>
        </div>
    );
}

export default App;
