import React from "react";

const LastSearchedCities = ({ cities, handleClick, deleteCity }) => {
  return (
    <React.Fragment>
      {cities.map(city => (
        <div className="flex city-card" key={city.id}>
          <p onClick={() => handleClick(city.name)}>
            <strong>{city.name}</strong>, {city.country}
          </p>
          <img
            width="15px"
            src="remove.svg"
            alt={`Delete ${city.name} from saved searches`}
            onClick={() => deleteCity(city.id)}
          />
        </div>
      ))}
    </React.Fragment>
  );
};
export default LastSearchedCities;
