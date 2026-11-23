import { updateCssTheme, navBarLinks, updateFooter } from "./utils.js";
import { displayRandomImage, searchAndDisplayImage } from "./gallery.js";

// ────────────────────────────────────────────────
// Greeting & Time
// ────────────────────────────────────────────────

document.getElementById('date').value = new Date().toISOString().split('T')[0];

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const createGreetingStr = (year, month, day, hour, minsPadded, amPm) => {
  return `${year} ${month} ${day} ${hour}:${minsPadded} ${amPm} local time 📍`;
};

function updateLocalTimeGreeting() {
  const now = new Date();
  const year = now.getFullYear();
  const month = monthNames[now.getMonth()];
  const day = now.getDate().toString().padStart(2, "0");
  let hour = now.getHours();
  const minsPadded = now.getMinutes().toString().padStart(2, "0");
  const amPm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12; // 12-hour format (0 → 12)

  const greetingText = createGreetingStr(year, month, day, hour, minsPadded, amPm);

  const el = document.getElementById("localTimeGreeting");
  if (el) {
    el.textContent = greetingText;
  } else {
    console.warn("Element #localTimeGreeting not found");
  }
}

// ────────────────────────────────────────────────
// Initialization
// ────────────────────────────────────────────────

function init() {
  // Theme & UI
  updateCssTheme();
  setInterval(updateCssTheme, 60000);

  // Time greeting
  updateLocalTimeGreeting();
  setInterval(updateLocalTimeGreeting, 60000);

  // Footer
  updateFooter();
  setInterval(updateFooter, 3600000); // 1 hour

  navBarLinks();

}

// Event Listeners

const imageButton = document.getElementById("imageButton");
if (imageButton) {
  imageButton.addEventListener("click", displayRandomImage);

  // Uncomment lines below if mobile taps are unresponsive
  // imageButton.addEventListener("touchend", (e) => {
  //   e.preventDefault();
  //   displayRandomImage();
  // });
}

const searchForm = document.getElementById("searchImagesForm");
if (searchForm) {
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();           // Stops page reload
    searchAndDisplayImage();
  });

  // Optional: touch support for submit button if needed
  // const searchBtn = document.getElementById("searchImagesButton");
  // if (searchBtn) {
  //   searchBtn.addEventListener("touchend", (e) => {
  //     e.preventDefault();
  //     searchAndDisplayImage();
  //   });
  // }
} else {
  console.warn("Form #searchImagesForm not found");
}

// Initialize when DOM is ready

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}