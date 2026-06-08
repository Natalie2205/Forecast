import { useState } from 'react'


import './App.css'
import WeatherInput from './components/WeatherInput'
import WeatherCard from './components/WeatherCard'
import Preloader from './components/Preloader'
import PreviewWeatherList from './components/PreviewWeatherList'
import Geocoding from './components/Geocoding'
import CurrentWeather from './components/CurrentWeather'





function App() {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const [searchCity, setSearchCity] = useState("");
  const [coords, setCoords] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

   const handleBackToCapitals = () => {
     setSearchCity("");
     setCoords(null);
     setWeatherData(null);
     setError(null);
   };
  

  return (
    <div className="container">
      {searchCity && (
        <button className="back-btn" onClick={handleBackToCapitals}>
          ← Назад до столиць
        </button>
      )}
      <WeatherInput onSearch={setSearchCity} />
      {searchCity && (
        <Geocoding
          cityName={searchCity}
          apiKey={API_KEY}
          onCoordsLoaded={setCoords}
          onError={setError}
          onLoading={setLoading}
        />
      )}
      {coords && (
        <CurrentWeather
          coords={coords}
          apiKey={API_KEY}
          onDataLoaded={setWeatherData}
          onError={setError}
          onLoading={setLoading}
        />
      )}

      {!searchCity && <PreviewWeatherList apiKey={API_KEY} />}
      {searchCity && (
        <>
          {loading && <Preloader />}
          {error && <div>Помилка: {error}</div>}

          {!loading && !error && weatherData && (
            <WeatherCard weather={weatherData} />
          )}
        </>
      )}
    </div>
  );
}

export default App
