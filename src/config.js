import { config } from 'dotenv';

config({ path: '.env' });

const options = {
  botToken: process.env.BOT_TOKEN,
  dbUrl: process.env.DB_URL,
  dogUrl: process.env.DOG_URL,
  catUrl: process.env.CAT_URL,
  weatherUrl: process.env.WEATHER_URL,
  holidaysUrl: process.env.HOLIDAYS_URL,
  placesUrl: process.env.PLACES_URL,
  weatherApiKey: process.env.WEATHERAPI_KEY,
  placeApiKey: process.env.PLACESAPI_KEY,
  eventsApiKey: process.env.EVENTSAPI_KEY,
};

export default options;
