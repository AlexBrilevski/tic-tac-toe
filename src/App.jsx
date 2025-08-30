import { useState } from 'react';
import Player from './components/Player';
import GameBoard from './components/GameBoard';

function App() {
  const [activePlayer, setActivePlayer] = useState('X');

  function onClickSquare() {
    setActivePlayer(currentActivePlayer => currentActivePlayer === 'X' ? 'O' : 'X');
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Palyer 1" symbol="X" isActive={activePlayer === 'X'} />
          <Player name="Palyer 2" symbol="O" isActive={activePlayer === 'O'} />
        </ol>
        <GameBoard onClickSquare={onClickSquare} activePlayerSymbol={activePlayer} />
      </div>
      Moves log
    </main>
  )
}

export default App
