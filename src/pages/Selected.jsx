import { useNavigate } from "react-router";
import FavoriteWeatherList from "../components/FavoriteWeatherList";
import WeatherSlider from "../components/WeatherSlider";

function Selected() {
  const navigate = useNavigate();

  return (
    <>
      <h1 className="selected-title">Обрані міста</h1>

      <FavoriteWeatherList />
    </>
  );
}

export default Selected;
