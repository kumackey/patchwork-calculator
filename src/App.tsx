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

            <hr/>
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center'}}>
                <div style={{flex: 3, minWidth: '300px', padding: '10px'}}>
                    <h1>Formula</h1>
                    <p>Profit = (patch size) * 2 + (buttons on patch) * (remaining income times) - (button cost)</p>
                    <p>Profit/Time = (Profit) / (time cost)</p>
                    <p>
                        For more details, see <a
                        href="https://boardgamegeek.com/thread/1307009/patchwork-tactic-maximizing-buttons-per-time"
                        target="_blank">A Patchwork Tactic: Maximizing Buttons Per Time</a>.
                    </p>
                    <p>Contact: <a href="https://twitter.com/kumackey_" target="_blank">@kumackey_</a></p>
                </div>

                <div style={{flex: 0, padding: '10px', minWidth: '300px'}}>
                    <iframe
                        sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin"
                        style={{width: '120px', height: '240px'}}
                        marginWidth={0}
                        marginHeight={0}
                        scrolling="no"
                        frameBorder="0"
                        src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=kumackey06-22&language=en_US&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B00RCCAPPE&linkId=359f2032501a4ed6c442a68d126ef9df">
                    </iframe>
                    <iframe
                        sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin"
                        style={{width: '120px', height: '240px'}}
                        marginWidth={0}
                        marginHeight={0}
                        scrolling="no"
                        frameBorder="0"
                        src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=kumackey06-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B00WHQZQ0Y&linkId=c5db24b79a3329866fdc34ba02223294">
                    </iframe>
                </div>
            </div>

        </div>
    )
        ;
}

export default App;
