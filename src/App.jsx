
import { WeatherProvider } from "./components/WeatherContext";
import Home from "./pages/Home";
import { Routes, Route } from "react-router";
import Selected from "./pages/Selected";
import Header from "./layout/Header";
import "./App.css";





function App() {
  return (
    <WeatherProvider>
      <Header />
      <div className="container">        
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/selected" element={<Selected />}></Route>
          {/* <Route></Route> */}
        </Routes>
      </div>
    </WeatherProvider>
  );
}

export default App;


