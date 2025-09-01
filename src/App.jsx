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
  const [players, setPlayers] = useState({ X: 'Player 1', O: 'Player 2' });
  const [gameTurns, setGameTurns] = useState([]);
  const gameBoard = [...initialGameBoard.map(array => [...array])];
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
      winner = players[firstSquareSymbol];
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

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => ({ ...prevPlayers, [symbol]: newName }));
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            symbol="X"
            name={players.X}
            onChangeName={handlePlayerNameChange}
            isActive={activePlayer === 'X'}
          />
          <Player
            symbol="O"
            name={players.O}
            onChangeName={handlePlayerNameChange}
            isActive={activePlayer === 'O'}
          />
        </ol>
        {(winner || isDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
        <GameBoard board={gameBoard} onClickSquare={onClickSquare} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App;
