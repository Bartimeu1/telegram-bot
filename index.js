import { Telegraf } from 'telegraf';
import { config } from 'dotenv';

config({ path: './config/.env' });

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command('start', (ctx) => {
  ctx.reply(`Рад видеть вас, ${ctx.from.first_name}!`);
});

bot.launch();
