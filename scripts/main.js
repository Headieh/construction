var x = document.getElementById("notes");
let title = document.createElement('p');


function getLocation() {
  if (navigator.geolocation) {
    x.appendChild(navigator.geolocation.getCurrentPosition(showPosition));
  } else {
    title.textContent = 'Geolocation is not supported by this browser.';
    x.appendChild(title);
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
