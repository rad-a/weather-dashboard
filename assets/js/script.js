$(document).ready(function () {
    const APIKey = "b0aad9176907bfa1ff1be40872b7b1e1";
    const citiesDisplayEl = document.querySelector(".cities-holder");
    let inputEl = document.getElementById("city-input");
    const searchEl = document.getElementById("search");
    const currentCityEl = document.getElementById("current-city");
    const currentDateEl = document.getElementById("current-date");
    const tempEl = document.getElementById("temp");
    const humidityEl = document.getElementById("humidity");
    const windEl = document.getElementById("wind");
    const uvEl = document.getElementById("uv-index");
    const iconEl = document.getElementById("weather-icon");
    const forecastEl = document.getElementById("forecast-container");
    const forecastDivs = document.querySelectorAll(".forecast");
  
    
    function getWeatherInfo(cityName) {
 
      //URL pattern to query the database
      let queryURL =
        "http://api.openweathermap.org/data/2.5/weather?q=" +
        
        cityName +
        "&appid=" +
        APIKey;
  
      //AJAX request for current weather conditions
      $.ajax({
        url: queryURL,
        method: "GET",
      }).then(function (response) {
        //Store city name and country
        let city = response.name + ", " + response.sys.country;
  console.log(response);
        //Display city name
        $(currentCityEl).html(city);
  
        //Store dte information
        const currentDate = new Date(response.dt * 1000);
        console.log(currentDate);
  
        const date = currentDate.getDate();
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();
  
        //Display current date
        $(currentDateEl).html(" (" + month + "/" + date + "/" + year + ")");
  
        //Store temperature data
        let currentTemp = response.main.temp;
  
        //Display temperature
        $(tempEl).html("Temperature: " + k2f(currentTemp) + " &#8457;");
  
        //Store humidity data
        let humidityLevel = response.main.humidity;
  
        //Display humidity
        $(humidityEl).html("Humidity: " + humidityLevel + " &#37;");
  
        //Store wind speed data
        let windSpeed = response.wind.speed;
  
        //Display wind speed
        $(windEl).html("Wind Speed: " + +mps2mph(windSpeed) + " MPH");
  
        //Store current weather icon
        let iconURL = response.weather[0].icon;
  
        //Create <img> element for current weather condition
        let weatherIcon = $("<img>");
        $(weatherIcon).attr({
          src: "https://openweathermap.org/img/wn/" + iconURL + ".png",
          id: "weather-icon",
        });
  
        //Display weather icon
        $(iconEl).html(weatherIcon);
  
        let lat = response.coord.lat;
        let lon = response.coord.lon;
        console.log (lat, lon);

        //UV Index API URL pattern
        let uvQueryURL =
          "http://api.openweathermap.org/data/2.5/uvi/forecast?appid=" +
          APIKey +
          "&lat=" +
          lat +
          "&lon=" +
          lon;
        //AJAX request to retrieve UV index data
        $.ajax({
          url: uvQueryURL,
          method: "GET",
        }).then(function (response) {

            console.log(response);
          //Store UV index data
          let uvIndex = response[0].value;

  
          //Display UV index data
          $(uvEl).html("UV Index: " + uvIndex);
        });
  
        console.log(response);
      });
    }
  
    function getForecast(cityName) {
    

    let forecastURL =
    "http://api.openweathermap.org/data/2.5/forecast?q=" +
    cityName +
    "&appid=" +
    APIKey;

      $.ajax({
        url: forecastURL,
        method: "GET",
      }).then(function (response) {


        for (let i = 0; i < forecastDivs.length; i++) {
            console.log(response);

          $(forecastDivs[i]).html("");

let dateText = $("<h6>");

let icon = $("<img>");
$(icon).attr({
  src: "https://openweathermap.org/img/wn/" + iconURL + "@2x.png",
  id: "weather-icon",
});
let temperature = $("<p>");

  
        }
        const currentDate = new Date(response.list[0].dt * 1000);
        console.log(currentDate);
  
        const date = currentDate.getDate();
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();
  
        // $(currentDateEl).html(" (" + month + "/" + date + "/" + year + ")");
        let dateTest = $("<div>");
  
        $(dateTest).html(currentDate);
  
        $(forecastEl).html(dateTest);
  
        console.log(dateTest);
  
        let currentTemp = response.main.temp;
        $(tempEl).html("Temperature: " + k2f(currentTemp) + " &#8457;");
  
        let humidityLevel = response.main.humidity;
        $(humidityEl).html("Humidity: " + humidityLevel + " &#37;");
  
        let windSpeed = response.wind.speed;
        $(windEl).html("Wind Speed: " + +mps2mph(windSpeed) + " MPH");
  
        let iconURL = response.weather[0].icon;
        let weatherIcon = $("<img>");
        $(weatherIcon).attr({
          src: "https://openweathermap.org/img/wn/" + iconURL + ".png",
          id: "weather-icon",
        });
        $(iconEl).html(weatherIcon);
  
      });
    }
  
    function mps2mph(MPS) {
      return Math.floor(MPS * 2.236936);
    }
  
    function k2f(K) {
      return Math.floor((K - 273.15) * 1.8 + 32);
    }
  
    //Array to display recent city searches
  
    let cityLength = 5; //**==revisit==** */
    let cities = JSON.parse(localStorage.getItem("cities")) || [];
    renderSearchHistory();
  
    //Function to display current weather data
    function renderSearchHistory() {
      //Delete existing list items before adding new ones
      $(citiesDisplayEl).empty();
  
      //Loop through list of cities
      let recentCities = cities;

  
      for (let i = 0; i < recentCities.length; i++) {
        //Dynamically generate a list item for each new city
        let c = $("<li>");
        c.addClass("list-group-item prev-search");
        c.attr("city-name", recentCities[i]);
        c.text(recentCities[i].toUpperCase());
  
        //Add searched city to the top of the recent searches list
        $(citiesDisplayEl).prepend(c);
      }
    }
  
    //Click event function to display city from renderList and display
    //1. display results from renderList
    $(searchEl).on("click", function (event) {
      //Prevent the form from trying
      event.preventDefault();
  
      //Grab the text from the input box and remove excess spaces before/after string
      let city = $(inputEl).val().trim();
  
      if (city !== "") {
        //Add city from the text box to the list of cities (sans duplicates)
        if (cities.indexOf(city) === -1) {

  
          cities.push(city);
          //   //Clear input box...===MIGHT NOT NEED===
          // $(city).val("");
          localStorage.setItem("cities", JSON.stringify(cities));
  
          //call renderList function to display array of searched cities
          renderSearchHistory();
        }
        //API call goes here
        getWeatherInfo(city);
        getForecast(city);
      }
    });
  
    function searchBySavedCity() {
      let cityName = $(this).attr("city-name");
  
      getWeatherInfo(cityName);
      getForecast(cityName);
    }
    //Add click event listener to .current-search elements to display the current and 5day forecast
    $(document).on("click", ".prev-search", searchBySavedCity);

  });
  