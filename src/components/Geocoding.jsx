import { useEffect } from "react";

function Geocoding({ cityName, apiKey, onCoordsLoaded, onError, onLoading }) {
  useEffect(() => {
    if (!cityName) return;

    async function getCoordinates() {
      try {
        onLoading(true);
        onError(null);
        onCoordsLoaded(null); // Скидаємо попередні координати

        const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cityName)}&limit=5&appid=${apiKey}`;
        const geoResponse = await fetch(geoUrl);
        const geoData = await geoResponse.json();

        if (!geoData || geoData.length === 0) {
          throw new Error("Місто не знайдено");
        }

        const { lat, lon } = geoData[0];
        onCoordsLoaded({ lat, lon });
      } catch (err) {
        onError(err.message);
      } finally {
        onLoading(false);
      }
    }

    getCoordinates();
  }, [cityName, apiKey]);

  return null;
}

export default Geocoding;
