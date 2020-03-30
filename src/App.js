import React from "react";
import "./App.css";
import { getWeather } from "./api/requests";
import WeatherContainer from "./components/WeatherContainer";

function App() {
  return <WeatherContainer />;
}

export default App;
