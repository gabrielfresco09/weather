import React, { useState, useEffect } from "react";
import { getWeather } from "../api/requests";
import SearchBar from "./SearchBar";
import { unitOptions } from "../helpers/constants";
import WeatherInfo from "./WeatherInfo";
import { updateLastCities } from "../helpers/localStorage";

const WeatherContainer = () => {
  const [currentCityWeather, setCurrentCityWeather] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [queryParams, setQueryParams] = useState({
    city: "",
    unit: unitOptions[0].value
  });

  const updateQueryParamValue = (name, value) => {
    const newQueryParams = Object.assign({}, queryParams);
    newQueryParams[name] = value;
    setQueryParams(newQueryParams);
  };

  const getCurrentCityWeather = () => {
    setError(null);
    setLoading(true);
  };

  useEffect(() => {
    if (loading)
      getWeather(queryParams)
        .then(({ data }) => {
          setCurrentCityWeather(data);
          updateLastCities({ id: data.id, name: data.name });
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
      {error && <div>{error}</div>}
    </React.Fragment>
  );
};

export default WeatherContainer;
