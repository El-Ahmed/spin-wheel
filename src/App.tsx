import { useState } from 'react';
import './App.css';
import NamesList from './components/NamesList';
import SpinWheel from './components/SpinWheel';

const defaultNames = [{text: '', id:''}]
function App() {
  const [names, setNames] = useState<{text:string, id:string}[]>([])
  const urlParams = new URLSearchParams(window.location.search);
  const winningId = urlParams.get('l') ?? '';
  const counter = winningId !== '' ? Number(urlParams.get('c')) - 17 : 0;
  const [winsCounter, setWinsCounter] = useState(counter)

  return (
    <div className="App">
      <main>
        <div className='topContainer'>
          <div className='componentContainer'>
            <SpinWheel names={names.length ? names: defaultNames} winningId={winningId} size={700} winsCounter={winsCounter} setWinsCounter={setWinsCounter}></SpinWheel>
          </div>
          <div className='componentContainer'>
            <NamesList names={names} setNames={setNames}></NamesList>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
