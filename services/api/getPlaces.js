import axios from 'axios';
import { config } from 'dotenv';
import { PLACES_URL } from '../../config/consts.js';

config({ path: '../config/.env' });

const getPlaces = async (city) => {
  const params = {
    query: 'attractions',
    near: city,
    open_now: 'true',
    limit: 5,
    sort: 'DISTANCE',
  };

  const headers = {
    Accept: 'application/json',
    Authorization: process.env.PLACESAPI_KEY,
  };
  const response = await axios.get(PLACES_URL, {
    params,
    headers,
  });
  return response.data.results;
};

export default getPlaces;
