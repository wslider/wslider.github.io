import { navBarLinks } from "./utils.js";
import { updateFooter } from "./utils.js";

const TMDB_READ_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNTIwZjAzMzYyNGZlMjJmOTliZTljMDdiMTZjNzc0MiIsIm5iZiI6MTc3MDIzOTQzNy42MDE5OTk4LCJzdWIiOiI2OTgzYjVjZGJiODU5ZGM5ODc5MTJhMjYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.EPWgUxbPcQH56AHW_h2bXUBpLBOrQADyQ9jdNUXS8Sw';

const movieId = 11571; 
// Later: change to → const favoriteMovieIds = [11571, 157336 /* Interstellar */, /* more IDs */];

const proxyPrefix = 'https://corsproxy.io/?';
const tmdbBase = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;

const encodedUrl = encodeURIComponent(tmdbBase);
const fullProxyUrl = `${proxyPrefix}${encodedUrl}`;

const headers = {
    'Authorization': `Bearer ${TMDB_READ_TOKEN}`
};

async function fetchMoviePoster() {
    try {
        const response = await fetch(fullProxyUrl, { headers });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        if (!data.poster_path) {
            console.warn(`No poster available for movie ID ${movieId}`);
            return;
        }

        const posterUrl = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
        const moviesContainer = document.getElementById('moviesContainer');
        
        if (!moviesContainer) {
            console.error("Element #moviesContainer not found");
            return;
        }

        const movieItem = document.createElement('div');
        movieItem.className = 'movieItem';
        movieItem.innerHTML = `
            <img src="${posterUrl}" alt="${data.title || 'Movie Poster'}" class="moviePoster"/>
            <h3>More Movies Will Be Added .. Check Back</h3>
        `;

        moviesContainer.appendChild(movieItem);
        
    } catch (error) {  // ← fixed: added (error)
        console.error('Error fetching movie data:', error);
        // Optional UI feedback
        const errorP = document.createElement('p');
        errorP.style.color = 'red';
        errorP.textContent = 'Failed to load poster. See console.';
        document.getElementById('moviesContainer')?.appendChild(errorP);
    }
}

fetchMoviePoster();  

// DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        updateFooter();
        setInterval(updateFooter, 3600000); // 1 hour
        navBarLinks();
    });
} else {
    updateFooter();
    setInterval(updateFooter, 3600000);
    navBarLinks();
}