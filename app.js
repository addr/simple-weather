/**
 * @file Main entrypoint for simple-weather app.
 * Given API key passed in as environment variable, fetch current temperatures for Chattanooga, San Francisco, London, and Zurich, and write to a text file.
 * @author Andy Rice
 */
const axios = require("axios");
const fs = require("fs");

const apiKey = process.env.WEATHER_API_KEY;
if (!apiKey) {
  console.error(
    "Error: cannot proceed without API key. Please include the environment variable WEATHER_API_KEY when calling this script (i.e. WEATHER_API_KEY=<your_key> node app.js)"
  );
  process.exit(1);
}
const weatherEndpoint = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=imperial&q=`;

/**
 * Get current weather for a single city.
 * @param {string} city city name
 * @param {string} country ISO 3166 country code for the city
 * @returns {Promise} Promise represents axios response object with weather API response in top level 'data' key
 */
function getWeatherForCity(city, country) {
  return axios.get(`${weatherEndpoint}${city},${country}`);
}

/**
 * Fetch current weather conditions for Chattanooga, London, San Francisco, and Zurich.
 * @returns {Promise} Promise represents array of objects with structure { name: ${city}, "temp": ${temperature} }
 */
async function getWeatherForAllCities() {
  console.log("Getting weather for all cities...");
  try {
    const responses = await axios.all([
      getWeatherForCity("chattanooga", "usa"),
      getWeatherForCity("san francisco", "usa"),
      getWeatherForCity("london", "uk"),
      getWeatherForCity("zurich", "che")
    ]);
    return responses.map(response => ({
      city: response.data.name,
      temp: response.data.main.temp
    }));
  } catch (error) {
    console.error(
      `Failed to get weather for cities with error: ${JSON.stringify(
        error.response.data,
        null,
        2
      )}`
    );
    process.exit(1);
  }
}

/**
 * Take the data returned from getWeatherForAllCities and convert to a string suitable for writing to file
 * @param {array} data Array of objects, where each has the form { city: ${cityName}, temp: ${temperature}}
 * @returns {string}
 */
function stringifyWeatherData(data) {
  return data.reduce((acc, cur) => `${acc}${cur.city}: ${cur.temp}\n`, "");
}

/**
 * Gets weather for all cities and writes the data to file
 */
async function main() {
  const temps = await getWeatherForAllCities();
  console.log("Fetched weather for cities, writing to file...");
  const tempsStringified = stringifyWeatherData(temps);
  fs.writeFileSync("./current_temps.txt", tempsStringified, "utf8");
  console.log("Finished writing temperature data to file!");
}

main();
