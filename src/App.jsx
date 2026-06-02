import { useState } from 'react'


import './App.css'
import WeatherInput from './components/WeatherInput'
import WeatherFetcher from './components/WeatherFetcher'
import WeatherCard from './components/WeatherCard'
import Preloader from './components/Preloader'




function App() {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const [searchCity, setSearchCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  

  return (
    <>
      <WeatherInput onSearch={setSearchCity} />
      <WeatherFetcher
        cityName={searchCity}
        apiKey={API_KEY}
        onDataLoaded={setWeatherData}
        onError={setError}
        onLoading={setLoading}
      />
      {loading && <Preloader />}
      {error && <div>Помилка: {error}</div>}

      {!loading && !error && <WeatherCard weather={weatherData} />}
    </>
  );
}

export default App
