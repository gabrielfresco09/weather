import React from "react";
import SearchBar from "./SearchBar";
import LastSearchedCities from "./LastSearchedCities";

const SideBar = ({
  queryParams,
  getCurrentCityWeather,
  loading,
  updateQueryParamValue,
  cities,
  handleClick,
  deleteCity
}) => {
  return (
    <div className="block-right">
      <SearchBar
        {...queryParams}
        getCurrentCityWeather={getCurrentCityWeather}
        loading={loading}
        updateQueryParamValue={updateQueryParamValue}
      />
      <LastSearchedCities
        cities={cities}
        handleClick={handleClick}
        deleteCity={deleteCity}
      />
    </div>
  );
};
export default SideBar;
