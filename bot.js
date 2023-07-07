import { config } from 'dotenv';
import { Scenes, Telegraf, session } from 'telegraf';

// Commands imports
import {
  start,
  cat,
  dog,
  weather,
  subscribe,
  unsubscribe,
  task,
  recommend,
} from './controllers/command.js';

// Scenes imports
import weatherScene from './scenes/weatherScene.js';
import subscribeScene from './scenes/subscribeScene.js';
import unsubscribeScene from './scenes/unsubscribeScene.js';
import taskScene from './scenes/taskScene.js';
import recommendScene from './scenes/recommendScene.js';
import eventsScene from './scenes/eventsScene.js';
import placesScene from './scenes/placesScene.js';
import landmarksScene from './scenes/landmarksScene.js';

// Schedules imports
import weatherSchedule from './controllers/weatherSchedule.js';
import taskSchedule from './controllers/taskSchedule.js';

config({ path: './config/.env' });

const bot = new Telegraf(process.env.BOT_TOKEN);

const stage = new Scenes.Stage([
  weatherScene,
  subscribeScene,
  unsubscribeScene,
  taskScene,
  recommendScene,
  eventsScene,
  placesScene,
  landmarksScene,
]);

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
  bot.command('recommend', recommend);

  // schedules
  weatherSchedule(bot);
  taskSchedule(bot);

  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));

  return bot;
};

export default setupBot;
