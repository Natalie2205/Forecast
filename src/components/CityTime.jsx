import { useState, useEffect } from "react";

 function CityTime(timezoneOffsetInSeconds) {
   const [currentTime, setCurrentTime] = useState(new Date());

   useEffect(() => {
     const timer = setInterval(() => {
       setCurrentTime(new Date());
     }, 1000);

     return () => clearInterval(timer);
   }, []);

   const getLiveTime = () => {
     if (
       timezoneOffsetInSeconds === undefined ||
       timezoneOffsetInSeconds === null
     )
       return "";

     const utcInMs =
       currentTime.getTime() + currentTime.getTimezoneOffset() * 60000;

     const cityDate = new Date(utcInMs + timezoneOffsetInSeconds * 1000);

     return cityDate.toLocaleTimeString("uk-UA", {
       hour: "2-digit",
       minute: "2-digit",
       second: "2-digit",
     });
   };

   const formatStaticTime = (timestamp) => {
     if (!timestamp || timezoneOffsetInSeconds === undefined) return "";
     
     const cityDate = new Date((timestamp + timezoneOffsetInSeconds) * 1000);
     
     return cityDate.toLocaleTimeString("uk-UA", {
       hour: "2-digit",
       minute: "2-digit",
       timeZone: "UTC", 
     });
   };

   return {
     liveTime: getLiveTime(),
     formatStaticTime,
   };
 }


export default CityTime;