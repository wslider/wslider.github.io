import { updateCssTheme } from "./utils.js";
import { navBarLinks } from "./utils.js";
import { updateFooter } from "./utils.js";



function updateImage() {
    const now = new Date();
    const hour = now.getHours();
    const customImage = document.getElementById('mainImage');
    if (hour >= 6 && hour <= 14) {
        customImage.src = "media/hurricaneRidge.jpg";
    }
    else if (hour > 14 && hour <= 19) {
        customImage.src = "media/smoky-mountain-sunset.jpg";
    }
    else {
        customImage.src = "media/rainierNightSky.jpeg";
    }
}

// Local Time Greeting Functionality

const customeGreeting = document.getElementById('customGreeting');

const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];   

const getGreeting = (hour24) => {
  switch (true) {
    case (hour24 >= 5 && hour24 < 12):
      return { 
        english: "Good Morning", 
        malayalam: "സുപ്രഭാതം",
      };
    case (hour24 >= 12 && hour24 < 17):
      return { 
        english: "Good Afternoon", 
        malayalam: "ശുഭാന്തരം",
      };
    case (hour24 >= 17 && hour24 < 22):
      return { 
        english: "Good Evening", 
        malayalam: "ശുഭ സന്ധ്യ",
      };
    case (hour24 >= 22 || hour24 < 5):
      return { 
        english: "Good Night", 
        malayalam: "ശുഭരാത്രി",
      };
    default:
      return { 
        english: "Hello"
      };
  }
};

const createGreetingStr = ( year, month, day, hour, minsPadded, amPm, timezoneLabel) => {
   return `It is ${year} ${month} ${day} at ${hour}:${minsPadded} ${amPm}. ${timezoneLabel}`;
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

  const greeting = getGreeting(hour24);

  const fullLocalGreetingText = createGreetingStr(year, month, day, hour, mins, amPm, 'local time 📍');
  
  // Update custom greeting element
  customeGreeting.textContent = `${greeting.english || 'Welcome'}!`;

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

document.getElementById('dropMenu').addEventListener('click', navBarLinks); 

// Run when the DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        
        updateCssTheme();
        setInterval(updateCssTheme, 60000);

        updateImage();
        setInterval(updateImage, 60000);

        updateLocalTimeGreeting();
        setInterval(updateLocalTimeGreeting, 60000); 

        updateFooter();
        setInterval(updateFooter, 3600000); // 1 hour 
    });
} else {
        
        updateCssTheme();
        setInterval(updateCssTheme, 60000);

        updateImage();
        setInterval(updateImage, 60000);

        updateLocalTimeGreeting();
        setInterval(updateLocalTimeGreeting, 60000); 

        updateFooter();
        setInterval(updateFooter, 3600000); // 1 hour 
}




