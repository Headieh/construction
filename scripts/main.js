var x = document.getElementById("notes");
var request = new XMLHttpRequest()

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;
  var sunapi = `https://api.sunrise-sunset.org/json?lat=${crd.latitude}&lng=${crd.longitude}&date=today`
  console.log('url:', sunapi);

  const app = document.getElementById('notes')
  const container = document.createElement('div')
  container.setAttribute('class', 'container')
  app.appendChild(container)
  request.open('GET', sunapi, true)

  request.onload = function () {
    var data = JSON.parse(this.response)
    if (request.status >= 400 || request.status < 200) {
      var data = {"results":{"sunrise":"1:08:18 PM","sunset":"3:13:20 AM","solar_noon":"8:10:49 PM","day_length":"14:05:02","civil_twilight_begin":"12:39:02 PM","civil_twilight_end":"3:42:35 AM","nautical_twilight_begin":"12:03:12 PM","nautical_twilight_end":"4:18:25 AM","astronomical_twilight_begin":"11:24:22 AM","astronomical_twilight_end":"4:57:15 AM"},"status":"OK"}
    }
      //console.log(data);
      //console.log('sunrise', data.results.sunrise);
      //console.log('sunset',data.results.sunset);

      var dateLocal = new Date();
      var hr = dateLocal.getUTCHours()*100;
      var mins =  dateLocal.getUTCMinutes();
      var timeA = hr+mins

      var timeS = data.results.sunset;
      var timeR = data.results.sunrise;

      function timeAlter(time) {
        //console.log('timeV',time)
        var hours = Number(time.match(/^(\d+)/)[1]);
        //console.log('hrs',hours)
        var minutes = Number(time.match(/:(\d+)/)[1]);
        //console.log('mins',minutes)
        var meridiem = time.match(/\s(.*)$/)[1];
        //console.log('meridiem',meridiem)
        if(meridiem == "PM" && hours<12){
          hours = hours+12;
        }
        if(meridiem == "AM" && hours==12) {
          hours = hours-12;}
        var timeV = (hours*100)+minutes
        //console.log(timeV);
        return timeV;
      }

      console.log('sunset',timeAlter(timeS));
      console.log('sunrise',timeAlter(timeR));
      console.log('actual time',timeA);

//r:1308  a:2305    s:313
//r:608ps a:16:05ps s:2013pst

//s <a <r = night
//r <a <s = day



      if(timeAlter(timeS) < timeA & timeA < timeAlter(timeR)){
        console.log('night');
      }
      else{
        console.log('day');
      }



      //console.log(timeAlter()<data.results.sunrise & timeAlter()>data.results.sunset);
      //console.log(timeAlter());

      //console.log(date);
      //const options = {
      //  hour: 'numeric',
      //  minute: 'numeric',
      //  hour12: true
      //};
      //const time = new Intl.DateTimeFormat('en-US', options).format(date)
      //console.log('date:',time);
      /*data.forEach((movie) => {
        const card = document.createElement('div')
        card.setAttribute('class', 'card')

        const h1 = document.createElement('h1')
        h1.textContent = movie.title

        const p = document.createElement('p')
        movie.description = movie.description.substring(0, 300)
        p.textContent = `${movie.description}...`

        container.appendChild(card)
        card.appendChild(h1)
        card.appendChild(p)
      }*/



  }

  request.send()



  /*let r = this.dataStore.results
      let a = {}
      for (let item in r) {
        let time = r[item].split(/:| /)
        let hours = parseInt(time[0])
        let minutes = parseInt(time[1])
        let seconds = parseInt(time[2])
        if (time.length === 4) {
          if (time[3] === 'AM' && hours === 12) { hours = 0 }
          if (time[3] === 'PM' && hours !== 12) { hours += 12 }
        }
        let totalSeconds = hours * 3600 + minutes * 60 + seconds
        a[`${item}_angle`] = (totalSeconds * Math.PI / 43200) + (Math.PI / 2)
      }
      return a*/

}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);

    //var position.latitude = 51.5;
    //var position.longitude = -0.1;

    //var latitude = 38.6;
    //var longitude = 121.1;
