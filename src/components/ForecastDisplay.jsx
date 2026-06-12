import { useEffect, useRef, useState } from "react";
import "./ForecastDisplay.css";


function ForecastDisplay({ forecast }) {
  
  const timelineRef = useRef(null);

  const groupByDay = (list) => {
    return list.reduce((acc, item) => {
      
      const date = item.dt_txt.split(" ")[0]; 
      if (!acc[date]) acc[date] = [];
      acc[date].push(item);
      return acc;
    }, {});
  };

  const groupedForecast = groupByDay(forecast);
  const dates = Object.keys(groupedForecast);

  const [activeDate, setActiveDate] = useState(dates[0] || "");

  
  useEffect(() => {
    if (dates.length > 0) {
      setActiveDate(dates[0]);
    }
  }, [forecast]);

  
  useEffect(() => {
    if (timelineRef.current) {
      timelineRef.current.scrollLeft = 0;
    }
  }, [activeDate]);

  const getForecastWeatherClass = () => {
    const currentDayHours = groupedForecast[activeDate];
    if (!currentDayHours || currentDayHours.length === 0) return "bg-default";

    const middleIndex = Math.floor(currentDayHours.length / 2);
    const mainCondition = currentDayHours[middleIndex].weather[0].main.toLowerCase();

    switch (mainCondition) {
      case "clear": return "bg-clear";
      case "clouds": return "bg-clouds";
      case "rain":
      case "drizzle": return "bg-rain";
      case "thunderstorm": return "bg-thunder";
      case "snow": return "bg-snow";
      case "mist":
      case "smoke":
      case "haze":
      case "dust":
      case "fog": return "bg-mist";
      default: return "bg-default";
    }
  };

  const formatTabName = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("uk-UA", { weekday: "short", day: "numeric" });
  };

  const formatHour = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString("uk-UA", { hour: "2-digit", minute: "2-digit" });
  };

  if (dates.length === 0) return null;

  return (
    <div className={`forecast-section ${getForecastWeatherClass()}`}>
      <h2 className="forecast-main-title">Прогноз кожні 3 години</h2>

      <div className="forecast-tabs">
        {dates.map((dateKey) => (
          <button
            key={dateKey}
            type="button"
            className={`tab-btn ${activeDate === dateKey ? "active" : ""}`}
            onClick={() => setActiveDate(dateKey)}
          >
            {formatTabName(dateKey)}
          </button>
        ))}
      </div>

      <div className="forecast-day-content">
        
        <div
          className="forecast-hours-timeline fade-in"
          key={activeDate}
          ref={timelineRef}
        >
          {groupedForecast[activeDate]?.map((hourData) => (
            <div key={hourData.dt} className="forecast-hour-card">
              <span className="hour-time">{formatHour(hourData.dt_txt)}</span>
              <img
                src={`https://openweathermap.org/img/wn/${hourData.weather[0].icon}.png`}
                alt={hourData.weather[0].description}
                className="hour-icon"
              />
              <span className="hour-temp">
                {Math.round(hourData.main.temp)}°C
              </span>
              <div className="hour-meta-details">
                <span className="hour-humidity">
                  💧 {hourData.main.humidity}%
                </span>
                <span className="hour-wind">
                  💨 {Math.round(hourData.wind.speed)}м/с
                </span>
              </div>
              <span className="hour-desc">
                {hourData.weather[0].description}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ForecastDisplay;

               
                
                             
                
