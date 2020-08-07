var request = new XMLHttpRequest()

var options = {
  enableHighAccuracy: false,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;
  var sunapi = `https://api.sunrise-sunset.org/json?lat=${crd.latitude}&lng=${crd.longitude}&date=today`;
  console.log('location was given and working');
  console.log('url:', sunapi);
  request.open('GET', sunapi, true)
  request.onload = function() {
    var data = JSON.parse(this.response)
    if (request.status >= 400 || request.status < 200) {
      var data = {
        "results": {
          "sunrise": "1:08:18 PM",
          "sunset": "3:13:20 AM",
          "solar_noon": "8:10:49 PM",
          "day_length": "14:05:02",
          "civil_twilight_begin": "12:39:02 PM",
          "civil_twilight_end": "3:42:35 AM",
          "nautical_twilight_begin": "12:03:12 PM",
          "nautical_twilight_end": "4:18:25 AM",
          "astronomical_twilight_begin": "11:24:22 AM",
          "astronomical_twilight_end": "4:57:15 AM"
        },
        "status": "OK"
      }
    }
    var dateLocal = new Date();
    var hr = dateLocal.getUTCHours() * 100;
    var mins = dateLocal.getUTCMinutes();
    var timeA = hr + mins
    var timeS = data.results.sunset;
    var timeR = data.results.sunrise;

    function timeAlter(time) {
      var hours = Number(time.match(/^(\d+)/)[1]);
      var minutes = Number(time.match(/:(\d+)/)[1]);
      var meridiem = time.match(/\s(.*)$/)[1];
      if (meridiem == "PM" && hours < 12) {
        hours = hours + 12;
      }
      if (meridiem == "AM" && hours == 12) {
        hours = hours - 12;
      }
      var timeV = (hours * 100) + minutes
      return timeV;
    }

    console.log('sunset', timeAlter(timeS));
    console.log('sunrise', timeAlter(timeR));
    console.log('actual time', timeA);
    let nothingMakesSense = timeAlter(timeS) < timeAlter(timeR); //because of UTC timezone
    let isdaytime = false;

    if ((timeAlter(timeS) < timeA && timeA < timeAlter(timeR))) {
      isdaytime = true;
      console.log('day')
    }
    if (nothingMakesSense) {
      isdaytime = !isdaytime;
      console.log('backwards')
    }
    console.log('daytime:', isdaytime)

    var bgImg = document.getElementById("backgroundimage");
    var item = document.getElementById("item");
    var iImg = document.createElement("img");

    if (isdaytime) { //../img/clouds.png
      iImg.setAttribute('src', 'img/balloon.png');
      iImg.setAttribute('alt', 'floating red baloon with long red string attached to it');
      iImg.className = 'img-fluid'
      bgImg.className = 'day'
      bgImg.style.backgroundImage = "url('https://raw.githubusercontent.com/Headieh/construction/master/img/clouds.png')";
    } else {
      iImg.setAttribute('src', 'img/astronaut.png');
      iImg.setAttribute('alt', 'floating astronaut');
      bgImg.className = 'night'
      bgImg.style.backgroundImage = "url('https://raw.githubusercontent.com/Headieh/construction/master/img/star.png')";
    }
    item.appendChild(iImg);
  }
  request.send()
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
  console.log('location was not given and defualt CA sunset sunrise times were used');

  var sunapi = 'https://api.sunrise-sunset.org/json?lat=38.6367488&lng=-121.15968000000001&date=today';
  console.log('url:', sunapi);

  request.open('GET', sunapi, true)
  request.onload = function() {
    var data = JSON.parse(this.response)
    if (request.status >= 400 || request.status < 200) {
      var data = {
        "results": {
          "sunrise": "1:08:18 PM",
          "sunset": "3:13:20 AM"
        },
        "status": "OK"
      }
    }
    var dateLocal = new Date();
    var hr = dateLocal.getUTCHours() * 100;
    var mins = dateLocal.getUTCMinutes();
    var timeA = hr + mins
    var timeS = data.results.sunset;
    var timeR = data.results.sunrise;

    function timeAlter(time) {
      var hours = Number(time.match(/^(\d+)/)[1]);
      var minutes = Number(time.match(/:(\d+)/)[1]);
      var meridiem = time.match(/\s(.*)$/)[1];
      if (meridiem == "PM" && hours < 12) {
        hours = hours + 12;
      }
      if (meridiem == "AM" && hours == 12) {
        hours = hours - 12;
      }
      var timeV = (hours * 100) + minutes
      return timeV;
    }

    console.log('sunset', timeAlter(timeS));
    console.log('sunrise', timeAlter(timeR));
    console.log('actual time', timeA);

    let nothingMakesSense = timeAlter(timeS) < timeAlter(timeR); //because of UTC timezone
    let isdaytime = false;
    if ((timeAlter(timeS) < timeA && timeA < timeAlter(timeR))) {
      isdaytime = true;
    }
    if (nothingMakesSense) {
      isdaytime = !isdaytime;
    }
    console.log('daytime:', isdaytime)
    var bgImg = document.getElementById("backgroundimage");
    var item = document.getElementById("item");
    var iImg = document.createElement("img");

    if (isdaytime) {
      iImg.setAttribute('src', 'img/balloon.png');
      iImg.setAttribute('alt', 'floating red baloon with long red string attached to it');
      bgImg.style.backgroundImage = 'url("https://raw.githubusercontent.com/Headieh/construction/master/img/clouds.png")';
      bgImg.style.color = "black";
      bgImg.className = 'day'
    }
    else {
      bgImg.className = 'night'
      iImg.setAttribute('src', 'img/astronaut.png');
      iImg.setAttribute('alt', 'floating astronaut');
      bgImg.style.backgroundImage = 'url("https://raw.githubusercontent.com/Headieh/construction/master/img/star.png")'; //../img/star.png
      bgImg.style.color = "white";
    }
    item.appendChild(iImg);
  }
  request.send()
}

navigator.geolocation.getCurrentPosition(success, error, options);
