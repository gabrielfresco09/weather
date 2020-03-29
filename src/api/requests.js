import axios from "axios";

export const getWeather = cityName =>
  axios.get(process.env.REACT_APP_OPEN_WEATHER_API_URL, { q: cityName });
