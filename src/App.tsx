import {useState} from 'react';
import {PatchList} from './PatchList';
import './App.css';

function App() {
    const [remainingIncomeTimes, setRemainingIncomeTimes] = useState(9);

    const buttons = [];
    for (let i = 9; i >= 1; i--) {
        buttons.push(<button key={i} onClick={() => setRemainingIncomeTimes(i)}>{i}</button>);
    }

    return (
        <div className="App">
            <div className="button-group">
                {buttons}
            </div>
            <PatchList remaining_income_times={remainingIncomeTimes}/>
        </div>
    );
}

export default App;
