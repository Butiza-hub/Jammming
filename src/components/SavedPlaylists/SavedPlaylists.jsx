import { useState } from 'react';
import Tracklist from '../Tracklist/Tracklist';
import './SavedPlaylists.css';

function SavedPlaylists({ savedPlaylists, onRequestDeletePlaylist, onRequestRemoveTrack, onPlay, playingTrackId }) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  function toggleExpand(index) {
    setExpandedIndex((current) => (current === index ? null : index));
  }

  function goBack() {
    setExpandedIndex(null);
  }

  return (
    <div className="SavedPlaylists">
      <div className="Panel-header">
        <h2>Saved</h2>
        {expandedIndex !== null && (
          <button className="BackButton" onClick={goBack}>← Back</button>
        )}
      </div>
      <div className="SavedPlaylists-list">
        {savedPlaylists.length === 0 && (
          <p className="SavedPlaylists-empty">No saved playlists yet.</p>
        )}
        {savedPlaylists.map((playlist, index) => {
          if (expandedIndex !== null && expandedIndex !== index) return null;

          return (
            <div className="SavedPlaylist-group" key={index}>
              <div className="SavedPlaylist-item" onClick={() => toggleExpand(index)}>
                <div>
                  <h3>{playlist.name}</h3>
                  <p>{playlist.tracks.length} track{playlist.tracks.length !== 1 ? 's' : ''}</p>
                </div>
                <button
                  className="SavedPlaylist-delete"
                  onClick={(event) => {
                    event.stopPropagation();
                    onRequestDeletePlaylist(index);
                  }}
                >
                  ×
                </button>
              </div>
              {expandedIndex === index && (
                <div className="SavedPlaylist-tracks">
                  <Tracklist
                    tracks={playlist.tracks}
                    onRemove={(track) => onRequestRemoveTrack(index, track)}
                    onPlay={onPlay}
                    playingTrackId={playingTrackId}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SavedPlaylists;