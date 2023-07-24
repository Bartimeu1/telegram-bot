import axios from 'axios';

import options from '@root/config.js';

const getRandomCat = async () => {
  const response = await axios({ url: options.catUrl, method: 'get' });

  return response.data[0].url;
};

export default getRandomCat;
