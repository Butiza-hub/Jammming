import Tracklist from '../Tracklist/Tracklist';

function Playlist() {
  return (
    <div className="Playlist">
      <input defaultValue="New Playlist" />
      <Tracklist />
      <button className="Playlist-save">Save To Spotify</button>
    </div>
  );
}

export default Playlist;