import Track from '../Track/Track';
import './Tracklist.css';

function Tracklist({ tracks, onRemove, onPlay, playingTrackId, playlistOptions, onAddToPlaylist }) {
  return (
    <div className="Tracklist">
      {tracks.map((track) => (
        <Track
          key={track.id}
          track={track}
          onRemove={onRemove}
          onPlay={onPlay}
          isPlaying={track.id === playingTrackId}
          playlistOptions={playlistOptions}
          onAddToPlaylist={onAddToPlaylist}
        />
      ))}
    </div>
  );
}

export default Tracklist;