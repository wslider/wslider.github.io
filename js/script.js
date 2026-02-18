import { updateCssTheme } from "./utils.js";
import { navBarLinks } from "./utils.js";
import { updateFooter } from "./utils.js";
import { displayRandomImage } from "./gallery.js";  
import { searchAndDisplayImage } from "./gallery.js";



// Local Time Greeting Functionality

const customeGreeting = document.getElementById('customGreeting');

const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];   



const createGreetingStr = ( year, month, day, hour, minsPadded, amPm, timezoneLabel) => {
   return `${year} ${month} ${day}  ${hour}:${minsPadded} ${amPm}. ${timezoneLabel}`;
  }

function updateLocalTimeGreeting() {
  const now = new Date();
  const year = now.getFullYear();
  const month = monthNames[now.getMonth()];
  const day = now.getDate().toString().padStart(2, '0');
  const hour24 = now.getHours();  // For greeting logic
  const mins = now.getMinutes().toString().padStart(2, '0');
  let hour = hour24;
  const amPm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12;
  hour = hour ? hour : 12;  // 12-hour format


  const fullLocalGreetingText = createGreetingStr(year, month, day, hour, mins, amPm, 'local time 📍');
  
  // Update the DOM element
  const localTimeGreeting = document.getElementById('localTimeGreeting');
  if (localTimeGreeting) {
    localTimeGreeting.textContent = fullLocalGreetingText;
  }
  else {
    console.error('Element with ID localTimeGreeting not found');
  }
}

// Update every minute

// Event listeners

document.getElementById('imageButton').addEventListener('click', displayRandomImage);

const searchForm = document.getElementById("searchImagesForm");
if (searchForm) {
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();           // ← Stops reload
    searchAndDisplayImage();          // Call your function
  });
}



// Run when the DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        
        updateCssTheme();
        setInterval(updateCssTheme, 60000);

        updateLocalTimeGreeting();
        setInterval(updateLocalTimeGreeting, 60000); 

        updateFooter();
        setInterval(updateFooter, 3600000); // 1 hour 

        navBarLinks();
    });
} else {
        
        updateCssTheme();
        setInterval(updateCssTheme, 60000);

        updateLocalTimeGreeting();
        setInterval(updateLocalTimeGreeting, 60000); 

        updateFooter();
        setInterval(updateFooter, 3600000); // 1 hour 

        navBarLinks();
}




