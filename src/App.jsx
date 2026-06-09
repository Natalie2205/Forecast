import WeatherInput from './components/WeatherInput'
import WeatherCard from './components/WeatherCard'
import Preloader from './components/Preloader'
import PreviewWeatherList from './components/PreviewWeatherList'
import Geocoding from './components/Geocoding'
import CurrentWeather from './components/CurrentWeather'
import WeatherProvider, { useWeather } from './components/WeatherContext'
import WeatherForecast from './components/WeatherForecast'
import WeatherSearchResult from './components/WeatherSearchResult';

import './App.css'

function WeatherApp() {
  const { searchCity, API_KEY } = useWeather();

  return (
    <div className="container">
      
      <WeatherInput />
      
      <Geocoding />
      <CurrentWeather />
      <WeatherForecast />
      
      {!searchCity && <PreviewWeatherList apiKey={API_KEY} />}

      <WeatherSearchResult />
    </div>
  );
}

function App() {
  return (
    <WeatherProvider>
      <WeatherApp />
    </WeatherProvider>
  );
}

export default App
