import axios from 'axios';

import options from '@root/config.js';

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
    Authorization: options.placeApiKey,
  };
  const response = await axios.get(options.placesUrl, {
    params,
    headers,
  });
  return response.data.results;
};

export default getLandmarks;
