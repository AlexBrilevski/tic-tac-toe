import { useState } from 'react';

export default function Player({ name, symbol }) {
  const [playerName, setPlayerName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    setIsEditing((editing) => !editing);
  }

  function handlePlayerNameChange(e) {
    setPlayerName(e.currentTarget.value);
  }

  return (
    <li>
      <span className="player">
        {isEditing ?
          <input type="text" value={playerName} onChange={handlePlayerNameChange} required />
          :
          <span className="player-name">{playerName}</span>
        }
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>
        {isEditing ? 'Save' : 'Edit'}
      </button>
    </li>
  );
}
