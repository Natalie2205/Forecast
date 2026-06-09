import { useEffect } from "react";
import { useWeather } from "./WeatherContext";

function WeatherForecast() {
  const { coords, API_KEY, setForecastData, setError, setLoading } =
    useWeather();

  useEffect(() => {
    if (!coords) return;

    async function getForecastData() {
      try {
        setLoading(true);
        const { lat, lon } = coords;
          const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=uk`;

        const response = await fetch(forecastUrl);
        if (!response.ok) {
          throw new Error("Не вдалося завантажити прогноз погоди");
        }

        const data = await response.json();

        
        setForecastData(data.list);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    getForecastData();
  }, [coords, API_KEY]);

  return null;
}

export default WeatherForecast;
