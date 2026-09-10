async function search(term) {
  const response = await fetch(
    `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=song&limit=20`
  );

  const data = await response.json();

  return data.results.map((track) => ({
    id: track.trackId.toString(),
    name: track.trackName,
    artist: track.artistName,
    album: track.collectionName,
    uri: track.trackViewUrl, // iTunes has no Spotify-style "uri", so we use its track page link as a stand-in
  }));
}

const MusicApi = {
  search,
};

export default MusicApi;