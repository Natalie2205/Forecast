import { createContext, useState, useContext, useEffect } from "react";

const WeatherContext = createContext();

export function WeatherProvider({ children }) {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const [searchCity, setSearchCity] = useState("");
  const [coords, setCoords] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [showForecast, setShowForecast] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // НОВЕ: Завантажуємо обрані міста з localStorage при старті
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("meteo_favorites");
    return saved ? JSON.parse(saved) : [];
  });

  // НОВЕ: Стан для прогнозу на сторінці Selected
  const [selectedForecast, setSelectedForecast] = useState(null);
  const [showSelectedForecast, setShowSelectedForecast] = useState(false);

  // Зберігаємо зміни в localStorage
  useEffect(() => {
    localStorage.setItem("meteo_favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleBackToCapitals = () => {
    setSearchCity("");
    setCoords(null);
    setWeatherData(null);
    setForecastData(null);
    setShowForecast(false);
    setError(null);
  };

  // НОВЕ: Функція додавання/видалення
  const toggleFavorite = (cityObj) => {
    setFavorites((prev) => {
      const exists = prev.some(
        (fav) => fav.name.toLowerCase() === cityObj.name.toLowerCase(),
      );
      if (exists) {
        return prev.filter(
          (fav) => fav.name.toLowerCase() !== cityObj.name.toLowerCase(),
        );
      } else {
        return [
          ...prev,
          {
            name: cityObj.name,
            lat: cityObj.coord.lat,
            lon: cityObj.coord.lon,
          },
        ];
      }
    });
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
        favorites,
        toggleFavorite,
        selectedForecast,
        setSelectedForecast,
        showSelectedForecast,
        setShowSelectedForecast,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

// export default WeatherProvider;
export const useWeather = () => useContext(WeatherContext);
