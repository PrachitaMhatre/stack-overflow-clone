import React, { useEffect, useState } from "react";

const DynamicThemeChange = () => {
  const [isDaytime, setIsDaytime] = useState(true); // Default to daytime theme

  useEffect(() => {
    // Fetch user's current location and weather information
    const fetchWeather = async () => {
      try {
        const position = await getCurrentPosition();
        const { latitude, longitude } = position.coords;
        const weatherData = await fetchWeatherData(latitude, longitude);
        const { sunrise, sunset } = weatherData.sys;

        const currentTime = new Date();
        const sunriseTime = new Date(sunrise * 1000);
        const sunsetTime = new Date(sunset * 1000);

        const isDay = currentTime > sunriseTime && currentTime < sunsetTime;
        setIsDaytime(isDay);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();
  }, []);

  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  const fetchWeatherData = async (latitude, longitude) => {
    const apiKey = `YOUR_API_KEY`;
    const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}`;

    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  };

  return (
    <div
      style={{
        backgroundColor: isDaytime ? "#fff" : "#000",
        color: isDaytime ? "#000" : "#fff",
      }}
    ></div>
  );
};

export default DynamicThemeChange;
