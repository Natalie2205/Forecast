import { useNavigate } from "react-router";
import FavoriteWeatherList from "../components/FavoriteWeatherList";
import WeatherSlider from "../components/WeatherSlider";

function Selected() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <header className="app-header">
        
        <h1 className="logo-text" style={{ marginLeft: "20px" }}>
          Обрані міста
        </h1>
      </header>

      {/* Наш новий список гріда */}
      <FavoriteWeatherList />
      
    </div>
  );
}

export default Selected;
