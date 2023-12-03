import {useState} from 'react';
import {PatchList} from './PatchList';
import {PlacedPatchList} from './PlacedPatchList';
import './App.css';
import {defaultPatches, Patch, RemainingIncomeTimes} from "./Patch";

function App() {
    const defaultRemainingIncomeTimes: RemainingIncomeTimes = 9;
    const [remainingIncomeTimes, setRemainingIncomeTimes] = useState<RemainingIncomeTimes>(defaultRemainingIncomeTimes);
    const [patches, setPatches] = useState(defaultPatches(defaultRemainingIncomeTimes));
    const [placedPatches, setPlacedPatches] = useState<Patch[]>([]);

    const buttons = [];
    for (let i = 9 as RemainingIncomeTimes; i >= 1; i-- as RemainingIncomeTimes) {
        buttons.push(<button key={i} onClick={() => setRemainingIncomeTimes(i)}>{i}</button>);
    }

    const addPlacedPatches = (patch: Patch) => {
        setPlacedPatches([...placedPatches, patch]);
    }

    return (
        <div className="App">
            <div className="button-group">{buttons}</div>

            <h1>Patches</h1>
            <PatchList patches={patches}
                       remainingIncomeTimes={remainingIncomeTimes}
                       setPatches={setPatches}
                       addPlacedPatches={addPlacedPatches}
            />

            <h1>Placed Patches</h1>
            <PlacedPatchList placedPatches={placedPatches}/>
        </div>
    );
}

export default App;
