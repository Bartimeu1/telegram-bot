import axios from 'axios';
import { DOG_API } from '../config/consts.js';

const getRandomDog = async () => {
  try {
    const response = await axios({ url: DOG_API, method: 'get' });

    return response.data.message;
  } catch (error) {
    console.log('Ошибка при отправке запроса', error);
  }
};

export default getRandomDog;
