// Select DOM elements
const galleryImage = document.getElementById('galleryImage');
const imageCaption = document.getElementById('imageCaption');
const searchImagesInput = document.getElementById('searchImagesInput');
const customStyleSheet = document.getElementById('customStyleSheet');



//fetch from images.JSON later

async function getGalleryData() {
  try {
    const response = await fetch ('data/gallery.json'); 
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  }
  catch (error) {
    console.error('Error fetching gallery data:', error);
    return [];
  }
}

export async function displayRandomImage() {
  try {
    const galleryData = await getGalleryData();
    if (galleryData.length === 0) {
      console.warn('No gallery data available, using default image');
      galleryImage.src = 'media/jennyFallLeaves.jpg';
      galleryImage.alt = 'Jenny Fall Leaves';
      imageCaption.textContent = 'Autumn leaves and Jenny';
      return;
    }
    const randomIndex = Math.floor(Math.random() * galleryData.length);
    const selectedImage = galleryData[randomIndex];
    galleryImage.style.opacity = 0;
    // use setTimeout to create a fade-out effect before changing the image
    setTimeout(() => {
      galleryImage.src = selectedImage.src;
      galleryImage.alt = selectedImage.alt;
      imageCaption.textContent = selectedImage.caption;
      galleryImage.style.opacity = 1;
    }, 30);
  } 
  catch (error) {
    console.error('Error displaying random image:', error);
    // display default image and caption to fill in the gap
    galleryImage.src = 'media/jennyFallLeaves.jpg';
    galleryImage.alt = 'Jenny Fall Leaves';
    imageCaption.textContent = 'Autumn leaves and Jenny';
  }

}

export async function searchAndDisplayImage() {
  try {
    const galleryData = await getGalleryData();
    if (galleryData.length === 0) {
      console.warn('No gallery data available, using default image');
      galleryImage.src = 'media/jennyFallLeaves.jpg';
      galleryImage.alt = 'Jenny Fall Leaves';
      imageCaption.textContent = 'Autumn leaves and Jenny';
      return;
    }
    const searchTerm = searchImagesInput.value.trim().toLowerCase();
    if (!searchTerm) {
      imageCaption.textContent = 'Please enter a search term';
      return;
    }
    const searchResultImage = galleryData.find(item => 
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
        // set default image 
        galleryImage.src = 'media/jennyFallLeaves.jpg';
        galleryImage.alt = 'Jenny Fall Leaves';
      }
      galleryImage.style.opacity = 1;
    }, 30);
  } catch (error) {
    console.error('Error searching and displaying image:', error);
    // display default image and caption to fill in the gap
    galleryImage.src = 'media/jennyFallLeaves.jpg';
    galleryImage.alt = 'Jenny Fall Leaves';
    imageCaption.textContent = 'Autumn leaves and Jenny';
  }; 
}