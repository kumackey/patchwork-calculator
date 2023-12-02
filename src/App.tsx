import {useState} from 'react';
import {PatchList} from './PatchList';
import './App.css';
import {defaultPatches, RemainingIncomeTimes} from "./Patch";

function App() {
    const defaultRemainingIncomeTimes: RemainingIncomeTimes = 9;
    const [remainingIncomeTimes, setRemainingIncomeTimes] = useState<RemainingIncomeTimes>(defaultRemainingIncomeTimes);
    const [patches, setPatches] = useState(defaultPatches(defaultRemainingIncomeTimes));

    const buttons = [];
    for (let i = 9 as RemainingIncomeTimes; i >= 1; i-- as RemainingIncomeTimes) {
        buttons.push(<button key={i} onClick={() => setRemainingIncomeTimes(i)}>{i}</button>);
    }

    return (
        <div className="App">
            <div className="button-group">
                {buttons}
            </div>
            <PatchList patches={patches} remainingIncomeTimes={remainingIncomeTimes} setPatches={setPatches}/>
            {/*<ArchivedPatchList patches={patches} />*/}
        </div>
    );
}

export default App;
