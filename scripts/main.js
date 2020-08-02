var SunCalc = require('suncalc');
suncalc.getTimes(new Date(), 51.5, -0.1);

  if( navigator.geolocation )
  {
       navigator.geolocation.getCurrentPosition( success, fail );
  }
  else
  {
       alert("Sorry, your browser does not support geolocation services.");
  }

  function success(position)
  {

    var times = suncalc.getTimes(new Date(), position.latitude, position.longitude);

        // GeoPosition Object
       alert("Your coordinates are " + position.latitude + ", " + position.longitude);


  }
  function fail()
  {
    //var position.latitude = 51.5;
    //var position.longitude = -0.1;

    var latitude = 38.6;
    var longitude = 121.1;
    var times = suncalc.getTimes(new Date(), latitude, longitude);
    console.log(times);



  }
