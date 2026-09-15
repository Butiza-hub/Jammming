# Jammming

A React web app for searching music (songs), building a custom playlist, and saving it — built as a Codecademy Full-Stack Career Path project (Parts 1 & 2).

## Purpose

Jammming lets a user search for music, preview tracks, build a custom playlist by adding and removing songs, rename that playlist, and save it for later. It was originally designed around the Spotify Web API, but pivoted to the iTunes Search API partway through development after Spotify introduced a Premium subscription requirement for developer API access (see **Notable decisions** below).

## Technologies used

- **React** (via Vite) — component architecture, state, and unidirectional data flow
- **iTunes Search API** — track search (free, no authentication required)
- **Web Audio (`<Audio>` object)** — 30-second track preview playback
- **`localStorage`** — persisting saved playlists across browser sessions
- **Git & GitHub** — version control
- **CSS** — custom design system (no UI framework)

## Features

- **Search**: look up tracks by title, artist, album, or genre via the iTunes Search API
- **Preview playback**: play a short audio preview of any track directly in the app; only one preview plays at a time
- **Build a playlist**: add tracks from search results to a custom playlist, with duplicate prevention
- **Add to an existing playlist**: choose whether a track goes into your current draft playlist or any previously saved playlist
- **Remove tracks**: remove any track from the playlist being built
- **Rename playlist**: edit the playlist's name inline before saving
- **Save playlists locally**: save a finished playlist (persisted via `localStorage`, so it survives page refreshes and browser restarts)
- **Manage saved playlists**: view all saved playlists with track counts, and delete any of them (with a confirmation prompt to prevent accidental deletion)
- **Refresh results**: clear the search results list without a full page reload
- **Single-screen layout**: Results, current playlist, and saved playlists are all visible at once, without page scrolling

## Notable decisions

- **Spotify → iTunes migration**: the project originally implemented Spotify's Authorization Code with PKCE flow (Spotify deprecated the older Implicit Grant Flow in November 2025). However, as of February 2026, Spotify requires the developer app owner to hold an active Premium subscription to use most Web API endpoints in Development Mode. Since this project was built on a free-tier account, Spotify's Search and Playlist endpoints returned a 403 error and were inaccessible. The search feature was migrated to the iTunes Search API, which is free and requires no authentication.
- **Local save instead of account save**: because of the above, saving a playlist to an actual Spotify account isn't possible under current API access restrictions. Playlists are instead saved locally via `localStorage` — a genuine, working alternative rather than a placeholder.

## Future work

- Restore real Spotify account integration if/when API access constraints change
- Add drag-and-drop reordering of tracks within a playlist
- Add a persistent player bar with playback progress, instead of per-track play buttons only
- Support exporting a saved playlist as a shareable link or file
- Add search filters (by artist, genre, or release year)

## Testing

See `TESTING.md` for the manual test cases and results covering core functionality, along with a log of notable bugs found and fixed during development.

