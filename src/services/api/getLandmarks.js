import axios from 'axios';
import { config } from 'dotenv';
import { PLACES_URL } from '../../constants/urls.js';

config({ path: '.env' });

const getLandmarks = async (city) => {
  const params = {
    query: 'landmark',
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

export default getLandmarks;