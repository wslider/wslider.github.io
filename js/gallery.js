// Select DOM elements
const galleryImage = document.getElementById('galleryImage');
const imageButton = document.getElementById('imageButton');
const imageCaption = document.getElementById('imageCaption');
const searchImagesButton = document.getElementById('searchImagesButton');
const searchImagesInput = document.getElementById('searchImagesInput');
const customStyleSheet = document.getElementById('customStyleSheet');



//fetch from images.JSON later

const imageArray = [
  { src: 'media/lushWaterfall.jpeg', alt: 'Lush Waterfall', caption: 'A serene waterfall in the forest' , cssTheme:'css/daytime.css'},
  { src: 'media/jennyFallLeaves.jpg', alt: 'Jenny Fall Leaves', caption: 'Autumn leaves and Jenny' , cssTheme:'css/night.css'},
  { src: 'media/hurricaneRidge.jpg', alt: 'Hurricane Ridge', caption: 'Snowy peaks at Hurricane Ridge, Olympic NP' , cssTheme:'css/evening.css'},
  { src: 'media/tartooshSunset.jpg', alt: 'Tartoosh Sunset', caption: 'Sunset over Tartoosh Mountains' , cssTheme:'css/evening.css'},
  { src: 'media/rainierNightSky.jpeg', alt: 'Night Sky and Mount Rainier', caption: 'Mount Rainier and Night Sky' , cssTheme:'css/night.css'},
  { src: 'media/eclipse-20240408.jpeg', alt: 'Image of 2025 Solar Eclipse in Totality', caption: '2024 April Solar Eclipse' , cssTheme:'css/night.css'},
  { src: 'media/smoky-mountain-sunset.jpg', alt: 'Image of the Sunset from Clingmans Dome', caption: 'Smoky Mountain Sunset' , cssTheme:'css/evening.css'},
  { src: 'media/swiftcurrentlake-sunrise-mountain.jpeg', alt: 'Image of Swiftcurrent Lake in Glacier National Park', caption: 'Swiftcurrent Lake, Glacier NP', cssTheme:'css/night.css'}
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
    customStyleSheet.href = selectedImage.cssTheme;
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
      customStyleSheet.href = searchResultImage.cssTheme;
    } else {
      imageCaption.textContent = `No image found for "${searchTerm}"`;
      galleryImage.src = ''; // Clear the image or set a default
      galleryImage.alt = '';
      customStyleSheet.href = 'css/evening.css';
    }
    galleryImage.style.opacity = 1;
  }, 30);
}



// Event listeners
imageButton.addEventListener('click', randomImage);

searchImagesButton.addEventListener('click', searchImages);




/*async function loadImageArray() {
  try {
    const response = await fetch('js/gallery.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const imageArray = await response.json();
    return imageArray;
  } catch (error) {
    console.error('Error fetching gallery data:', error);
    return [];
  }
}*/