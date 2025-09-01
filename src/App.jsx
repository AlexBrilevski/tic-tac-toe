import { useState } from 'react';
import Player from './components/Player';
import GameOver from './components/GameOver';
import GameBoard from './components/GameBoard';
import Log from './components/Log';
import { WINNING_COMBINATIONS } from './winning-combinations';

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveCurrentPlayer(turns) {
  let currentPlayer = 'X';

  if (turns.length && turns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const gameBoard = initialGameBoard;
  let activePlayer = deriveCurrentPlayer(gameTurns);
  let winner;

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = firstSquareSymbol;
    }
  }

  const isDraw = gameTurns.length === 9 && !winner;

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
        {(winner || isDraw) && <GameOver winner={winner} />}
        <GameBoard board={gameBoard} onClickSquare={onClickSquare} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App;
