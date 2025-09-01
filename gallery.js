
const galleryImage = document.getElementById('galleryImage'); 
const imageButton = document.getElementById('imageButton'); 
const imageArray = ["lushWaterfall.jpeg", "jennyFallLeaves.jpg", "hurricaneRidge.jpg", "tartooshSunset.jpg"]; 



function randomImage() {
    let i = Math.floor(Math.random()* imageArray.length); 
    galleryImage.src =  `${imageArray[i]}`; 
}

imageButton.addEventListener('click', randomImage);



//click event to display new random image
    // image array - match file names of images
        //future: object array (change alt and caption of image)

    // random number generator to select image from array index
    // display image src = ` image array index `+ ".jpg"`