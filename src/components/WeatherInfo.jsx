import React from "react";

const WeatherInfo = ({ coord, main, unit }) => {
  return (
    <React.Fragment>
      {main ? (
        <div>
          <p>Current temp: {main && main.temp}</p>
          <p>Feels like: {main && main.feels_like}</p>
          <p>Min temp: {main && main.temp_min}</p>
          <p>Max temp: {main && main.temp_max}</p>
          <p>Humidity: {main && main.humidity}</p>
          <p>Pressure: {main && main.pressure}</p>
        </div>
      ) : (
        <div>No data</div>
      )}
    </React.Fragment>
  );
};
export default WeatherInfo;
