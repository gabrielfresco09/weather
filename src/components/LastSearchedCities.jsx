import React from "react";

const LastSearchedCities = ({ cities, handleClick, deleteCity }) => {
  return (
    <React.Fragment>
      {cities.map(city => (
        <div key={city.id}>
          <p onClick={() => handleClick(city.name)}>{city.name}</p>
          <button onClick={() => deleteCity(city.id)}>Remove</button>
        </div>
      ))}
    </React.Fragment>
  );
};
export default LastSearchedCities;
