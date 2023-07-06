const CAT_URL = 'https://api.thecatapi.com/v1/images/search';
const DOG_URL = 'https://dog.ceo/api/breeds/image/random';
const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?q';
const dateRegex = /^(\d{2})\.(\d{2})\.(\d{4}) (\d{2}):(\d{2})$/;
const timeRegex = /^(0[09-]|1[0-9]|2[0-3]):([0-5][0-9])$/;

export { CAT_URL, DOG_URL, WEATHER_URL, dateRegex, timeRegex };
