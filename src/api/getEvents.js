import axios from 'axios';

import options from '@root/config.js';

const getEvents = async (country) => {
  const url = `${options.holidaysUrl}=${country}&year=2023&limit=5`;
  const response = await axios.get(url, {
    headers: {
      'X-Api-Key': options.eventsApiKey,
      contentType: 'application/json',
    },
  });

  return response.data;
};

export default getEvents;
