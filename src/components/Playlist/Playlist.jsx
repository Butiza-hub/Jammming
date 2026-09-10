import Tracklist from '../Tracklist/Tracklist';

function Playlist({ playlistName, playlistTracks, onRemove, onNameChange }) {
  function handleNameChange(event) {
    onNameChange(event.target.value);
  }

  return (
    <div className="Playlist">
      <input value={playlistName} onChange={handleNameChange} />
      <Tracklist tracks={playlistTracks} onRemove={onRemove} />
      <button className="Playlist-save">Save To Spotify</button>
    </div>
  );
}

export default Playlist;