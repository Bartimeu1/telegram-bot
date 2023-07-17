import axios from 'axios';

import options from '@root/config.js';

const getRandomDog = async () => {
  const response = await axios({ url: options.dogUrl, method: 'get' });

  return response.data.message;
};

export default getRandomDog;
