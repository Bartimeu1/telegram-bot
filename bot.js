import { config } from 'dotenv';
import { Scenes, Telegraf, session } from 'telegraf';
import { start, cat, dog, weather, subscribe } from './controllers/command.js';

import weatherScene from './scenes/weatherScene.js';
import subscribeScene from './scenes/subscribeScene.js';

import weatherSchedule from './controllers/weatherSchedule.js';

config({ path: './config/.env' });

const bot = new Telegraf(process.env.BOT_TOKEN);

const stage = new Scenes.Stage([weatherScene, subscribeScene]);

const setupBot = () => {
  bot.use(session());
  bot.use(stage.middleware());

  // commands
  bot.start(start);
  bot.command('cat', cat);
  bot.command('dog', dog);
  bot.command('weather', weather);
  bot.command('subscribe', subscribe);

  // schedules
  weatherSchedule(bot);
  
  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));

  return bot;
};

export default setupBot;

// const Telegraf = require('telegraf');
// const schedule = require('node-schedule');
// const { MongoClient } = require('mongodb');

// // Подключение к базе данных MongoDB
// const uri = 'mongodb://localhost:27017/mydatabase';
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// // Создание экземпляра Telegraf
// const bot = new Telegraf('YOUR_TELEGRAM_BOT_TOKEN');

// // Функция для выполнения запроса
// async function sendNotification(userId, message) {
//   try {
//     // Ваш код для отправки уведомления пользователю
//     console.log(`Отправлено уведомление пользователю ${userId}: ${message}`);
//   } catch (error) {
//     console.error('Ошибка при отправке уведомления:', error);
//   }
// }

// // Функция для проверки базы данных и вызова запроса
// async function checkNotifications() {
//   try {
//     await client.connect();
//     const db = client.db();
//     const collection = db.collection('notifications');

//     // Получение всех уведомлений, которые нужно отправить в текущий момент
//     const currentDateTime = new Date();
//     const notifications = await collection.find({ dateToCall: { $lte: currentDateTime } }).toArray();

//     // Отправка уведомлений
//     for (const notification of notifications) {
//       await sendNotification(notification.userId, notification.message);
//     }
//   } catch (error) {
//     console.error('Ошибка при проверке уведомлений:', error);
//   } finally {
//     await client.close();
//   }
// }

// // Создание задачи планировщика, которая будет выполняться каждую минуту
// const job = schedule.scheduleJob('* * * * *', checkNotifications);

// // Запуск бота
// bot.start((ctx) => ctx.reply('Привет! Я бот для отправки уведомлений.'));
// bot.launch();
