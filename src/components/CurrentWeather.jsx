import { useEffect } from "react";

function CurrentWeather({ coords, apiKey, onDataLoaded, onError, onLoading }) {
  useEffect(() => {
    if (!coords) return;

    async function getWeatherData() {
      try {
        onLoading(true);
        onError(null);

        const { lat, lon } = coords;
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=uk`; 
        const weatherResponse = await fetch(weatherUrl);

        if (!weatherResponse.ok) {
          throw new Error("Не вдалося завантажити погоду");
        }

        const weatherData = await weatherResponse.json();
        onDataLoaded(weatherData); 
      } catch (err) {
        onError(err.message);
      } finally {
        onLoading(false);
      }
    }

    getWeatherData();
  }, [coords, apiKey]);

  return null;
}

export default CurrentWeather;
