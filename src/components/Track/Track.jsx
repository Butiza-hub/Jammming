function Track({ track, onAdd }) {
  function handleClick() {
    if (onAdd) onAdd(track);
  }

  return (
    <div className="Track">
      <div className="Track-information">
        <h3>{track.name}</h3>
        <p>{track.artist} | {track.album}</p>
      </div>
      <button className="Track-action" onClick={handleClick}>+</button>
    </div>
  );
}

export default Track;