import axios from 'axios';

import options from '@root/config.js';

const getWeather = async (city) => {
  try {
    const url = `${options.weatherUrl}=${city}&appid=${options.weatherApiKey}`;
    const response = await axios({ url: url, method: 'get' });

    return response.data;
  } catch (error) {
    console.log('Ошибка при отправке запроса', error);
  }
};

export default getWeather;
