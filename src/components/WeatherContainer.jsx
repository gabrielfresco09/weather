import React, { useState, useEffect } from "react";
import { getWeather } from "../api/requests";
import SearchBar from "./SearchBar";
import { unitOptions } from "../helpers/constants";
import WeatherInfo from "./WeatherInfo";
import {
  updateLastCities,
  getLastSearchedCities,
  deleteCity
} from "../helpers/localStorage";
import LastSearchedCities from "./LastSearchedCities";
import CityLocation from "./CityLocation";

const WeatherContainer = () => {
  const [currentCityWeather, setCurrentCityWeather] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [queryParams, setQueryParams] = useState({
    city: "",
    unit: unitOptions[0].value
  });
  const [lastSearchedCities, setLastSearchedCities] = useState(
    getLastSearchedCities()
  );

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

  useEffect(() => {
    if (loading)
      getWeather(queryParams)
        .then(({ data }) => {
          setCurrentCityWeather(data);
          setLastSearchedCities(
            updateLastCities({ id: data.id, name: data.name })
          );
        })
        .catch(err => {
          if (err.response.status === 404) setError("City not found");
          else setError("An error ocurred, please try again");
        })
        .finally(() => setLoading(false));
    else setQueryParams({ city: "", unit: queryParams.unit });
  }, [loading]);

  return (
    <React.Fragment>
      <SearchBar
        {...queryParams}
        getCurrentCityWeather={getCurrentCityWeather}
        loading={loading}
        updateQueryParamValue={updateQueryParamValue}
      />
      <WeatherInfo {...currentCityWeather} unit={queryParams.unit} />
      <CityLocation coordinates={currentCityWeather.coord} />
      <LastSearchedCities
        cities={lastSearchedCities}
        handleClick={handleLastSearchedCityClick}
        deleteCity={deleteCityById}
      />
      {error && <div>{error}</div>}
    </React.Fragment>
  );
};

export default WeatherContainer;
