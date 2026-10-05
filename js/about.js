import { navBarLinks, updateFooter } from "./utils.js";

function init() {
  navBarLinks();
  updateFooter();
  setInterval(updateFooter, 60 * 60 * 1000);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
  
