import './SearchBar.css';

function SearchBar() {
  return (
    <div className="SearchBar">
      <input placeholder="Enter A Song, Album, Artist, or Genre" />
      <button className="SearchButton">Search</button>
    </div>
  );
}

export default SearchBar;