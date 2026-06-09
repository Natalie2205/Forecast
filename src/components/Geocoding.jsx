import { useEffect } from "react";
import { useWeather } from "./WeatherContext";


function Geocoding() {
  const { searchCity, API_KEY, setCoords, setError, setLoading } = useWeather();

  useEffect(() => {
    if (!searchCity) return;

    async function getCoordinates() {
      try {
        setLoading(true);
        setError(null);
        setCoords(null); 

        const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(searchCity)}&limit=5&appid=${API_KEY}`;
        const geoResponse = await fetch(geoUrl);
        const geoData = await geoResponse.json();

        if (!geoData || geoData.length === 0) {
          throw new Error("Місто не знайдено");
        }

        const { lat, lon, local_names, name } = geoData[0];
        const ukrainianName = local_names && local_names.uk ? local_names.uk : name;
        setCoords({ lat, lon, customName: ukrainianName });
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }

    getCoordinates();
  }, [searchCity, API_KEY]);

  return null;
}

export default Geocoding;
