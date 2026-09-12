import { useState, useRef } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import SavedPlaylists from '../SavedPlaylists/SavedPlaylists';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';
import './App.css';
import MusicApi from '../../util/Spotify';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [lastSearchTerm, setLastSearchTerm] = useState('');

  const [playlistName, setPlaylistName] = useState('New Playlist');
  const [playlistTracks, setPlaylistTracks] = useState([]);

  const [savedPlaylists, setSavedPlaylists] = useState(
    () => JSON.parse(localStorage.getItem('savedPlaylists')) || []
  );

  const [playingTrackId, setPlayingTrackId] = useState(null);
  const audioRef = useRef(new Audio());

  const [pendingDeleteIndex, setPendingDeleteIndex] = useState(null);

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
    const newPlaylist = {
      name: playlistName,
      tracks: playlistTracks,
      savedAt: new Date().toISOString(),
    };
    const updated = [...savedPlaylists, newPlaylist];
    setSavedPlaylists(updated);
    localStorage.setItem('savedPlaylists', JSON.stringify(updated));

    setPlaylistName('New Playlist');
    setPlaylistTracks([]);
  }

  function requestDeleteSavedPlaylist(index) {
    setPendingDeleteIndex(index);
  }

  function confirmDeleteSavedPlaylist() {
    const updated = savedPlaylists.filter((_, i) => i !== pendingDeleteIndex);
    setSavedPlaylists(updated);
    localStorage.setItem('savedPlaylists', JSON.stringify(updated));
    setPendingDeleteIndex(null);
  }

  function cancelDeleteSavedPlaylist() {
    setPendingDeleteIndex(null);
  }

  function search(term) {
    setLastSearchTerm(term);
    MusicApi.search(term).then((results) => {
      setSearchResults(results);
    });
  }

  function refreshResults() {
    if (lastSearchTerm) {
      search(lastSearchTerm);
    }
  }

  function togglePreview(track) {
    if (!track.previewUrl) return;

    if (playingTrackId === track.id) {
      audioRef.current.pause();
      setPlayingTrackId(null);
      return;
    }

    audioRef.current.pause();
    audioRef.current.src = track.previewUrl;
    audioRef.current.play();
    setPlayingTrackId(track.id);
    audioRef.current.onended = () => setPlayingTrackId(null);
  }

  return (
    <div className="App">
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <SearchBar onSearch={search} />
      <div className="App-columns">
        <SearchResults
          searchResults={searchResults}
          onAdd={addTrack}
          onRefresh={refreshResults}
          onPlay={togglePreview}
          playingTrackId={playingTrackId}
        />
        <Playlist
          playlistName={playlistName}
          playlistTracks={playlistTracks}
          onRemove={removeTrack}
          onNameChange={updatePlaylistName}
          onSave={savePlaylist}
          onPlay={togglePreview}
          playingTrackId={playingTrackId}
        />
        <SavedPlaylists
          savedPlaylists={savedPlaylists}
          onRequestDelete={requestDeleteSavedPlaylist}
        />
      </div>

      {pendingDeleteIndex !== null && (
        <ConfirmDialog
          message="Are you sure you want to delete this playlist?"
          onConfirm={confirmDeleteSavedPlaylist}
          onCancel={cancelDeleteSavedPlaylist}
        />
      )}
    </div>
  );
}

export default App;