const apiKey = 'e177466e572d4138bb208c558e2a654b'; // Replace with your API Key
const searchBtn = document.getElementById("searchBtn");
const toggleTempBtn = document.getElementById("toggleTemp");
const weatherContainer = document.getElementById("weather-info");
const errorMessage = document.getElementById("error-message");

let currentTemperatureCelsius = null;
let isCelsius = true;

// Event Listeners
searchBtn.addEventListener("click", fetchWeather);
toggleTempBtn.addEventListener("click", toggleTemperature);
document.getElementById("city").addEventListener("keypress", (event) => {
    if (event.key === "Enter") fetchWeather();
});

// Fetch Weather Data
async function fetchWeather() {
    const city = document.getElementById("city").value.trim();
    if (!city) return showError("Please enter a city name.");

    showLoadingState();

    try {
        const response = await fetchWeatherData(city);
        if (!response.ok) throw new Error("City not found.");

        const data = await response.json();
        updateWeatherInfo(data);
    } catch (error) {
        showError(error.message);
    }
}

// Fetch Data from API
async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    return await fetch(url);
}

// Update Weather Info
function updateWeatherInfo(data) {
    hideError();

    document.getElementById("city-name").textContent = data.name;
    document.getElementById("weather-description").textContent = capitalizeWords(data.weather[0].description);
    document.getElementById("humidity").textContent = `${data.main.humidity}%`;
    document.getElementById("wind-speed").textContent = `${data.wind.speed} km/h`;

    currentTemperatureCelsius = data.main.temp;
    displayTemperature(currentTemperatureCelsius);

    document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

    weatherContainer.classList.remove("hidden");
}

// Toggle Temperature Unit
function toggleTemperature() {
    if (currentTemperatureCelsius === null) return;

    isCelsius = !isCelsius;
    const tempElement = document.getElementById("temperature");
    const unitElement = document.getElementById("temp-unit");

    const newTemp = isCelsius 
        ? currentTemperatureCelsius 
        : (currentTemperatureCelsius * 9/5) + 32;

    tempElement.textContent = Math.round(newTemp);
    unitElement.textContent = isCelsius ? "C" : "F";
}

// Show Loading State
function showLoadingState() {
    weatherContainer.classList.add("hidden");
    errorMessage.classList.add("hidden");
}

// Display Temperature
function displayTemperature(temp) {
    document.getElementById("temperature").textContent = Math.round(temp);
    document.getElementById("temp-unit").textContent = "C";
}

// Show Error Message and Auto-Hide After 3 Seconds
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove("hidden");
    weatherContainer.classList.add("hidden");

    // Hide error message after 3 seconds
    setTimeout(() => {
        hideError();
    }, 3000);
}

// Hide Error Message
function hideError() {
    errorMessage.classList.add("hidden");
}

// Capitalize First Letter of Each Word
function capitalizeWords(str) {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
}
