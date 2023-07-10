import { config } from 'dotenv';
import { Scenes, Telegraf, session } from 'telegraf';
import rateLimit from 'telegraf-ratelimit';

// Commands imports
import {
  start,
  help,
  cat,
  dog,
  weather,
  subscribe,
  unsubscribe,
  task,
  recommend,
} from './controllers/commands.js';

// Scenes imports
import weatherScene from './scenes/weatherScene.js';
import subscribeScene from './scenes/subscribeScene.js';
import unsubscribeScene from './scenes/unsubscribeScene.js';
import tasksScene from './scenes/tasksScene.js';
import addTaskScene from './scenes/addTaskScene.js';
import recommendScene from './scenes/recommendScene.js';
import eventsScene from './scenes/eventsScene.js';
import placesScene from './scenes/placesScene.js';
import landmarksScene from './scenes/landmarksScene.js';

// Schedules imports
import weatherSchedule from './controllers/schedules/weatherSchedule.js';
import taskSchedule from './controllers/schedules/taskSchedule.js';

config({ path: '.env' });

const bot = new Telegraf(process.env.BOT_TOKEN);

const stage = new Scenes.Stage([
  weatherScene,
  subscribeScene,
  unsubscribeScene,
  tasksScene,
  addTaskScene,
  recommendScene,
  eventsScene,
  placesScene,
  landmarksScene,
]);

// Set limit to 1 message per 3 seconds
const limitConfig = {
  window: 3000,
  limit: 1,
  onLimitExceeded: (ctx, next) => ctx.reply('Rate limit exceeded')
}

const setupBot = () => {
  // middleware
  bot.use(session());
  bot.use(stage.middleware());
  bot.use(rateLimit(limitConfig))

  // commands
  bot.start(start);
  bot.command('help', help);
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

  // enable graceful stop
  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));

  return bot;
};

export default setupBot;
