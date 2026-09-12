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

      <div className="Playlist-body">
        {playlistTracks.length === 0 ? (
          <div className="Playlist-empty">
            <span className="Playlist-empty-icon">♪</span>
            <p>Your playlist is empty</p>
            <span className="Playlist-empty-hint">Add tracks from Results to get started</span>
          </div>
        ) : (
          <Tracklist
            tracks={playlistTracks}
            onRemove={onRemove}
            onPlay={onPlay}
            playingTrackId={playingTrackId}
          />
        )}
      </div>

      <button className="Playlist-save" onClick={onSave}>Save To Spotify</button>
    </div>
  );
}

export default Playlist;