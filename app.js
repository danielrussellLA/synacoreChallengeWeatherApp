var currentLocation = document.getElementById("currentLocation");
var currentTemp = document.getElementById("currentTemp");
var currentCondition = document.getElementById("currentCondition");
var weatherIcon = document.getElementById("weatherIcon")

function getWeather(){
  httpRequest('https://weathersync.herokuapp.com/ip', function(data){
    var cityInfo = JSON.parse(data)
    httpRequest('https://weathersync.herokuapp.com/weather/' + cityInfo.location.latitude + ',' + cityInfo.location.longitude, function(weather){
    	displayWeatherData(weather);
    })
  });
  return weatherInfo;
}

function displayWeatherData(data, lat, lng){
	var weatherData = JSON.parse(data);
	var city = weatherData.name;
	var temp = Math.floor((weatherData.main.temp - 273.15) * (9/5) + 32); // convert kelvin to fahrenheit
	var condition = weatherData.weather[0].main;
	var icon = weatherData.weather[0].icon;

	currentLocation.innerHTML = city;
	currentTemp.innerHTML = temp + '&deg;' + "F";
	currentCondition.innerHTML = condition;
	weatherIcon.innerHTML = "<img src='http://openweathermap.org/img/w/" + icon + ".png''>"
}

function httpRequest(url, callback){
	var weatherData = new XMLHttpRequest();
	weatherData.onreadystatechange = function(){
		if(weatherData.readyState == 4 && weatherData.status == 200){
			callback(weatherData.responseText);
		} else {
			console.log('Error: Problem in HTTP request');
		}
	}
	weatherData.open("GET", url, true);  // true makes it async
	weatherData.send(null);
}

getWeather();
