import React from "react";

const WeatherInfo = ({ weather, coord, wind, main, unit  }) => {
  return (
    <div>
      {main && 
        main.feels_like}
    </div>
  );
};

export default WeatherInfo;
