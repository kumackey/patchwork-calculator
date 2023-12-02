import {useState} from 'react';
import {PatchList} from './PatchList';
import './App.css';
import {Patches, RemainingIncomeTimes} from "./Patch";

function App() {
    const [remainingIncomeTimes, setRemainingIncomeTimes] = useState<RemainingIncomeTimes>(9);
    const [patches, setPatches] = useState(Patches);

    const buttons = [];
    for (let i = 9 as RemainingIncomeTimes; i >= 1; i-- as RemainingIncomeTimes) {
        buttons.push(<button key={i} onClick={() => setRemainingIncomeTimes(i)}>{i}</button>);
    }

    return (
        <div className="App">
            <div className="button-group">
                {buttons}
            </div>
            <PatchList patches={patches} remaining_income_times={remainingIncomeTimes} setPatches={setPatches}/>
            {/*<ArchivedPatchList patches={patches} />*/}
        </div>
    );
}

export default App;
