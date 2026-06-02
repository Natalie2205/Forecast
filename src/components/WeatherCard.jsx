import CityTime from "./CityTime";
import "./WeatherCard.css";


function WeatherCard({ weather }) {
    if (!weather) return null;   
     
  const { liveTime, formatStaticTime } = CityTime(weather.timezone);
  
  const getWeatherClass = () => {
    if (!weather.weather || weather.weather.length === 0) return "bg-default";

    const mainCondition = weather.weather[0].main.toLowerCase();

    switch (mainCondition) {
      case "clear":
        return "bg-clear";
      case "clouds":
        return "bg-clouds";
      case "rain":
      case "drizzle":
        return "bg-rain";
      case "thunderstorm":
        return "bg-thunder";
      case "snow":
        return "bg-snow";
      case "mist":
      case "smoke":
      case "haze":
      case "dust":
      case "fog":
        return "bg-mist";
      default:
        return "bg-default";
    }
  };
  

        return (
          <div className={`weather-card ${getWeatherClass()}`}>
            <h2 className="weather-location">
              {weather.name}, {weather.sys.country}
            </h2>
            <h3 className="weather-time">Місцевий час {liveTime}</h3>

            <div className="weather-main-info">
              <img
                className="weather-icon"
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
              />
            </div>

            <h1 className="weather-temp">{Math.round(weather.main.temp)}°C</h1>
            <p className="weather-feels">
              Відчувається як: {Math.round(weather.main.feels_like)}°C
            </p>
            <p className="weather-desc">{weather.weather[0].description}</p>

            <div className="weather-details">
              <div className="detail-item">
                💧 Вологість: {weather.main.humidity}%
              </div>
              <div className="detail-item">
                💨 Вітер: {weather.wind.speed} м/с
              </div>
              <div className="detail-item">
                🧭 Атмосферний тиск{" "}
                {Math.round(weather.main.pressure * 0.750062)} мм рт. ст.
              </div>
              <div className="detail-item">
                🌅 Схід сонця о {formatStaticTime(weather.sys.sunrise)}
              </div>
              <div className="detail-item">
                🌇 Захід сонця о {formatStaticTime(weather.sys.sunset)}
              </div>
            </div>
          </div>
        );
    }


export default WeatherCard;
