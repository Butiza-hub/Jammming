function Track({ track, onAdd, onRemove }) {
  function handleAdd() {
    if (onAdd) onAdd(track);
  }

  function handleRemove() {
    if (onRemove) onRemove(track);
  }

  return (
    <div className="Track">
      <div className="Track-information">
        <h3>{track.name}</h3>
        <p>{track.artist} | {track.album}</p>
      </div>
      {onAdd && (
        <button className="Track-action" onClick={handleAdd}>+</button>
      )}
      {onRemove && (
        <button className="Track-action" onClick={handleRemove}>-</button>
      )}
    </div>
  );
}

export default Track;