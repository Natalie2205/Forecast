import { useState, useEffect } from "react";

export function CityTime(timezone) {
  const [currentTime, setCurrentTime] = useState(new Date());

  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, [timezone]); 

  
  const getLiveTime = () => {
    if (timezone === undefined || timezone === null) return "";

    const cityDate = new Date(
      currentTime.getTime() +
        currentTime.getTimezoneOffset() * 60000 +
        timezone * 1000,
    );

    return cityDate.toLocaleTimeString("uk-UA", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

 
  const formatStaticTime = (timestamp) => {
    if (!timestamp || timezone === undefined) return "";

    const date = new Date(
      timestamp * 1000 +
        timezone * 1000 +
        new Date().getTimezoneOffset() * 60000,
    );

    return date.toLocaleTimeString("uk-UA", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  
  return {
    liveTime: getLiveTime(),
    formatStaticTime,
  };
}

export default CityTime;