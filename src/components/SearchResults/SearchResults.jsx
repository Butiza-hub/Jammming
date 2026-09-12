import Tracklist from '../Tracklist/Tracklist';
import './SearchResults.css';

function SearchResults({ searchResults, onAdd, onRefresh, onPlay, playingTrackId }) {
  return (
    <div className="SearchResults">
      <div className="Panel-header">
        <h2>Results</h2>
        <button className="RefreshButton" onClick={onRefresh}>⟳ Refresh</button>
      </div>
      <Tracklist
        tracks={searchResults}
        onAdd={onAdd}
        onPlay={onPlay}
        playingTrackId={playingTrackId}
      />
    </div>
  );
}

export default SearchResults;