import { useWeather } from "./WeatherContext";
import WeatherCard from "./WeatherCard";
import Preloader from "./Preloader";
import ForecastDisplay from "./ForecastDisplay";
import "./WeatherSearchResult.css";

function WeatherSearchResult() {
  const {
    searchCity,
    weatherData,
    forecastData,
    showForecast,
    loading,
    error,
  } = useWeather();

  if (!searchCity) return null;

  return (
    <>
      {loading && <Preloader />}
      {error && <div className="error-msg">Помилка: {error}</div>}

      {!loading && !error && weatherData && (
        <div className="weather-result-layout">
          
          <div className="layout-main-card">
            <WeatherCard weather={weatherData} />
          </div>

          
          {!loading && !error && forecastData && showForecast && (
            <div className="layout-forecast-panel">
              <ForecastDisplay forecast={forecastData} />
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default WeatherSearchResult;