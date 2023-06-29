import axios from 'axios';
import { config } from 'dotenv';
import { WEATHER_URL } from '../config/consts.js';

config({ path: '../config/.env' });

const getWeather = async (city) => {
  try {
    const url = `${WEATHER_URL}?key=${process.env.WEATHERAPI_KEY}&q=${city}`;
    const response = await axios({ url: url, method: 'get' });

    return response.data;
  } catch (error) {
    console.log('Ошибка при отправке запроса', error);
  }
};

export default getWeather;
