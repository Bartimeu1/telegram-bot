import axios from 'axios';
import { CAT_API } from '../config/consts.js';

const getRandomCat = async () => {
  try {
    const response = await axios({ url: CAT_API, method: 'get' });

    return response.data[0].url;
  } catch (error) {
    console.log('Ошибка при отправке запроса', error);
  }
};

export default getRandomCat;
