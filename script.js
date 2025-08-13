function updateCssTheme (){
    const now = new Date();
    const hour = now.getHours();
    linkElement = document.getElementById('customStyleSheet'); 
    if (hour >= 6 && hour <= 14) {
        linkElement.href="daytime.css"; 
    }
    else if (hour > 14 && hour <= 19){
        linkElement.href="evening.css";
    }
    else {
        linkElement.href="night.css"
    }
}

updateCssTheme (); 
setInterval (updateCssTheme, 60000);

function navBarLinks() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}


// update image function or combine with update css 

function updateImage () {
    const now = new Date();
    const hour = now.getHours(); 
    customImage = document.getElementById('mainImage');
        if (hour >= 6 && hour <= 14) {
        customImage.src = "hurricaneRidge.jpg"; 
    }
    else if (hour > 14 && hour <= 19){
       customImage.src="tartooshSunset.jpg";
    }
    else {
        customImage.src="rainierNightSky.jpeg";
    }
}

updateImage();
setInterval (updateImage, 60000);