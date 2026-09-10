import { useState, useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import './App.css';
import Spotify from '../../util/Spotify';

function App() {
  const [searchResults, setSearchResults] = useState([
    { id: '1', name: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', uri: 'spotify:track:0VjIjW4GlUZAMYd2vXMi3b' },
    { id: '2', name: 'Levitating', artist: 'Dua Lipa', album: 'Future Nostalgia', uri: 'spotify:track:463CkQjx2Zk1yXoBuierM9' },
    { id: '3', name: 'Good 4 U', artist: 'Olivia Rodrigo', album: 'SOUR', uri: 'spotify:track:4ZtFanR9U6ndgddUvNcjcG' },
  ]);

  const [playlistName, setPlaylistName] = useState('My Playlist');
  const [playlistTracks, setPlaylistTracks] = useState([
    { id: '4', name: 'As It Was', artist: 'Harry Styles', album: "Harry's House", uri: 'spotify:track:4Dvkj6JhhA12EX05fT7y2e' },
    { id: '5', name: 'Flowers', artist: 'Miley Cyrus', album: 'Endless Summer Vacation', uri: 'spotify:track:6dOtVTDdiauQNBQEDOtlAB' },
  ]);

  function addTrack(track) {
    const alreadyAdded = playlistTracks.some((t) => t.id === track.id);
    if (alreadyAdded) return;
    setPlaylistTracks([...playlistTracks, track]);
  }

  function removeTrack(track) {
    setPlaylistTracks(playlistTracks.filter((t) => t.id !== track.id));
  }

  function updatePlaylistName(name) {
    setPlaylistName(name);
  }

  function savePlaylist() {
    const trackUris = playlistTracks.map((track) => track.uri);
    console.log('Saving these URIs to Spotify:', trackUris);

    // Reset the playlist for a fresh start
    setPlaylistName('New Playlist');
    setPlaylistTracks([]);
  }

  useEffect(() => {
    Spotify.getAccessToken().then((token) => {
      console.log('Access token:', token);
    });
  }, []);

  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <SearchBar />
      <div className="App-playlist">
        <SearchResults searchResults={searchResults} onAdd={addTrack} />
        <Playlist
          playlistName={playlistName}
          playlistTracks={playlistTracks}
          onRemove={removeTrack}
          onNameChange={updatePlaylistName}
          onSave={savePlaylist}
        />
      </div>
    </div>
  );
}

export default App;