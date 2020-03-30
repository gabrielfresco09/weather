import axios from "axios";

export const getWeather = ({ city, unit }) =>
  axios.get(process.env.REACT_APP_OPEN_WEATHER_API_URL, {
    params: {
      q: city,
      APPID: process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY,
      units: unit
    }
  });
