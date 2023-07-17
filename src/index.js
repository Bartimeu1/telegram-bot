import mongoose from 'mongoose';
import setupBot from './bot.js';
import options from '@root/config.js';

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
})();
