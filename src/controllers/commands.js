import { Input } from 'telegraf';

import { errorMessages, helpMessages } from '@constants/text.js';
import getRandomCat from '@root/api/getRandomCat.js';
import getRandomDog from '@root/api/getRandomDog.js';
import addUser from '@services/user/addUser.js';
import isUserRegistered from '@services/user/isUserRegistered.js';

export const startCommand = async (ctx) => {
  try {
    const familiar = await isUserRegistered(ctx.message.chat.id);
    if (!familiar) {
      ctx.reply(`Рад знакомству, ${ctx.from.first_name}! 🫡`);
      addUser(ctx.message.chat.id, ctx.from.first_name);
    } else {
      ctx.reply(`Рад видеть вас снова, ${familiar.nickname} 🫡`);
    }
  } catch {
    ctx.reply(errorMessages.error);
  }
};

export const helpCommand = async (ctx) => {
  ctx.reply(helpMessages.enter);
};

export const catCommand = async (ctx) => {
  try {
    const image = await getRandomCat();
    await ctx.replyWithPhoto(Input.fromURL(image));
  } catch (err) {
    ctx.reply(errorMessages.error);
  }
};

export const dogCommand = async (ctx) => {
  try {
    const image = await getRandomDog();
    await ctx.replyWithPhoto(Input.fromURL(image));
  } catch (err) {
    ctx.reply(errorMessages.error);
  }
};

export const weatherCommand = async (ctx) => ctx.scene.enter('GET_WEATHER_BY_CITY');

export const subscribeCommand = async (ctx) => ctx.scene.enter('SUBSCRIBE_USER');

export const unsubscribeCommand = async (ctx) => ctx.scene.enter('UNSUBSCRIBE_USER');

export const taskCommand = async (ctx) => ctx.scene.enter('TASKS_SERVICE');

export const recommendCommand = async (ctx) => ctx.scene.enter('RECOMMEND');
