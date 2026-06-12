import { useEffect, useState } from "react";
import { useWeather } from "./WeatherContext";
import './WeatherInput.css'



function WeatherInput() {
  const {
    setSearchCity,
    searchCity,
    weatherData,
    showForecast,
    setShowForecast,
    handleBackToCapitals,
  } = useWeather();
  const [city, setCity] = useState("");

  
  useEffect(() => {
    if (!searchCity) setCity("");
  }, [searchCity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city.trim()) return;
    setSearchCity(city);
    setCity('');
  };

  return (
    <form className="weather-form" onSubmit={handleSubmit}>
      <input
        className="weather-input"
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Введіть місто (напр. Львів)"
      />

      <button className="weather-btn" type="submit">
        Пошук
      </button>

      
      {searchCity && weatherData && (
        <>
          <button
            type="button"
            className={`forecast-toggle-btn ${showForecast ? "active" : ""}`}
            onClick={() => setShowForecast(!showForecast)}
          >
            {showForecast ? "Сховати прогноз" : "Прогноз на 5 днів"}
          </button>

          <button
            type="button"
            className="weather-btn"
            onClick={handleBackToCapitals}
          >
            ← Назад до столиць
          </button>
        </>
      )}
    </form>
  );
}

export default WeatherInput;
