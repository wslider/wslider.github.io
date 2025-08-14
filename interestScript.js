function updateCssTheme() {
    const now = new Date();
    const hour = now.getHours();
    linkElement = document.getElementById('customStyleSheet');
    if (hour >= 6 && hour <= 14) {
        linkElement.href = "daytime.css";
    }
    else if (hour > 14 && hour <= 19) {
        linkElement.href = "evening.css";
    }
    else {
        linkElement.href = "night.css";
    }
}

updateCssTheme();
setInterval(updateCssTheme, 60000);


document.addEventListener('DOMContentLoaded', () => {
    const bigfootToggleButton = document.getElementById('bigfootToggleButton');
    const bigfootTargetElement = document.getElementById('bigfootTargetElement');
    
    bigfootTargetElement.style.display = 'none';
    
    bigfootToggleButton.addEventListener('click', () => {
        if (bigfootTargetElement.style.display === 'none') {
            bigfootTargetElement.style.display = 'block';
        } else {
            bigfootTargetElement.style.display = 'none';
        }
    });
});