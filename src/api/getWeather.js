import axios from 'axios';

import options from '@root/config.js';

const getWeather = async (city) => {
  try {
    const url = `${options.weatherUrl}=${city}&appid=${options.weatherApiKey}`;
    const response = await axios.get(url);

    return response.data;
  } catch (err) {
    return err;
  }
};

export default getWeather;
