import {useState} from 'react';
import {PatchList} from './PatchList';
import {PlacedPatchList} from './PlacedPatchList';
import {defaultPatches, Patch, RemainingIncomeTimes} from "./Patch";
import {RemainingIncomeTimesButtons} from "./RemainingIncomeTimesButtons";

import './App.css';

function App() {
    const defaultRemainingIncomeTimes: RemainingIncomeTimes = 9;
    const [remainingIncomeTimes, setRemainingIncomeTimes] = useState<RemainingIncomeTimes>(defaultRemainingIncomeTimes);
    const [patches, setPatches] = useState(defaultPatches(defaultRemainingIncomeTimes));
    const [placedPatches, setPlacedPatches] = useState<Patch[]>([]);
    const addPlacedPatches = (patch: Patch) => {
        setPlacedPatches([...placedPatches, patch]);
    }

    return (
        <div className="App">
            <h1>Patches</h1>
            <h2>Remaining Income Time</h2>
            <RemainingIncomeTimesButtons setRemainingIncomeTimes={setRemainingIncomeTimes}/>
            <PatchList patches={patches}
                       remainingIncomeTimes={remainingIncomeTimes}
                       setPatches={setPatches}
                       addPlacedPatches={addPlacedPatches}
            />

            <h1>Placed Patches</h1>
            <PlacedPatchList placedPatches={placedPatches}/>

            <h1>Formula</h1>
            <p>total cost = (patch size) * 2 + (buttons earned) * (remaining income times)</p>
            <p>button rate = (total cost) / ((button cost) + (time cost))</p>
            <p>time rate = ((total cost) - (button cost)) / (time cost)</p>
            <p>
                For more details, see the <a
                href="https://boardgamegeek.com/thread/1307009/patchwork-tactic-maximizing-buttons-time"
                target="_blank">A Patchwork Tactic: Maximizing Buttons Per Time</a>.
            </p>

            <p>Contact: <a href="https://twitter.com/kumackey_" target="_blank">@kumackey_</a></p>
        </div>
    );
}

export default App;
