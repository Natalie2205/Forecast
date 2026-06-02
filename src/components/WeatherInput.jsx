import { useState } from "react";
import './WeatherInput.css'

function WeatherInput({ onSearch }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city.trim()) return;
    onSearch(city);
  };

  return (
    <form className="weather-form"
      onSubmit={handleSubmit}      
    >
      <input className="weather-input"
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Введіть місто (напр. Львів)"        
      />
      <button className="weather-btn"
        type="submit"        
      >
        Пошук
      </button>
    </form>
  );
}

export default WeatherInput;
