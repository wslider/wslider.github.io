// Select DOM elements
const galleryImage = document.getElementById('galleryImage');
const imageCaption = document.getElementById('imageCaption');
const searchImagesInput = document.getElementById('searchImagesInput');

// Fetch gallery data from JSON
async function getGalleryData() {
  try {
    const response = await fetch('data/gallery.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching gallery data:', error);
    return [];
  }
}

export async function displayRandomImage() {
  try {
    const galleryData = await getGalleryData();
    if (galleryData.length === 0) {
      console.warn('No gallery data available, using default image');
      setDefaultImage();
      return;
    }

    const randomIndex = Math.floor(Math.random() * galleryData.length);
    const selectedImage = galleryData[randomIndex];

    // Fade out current image
    galleryImage.style.opacity = 0;

    setTimeout(() => {
      galleryImage.src = selectedImage.src;
      galleryImage.alt = selectedImage.alt;
      imageCaption.textContent = selectedImage.caption;

      // Handle artLink (make image clickable if link exists)
      if (selectedImage.artLink) {
        galleryImage.style.cursor = 'pointer';
        galleryImage.onclick = () => window.open(selectedImage.artLink, '_blank', 'noopener,noreferrer');
      } else {
        galleryImage.style.cursor = 'default';
        galleryImage.onclick = null;
      }

      galleryImage.style.opacity = 1;
    }, 300); // Slightly longer fade for smoother effect
  } catch (error) {
    console.error('Error displaying random image:', error);
    setDefaultImage();
  }
}

export async function searchAndDisplayImage() {
  try {
    const galleryData = await getGalleryData();
    if (galleryData.length === 0) {
      console.warn('No gallery data available, using default image');
      setDefaultImage();
      return;
    }

    const searchTerm = searchImagesInput.value.trim().toLowerCase();
    if (!searchTerm) {
      imageCaption.textContent = 'Please enter a search term';
      return;
    }

    // Find first match in caption (case-insensitive)
    const searchResultImage = galleryData.find(item =>
      item.caption.toLowerCase().includes(searchTerm)
    );

    galleryImage.style.opacity = 0;

    setTimeout(() => {
      if (searchResultImage) {
        galleryImage.src = searchResultImage.src;
        galleryImage.alt = searchResultImage.alt;
        imageCaption.textContent = searchResultImage.caption;

        // Handle artLink
        if (searchResultImage.artLink) {
          galleryImage.style.cursor = 'pointer';
          galleryImage.onclick = () => window.open(searchResultImage.artLink, '_blank', 'noopener,noreferrer');
        } else {
          galleryImage.style.cursor = 'default';
          galleryImage.onclick = null;
        }
      } else {
        imageCaption.textContent = `No image found for "${searchTerm}"`;
        setDefaultImage(); // Show default when no match
      }

      galleryImage.style.opacity = 1;
    }, 300);
  } catch (error) {
    console.error('Error searching and displaying image:', error);
    setDefaultImage();
  }
}

// Helper function to set default image and reset click behavior
function setDefaultImage() {
  galleryImage.src = 'media/jennyFallLeaves.jpg';
  galleryImage.alt = 'Jenny Fall Leaves';
  imageCaption.textContent = 'Autumn leaves and Jenny';
  galleryImage.style.cursor = 'default';
  galleryImage.onclick = null;
  galleryImage.style.opacity = 1;
}