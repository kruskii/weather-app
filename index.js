//Feature 1 - Functions
//Takes current date & time from the console and formats date

function formatDate(now) {
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = now.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[dayIndex];

  return `Last Updated ${day}  ${hours}:${minutes}`;
}

//Feature 2 - Functions -
// ShowCity fucntion: returns search from weatherapp, returns temp,
//feels-like temp, humidity, and weather description

function showCity(response) {
  console.log(response.data);
  console.log(response.data.main.temp);
  let city = response.data.name;
  let temp = Math.round(response.data.main.temp);
  let humidity = response.data.main.humidity;
  let feelsLike = Math.round(response.data.main.feels_like);
  let weatherDescription = response.data.weather[0].description;
  let cityElement = document.querySelector("#city");
  let tempElement = document.querySelector("#temperature");
  let feelsLikeElement = document.querySelector("#feels-like");
  let humidityElement = document.querySelector("#humidity");
  let descriptionElement = document.querySelector("#description");
  cityElement.innerHTML = `${city}`;
  tempElement.innerHTML = `${temp}°C`;
  feelsLikeElement.innerHTML = `Feels Like ${feelsLike}°C`;
  descriptionElement.innerHTML = `${weatherDescription}`;
  humidityElement.innerHTML = `Humidity ${humidity}%`;
}

//Search function - takes city input, builds url with city and apikey sends to weather app
function search(event) {
  event.preventDefault();

  let cityInput = document.querySelector("#city-input");
  let city = cityInput.value;
  let apiKey = "d956b0842cbabf1d3e0333b095cbca8d";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather?";
  let units = "metric";
  let apiURL = `${apiEndPoint}q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiURL).then(showCity);
}

//Feature 3 - Functions

//Uses navigator api to get current position latitude and longitude,
//build weatherapp url with current position lat & long vlaues + apiKey

function sendCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePoistion);

  function handlePoistion(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    console.log(`latitude ${latitude}, longitude ${longitude}`);
    let apiKey = "d956b0842cbabf1d3e0333b095cbca8d";
    let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather?";
    let units = "metric";
    let apiURL = `${apiEndPoint}lat=${latitude}&lon=${longitude}&units=${units}&apikey=${apiKey}`;
    axios.get(apiURL).then(showCurrentCity);
  }

  // ShowCurrentCity function: returns search from weatherapp, returns city, temp,
  //feels-like temp, humidity, and weather description
  //updates the input search field to match the city

  function showCurrentCity(response) {
    console.log(response.data);
    let city = response.data.name;
    let temp = Math.round(response.data.main.temp);
    let humidity = response.data.main.humidity;
    let feelsLike = Math.round(response.data.main.feels_like);
    let weatherDescription = response.data.weather[0].description;
    let cityElement = document.querySelector("#city");
    let tempElement = document.querySelector("#temperature");
    let feelsLikeElement = document.querySelector("#feels-like");
    let humidityElement = document.querySelector("#humidity");
    let descriptionElement = document.querySelector("#description");
    let inputElement = document.querySelector("#city-input");
    cityElement.innerHTML = `${city}`;
    tempElement.innerHTML = `${temp}°C`;
    feelsLikeElement.innerHTML = `Feels Like ${feelsLike}°C`;
    inputElement.value = `${city}`;
    humidityElement.innerHTML = `Humidity ${humidity}%`;
    descriptionElement.innerHTML = `${weatherDescription}`;
  }
}

//Feature 1 - updates current day/time whenever the page refreshes
let dateElement = document.querySelector("#current-time");
let currentTime = new Date();
console.log(currentTime);
dateElement.innerHTML = formatDate(currentTime);

//Feature 2 - Search any City Weather and return temperature and other details
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

//Feature 3 - Search current location weather and return temperature and other details
let currentLocation = document.querySelector("button");
currentLocation.addEventListener("click", sendCurrentLocation);
