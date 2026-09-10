import { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import './App.css';

function App() {
  const [searchResults, setSearchResults] = useState([
    { id: '1', name: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours' },
    { id: '2', name: 'Levitating', artist: 'Dua Lipa', album: 'Future Nostalgia' },
    { id: '3', name: 'Good 4 U', artist: 'Olivia Rodrigo', album: 'SOUR' },
  ]);

  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <SearchBar />
      <div className="App-playlist">
        <SearchResults searchResults={searchResults} />
        <Playlist />
      </div>
    </div>
  );
}

export default App;