import { navBarLinks } from 'js/utils.js';
import { updateFooter } from 'js/script.js';
import { getUserRepos } from 'js/projects.js';

const container = document.getElementById('myProjects'); 

document.getElementById('dropMenu').addEventListener('click', navBarLinks); 


getUserRepos('wslider');
setInterval(() => getUserRepos('wslider'), 3600000);


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
