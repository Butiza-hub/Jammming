import Tracklist from '../Tracklist/Tracklist';

function SearchResults({ searchResults, onAdd }) {
  return (
    <div className="SearchResults">
      <h2>Results</h2>
      <Tracklist tracks={searchResults} onAdd={onAdd} />
    </div>
  );
}

export default SearchResults;