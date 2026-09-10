import Tracklist from '../Tracklist/Tracklist';

function Playlist() {
  const playlistTracks = [];

  return (
    <div className="Playlist">
      <input defaultValue="New Playlist" />
      <Tracklist tracks={playlistTracks} />
      <button className="Playlist-save">Save To Spotify</button>
    </div>
  );
}

export default Playlist;