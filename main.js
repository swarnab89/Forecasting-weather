const api = {
  key: "fcc8de7015bbb202209bbf0261babf4c",
  base: "https://api.openweathermap.org/data/2.5/",
};

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', handleKeyPress);

async function handleKeyPress(evt) {
  if (evt.key === 'Enter') {
    const query = searchbox.value;
    try {
      const weather = await apiService.getWeatherData(query);
      displayResults(weather);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }
}

const apiService = {
  getWeatherData: async function (query) {
    const response = await fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`);
    if (!response.ok) {
      throw new Error('City not found');
    }
    return response.json();
  },
};

function displayResults(weather) {
  const cityElement = document.querySelector('.location .city');
  cityElement.innerText = `${weather.name}, ${weather.sys.country}`;

  const now = new Date();
  const dateElement = document.querySelector('.location .date');
  dateElement.innerText = dateBuilder(now);

  const tempElement = document.querySelector('.current .temp');
  tempElement.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  const weatherElement = document.querySelector('.current .weather');
  weatherElement.innerText = weather.weather[0].main;

  const humidityElement = document.querySelector('.current .humidity');
  humidityElement.innerText = `Humidity: ${weather.main.humidity}%`;

  const hilowElement = document.querySelector('.hi-low');
  hilowElement.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

function dateBuilder(d) {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const day = days[d.getDay()];
  const date = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
