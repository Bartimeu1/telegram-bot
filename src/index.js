import mongoose from 'mongoose';

import options from '@root/config.js';
import setupBot from './bot.js';

(async function () {
  try {
    await mongoose
      .connect(options.dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'telegram',
      })
      .then(() => console.log('Connected to MongoDB'));

    setupBot().launch();
  } catch (error) {
    console.log('Ошибка запуска', error);
  }
}());
