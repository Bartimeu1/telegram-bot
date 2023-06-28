import { config } from 'dotenv';
import { Telegraf } from 'telegraf';
import { start, cat } from './controllers/command.js';

config({ path: './config/.env' });

const bot = new Telegraf(process.env.BOT_TOKEN);

const setupBot = () => {
  bot.start(start);
  bot.command('cat', cat);

  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));

  return bot;
};

export default setupBot;
