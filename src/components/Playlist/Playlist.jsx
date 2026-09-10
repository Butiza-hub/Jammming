import Tracklist from '../Tracklist/Tracklist';

function Playlist({ playlistName, playlistTracks, onRemove, onNameChange, onSave }) {
  function handleNameChange(event) {
    onNameChange(event.target.value);
  }

  return (
    <div className="Playlist">
      <input value={playlistName} onChange={handleNameChange} />
      <Tracklist tracks={playlistTracks} onRemove={onRemove} />
      <button className="Playlist-save" onClick={onSave}>Save To Spotify</button>
    </div>
  );
}

export default Playlist;