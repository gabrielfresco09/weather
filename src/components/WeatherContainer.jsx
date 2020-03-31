import React, { useState, useEffect } from "react";
import { getWeather } from "../api/requests";
import { unitOptions } from "../helpers/constants";
import WeatherInfo from "./WeatherInfo";
import {
  updateLastCities,
  getLastSearchedCities,
  deleteCity
} from "../helpers/localStorage";
import CityLocation from "./CityLocation";
import SideBar from "./SideBar";

const WeatherContainer = () => {
  const [currentCityWeather, setCurrentCityWeather] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [queryParams, setQueryParams] = useState({
    city: "",
    unit: unitOptions[1].value
  });
  const [lastSearchedCities, setLastSearchedCities] = useState(
    getLastSearchedCities()
  );

  const currentPositionSuccess = data => {
    const newQueryParams = Object.assign({}, queryParams);
    newQueryParams.lat = data.coords.latitude;
    newQueryParams.lon = data.coords.longitude;
    setQueryParams(newQueryParams);
    getCurrentCityWeather();
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(currentPositionSuccess);
  }, []);

  const updateQueryParamValue = (name, value) => {
    const newQueryParams = Object.assign({}, queryParams);
    newQueryParams[name] = value;
    setQueryParams(newQueryParams);
  };

  const getCurrentCityWeather = () => {
    setError(null);
    setLoading(true);
  };

  const handleLastSearchedCityClick = city => {
    updateQueryParamValue("city", city);
    getCurrentCityWeather();
  };

  const deleteCityById = cityId => {
    const updatedCities = deleteCity(cityId);
    setLastSearchedCities(updatedCities);
  };

  const handleUnitChange = e => {
    const {
      target: { value, name }
    } = e;
    updateQueryParamValue(name, value);
    debugger;
    getCurrentCityWeather();
  };

  useEffect(() => {
    if (loading)
      getWeather(queryParams)
        .then(({ data }) => {
          setCurrentCityWeather(data);
          setLastSearchedCities(
            updateLastCities({
              id: data.id,
              name: data.name,
              country: data.sys.country
            })
          );
        })
        .catch(err => {
          if (err.response.status === 404) setError("City not found");
          else setError("An error ocurred, please try again");
        })
        .finally(() => setLoading(false));
    else {
      const clearedQueryParams = Object.assign({}, queryParams);
      clearedQueryParams.city = "";
      setQueryParams(clearedQueryParams);
    }
  }, [loading]);

  return (
    <div className="flex block-content">
      <div className="block-left">
        <WeatherInfo
          {...currentCityWeather}
          unit={queryParams.unit}
          handleUnitChange={handleUnitChange}
        />
        <CityLocation coordinates={currentCityWeather.coord} />
      </div>
      <SideBar
        queryParams={queryParams}
        getCurrentCityWeather={getCurrentCityWeather}
        loading={loading}
        updateQueryParamValue={updateQueryParamValue}
        cities={lastSearchedCities}
        handleClick={handleLastSearchedCityClick}
        deleteCity={deleteCityById}
        apiCallError={error}
      />
    </div>
  );
};

export default WeatherContainer;
