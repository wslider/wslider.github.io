
//click event to display new random image
    // image array - match file names of images
        //future: object array (change alt and caption of image)

    // random number generator to select image from array index
    // display image src = ` image array index `+ ".jpg"`

const galleryImage = document.getElementById('galleryImage'); 
const imageButton = document.getElementById('imageButton'); 
const imageArray = ["lushWaterfall.jpeg", "jennyFallLeaves.jpg", "hurricaneRidge.jpg", "tartooshSunset.jpg", "rainierNightSky.jpeg"]; 



function randomImage() {
    let i = Math.floor(Math.random()* imageArray.length); 
    galleryImage.src =  `${imageArray[i]}`; 
}

imageButton.addEventListener('click', randomImage);


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