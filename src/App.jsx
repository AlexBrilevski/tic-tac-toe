import { useState } from 'react';
import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/Log';
import { WINNING_COMBINATIONS } from './winning-combinations';

function deriveCurrentPlayer(turns) {
  let currentPlayer = 'X';

  if (turns.length && turns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  let activePlayer = deriveCurrentPlayer(gameTurns);

  function onClickSquare(rowIndex, colIndex) {
    setGameTurns(prevTurns => {
      let currentPlayer = deriveCurrentPlayer(prevTurns);

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

export default App;
