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

function customGreeting() {
    const now = new Date();
    const hour = now.getHours();
    const customGreeting = document.getElementById('customGreeting');
    if (hour >= 6 && hour <= 14) {
        customGreeting.textContent = "Good Day To You";
    }
    else if (hour > 14 && hour <= 19) {
        customGreeting.textContent = "Have A Good Evening";
    }
    else {
        customGreeting.textContent = "Have A Good Night";
    }
}

document.getElementById('dropMenu').addEventListener('click', navBarLinks); 

// Run when the DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        
        updateCssTheme();
        setInterval(updateCssTheme, 60000);

        updateImage();
        setInterval(updateImage, 60000);

        customGreeting();
        setInterval(customGreeting, 60000);

        updateFooter();
        setInterval(updateFooter, 3600000); // 1 hour 
    });
} else {
        
        updateCssTheme();
        setInterval(updateCssTheme, 60000);
        customGreeting();
        updateImage();
        setInterval(updateImage, 60000);
        setInterval(customGreeting, 60000);
        updateFooter();
        setInterval(updateFooter, 3600000);
}




