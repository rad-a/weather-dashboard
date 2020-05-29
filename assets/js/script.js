// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
//TODO
//1. ajax function to retrieve weather information
//1a. Current weather API, call by city name
//1b. 5day weather API
//1c. UV index API
//2.  create ul + li to store recent searches (reference activity 03 - AJAX-to-HTML & 05-Bujumbura)
//3. Use local storage to persist search history list

// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
//TODO
//1. Statements to transfer content to HTML $("id").html/text("Text/tag" + response.object-name);)

// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
//TODO
//1. Add class to different UX index levels

// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
//TODO
//1.
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
// WHEN I open the weather dashboard
// THEN I am presented with the last searched city forecast


$(document).ready(function() {
const APIKey = "b0aad9176907bfa1ff1be40872b7b1e1";
const citiesDisplayEl = document.querySelector(".cities-holder");
let inputEl = document.getElementById("city-input");
const searchEl = document.getElementById("search-city");
const currentCityEl = document.getElementById("current-city");
const currentDateEl = document.getElementById("current-date");
const tempEl = document.getElementById("temp");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");
const uvEl = document.getElementById("uv-index");
const iconEl = document.getElementById("weather-icon");



function displayWeatherInfo() {
  let cityName = $(this).attr("city-name");
  // let countryCode =  $(this).attr("state-code");
  //URL pattern to query the database
  let queryURL = "api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;

  //AJAX request for current weather conditions
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    //Store city name and country
let city = response.name +", " + response.sys.country;

//Display city name 
$(currentCityEl).text(city);

    //Store temperature data
let currentTemp = response.temp;

//Display temperature 
$(tempEl).text("Temperature: " + currentTemp);

    //Store humidity data
let humidityLevel = response.humidity;

//Display humidity 
$(humidityEl).text("Humidity: " + humidityLevel);

    //Store wind speed data
    let windSpeed = response.wind.speed;

    //Display wind speed 
    $(humidityEl).text(">Wind Speed: " + windSpeed);
    

  //Create current date info using moment.js (maybe) ===REVISIT===-========**^^^^


  //Create <img> element for current weather condition
let weatherIcon = $('<img>').attr({src: iconURL, id: "weather-icon"});

  //Store current weather icon
  let iconURL = response.icon;

  //Display weather icon
$(iconEl).append(weatherIcon);

  })


  //AJAX request to retrieve 5-day weather forecast
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

  })


  //AJAX request to retrieve UV data
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then (function(response) {

  })
}

//Array to display recent city searches
let cities = [];
let cityLength = 5; //**==revisit==** */

//Function to display current weather data
function renderList() {
  //Delete existing list items before adding new ones
  $(citiesDisplayEl).empty();

  //Loop through list of cities
  for (let i = 0; i < cities.length; i++) {
    //Dynamically generate a list item for each new city
    let c = $("<li>");
    c.addClass("list-group-item prev-search");
    c.attr("data-name", cities[i]);
    c.text(cities[i]);
    // $(c).attr("data-id", c.cities[i]);

        //Limit search history display to 10 cities ==***REVISIT. NOT WORKING***==  
    if (cities.length >= cityLength) {
        cities.slice(0,5);
    }

    //Add searched city to the top of the recent searches list
    $(citiesDisplayEl).prepend(c);
  }
}

//Click event function to display city from renderList and display
//1. display results from renderList
$("#search-city").on("click", function (event) {
  //Prevent the form from trying
  event.preventDefault();

    //Grab the text from the input box and remove excess spaces before/after string
    let city = $("#city-input").val().trim();

  //Add city from the text box to the list of cities
  cities.push(city);

  //call renderList function to display array of searched cities
  renderList();

//   //Clear input box...===MIGHT NOT NEED===
// $(city).val("");

});


//Add click event listener to .current-search elements to display the current and 5day forecast
$(document).on("click", ".prev-search", displayWeatherInfo);


//==ADD A CLICK DISPLAY EVENT (REFERENCE ACTIVITY 10)

//2. display current weather condition for current city


//3. display 5-day forecast for current city
})