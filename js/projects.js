import { navBarLinks } from "/js/utils.js"; 
import { updateFooter } from "/js/utils.js";

// global vaiables

const container = document.getElementById('myProjects');


// Fetch GitHub repos & sort by last update
async function getUserRepos(ghUserName) {
 try {
 const result = await fetch(`https://api.github.com/users/${ghUserName}/repos`);
 if (!result.ok) {
 throw new Error(`HTTP error! Status: ${result.status}`);
 }
 const repos = await result.json();
 repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
 displayRepos(repos);
 } catch (error) {
 console.error('Error fetching repos:', error);
 container.innerHTML = '<p>Error loading repositories. Please try again later.</p>';
 }
}

// Display repos in the projects container
function displayRepos(repos) {
 if (repos.length === 0) {
 container.innerHTML = '<p>No repositories found.</p>';
 return;
 }
 container.innerHTML = repos.slice(0, 5) // Top 5 most recently updated
 .map(repo => `
 <div class="item">
    <h3>${repo.name}</h3>
    <a href="${repo.html_url}" target="_blank">View GitHub Repository</a>
    <p class="repoDes">"${repo.description || 'Nothing to see here'}"</p>
    <p>Updated: ${repo.updated_at}</p>
 </div>
 `)
 .join('');
}

// Initial fetch and update every hour
getUserRepos('wslider');
setInterval(() => getUserRepos('wslider'), 3600000);


document.getElementById('dropMenu').addEventListener('click', navBarLinks);
navBarLinks();

updateFooter();

    