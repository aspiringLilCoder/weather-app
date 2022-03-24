const searchCity_input = document.querySelector('#searchCity');
const location_p = document.querySelector('#location');
const temperature_p = document.querySelector('#temperature');
const weatherIcon_img = document.querySelector('#weather-icon');
const description_p = document.querySelector('#description');
const feelsLike_p = document.querySelector('#feelsLike');
const humidity_p = document.querySelector('#humidity');
const wind_p = document.querySelector('#wind');
const loading_div = document.querySelector('#loading');
const errorMessage_p = document.querySelector('#error-message');
const weather_div = document.querySelector('#weather');

async function fetchAPI(cityName){
    try {
        weather_div.style.display = 'none';
        errorMessage_p.textContent = "";
        loading_div.style.display = 'flex';
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=e7d5ed88599880b396f269e897810f76`, {mode: "cors"});
        const weatherData = await response.json();
    
        const country = weatherData.sys.country;
        const city = weatherData.name;
        const description = weatherData.weather[0].description;
        const temperature = weatherData.main.temp;
        const feelsLike = weatherData.main.feels_like;
        const humidity = weatherData.main.humidity;
        const wind = `${weatherData.wind.speed} km/h`;
        const iconLink = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
    
        location_p.textContent = `${city}, ${country}`;
        temperature_p.textContent = `${Math.round(temperature)}°C`;
        feelsLike_p.textContent = `Feels like: ${Math.round(feelsLike)}°C`;

        temperature_p.addEventListener('click', (e) => {
            e.stopImmediatePropagation();
            console.log('clicked');
            if (temperature_p.textContent.split('').splice(-1) == 'C') {
                temperature_p.textContent = `${Math.round((temperature * 1.8) + 32)}°F`;
                feelsLike_p.textContent = `${Math.round((feelsLike * 1.8) + 32)}°F`;
            } else {
                temperature_p.textContent = `${Math.round(temperature)}°C`;
                feelsLike_p.textContent = `Feels like: ${Math.round(feelsLike)}°C`;
            }
        }, false);

        humidity_p.textContent = `Humidity: ${humidity}%`;
        description_p.textContent = description;
        wind_p.textContent = `Wind: ${wind}`;
        weatherIcon_img.src = iconLink

        loading_div.style.display = 'none';

        weather_div.style.display = 'flex';
    
    } catch {
        errorMessage_p.textContent = "Invalid City"
        loading_div.style.display = 'none';
    }

}

fetchAPI('Tokyo');

const searchDiv = document.querySelector('#search-icon-div');

searchDiv.addEventListener('click', () => {
    fetchAPI(searchCity_input.value);
});

searchCity_input.addEventListener('keyup', e => {
    if (e.key === 'Enter' || e.keyCode === 13) {
        fetchAPI(searchCity_input.value);
    }
});


