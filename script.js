document.getElementById("weatherSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("weatherInput").value;
  if (value === "")
    return;
  console.log(value);
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=b8f5106660fd24710edd65bd24af1492";
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      let results = "";
      console.log(json);
      results += '<h2>Weather in ' + json.name + "</h2>";
      for (let i=0; i < json.weather.length; i++) {
	      results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
      }
      results += '<h2>' + json.main.temp + " &deg;F</h2>"
      results += '<h3>(Feels Like: ' + json.main.feels_like + ' &deg;F)</h3>';
      results += "<p>"
      for (let i=0; i < json.weather.length; i++) {
	      results += json.weather[i].description
	      if (i !== json.weather.length - 1)
	        results += ", "
      }
      results += ', wind speed: ' + json.wind.speed + 'm/sec , humidity: ' + json.main.humidity + '%'
      results += "</p>";
      document.getElementById("weatherResults").innerHTML = results;
    });
      const url2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=b8f5106660fd24710edd65bd24af1492";
      fetch(url2)
        .then(function(response) {
          return response.json();
        }).then(function(json) {
          console.log(json);
          let forecast = "";
          forecast += "<h2 id='forecastHeader'> 5-Day Forecast <h2>";
          for (let i = 0; i < json.list.length; i++) {
            forecast += "<h2>" + moment(json.list[i].dt_txt).format('MMMM Do YYYY, h:mm:ss a') + "</h2>";
            forecast += "<p>Temperature: " + json.list[i].main.temp + ", Feels Like: " + json.list[i].main.feels_like + "</p>";
            forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>'
          }
          document.getElementById("forecastResults").innerHTML = forecast;
        });
});