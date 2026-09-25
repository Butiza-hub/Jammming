import { useState, useRef, useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import SavedPlaylists from '../SavedPlaylists/SavedPlaylists';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';
import RotateOverlay from '../RotateOverlay/RotateOverlay';
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

  const [pendingAction, setPendingAction] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const playlistOptions = [
    { key: 'current', label: playlistName },
    ...savedPlaylists.map((playlist, index) => ({ key: index, label: playlist.name })),
  ];

  function addTrackToPlaylist(track, destination) {
    if (destination === 'current') {
      setPlaylistTracks((prev) => {
        const alreadyAdded = prev.some((t) => t.id === track.id);
        if (alreadyAdded) return prev;
        return [...prev, track];
      });
      return;
    }

    setSavedPlaylists((prev) => {
      const updated = prev.map((playlist, index) => {
        if (index !== destination) return playlist;
        const alreadyAdded = playlist.tracks.some((t) => t.id === track.id);
        if (alreadyAdded) return playlist;
        return { ...playlist, tracks: [...playlist.tracks, track] };
      });
      localStorage.setItem('savedPlaylists', JSON.stringify(updated));
      return updated;
    });
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
    setPendingAction({ type: 'deletePlaylist', index });
  }

  function requestRemoveTrackFromSavedPlaylist(playlistIndex, track) {
    setPendingAction({ type: 'removeTrack', playlistIndex, trackId: track.id });
  }

  function confirmPendingAction() {
    if (pendingAction.type === 'deletePlaylist') {
      const updated = savedPlaylists.filter((_, i) => i !== pendingAction.index);
      setSavedPlaylists(updated);
      localStorage.setItem('savedPlaylists', JSON.stringify(updated));
    } else if (pendingAction.type === 'removeTrack') {
      const updated = savedPlaylists.map((playlist, i) => {
        if (i !== pendingAction.playlistIndex) return playlist;
        return {
          ...playlist,
          tracks: playlist.tracks.filter((t) => t.id !== pendingAction.trackId),
        };
      });
      setSavedPlaylists(updated);
      localStorage.setItem('savedPlaylists', JSON.stringify(updated));
    }
    setPendingAction(null);
  }

  function cancelPendingAction() {
    setPendingAction(null);
  }

  function search(term) {
    setLastSearchTerm(term);
    MusicApi.search(term).then((results) => {
      setSearchResults(results);
    });
  }

  function refreshResults() {
    setSearchResults([]);
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

  function enterFullscreen() {
    const el = document.documentElement;
    if (el.requestFullscreen) {
      el.requestFullscreen().catch(() => {});
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen();
    }
  }

  useEffect(() => {
    function handleFullscreenChange() {
      setIsFullscreen(Boolean(document.fullscreenElement || document.webkitFullscreenElement));
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    function checkOrientationAndExit() {
      const isPortrait = window.matchMedia('(orientation: portrait)').matches;
      const inFullscreen = document.fullscreenElement || document.webkitFullscreenElement;
      if (isPortrait && inFullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen().catch(() => {});
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
      }
    }

    function handleOrientationChange() {
      // Give the browser a moment to finish updating layout/orientation
      // before we check it — matchMedia can briefly report stale values
      // right when 'orientationchange'/'resize' fires.
      setTimeout(checkOrientationAndExit, 100);
    }

    // Prefer the modern Screen Orientation API where available
    const hasScreenOrientation = window.screen && window.screen.orientation;
    if (hasScreenOrientation) {
      window.screen.orientation.addEventListener('change', handleOrientationChange);
    } else {
      window.addEventListener('orientationchange', handleOrientationChange);
    }

    // Fallback net: some browsers only reliably fire 'resize' on rotation
    window.addEventListener('resize', handleOrientationChange);

    return () => {
      if (hasScreenOrientation) {
        window.screen.orientation.removeEventListener('change', handleOrientationChange);
      } else {
        window.removeEventListener('orientationchange', handleOrientationChange);
      }
      window.removeEventListener('resize', handleOrientationChange);
    };
  }, []);

  return (
    <div className="App">
      <RotateOverlay />

      <div className="App-content">
        {!isFullscreen && (
          <button className="FullscreenButton" onClick={enterFullscreen}>
            ⛶ Fullscreen
          </button>
        )}
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <SearchBar onSearch={search} />
        <div className="App-columns">
          <SearchResults
            searchResults={searchResults}
            onRefresh={refreshResults}
            onPlay={togglePreview}
            playingTrackId={playingTrackId}
            playlistOptions={playlistOptions}
            onAddToPlaylist={addTrackToPlaylist}
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
            onRequestDeletePlaylist={requestDeleteSavedPlaylist}
            onRequestRemoveTrack={requestRemoveTrackFromSavedPlaylist}
            onPlay={togglePreview}
            playingTrackId={playingTrackId}
          />
        </div>
      </div>

      {pendingAction && (
        <ConfirmDialog
          message={
            pendingAction.type === 'deletePlaylist'
              ? 'Are you sure you want to delete this playlist?'
              : 'Are you sure you want to delete this song?'
          }
          onConfirm={confirmPendingAction}
          onCancel={cancelPendingAction}
        />
      )}
    </div>
  );
}

export default App;