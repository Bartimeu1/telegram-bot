import axios from 'axios';
import { config } from 'dotenv';
import { HOLIDAYS_URL } from '../../constants/urls.js';

config({ path: '.env' });

const getEvents = async (country) => {
  const url = `${HOLIDAYS_URL}=${country}&year=2023&limit=5`;
  const response = await axios.get(url, {
    headers: {
      'X-Api-Key': process.env.EVENTSAPI_KEY,
      contentType: 'application/json',
    },
  });

  return response.data;
};

export default getEvents;
