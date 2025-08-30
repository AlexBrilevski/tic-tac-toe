import { useState } from 'react';
import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/Log';

function App() {
  const [activePlayer, setActivePlayer] = useState('X');
  const [gameTurns, setGameTurns] = useState([]);

  function onClickSquare(rowIndex, colIndex) {
    setActivePlayer(currentActivePlayer => currentActivePlayer === 'X' ? 'O' : 'X');

    setGameTurns(prevTurns => {
      let currentPlayer = 'X';

      if (gameTurns.length && gameTurns[0].player === 'X') {
        currentPlayer = 'O';
      }

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns
      ];

      return updatedTurns;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Palyer 1" symbol="X" isActive={activePlayer === 'X'} />
          <Player name="Palyer 2" symbol="O" isActive={activePlayer === 'O'} />
        </ol>
        <GameBoard onClickSquare={onClickSquare} turns={gameTurns} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
