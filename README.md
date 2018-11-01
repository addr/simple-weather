# simple-weather

A simple Node.js script to demonstrate how to use the OpenWeatherMap API.

## Requirements

Node.js version 8+ (with associated npm) with a *nix OS. Tested to work on MacOS, but should work on Linux as well.

## Installation

After cloning the repo, run `npm install` in the repo's root directory.

## Running

In order to run, you MUST have a valid API key from OpenWeatherMap. See: https://openweathermap.org/appid

After installation, simply provide your API key in the environment variable `WEATHER_API_KEY`to Node and run `app.js`.

Example command (from the repo root directory): `WEATHER_API_KEY=<your api key here> node app.js`
