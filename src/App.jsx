
import { WeatherProvider } from "./components/WeatherContext";
import Home from "./pages/Home";
import { Routes, Route } from "react-router";
import Selected from "./pages/Selected";
import Header from "./layout/Header";
import "./App.css";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./layout/Footer";
import Interesting from "./pages/Interesting";


function App() {
  return (
    <WeatherProvider>
      <Header />

      <div className="container">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/selected" element={<Selected />}></Route>
          <Route path="/interesting" element={<Interesting />}></Route>
        </Routes>
      </div>

      <ScrollToTop />

      <Footer />     
      
    </WeatherProvider>
  );
}

export default App;


