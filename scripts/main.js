var x = document.getElementById("notes");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.appendChild("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  x.appendChild("Latitude: " + position.coords.latitude +
  "<br>Longitude: " + position.coords.longitude);
  console.log('lat:',position.coords.latitude, 'long',position.coords.longitude);
}



    //var position.latitude = 51.5;
    //var position.longitude = -0.1;

    //var latitude = 38.6;
    //var longitude = 121.1;
