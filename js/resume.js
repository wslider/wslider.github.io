import { navBarLinks } from '/js/utils.js';
import { updateFooter } from '/js/utils.js';




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
