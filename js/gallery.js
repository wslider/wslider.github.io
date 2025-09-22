
//click event to display new random image
    // image array - match file names of images
        //future: object array (change alt and caption of image)

    // random number generator to select image from array index
    // display image src = ` image array index `+ ".jpg"`

// Select DOM elements

const galleryImage = document.getElementById('galleryImage');
const imageButton = document.getElementById('imageButton');
const imageCaption = document.getElementById('imageCaption');
const searchImagesButton = document.getElementById('searchImagesButton');
const searchImagesInput = document.getElementById('searchImagesInput');

const imageArray = [
  { src: 'media/lushWaterfall.jpeg', alt: 'Lush Waterfall', caption: 'A serene waterfall in the forest' },
  { src: 'media/jennyFallLeaves.jpg', alt: 'Jenny Fall Leaves', caption: 'Autumn leaves and Jenny' },
  { src: 'media/hurricaneRidge.jpg', alt: 'Hurricane Ridge', caption: 'Snowy peaks at Hurricane Ridge, Olympic NP' },
  { src: 'media/tartooshSunset.jpg', alt: 'Tartoosh Sunset', caption: 'Sunset over Tartoosh Mountains' },
  { src: 'media/rainierNightSky.jpeg', alt: 'Night Sky and Mount Rainier', caption: 'Mount Rainier and Night Sky' },
  { src: 'media/eclipse-20240408.jpeg', alt: 'Image of 2025 Solar Eclipse in Totality', caption: '2024 April Solar Eclipse' },
  { src: 'media/smoky-mountain-sunset.jpg', alt: 'Image of the Sunset from Clingmans Dome', caption: 'Smoky Mountain Sunset' }
];

// Function to set a random image, alt text, and caption
function randomImage() {
  if (!galleryImage || !imageCaption || !imageArray.length) {
    console.error('Image, caption element, or array is missing');
    return;
  }
  const randomIndex = Math.floor(Math.random() * imageArray.length);
  const selectedImage = imageArray[randomIndex];
  galleryImage.style.opacity = 0;
  setTimeout(() => {
    galleryImage.src = selectedImage.src;
    galleryImage.alt = selectedImage.alt;
    imageCaption.textContent = selectedImage.caption;
    galleryImage.style.opacity = 1;
  }, 30);
}

// Function to search images based on input
function searchImages(e) {
  e.preventDefault(); // Prevent form submission from reloading the page
  if (!galleryImage || !imageCaption || !imageArray.length) {
    console.error('Image, caption element, or array is missing');
    return;
  }
  const searchTerm = searchImagesInput.value.trim().toLowerCase();
  if (!searchTerm) {
    imageCaption.textContent = 'Please enter a search term';
    return;
  }
  const searchResultImage = imageArray.find(item => 
    item.caption.toLowerCase().includes(searchTerm)
  );
  galleryImage.style.opacity = 0;
  setTimeout(() => {
    if (searchResultImage) {
      galleryImage.src = searchResultImage.src;
      galleryImage.alt = searchResultImage.alt;
      imageCaption.textContent = searchResultImage.caption;
    } else {
      imageCaption.textContent = `No image found for "${searchTerm}"`;
      galleryImage.src = ''; // Clear the image or set a default
      galleryImage.alt = '';
    }
    galleryImage.style.opacity = 1;
  }, 30);
}

// Function to toggle navigation links
function navBarLinks() {
    const x = document.getElementById("myLinks");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

// Time of Day CSS Theme switching function
function updateCssTheme() {
  const now = new Date();
  const hour = now.getHours();
  const linkElement = document.getElementById('customStyleSheet');
  if (hour >= 6 && hour <= 14) {
    linkElement.href = 'css/daytime.css';
  } else if (hour > 14 && hour <= 19) {
    linkElement.href = 'css/evening.css';
  } else {
    linkElement.href = 'css/night.css';
  }
}

updateCssTheme();
setInterval(updateCssTheme, 60000);

// Event listeners
imageButton.addEventListener('click', randomImage);
searchImagesButton.addEventListener('click', searchImages);
