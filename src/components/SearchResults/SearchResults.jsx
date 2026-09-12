import Tracklist from '../Tracklist/Tracklist';
import './SearchResults.css';

function SearchResults({ searchResults, onRefresh, onPlay, playingTrackId, playlistOptions, onAddToPlaylist }) {
  return (
    <div className="SearchResults">
      <div className="Panel-header">
        <h2>Results</h2>
        <button className="RefreshButton" onClick={onRefresh}>⟳ Refresh</button>
      </div>
      <Tracklist
        tracks={searchResults}
        onPlay={onPlay}
        playingTrackId={playingTrackId}
        playlistOptions={playlistOptions}
        onAddToPlaylist={onAddToPlaylist}
      />
    </div>
  );
}

export default SearchResults;