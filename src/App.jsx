
import { WeatherProvider } from "./components/WeatherContext";
import Home from "./pages/Home";
import { Routes, Route } from "react-router";
import "./App.css";



function App() {
  return (
    <WeatherProvider>
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        {/* <Route></Route> */}
        {/* <Route></Route> */}
      </Routes>      
    </div>
    </WeatherProvider >
  );
}

export default App;


