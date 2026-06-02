import { useEffect } from "react";

 function WeatherFetcher({
  cityName,
  apiKey,
  onDataLoaded,
  onError,
  onLoading,
}) {
  useEffect(() => {
    if (!cityName) return;

    async function getWeatherData() {
      try {
        onLoading(true);
        onError(null);

        const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cityName)}&limit=5&appid=${apiKey}`;
        const geoResponse = await fetch(geoUrl);
        const geoData = await geoResponse.json();

        if (!geoData || geoData.length === 0) {
          throw new Error("Місто не знайдено");
        }

        const { lat, lon } = geoData[0]; // Важливо: додано [0], оскільки геокодер повертає масив
        
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
  }, [cityName, apiKey]);

  return null; 
}

export default WeatherFetcher;
