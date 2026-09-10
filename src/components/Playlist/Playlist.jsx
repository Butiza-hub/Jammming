import Tracklist from '../Tracklist/Tracklist';

function Playlist({ playlistName, playlistTracks }) {
  return (
    <div className="Playlist">
      <input value={playlistName} readOnly />
      <Tracklist tracks={playlistTracks} />
      <button className="Playlist-save">Save To Spotify</button>
    </div>
  );
}

export default Playlist;