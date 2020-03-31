import React from "react";
import moment from "moment";
import { unitOptions } from "../helpers/constants";

const WeatherInfo = ({ main, unit, name, sys, handleUnitChange }) => {
  return (
    <div className="flex block-info">
      {main && (
        <React.Fragment>
          <div className="flex">
            <div className="flex content">
              <div className="flex block-temp">
                <h1>{parseInt(main.temp)}°</h1>
                <span>Feels like {parseInt(main.feels_like)}°</span>
              </div>
              <div className="block-details">
                <h3>
                  {name}, {sys.country}
                </h3>
                <h4> {moment().format("MMM Do YYYY HH:mm")}</h4>
                <div>
                  <span>Min.{parseInt(main.temp_min)}°</span>
                  <span>Max.{parseInt(main.temp_max)}°</span>
                </div>
              </div>
            </div>
            <div className="flex block-extra">
              <div className="extra-item">
                <h4>Humidity</h4> <span>{main.humidity}%</span>
              </div>
              <div className="extra-item">
                <h4>Pressure</h4> <span>{main.pressure}</span>
              </div>
            </div>
          </div>
          <div>
            <select
              className="select"
              name="unit"
              onChange={handleUnitChange}
              value={unit}
            >
              {unitOptions.map(({ value, name }) => (
                <option key={name} value={value}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};
export default WeatherInfo;
