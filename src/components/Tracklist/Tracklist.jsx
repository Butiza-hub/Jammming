import Track from '../Track/Track';
import './Tracklist.css';

function Tracklist({ tracks, onAdd, onRemove, onPlay, playingTrackId }) {
  return (
    <div className="Tracklist">
      {tracks.map((track) => (
        <Track
          key={track.id}
          track={track}
          onAdd={onAdd}
          onRemove={onRemove}
          onPlay={onPlay}
          isPlaying={track.id === playingTrackId}
        />
      ))}
    </div>
  );
}

export default Tracklist;