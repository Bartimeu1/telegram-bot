import axios from 'axios';
import { config } from 'dotenv';
import { WEATHER_URL } from '../../constants/urls.js';

config({ path: '.env' });

const getWeather = async (city) => {
  try {
    const url = `${WEATHER_URL}=${city}&appid=${process.env.WEATHERAPI_KEY}`;
    const response = await axios({ url: url, method: 'get' });
    
    return response.data;
  } catch (error) {
    console.log('Ошибка при отправке запроса', error);
  }
};

export default getWeather;
