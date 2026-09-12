import { useState } from 'react';
import './Track.css';

function Track({ track, onRemove, onPlay, isPlaying, playlistOptions, onAddToPlaylist }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function handleRemove() {
    if (onRemove) onRemove(track);
  }

  function handlePlay() {
    if (onPlay) onPlay(track);
  }

  function handleAddClick() {
    if (playlistOptions.length === 1) {
      onAddToPlaylist(track, playlistOptions[0].key);
      return;
    }
    setMenuOpen((open) => !open);
  }

  function handleSelectDestination(destinationKey) {
    onAddToPlaylist(track, destinationKey);
    setMenuOpen(false);
  }

  return (
    <div className="Track">
      <div className="Track-information">
        <h3>{track.name}</h3>
        <p>{track.artist} | {track.album}</p>
      </div>
      <div className="Track-actions">
        {track.previewUrl && (
          <button className={`Track-play ${isPlaying ? 'is-playing' : ''}`} onClick={handlePlay}>
            {isPlaying ? '⏸' : '▶'}
          </button>
        )}
        {playlistOptions && (
          <div className="Track-add-wrapper">
            <button className="Track-add" onClick={handleAddClick}>+</button>
            {menuOpen && (
              <div className="Track-add-menu">
                {playlistOptions.map((option) => (
                  <button
                    key={option.key}
                    className="Track-add-menu-item"
                    onClick={() => handleSelectDestination(option.key)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
        {onRemove && (
          <button className="Track-remove" onClick={handleRemove}>-</button>
        )}
      </div>
    </div>
  );
}

export default Track;