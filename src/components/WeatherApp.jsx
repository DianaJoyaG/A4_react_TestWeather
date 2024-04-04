import React, { useState } from "react";
import axios from "axios";
import { Button, TextField } from "@mui/material"; // import Button and TextField from MUI
import WeatherCard from "./WeatherCard"; // import WeatherCard component



const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [apiError, setApiError] = useState(null);

  const fetchWeather = () => {
    const OPENWEATHER_API_KEY = "5dbb60bf5aaa4b3506820753fb5246aa";
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${OPENWEATHER_API_KEY}`
      )
      .then((res) => setWeather(res.data))
      .catch((err) => setApiError("Error, try again later"));
  };

  return (
    <div>
      <TextField
        label="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <Button onClick={fetchWeather}>Get Weather</Button>
      {weather && <WeatherCard weather={weather} />}
      {apiError && <p>{apiError}</p>}
    </div>
  );
};

export default WeatherApp;
