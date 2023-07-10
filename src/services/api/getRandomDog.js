import axios from 'axios';
import { DOG_URL } from '@constants/urls.js';

const getRandomDog = async () => {
  try {
    const response = await axios({ url: DOG_URL, method: 'get' });

    return response.data.message;
  } catch (error) {
    console.log('Ошибка при отправке запроса', error);
  }
};

export default getRandomDog;
