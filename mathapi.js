document.getElementById("weatherSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const lat = document.getElementById("latInput").value;
  const lng = document.getElementById("lngInput").value;
  const params = document.getElementById("paramInput").value;
  if (lat === "" || lng === "" || params === "")
    return;
  console.log(lat);
  console.log(lng);
  console.log(params);

  const formatUrl = (lat, lng, params) => `https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}`;
  let url = formatUrl(lat, lng, params );


    fetch(url, {
    headers: {
      'Authorization': '75807794-7a41-11eb-8302-0242ac130002-7580780c-7a41-11eb-8302-0242ac130002'
    }
    })
      .then(function(response) {
        return response.json();
      }).then(function(jsonData) {


      //let results = JSON.stringify(jsonData, null, 8);
      let results = "";

      switch (params) {
  case 'airTemperature':
    results = "<h2>Current temperature in selected location: " + jsonData.hours[0].airTemperature.noaa + "° Celsius</h2>";
    break;
  case 'humidity':
    results = "<h2>Current humidity in selected location: " + jsonData.hours[0].humidity.noaa + "% </h2>";
    break;
  case 'windSpeed':
    results = "<h2>Current wind speed in selected location: " + jsonData.hours[0].windSpeed.noaa + " meters per second </h2>";
    break;
}
      document.getElementById("weatherResults").innerHTML = results;



      let forecast = "";
      for (let j=1; j < 4; j++) {

        forecast += "<div class=\"card\">";
        switch (params) {
          case 'airTemperature':
            forecast += "<p>Temperature in " + j + " hours: " + jsonData.hours[j].airTemperature.noaa + "° Celsius</h2>";
            break;
          case 'humidity':
            forecast += "<p>Humidity in " + j + " hours: " + jsonData.hours[j].humidity.noaa + "%</p>";
            break;
          case 'windSpeed':
            forecast += "<p>Wind speed in " + j + " hours: " + jsonData.hours[j].windSpeed.noaa + " meters per second</p>";
            break;
        }

        forecast += "</div>";
      }
      document.getElementById("forecastResults").innerHTML = forecast;


      });
  });
