import { useState, useEffect } from "react";
import WeatherCard from "./WeatherCard";
import Preloader from "./Preloader";
import "./PreviewWeatherList.css";


const CAPITAL_CITIES = [  
  { name: "Київ", lat: 50.4501, lon: 30.5234 },
  { name: "Лондон", lat: 51.5074, lon: -0.1278 },
  { name: "Париж", lat: 48.8566, lon: 2.3522 },
  { name: "Токіо", lat: 35.6762, lon: 139.6503 },
  { name: "Бангкок", lat: 13.7563, lon: 100.5018 },
  { name: "Сеул", lat: 37.5665, lon: 126.978 },
  { name: "Вашингтон", lat: 38.9072, lon: -77.0369 },
  { name: "Оттава", lat: 45.4215, lon: -75.6972 },
  { name: "Мехіко", lat: 19.4326, lon: -99.1332 },
  { name: "Бразиліа", lat: -15.7801, lon: -47.9292 },
  { name: "Буенос-Айрес", lat: -34.6037, lon: -58.3816 },
  { name: "Каїр", lat: 30.0444, lon: 31.2357 },
  { name: "Кейптаун", lat: -33.9249, lon: 18.4241 },
  { name: "Канберра", lat: -35.2809, lon: 149.13 },
  { name: "Веллінгтон", lat: -41.2865, lon: 174.7762 },
];

const getRandomCapitals = (count = 8) => {
  return [...CAPITAL_CITIES].sort(() => 0.5 - Math.random()).slice(0, count);
};

function PreviewWeatherList({ apiKey }) {
  const [capitalsWeather, setCapitalsWeather] = useState([]);
  const [loadingCapitals, setLoadingCapitals] = useState(false);

  useEffect(() => {
    async function fetchCapitals() {
      try {
        setLoadingCapitals(true);
        const selected = getRandomCapitals(8);

        // Паралельні запити погоди
          const promises = selected.map(async (city) => {
             const { lat, lon, name } = city;
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=uk`;
          const res = await fetch(url);
          if (!res.ok) throw new Error();
          const data = await res.json();
          return { ...data, name: city.name };
        });

        const results = await Promise.all(promises);
        setCapitalsWeather(results);
      } catch (err) {
        console.error("Не вдалося завантажити погоду для столиць", err);
      } finally {
        setLoadingCapitals(false);
      }
    }

    fetchCapitals();
  }, [apiKey]);

  if (loadingCapitals) return <Preloader />;
  if (capitalsWeather.length === 0) return null;

  return (
    <>
      <h2 className="weather-list-title">Погода в столицях світу</h2>
      <div className="weather-grid">
        {capitalsWeather.map((cityData) => (
          <WeatherCard key={cityData.id} weather={cityData} />
        ))}
      </div>
    </>
  );
}

export default PreviewWeatherList;