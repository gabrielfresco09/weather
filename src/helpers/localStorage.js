import _ from "lodash";
import { CITIES_LIST_KEY } from "./constants";

export const updateLastCities = city => {
  const lastSearchedCities = getLastSearchedCities();

  const savedCityIndex = _.findIndex(lastSearchedCities, { id: city.id });

  if (savedCityIndex !== -1) {
    replaceCity(city, lastSearchedCities, savedCityIndex);
  } else if (lastSearchedCities.length === 5) {
    const oldestSearchedCity = _.minBy(lastSearchedCities, "searchedTime");
    const oldestSearchedCityIndex = _.findIndex(lastSearchedCities, {
      id: oldestSearchedCity.id
    });
    replaceCity(city, lastSearchedCities, oldestSearchedCityIndex);
  } else lastSearchedCities.push(getCityWithTime(city));

  saveSearchedCities(lastSearchedCities);
  return lastSearchedCities;
};

export const getLastSearchedCities = () => {
  const lastSearchedCities = JSON.parse(localStorage.getItem(CITIES_LIST_KEY));
  return lastSearchedCities ? lastSearchedCities : [];
};

export const deleteCity = id => {
  const lastSearchedCities = getLastSearchedCities();
  _.remove(lastSearchedCities, item => item.id === id);
  saveSearchedCities(lastSearchedCities);
  return lastSearchedCities;
};

const replaceCity = (newCity, cities, itemToReplaceIndex) =>
  cities.splice(itemToReplaceIndex, 1, getCityWithTime(newCity));

const getCityWithTime = city => {
  const newCity = Object.assign({}, city);
  newCity.searchedTime = new Date().getTime();
  return newCity;
};

const saveSearchedCities = searchedCities =>
  localStorage.setItem(CITIES_LIST_KEY, JSON.stringify(searchedCities));
