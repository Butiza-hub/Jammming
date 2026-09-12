import './SavedPlaylists.css';

function SavedPlaylists({ savedPlaylists, onRequestDelete }) {
  return (
    <div className="SavedPlaylists">
      <div className="Panel-header">
        <h2>Saved</h2>
      </div>
      <div className="SavedPlaylists-list">
        {savedPlaylists.length === 0 && (
          <p className="SavedPlaylists-empty">No saved playlists yet.</p>
        )}
        {savedPlaylists.map((playlist, index) => (
          <div className="SavedPlaylist-item" key={index}>
            <div>
              <h3>{playlist.name}</h3>
              <p>{playlist.tracks.length} track{playlist.tracks.length !== 1 ? 's' : ''}</p>
            </div>
            <button className="SavedPlaylist-delete" onClick={() => onRequestDelete(index)}>×</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SavedPlaylists;