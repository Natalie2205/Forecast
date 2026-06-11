import { useState, useEffect } from "react";
import { useWeather } from "../components/WeatherContext";
import WeatherCard from "./WeatherCard";
import Preloader from "./Preloader";
import ForecastDisplay from "./ForecastDisplay";

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

  useEffect(() => {
    if (favorites.length === 0) {
      setFavoritesWeather([]);
      return;
    }

    async function fetchFavorites() {
      try {
        setLoading(true);
        const promises = favorites.map(async (city) => {
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=uk`;
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

  // Запит прогнозу на 5 днів для першого міста в обраному (або можна розширити логіку)
  const handleFetchForecast = async () => {
    if (favorites.length === 0) return;

    if (showSelectedForecast) {
      setShowSelectedForecast(false);
      return;
    }

    try {
      const { lat, lon } = favorites[0]; // Беремо перше місто для демонстрації
      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=uk`;
      const res = await fetch(url);
      const data = await res.json();
      setSelectedForecast(data.list);
      setShowSelectedForecast(true);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <Preloader />;

  if (favorites.length === 0) {
    return <p className="empty-msg">Список обраних міст порожній.</p>;
  }

  return (
    <div className="favorites-section">
      {/* Кнопка прогнозу над списком */}
      <div className="favorites-controls">
        <button
          type="button"
          className="forecast-toggle-btn"
          onClick={handleFetchForecast}
        >
          {showSelectedForecast
            ? "Сховати прогноз"
            : "Прогноз на 5 днів для " + favorites[0].name}
        </button>
      </div>

      {/* Відображення прогнозу в гумовому та анімованому стилі сайту */}
      {showSelectedForecast && selectedForecast && (
        <div
          className="favorites-forecast-wrapper"
          style={{ marginBottom: "30px" }}
        >
          <ForecastDisplay forecast={selectedForecast} />
        </div>
      )}

      {/* Грід з картками обраних міст (копіює структуру сітки столиць) */}
      <div className="weather-grid">
        {favoritesWeather.map((cityData) => (
          <WeatherCard key={cityData.id} weather={cityData} />
        ))}
      </div>
    </div>
  );
}

export default FavoriteWeatherList;
