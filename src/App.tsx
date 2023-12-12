import {useState} from 'react';
import {PatchList} from './PatchList';
import {PlacedPatchList} from './PlacedPatchList';
import {sortPatches, Patch, RemainingIncomeTimes, Patches} from "./Patch";
import {RemainingIncomeTimesButtons} from "./RemainingIncomeTimesButtons";

import './App.css';

function App() {
    const defaultRemainingIncomeTimes: RemainingIncomeTimes = 9;
    const defaultPatches = sortPatches(defaultRemainingIncomeTimes, Patches);
    const [remainingIncomeTimes, setRemainingIncomeTimes] = useState<RemainingIncomeTimes>(defaultRemainingIncomeTimes);
    const [patches, setPatches] = useState(defaultPatches);
    const [placedPatches, setPlacedPatches] = useState<Patch[]>([]);

    const resortPatches = (remainingIncomeTimes: RemainingIncomeTimes) => {
        setRemainingIncomeTimes(remainingIncomeTimes);
        setPatches(sortPatches(remainingIncomeTimes, patches));
    }
    const placePatch = (patch: Patch) => {
        setPatches(patches.filter(p => p.name !== patch.name));
        setPlacedPatches([...placedPatches, patch]);
    }
    const restorePlacedPatch = (patch: Patch) => {
        setPlacedPatches(placedPatches.filter(p => p.name !== patch.name));
        setPatches([...patches, patch]);
    }

    return (
        <div className="App">
            <h1>Patches</h1>
            <h2>Remaining Income Time ({remainingIncomeTimes})</h2>
            <RemainingIncomeTimesButtons resortPatches={resortPatches}/>
            <PatchList patches={patches}
                       remainingIncomeTimes={remainingIncomeTimes}
                       placePatch={placePatch}
            />

            {placedPatches.length > 0 && <h1>Placed Patches</h1>}
            <PlacedPatchList placedPatches={placedPatches} restorePlacedPatch={restorePlacedPatch}/>

            <hr/>
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center'}}>
                <div style={{flex: 3, minWidth: '300px', padding: '10px', textAlign: 'left'}}>
                    <h1>Formula</h1>
                    <p>Profit = [patch size] * 2 + [buttons on patch] * [remaining income times] - [button cost]</p>
                    <p>Buttons/Cost = [buttons on patch] / ([button cost] + [time cost])</p>
                    <p>Profit/Time = [Profit] / [time cost]</p>
                    <p>
                        For more details, see <a
                        href="https://bodoge.hoobby.net/games/patchwork/strategies/44084"
                        target="_blank">強いパッチはどれか？</a> ( written in Japanese ).
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
