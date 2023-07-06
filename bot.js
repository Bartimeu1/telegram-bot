import { config } from 'dotenv';
import { Scenes, Telegraf, session } from 'telegraf';
import { start, cat, dog, weather, subscribe, unsubscribe, task } from './controllers/command.js';

import weatherScene from './scenes/weatherScene.js';
import subscribeScene from './scenes/subscribeScene.js';
import unsubscribeScene from './scenes/unsubscribeScene.js';
import taskScene from './scenes/taskScene.js';

import weatherSchedule from './controllers/weatherSchedule.js';
import taskSchedule from './controllers/taskSchedule.js';

config({ path: './config/.env' });

const bot = new Telegraf(process.env.BOT_TOKEN);

const stage = new Scenes.Stage([weatherScene, subscribeScene, unsubscribeScene, taskScene]);

const setupBot = () => {
  // middleware
  bot.use(session());
  bot.use(stage.middleware());

  // commands
  bot.start(start);
  bot.command('cat', cat);
  bot.command('dog', dog);
  bot.command('weather', weather);
  bot.command('subscribe', subscribe);
  bot.command('unsubscribe', unsubscribe);
  bot.command('task', task);

  // schedules
  weatherSchedule(bot);
  taskSchedule(bot);

  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));

  return bot;
};

export default setupBot;
