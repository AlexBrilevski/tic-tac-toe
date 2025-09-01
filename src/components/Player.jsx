import { useState } from 'react';

export default function Player({ symbol, name, onChangeName, isActive }) {
  const [playerName, setPlayerName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    setIsEditing((editing) => !editing);

    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }

  function handlePlayerNameChange(e) {
    setPlayerName(e.currentTarget.value);
  }

  return (
    <li className={isActive ? 'active' : undefined}>
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
