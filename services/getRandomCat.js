import axios from 'axios';
import { CAT_URL } from '../config/consts.js';

const getRandomCat = async () => {
  try {
    const response = await axios({ url: CAT_URL, method: 'get' });

    return response.data[0].url;
  } catch (error) {
    console.log('Ошибка при отправке запроса', error);
  }
};

export default getRandomCat;
