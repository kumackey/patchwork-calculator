import {useState} from 'react';
import {PatchList} from './PatchList';
import {PlacedPatchList} from './PlacedPatchList';
import {sortPatchesByEvaluation, Patch, RemainingIncomeTimes, Patches, SortType, sortPatchesByProfit} from "./Patch";
import {RemainingIncomeTimesButtons} from "./RemainingIncomeTimesButtons";
import {SortTypeButtons} from "./SortTypeButtons";

import './App.css';

function App() {
    const defaultRemainingIncomeTimes: RemainingIncomeTimes = 9;
    const defaultPatches = sortPatchesByEvaluation(defaultRemainingIncomeTimes, Patches);
    const [remainingIncomeTimes, setRemainingIncomeTimes] = useState<RemainingIncomeTimes>(defaultRemainingIncomeTimes);
    const [patches, setPatches] = useState(defaultPatches);
    const [placedPatches, setPlacedPatches] = useState<Patch[]>([]);
    const [sortType, setSortType] = useState<SortType>('evaluation');

    const resortPatches = (remainingIncomeTimes: RemainingIncomeTimes, sortType: SortType) => {
        switch (sortType) {
            case 'evaluation':
                setPatches(sortPatchesByEvaluation(remainingIncomeTimes, patches));
                break;
            case 'profit':
                setPatches(sortPatchesByProfit(remainingIncomeTimes, patches));
                break;
        }
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
            <h1>Patchwork Calculator</h1>
            <div style={containerStyle}>
                <div style={itemStyle}>
                    <h2>Remaining Income Time</h2>
                    <RemainingIncomeTimesButtons
                        remainingIncomeTimes={remainingIncomeTimes}
                        setRemainingIncomeTimes={setRemainingIncomeTimes}
                        resortPatches={(remainingIncomeTimes) => resortPatches(remainingIncomeTimes, sortType)}
                    />
                </div>
                <div style={itemStyle}>
                    <h2>Sort Type</h2>
                    <SortTypeButtons
                        sortType={sortType}
                        resortPatches={(sortType) => resortPatches(remainingIncomeTimes, sortType)}
                        setSortType={setSortType}
                    />
                </div>
            </div>
            <PatchList patches={patches}
                       remainingIncomeTimes={remainingIncomeTimes}
                       placePatch={placePatch}
                       sortType={sortType}
            />

            {placedPatches.length > 0 && <h1>Placed Patches</h1>}
            <PlacedPatchList placedPatches={placedPatches} restorePlacedPatch={restorePlacedPatch}/>

            <hr/>
            <h1>Formula</h1>
            <p>Profit = [patch size] * 2 + [buttons on patch] * [remaining income times] - [button cost]</p>
            <p>Buttons/Cost = [buttons on patch] / ([button cost] + [time cost])</p>
            <p>Profit/Time = [Profit] / [time cost]</p>
            <p>
                For more details, see <a
                href="https://bodoge.hoobby.net/games/patchwork/strategies/44084"
                target="_blank" rel="noreferrer" >強いパッチはどれか？</a> ( written in Japanese ).
            </p>
            <p>Contact: Github: <a href="https://github.com/kumackey/patchwork-calculator"
                                   target="_blank" rel="noreferrer" >kumackey/patchwork-calculator</a>
                , Twitter: <a href="https://twitter.com/kumackey_" target="_blank" rel="noreferrer" >@kumackey_</a></p>
        </div>
    );
}

const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
};

const itemStyle: React.CSSProperties = {
    flexBasis: '48%',
    marginBottom: '4px',
};

export default App;
