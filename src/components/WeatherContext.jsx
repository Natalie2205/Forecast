import { createContext, useState, useContext } from "react";

const WeatherContext = createContext();

function WeatherProvider({ children }) {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const [searchCity, setSearchCity] = useState("");
  const [coords, setCoords] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [showForecast, setShowForecast] = useState(false); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleBackToCapitals = () => {
    setSearchCity("");
    setCoords(null);
    setWeatherData(null);
    setForecastData(null);
    setShowForecast(false); 
    setError(null);
  };

  return (
    <WeatherContext.Provider
      value={{
        API_KEY,
        searchCity,
        setSearchCity,
        coords,
        setCoords,
        weatherData,
        setWeatherData,
        forecastData,
        setForecastData,
        showForecast,
        setShowForecast,
        loading,
        setLoading,
        error,
        setError,
        handleBackToCapitals,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export default WeatherProvider;
export const useWeather = () => useContext(WeatherContext);
