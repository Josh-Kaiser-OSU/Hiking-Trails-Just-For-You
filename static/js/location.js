window.onload = function (){
    userLocationButton();
}

function userLocationButton(){
    // Sets up the button to get latitude and longitude of user when they click the "Use my location"
    // button for
    
    var userLocationButton = document.getElementById("userLocationButton");
    userLocationButton.addEventListener("click", ()=>{
        // Note: Navigator is an attirbute of the window object
        // Note: window is implicit
        if ('geolocation' in navigator) {
            // The user allows for 
            navigator.geolocation.getCurrentPosition( position => {
                // Sends request to get the trails at for that position
                // ** This isn't currently working **
                var url = `./`;
                var userLatitude = position.coords.latitude;
                var userLongitude = position.coords.longitude;
                var xhr = new XMLHttpRequest();
                xhr.open("GET", url);
                xhr.open("GET", url, true);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send();
            });
        } else {
            console.log('geolocation not available');
        }
    })
}