const clientId = 'b9e7e55c065e448387f9339efa11121e'; // paste your real Client ID here
const redirectUri = 'http://127.0.0.1:5173/';
const scope = 'playlist-modify-public playlist-modify-private';

// Generates a random string for the PKCE code verifier
function generateCodeVerifier(length) {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let text = '';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

// Scrambles the code verifier into a code challenge (SHA-256 + base64url)
async function generateCodeChallenge(codeVerifier) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

// Redirects the user to Spotify's login/authorization page
async function redirectToSpotifyAuthorize() {
  const codeVerifier = generateCodeVerifier(64);
  const codeChallenge = await generateCodeChallenge(codeVerifier);

  window.localStorage.setItem('code_verifier', codeVerifier);

  const params = new URLSearchParams({
    client_id: clientId,
    response_type: 'code',
    redirect_uri: redirectUri,
    scope: scope,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
  });

  window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

// Exchanges the authorization code for an access token
async function getAccessTokenFromCode(code) {
  const codeVerifier = window.localStorage.getItem('code_verifier');

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    }),
  });

  const data = await response.json();

  if (data.access_token) {
    const expiresIn = data.expires_in; // seconds
    const expirationTime = Date.now() + expiresIn * 1000;

    window.localStorage.setItem('access_token', data.access_token);
    window.localStorage.setItem('expiration_time', expirationTime);

    return data.access_token;
  } else {
    console.error('Error getting access token:', data);
    return null;
  }
}

// Main function: returns a valid access token, handling all cases
async function getAccessToken() {
  const storedToken = window.localStorage.getItem('access_token');
  const expirationTime = window.localStorage.getItem('expiration_time');

  // Case 1: We already have a valid, unexpired token
  if (storedToken && expirationTime && Date.now() < Number(expirationTime)) {
    return storedToken;
  }

  // Case 2: Spotify just redirected back with a code in the URL
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');

  if (code) {
    const token = await getAccessTokenFromCode(code);

    // Clear the code from the URL so it can't be reused accidentally
    window.history.replaceState({}, document.title, redirectUri);

    return token;
  }

  // Case 3: No token, no code — user hasn't logged in yet, send them to Spotify
  await redirectToSpotifyAuthorize();
  return null;
}

const Spotify = {
  getAccessToken,
};

export default Spotify;