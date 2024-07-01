function refreshWeather(response) {
    let temperatureElement = document.querySelector("#temperature")
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let dateTimeElement = document.querySelector("#date-time");
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector("#icon");

    dateTimeElement.innerHTML = formatDate(date);
    cityElement.innerHTML = response.data.city;
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`;
    temperatureElement.innerHTML = Math.round(temperature);
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon"/>`;
}

function formatDate(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let dayDate = date.getDate();
    let year = date.getFullYear();

    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let day = days[date.getDay()];

    if (hours < 10) {
        hours = `0${hours}`;
      }

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let month = months[date.getMonth()];

    return `${day} ${dayDate} ${month} ${year} ${hours}:${minutes}`
}

function searchCity(city) {
    let apiKey = "a7d040o4fb53dfe38da1bd913t25290a";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    
    searchCity(searchInput.value);
}

function displayForecast() {
    let days = ['Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let forecastHtml = "";

    days.forEach(function (day) {
        forecastHtml += 
            `
                <div class="weather-forecast-info">
                    <div class="weather-forecast-day">${day} 27</div>
                    <div class="weather-forecast-icon">🌦️</div>
                    <div class="weather-forecast-temperatures">
                        <div class="weather-forecast-temperature">
                            <strong>15°</strong> 
                        </div>
                        <div class="weather-forecast-temperature">9°</div>
                    </div>
                </div>
            `;
    });

    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Brisbane");
displayForecast();
