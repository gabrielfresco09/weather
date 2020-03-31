import React, { useState, useEffect } from "react";
import { unitOptions } from "../helpers/constants";

const SearchBar = ({
  getCurrentCityWeather,
  loading,
  city,
  unit,
  updateQueryParamValue
}) => {
  const [error, setError] = useState();

  const handleClick = () => {
    if (city) {
      getCurrentCityWeather();
      return;
    }
    setError("Please enter a city");
  };

  const handleChange = e => {
    const {
      target: { value, name }
    } = e;
    updateQueryParamValue(name, value);
  };

  return (
    <div>
      <input
        name="city"
        placeholder="Search city"
        value={city || ""}
        onChange={handleChange}
      />
      <button disabled={loading} onClick={handleClick}>
        Buscar
      </button>
      {error && <span>{error}</span>}
    </div>
  );
};

export default SearchBar;
