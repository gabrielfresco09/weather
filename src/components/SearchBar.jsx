import React, { useState } from "react";

const SearchBar = ({
  getCurrentCityWeather,
  loading,
  city,
  updateQueryParamValue,
  apiCallError
}) => {
  const [error, setError] = useState();

  const handleClick = () => {
    if (city) {
      setError();
      getCurrentCityWeather(true);
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
      {(error || apiCallError) && (
        <p style={{ margin: 0 }}>{error ? error : apiCallError}</p>
      )}
    </div>
  );
};

export default SearchBar;
