// app.js

const apiKey = 'b141ece430624427bd473252252303'; // Your API key
const baseUrl = 'http://api.weatherapi.com/v1/current.json?key=';

// Function to fetch weather data and display it
const getWeather = async () => {
    const city = document.getElementById('city-input').value.trim();
    if (city === '') {
        alert('Please enter a city');
        return;
    }

    const url = `${baseUrl}${apiKey}&q=${city}&aqi=no`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            document.getElementById('error-message').textContent = "City not found. Please try again.";
            document.getElementById('temperature').textContent = '';
            return;
        }

        // Update the UI with weather data
        document.getElementById('city-name').textContent = `${data.location.name}, ${data.location.country}`;
        document.getElementById('temperature').textContent = `Temperature: ${data.current.temp_c}°C`;
        document.getElementById('error-message').textContent = ''; // Clear any previous error message
    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.getElementById('error-message').textContent = 'Error fetching data. Please try again later.';
        document.getElementById('temperature').textContent = '';
    }
};

// Event listener for the "Get Weather" button
document.getElementById('get-weather-btn').addEventListener('click', getWeather);
