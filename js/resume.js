import { navBarLinks } from '/js/utils.js';
import { updateFooter } from '/js/utils.js';


const projectsContainer = document.getElementById('myProjects');
const selectedProjects = ['malayalam-explorer-website', 'malayalam-explorer', 'detour365']; 

async function getUserRepos(ghUserName) {
    try {
        const result = await fetch(`https://api.github.com/users/${ghUserName}/repos`);
        if (!result.ok) {
            throw new Error(`HTTP error! Status: ${result.status}`);
        }
        const repos = await result.json(); 
        const filteredRepos = repos.filter(repo => selectedProjects.includes(repo.name));
        filteredRepos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
        displayRepos(filteredRepos);
    }
    catch (error) {
        console.error('Error fetching repos:', error);
        projectsContainer.innerHTML = '<p>Error loading repositories. Please try again later.</p>';
    }
}

function displayRepos(filteredRepos) {
    if (filteredRepos.length === 0) {
        projectsContainer.innerHTML = '<p>No repositories found.</p>';
        return;
    }
    projectsContainer.innerHTML = filteredRepos.map(repo => `
        <div class="item projectItem">
            <h3>${repo.name}</h3>
            <div>
                <a href=${repo.homepage || repo.html_url} target="_blank">Visit Project Website</a>
            </div>
            <div>
                <a href="${repo.html_url}" target="_blank">View GitHub Repository</a>
            </div>
            <p class="repoDes">"${repo.description || 'Nothing to see here'}"</p>
            <p>Updated: ${repo.updated_at}</p>
        </div>
    `).join('');
}

getUserRepos('wslider');
setInterval(() => getUserRepos('wslier'), 3600000); // 1 hour


document.getElementById('dropMenu').addEventListener('click', navBarLinks); 


// Run when the DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {

        updateFooter();
        setInterval(updateFooter, 3600000); // 1 hour 
    });
} else {

        updateFooter();
        setInterval(updateFooter, 3600000);
}
