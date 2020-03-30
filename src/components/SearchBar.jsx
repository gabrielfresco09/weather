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
      <input name="city" value={city || ""} onChange={handleChange} />
      <select name="unit" onChange={handleChange} value={unit}>
        {unitOptions.map(({ value, name }) => (
          <option key={name} value={value}>
            {name}
          </option>
        ))}
      </select>
      {error && <p>{error}</p>}
      <button disabled={loading} onClick={handleClick}>
        Buscar
      </button>
    </div>
  );
};

export default SearchBar;
