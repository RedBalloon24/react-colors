import React from 'react';
import Palette from './components/Palette';
import seedPalettes from './seedPalettes'

function App() {
  return (
    <div className="App">
      <Palette palette={seedPalettes[4]} />
    </div>
  );
}

export default App;
