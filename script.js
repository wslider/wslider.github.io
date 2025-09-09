function updateCssTheme() {
    const now = new Date();
    const hour = now.getHours();
    linkElement = document.getElementById('customStyleSheet');
    if (hour >= 6 && hour <= 14) {
        linkElement.href = "daytime.css";
    }
    else if (hour > 14 && hour <= 19){
        linkElement.href = "evening.css";
    }
    else {
        linkElement.href = "night.css";
    }
}

updateCssTheme();
setInterval(updateCssTheme, 60000);

function navBarLinks() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

function updateImage() {
    const now = new Date();
    const hour = now.getHours();
    customImage = document.getElementById('mainImage');
    if (hour >= 6 && hour <= 14) {
        customImage.src = "media/hurricaneRidge.jpg";
    }
    else if (hour > 14 && hour <= 19) {
        customImage.src = "media/tartooshSunset.jpg";
    }
    else {
        customImage.src = "media/rainierNightSky.jpeg";
    }
}

updateImage();
setInterval(updateImage, 60000);

function customGreeting() {
    const now = new Date();
    const hour = now.getHours();
    customGreeting = document.getElementById('customGreeting');
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

customGreeting();
setInterval(customGreeting, 60000);