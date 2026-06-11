import { useWeather } from "../components/WeatherContext";
import WeatherInput from "../components/WeatherInput";
import PreviewWeatherList from "../components/PreviewWeatherList";
import Geocoding from "../components/Geocoding";
import CurrentWeather from "../components/CurrentWeather";
import WeatherForecast from "../components/WeatherForecast";
import WeatherSearchResult from "../components/WeatherSearchResult";
import WeatherSlider from "../components/WeatherSlider";


function Home() {
  const { searchCity, API_KEY } = useWeather();

  return (
    <>
      <WeatherInput />
      <Geocoding />
      <CurrentWeather />
      <WeatherForecast />
      {!searchCity && <PreviewWeatherList apiKey={API_KEY} />}
      <WeatherSearchResult />
      <WeatherSlider />
    </>
  );
}

export default Home;
