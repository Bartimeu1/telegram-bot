import { Scenes, Telegraf, session } from 'telegraf';
import rateLimit from 'telegraf-ratelimit';

import options from '@root/config.js';

import {
  startCommand,
  helpCommand,
  catCommand,
  dogCommand,
  weatherCommand,
  subscribeCommand,
  unsubscribeCommand,
  taskCommand,
  recommendCommand,
} from './controllers/commands.js';

import {
  weatherScene,
  subscribeScene,
  unsubscribeScene,
  tasksScene,
  addTaskScene,
  recommendScene,
  eventsScene,
  placesScene,
  landmarksScene,
} from './scenes/index.js';

import { weatherSchedule, taskSchedule } from './controllers/schedules/index.js';

const bot = new Telegraf(options.botToken);

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

const limitConfig = {
  window: 3000,
  limit: 1,
  onLimitExceeded: (ctx, next) => {
    ctx.reply('Не так быстро');
  },
};

const setupBot = () => {
  bot.use(session());
  bot.use(stage.middleware());
  bot.use(rateLimit(limitConfig));

  bot.start(startCommand);
  bot.command('help', helpCommand);
  bot.command('cat', catCommand);
  bot.command('dog', dogCommand);
  bot.command('weather', weatherCommand);
  bot.command('subscribe', subscribeCommand);
  bot.command('unsubscribe', unsubscribeCommand);
  bot.command('task', taskCommand);
  bot.command('recommend', recommendCommand);

  weatherSchedule(bot);
  taskSchedule(bot);

  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));

  return bot;
};

export default setupBot;
