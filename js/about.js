import { navBarLinks } from "./utils.js";
import { updateFooter } from "./utils.js";

// === CONFIG ===
const PROXY_BASE = 'https://wslider-portfolio-site.wslider2000.workers.dev/';  


// Optional fallback public CORS proxy (ONLY for local testing — do NOT use in production)
// const FALLBACK_PROXY = 'https://api.allorigins.win/raw?url=';

async function getMovieIds() {
  try {
    const response = await fetch('data/movieIds.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();

    // Handle both plain array [123, 456] and array of objects [{tmdbId:123}, ...]
    const ids = data
      .map(item => {
        if (typeof item === 'number') return item;
        if (item && typeof item === 'object') {
          return parseInt(item.tmdbId || item.movieId || item.id, 10);
        }
        return NaN;
      })
      .filter(id => !isNaN(id) && id > 0);

    return ids;
  } catch (error) {
    console.error('Error fetching movie IDs:', error);
    return [];
  }
}

async function fetchMoviePoster(movieId) {
  if (!movieId) return;

  // Build the TMDB endpoint path (no api_key here — Worker handles it)
  const tmdbPath = `movie/${movieId}?language=en-US`;
  const proxyUrl = PROXY_BASE + tmdbPath;

  // Fallback example (commented out — only use temporarily if Worker is down)
  // const tmdbFullUrl = `https://api.themoviedb.org/3/${tmdbPath}&api_key=YOUR_KEY_HERE`;
  // const proxyUrl = FALLBACK_PROXY + encodeURIComponent(tmdbFullUrl);

  try {
    const res = await fetch(proxyUrl, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`Proxy/TMDB returned ${res.status}`);
    }

    const movie = await res.json();

    if (!movie.poster_path) {
      console.warn(`No poster available for movie ${movieId} (${movie.title || 'unknown'})`);
      return;
    }

    const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    const container = document.getElementById('moviesContainer');

    const item = document.createElement('div');
    item.className = 'movieItem';
    item.innerHTML = `
      <img 
        src="${posterUrl}" 
        alt="Poster for ${movie.title || 'movie'}" 
        class="moviePoster" 
        loading="lazy" 
        onerror="this.src='https://via.placeholder.com/300x450?text=No+Poster';"
      />
      <h3>${movie.title || 'Unknown Title'}</h3>
      <p>${movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}</p>
    `;

    container.appendChild(item);
  } catch (err) {
    console.error(`Failed to load movie ${movieId}:`, err);
  }
}

async function displayMoviePosters() {
  const container = document.getElementById('moviesContainer');
  if (!container) {
    console.error('#moviesContainer element not found in DOM');
    return;
  }

  container.innerHTML = '<p class="loading">Loading your movies...</p>';

  const movieIds = await getMovieIds();

  if (movieIds.length === 0) {
    container.innerHTML = '<p>No movies found. Add some IDs to <code>data/movieIds.json</code>!</p>';
    return;
  }

  // Clear loading message
  container.innerHTML = '';

  // Fetch all in parallel — good for <50 movies
  // For 100+ movies: consider batching (e.g. 10 at a time) to avoid browser limits
  await Promise.all(
    movieIds.map(id => fetchMoviePoster(id))
  );
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  displayMoviePosters().catch(err => {
    console.error('Initialization error:', err);
    const container = document.getElementById('moviesContainer');
    if (container) {
      container.innerHTML = '<p style="color: red;">Failed to load movies. Check console for details.</p>';
    }
  });

  updateFooter();
  setInterval(updateFooter, 3600000); // update footer every hour
  navBarLinks();
});