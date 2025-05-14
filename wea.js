const apiKey = "bd5e378503939ddaee76f12ad7a97608";

// Listen for "Enter" key press
document.getElementById("cityInput").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        getWeather();
    }
});

function getWeather() {
    const city = document.getElementById("cityInput").value;
    const weatherInfo = document.getElementById("weatherInfo");
    const loader = document.getElementById("loader");

    if (!city) {
        alert("Please enter a city name!");
        return;
    }

    // Check if the user is offline
    if (!navigator.onLine) {
        weatherInfo.innerHTML = `<p style="color:red;">No internet connection. Please check your network and try again.</p>`;
        return;
    }

    // Show loader and clear previous weather info
    loader.classList.remove("hidden");
    weatherInfo.innerHTML = "";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            weatherInfo.innerHTML = `<p style="color:red;">${error.message}</p>`;
        })
        .finally(() => {
            // Hide loader after data is fetched
            loader.classList.add("hidden");
        });
}

function displayWeather(data) {
    const { name, main, weather } = data;
    document.getElementById("weatherInfo").innerHTML = `
        <h2>${name}</h2>
        <p>Temperature: ${main.temp}°C</p>
        <p>Humidity: ${main.humidity}%</p>
        <p>Condition: ${weather[0].description}</p>
        <img src="https://openweathermap.org/img/wn/${weather[0].icon}.png" alt="${weather[0].description}">
    `;
}
