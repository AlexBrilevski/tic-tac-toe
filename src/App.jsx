import Player from './components/Player';
import GameBoard from './components/GameBoard';

function App() {
  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player name="Palyer 1" symbol="X" />
          <Player name="Palyer 2" symbol="O" />
        </ol>
        <GameBoard />
      </div>
      Moves log
    </main>
  )
}

export default App
