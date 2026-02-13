import { navBarLinks } from "./utils.js";
import { updateFooter } from "./utils.js";


const proxyPrefix = 'https://api.allorigins.win/raw?url=';

async function getMovieIds() {
  try {
    const response = await fetch('data/movieIds.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();

    // Assuming movieIds.json is array of numbers or {movieId: number} objects
   const ids = data.map(item => {
    if (typeof item === 'number') return item;
    if (item && typeof item === 'object') {
        return parseInt(item.tmdbId || item.movieId || item.id, 10); // fallback keys
    }
    return NaN;
    }).filter(id => !isNaN(id) && id > 0);
    
    return ids.filter(id => !isNaN(id) && id > 0);
  } catch (error) {
    console.error('Error fetching movie IDs:', error);
    return [];
  }
}

async function fetchMoviePoster(movieId) {
  if (!movieId) return;

  const tmdbUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}&language=en-US`;
  const proxyUrl = proxyPrefix + encodeURIComponent(tmdbUrl);

  try {
    const res = await fetch(proxyUrl);
    if (!res.ok) throw new Error(`TMDB HTTP ${res.status}`);

    const movie = await res.json();

    if (!movie.poster_path) {
      console.warn(`No poster for movie ${movieId} (${movie.title || 'unknown'})`);
      return;
    }

    const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    const container = document.getElementById('moviesContainer');

    const item = document.createElement('div');
    item.className = 'movieItem';
    item.innerHTML = `
      <img 
        src="${posterUrl}" 
        alt="${movie.title || 'Movie Poster'}" 
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
    console.error('#moviesContainer not found');
    return;
  }

  container.innerHTML = '<p class="loading">Loading your movies...</p>';

  const movieIds = await getMovieIds();

  if (movieIds.length === 0) {
    container.innerHTML = '<p>No movies found. Add some to data/movieIds.json!</p>';
    return;
  }

  // Clear loading message
  container.innerHTML = '';

  // Parallel fetches (Promise.all) — much faster UX
  await Promise.all(
    movieIds.map(async (id) => {
      await fetchMoviePoster(id);
    })
  );
}

// DOM ready + init
document.addEventListener('DOMContentLoaded', () => {
  displayMoviePosters().catch(err => {
    console.error('Init error:', err);
    document.getElementById('moviesContainer').innerHTML = 
      '<p style="color: red;">Failed to load movies. Check console.</p>';
  });

  updateFooter();
  setInterval(updateFooter, 3600000); // 1 hour
  navBarLinks();
});