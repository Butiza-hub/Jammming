import Tracklist from '../Tracklist/Tracklist';

function Playlist({ playlistName, playlistTracks, onRemove }) {
  return (
    <div className="Playlist">
      <input value={playlistName} readOnly />
      <Tracklist tracks={playlistTracks} onRemove={onRemove} />
      <button className="Playlist-save">Save To Spotify</button>
    </div>
  );
}

export default Playlist;