import { config } from 'dotenv';
import { Scenes, Telegraf,session } from 'telegraf';
import { start, cat, dog, weather } from './controllers/command.js';
import weatherScene from './controllers/scenes/weatherScene.js';

config({ path: './config/.env' });

const bot = new Telegraf(process.env.BOT_TOKEN);

const stage = new Scenes.Stage([weatherScene]);

const setupBot = () => {
  bot.use(session());
  bot.use(stage.middleware());

  // commands
  bot.start(start);
  bot.command('cat', cat);
  bot.command('dog', dog);
  bot.command('weather', weather);

  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));

  return bot;
};

export default setupBot;
