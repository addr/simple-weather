# simple-weather

A simple Node.js script to demonstrate how to use the OpenWeatherMap API. It fetches the current temperatures (in Fahrenheit) for Chattanooga, TN, San Francisco, CA, London, UK, and Zurich, Switzerland and writes them to a text file.

## Requirements

* Node.js version 8+ (with associated npm) with a *nix OS. Tested to work on MacOS, but should work on Linux as well.
* An active API key from OpenWeatherMap. See: https://openweathermap.org/appid

## Installation

After cloning the repo, run `npm install` in the repo's root directory.

## Running

After installation, simply provide your API key in the environment variable `WEATHER_API_KEY`and run `node app.js`.

Example command (from the repo root directory): `WEATHER_API_KEY=<your api key here> node app.js`

The console will let you know what's going on, and if everything went ok, the file `current_temps.txt` will be written to the current directory with the current temperatures!
