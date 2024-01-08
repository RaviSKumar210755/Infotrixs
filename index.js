const apiKey = "6fc463affb263405228740b16c4ee7aa";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

const locationInput = document.getElementById("locationInput");
const searchButton = document.getElementById("searchButton");
const locationElement = document.getElementById("location");
const temperatureElement = document.getElementById("temperature");
const descriptionElement = document.getElementById("description");
const PressureDataElement = document.getElementById("PressureData");
const WindSpeedElement = document.getElementById("WindSpeed");
const HumidityDataElement = document.getElementById("HumidityData");
const VisibilityDataElement = document.getElementById("VisibilityData");
const imgIcon = document.getElementById("imgIcon");
searchButton.addEventListener("click", () => {
  const location = locationInput.value;
  if (location) {
    fetchWeather(location);
  }
});

function fetchWeather(location) {
  const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Weather data not found");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      const iconCode = data.weather[0].icon;
      const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
      imgIcon.src = iconUrl;
      locationElement.textContent = data.name;
      temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
      function capitalizeFirstLetter(sentence) {
        // Split the sentence into words
        const words = sentence.split(" ");

        // Capitalize the first letter of each word
        const capitalizedWords = words.map((word) => {
          return word.charAt(0).toUpperCase() + word.slice(1);
        });

        // Join the words back into a sentence
        const capitalizedSentence = capitalizedWords.join(" ");

        return capitalizedSentence;
      }
      descriptionElement.textContent = capitalizeFirstLetter(
        data.weather[0].description
      );
      PressureDataElement.textContent = data.main.pressure;
      WindSpeedElement.textContent = data.wind.speed;
      HumidityDataElement.textContent = data.main.humidity;
      VisibilityDataElement.textContent = data.visibility / 1000;
      const errorContainer = document.querySelector(".error-container");
      errorContainer.style.display = "none";
      const DisplayContent = document.querySelector(".ContentContainer");
      DisplayContent.style.display = "flex";
    })
    .catch((error) => {
      displayErrorMessage();
    });
}
function displayErrorMessage() {
  const errorContainer = document.querySelector(".error-container");
  errorContainer.style.display = "flex";
  const DisplayContent = document.querySelector(".ContentContainer");
  DisplayContent.style.display = "none";
}
