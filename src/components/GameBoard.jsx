import { useState } from 'react';

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard() {
  const [gameBoard, setGameBoard] = useState(initialGameBoard);

  function handleSquareClick(row, col) {
    setGameBoard(prevGameBoard => {
      const updatedGameBoard = [...prevGameBoard.map(el => [...el])];
      updatedGameBoard[row][col] = 'X';
      return updatedGameBoard;
    });
  }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => <li key={rowIndex}>
        <ol>
          {row.map((playerSymbol, colIndex) => <li key={colIndex}>
            <button onClick={() => handleSquareClick(rowIndex, colIndex)}>
              {playerSymbol}
            </button>
          </li>)}
        </ol>
      </li>)}
    </ol>
  );
}
