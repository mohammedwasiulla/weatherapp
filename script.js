// Your OpenWeatherMap API key
const API_KEY = 'e177466e572d4138bb208c558e2a654b';

// Function to fetch weather by city name
function getWeather() {
    const city = document.getElementById('city').value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    fetchWeather(url);
}

// Function to fetch weather using geolocation (current location)
function getWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
            fetchWeather(url);
        }, error => {
            alert('Unable to retrieve your location. Please try again.');
            console.error(error);
        });
    } else {
        alert('Geolocation is not supported by your browser.');
    }
}

// Function to fetch weather data and update the UI
function fetchWeather(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                // Update UI with weather details
                document.getElementById('cityName').textContent = data.name;
                document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
                document.getElementById('description').textContent = `Description: ${data.weather[0].description}`;
                document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
                document.getElementById('wind').textContent = `Wind Speed: ${data.wind.speed} m/s`;

                document.getElementById('weatherResult').style.display = 'block';
            } else {
                alert('Weather data not found');
            }
        })
        .catch(error => {
            alert('An error occurred');
            console.error(error);
        });
}

// Toggle Dark/Light Mode
const toggleButton = document.getElementById('themeToggle');
const body = document.body;

toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
});
