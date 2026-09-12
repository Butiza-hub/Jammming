import Tracklist from '../Tracklist/Tracklist';
import './Playlist.css';

function Playlist({ playlistName, playlistTracks, onRemove, onNameChange, onSave, onPlay, playingTrackId }) {
  function handleNameChange(event) {
    onNameChange(event.target.value);
  }

  return (
    <div className="Playlist">
      <div className="Panel-header">
        <input value={playlistName} onChange={handleNameChange} />
      </div>
      <Tracklist
        tracks={playlistTracks}
        onRemove={onRemove}
        onPlay={onPlay}
        playingTrackId={playingTrackId}
      />
      <button className="Playlist-save" onClick={onSave}>Save To Spotify</button>
    </div>
  );
}

export default Playlist;