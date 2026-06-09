import { useEffect } from "react";
import { useWeather } from "./WeatherContext";


function CurrentWeather() {
  const { coords, API_KEY, setWeatherData, setError, setLoading } =
    useWeather();

  useEffect(() => {
    if (!coords) return;

    async function getWeatherData() {
      try {
        setLoading(true);
        const { lat, lon, customName } = coords;
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=uk`; 
        const weatherResponse = await fetch(weatherUrl);

        if (!weatherResponse.ok) {
          throw new Error("Не вдалося завантажити поточну погоду");
        }

        const data = await weatherResponse.json();
        setWeatherData({ ...data, name: customName });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    getWeatherData();
  }, [coords, API_KEY]);

  return null;
}

export default CurrentWeather;

