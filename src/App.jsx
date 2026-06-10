
import { WeatherProvider } from "./components/WeatherContext";
import Home from "./pages/Home";
import "./App.css";

function App() {
  return (
    <WeatherProvider>
      <Home />
    </WeatherProvider>
  );
}

export default App;


