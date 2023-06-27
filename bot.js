import { config } from 'dotenv';
import { Telegraf } from 'telegraf';
import { start } from './controllers/command.js';

config({ path: './config/.env' });

const bot = new Telegraf(process.env.BOT_TOKEN);

const setupBot = () => {
  bot.start(start);

  return bot;
};

export default setupBot;
