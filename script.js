function updateCssTheme (){
    const now = new Date();
    const hour = now.getHours();
    linkElement = document.getElementById('customStyleSheet'); 
    if (hour >= 6 && hour <= 15) {
        linkElement.href="daytime.css"; 
    }
    else if (hour > 15 && hour <= 19){
        linkElement.href="evening.css";
    }
    else {
        linkElement.href="night.css"
    }
}

updateCssTheme (); 
setInterval (updateCssTheme, 60000);

// update image function or combine with update css 