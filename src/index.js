import { config } from 'dotenv';
import mongoose from 'mongoose';
import setupBot from './bot.js';

config({ path: '.env' });

(async function () {
  try {
    await mongoose
      .connect(process.env.DB_URL, {
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
