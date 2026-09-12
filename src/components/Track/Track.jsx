import './Track.css';

function Track({ track, onAdd, onRemove, onPlay, isPlaying }) {
  function handleAdd() {
    if (onAdd) onAdd(track);
  }

  function handleRemove() {
    if (onRemove) onRemove(track);
  }

  function handlePlay() {
    if (onPlay) onPlay(track);
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
        {onAdd && (
          <button className="Track-add" onClick={handleAdd}>+</button>
        )}
        {onRemove && (
          <button className="Track-remove" onClick={handleRemove}>-</button>
        )}
      </div>
    </div>
  );
}

export default Track;