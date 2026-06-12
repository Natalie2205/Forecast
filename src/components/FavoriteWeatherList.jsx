import { useState, useEffect } from "react";
import { useWeather } from "../components/WeatherContext";
import WeatherCard from "./WeatherCard";
import Preloader from "./Preloader";
import ForecastDisplay from "./ForecastDisplay";
import './FavoriteWeatherList.css'

function FavoriteWeatherList() {
  const {
    favorites,
    API_KEY,
    selectedForecast,
    setSelectedForecast,
    showSelectedForecast,
    setShowSelectedForecast,
    } = useWeather();
    
  const [favoritesWeather, setFavoritesWeather] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingForecast, setLoadingForecast] = useState(false);

  useEffect(() => {
    if (favorites.length === 0) {
      setFavoritesWeather([]);
      return;
    }

    async function fetchFavorites() {
      try {
        setLoading(true);
        const promises = favorites.map(async (city) => {
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}&units=metric&lang=uk`;
          const res = await fetch(url);
          if (!res.ok) throw new Error();
          const data = await res.json();
          return { ...data, name: city.name };
        });

        const results = await Promise.all(promises);
        setFavoritesWeather(results);
      } catch (err) {
        console.error("Не вдалося завантажити погоду для обраних міст", err);
      } finally {
        setLoading(false);
      }
    }

    fetchFavorites();
  }, [favorites, API_KEY]);

  const handleFetchAllForecasts = async () => {
    if (favorites.length === 0) return;

    if (showSelectedForecast) {
      setShowSelectedForecast(false);
      return;
    }

    try {
      setLoadingForecast(true);

      
      const promises = favorites.map(async (city) => {
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}&units=metric&lang=uk`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Помилка прогнозу для ${city.name}`);
        const data = await res.json();
        return { cityName: city.name, list: data.list };
      });

      const results = await Promise.all(promises);

      
      const forecastObject = results.reduce((acc, current) => {
        acc[current.cityName] = current.list;
        return acc;
      }, {});

      setSelectedForecast(forecastObject);
      setShowSelectedForecast(true);
    } catch (err) {
      console.error("Помилка завантаження спільних прогнозів:", err);
    } finally {
      setLoadingForecast(false);
    }
  };

  if (loading) return <Preloader />;

  if (favorites.length === 0) {
    return (
      <p className="empty-msg">
        Список обраних міст порожній.
      </p>
    );
  }

  return (
    <div className="favorites-section">
      <div className="favorites-controls">
        <button
          type="button"
          className="forecast-toggle-btn"
          onClick={handleFetchAllForecasts}
        >
          {showSelectedForecast ? "Сховати прогноз" : "Прогноз на 5 днів"}
        </button>
      </div>

      {loadingForecast && <Preloader />}

      
      {!loadingForecast && (
        <div
          className={
            showSelectedForecast ? "favorites-rows-container" : "weather-grid"
          }
        >
          {favoritesWeather.map((cityData) => {
            const hasForecast =
              showSelectedForecast && selectedForecast[cityData.name];

            return (
              <div
                key={cityData.id}
                className={hasForecast ? "fav-city-row" : "fav-grid-item"}
              >
                
                <div className={hasForecast ? "fav-layout-main-card" : ""}>
                  <WeatherCard weather={cityData} />
                </div>

                
                {hasForecast && (
                  <div className="fav-layout-forecast-panel">
                    <ForecastDisplay
                      forecast={selectedForecast[cityData.name]}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default FavoriteWeatherList;




