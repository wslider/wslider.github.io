import { navBarLinks } from "./utils.js";
import { updateFooter } from "./utils.js";

const TMDB_READ_TOKEN =  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNTIwZjAzMzYyNGZlMjJmOTliZTljMDdiMTZjNzc0MiIsIm5iZiI6MTc3MDIzOTQzNy42MDE5OTk4LCJzdWIiOiI2OTgzYjVjZGJiODU5ZGM5ODc5MTJhMjYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.EPWgUxbPcQH56AHW_h2bXUBpLBOrQADyQ9jdNUXS8Sw';

const movieId = 11571; 
 //add json or array of favorite movie IDs for more posters

const proxyPrefix = 'https://corsproxy.io/?';
const tmdbBase = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;

const encodedUrl = encodeURIComponent(tmdbBase);
const fullProxyUrl = `${proxyPrefix}${encodedUrl}`;

const headers = {
    'Authorization': `Bearer ${TMDB_READ_TOKEN}`
};

async function fetchMoviePoster (fullProxyUrl, { headers }) {
    try {
        const response = await fetch(fullProxyUrl, { headers });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const posterPath = data.poster_path;
        const posterUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;
        const moviesContainer = document.getElementById('moviesContainer');
        const movieItem = moviesContainer.appendChild(document.createElement('div'));
        movieItem.className = 'movieItem';
        movieItem.innerHTML = `
            <img src="${posterUrl}" alt="Movie Poster" class="moviePoster"/>
            <h3> More Movies Will Be Added .. Check Back In Later </h3>
        `; 
    }
    catch {
        console.error('Error fetching movie data:', error);
    }
}; 

fetchMoviePoster(fullProxyUrl, { headers });

// Run when the DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {

        updateFooter();
        setInterval(updateFooter, 3600000); // 1 hour 

        navBarLinks();
    });
} else {

        updateFooter();
        setInterval(updateFooter, 3600000); // 1 hour 

        navBarLinks();
}
