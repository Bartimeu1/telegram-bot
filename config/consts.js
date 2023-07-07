const CAT_URL = 'https://api.thecatapi.com/v1/images/search';
const DOG_URL = 'https://dog.ceo/api/breeds/image/random';
const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?q';
const HOLIDAYS_URL = 'https://api.api-ninjas.com/v1/holidays?country';
const PLACES_URL = 'https://api.foursquare.com/v3/places/search?';

const dateRegex = /^(\d{2})\.(\d{2})\.(\d{4}) (\d{2}):(\d{2})$/;
const timeRegex = /^(0[09-]|1[0-9]|2[0-3]):([0-5][0-9])$/;
const countryRegex = /^[A-Za-z]+$/;

export {
  CAT_URL,
  DOG_URL,
  WEATHER_URL,
  HOLIDAYS_URL,
  PLACES_URL,
  dateRegex,
  timeRegex,
  countryRegex,
};
