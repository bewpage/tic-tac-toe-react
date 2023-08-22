import React from 'react';
import Board from './components/Board/Board';
import { GameContextProvider } from './store/store';
import './App.css';

function App() {
  return (
    <div className="App">
      <GameContextProvider>
        <Board />
      </GameContextProvider>
    </div>
  );
}

export default App;
