import { useState } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch }) {
  const [term, setTerm] = useState('');

  function handleTermChange(event) {
    setTerm(event.target.value);
  }

  function handleSearch() {
    onSearch(term);
  }

  return (
    <div className="SearchBar">
      <input
        placeholder="Enter A Song, Album, Artist, or Genre"
        value={term}
        onChange={handleTermChange}
      />
      <button className="SearchButton" onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;