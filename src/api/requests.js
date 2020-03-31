import axios from "axios";

export const getWeather = params => {
  const { unit } = params;
  return axios.get(process.env.REACT_APP_OPEN_WEATHER_API_URL, {
    params: {
      ...getParams(params),
      APPID: process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY,
      units: unit
    }
  });
};

const getParams = ({ city, lat, lon }) => {
  if (city) return { q: city };

  return { lat, lon };
};
