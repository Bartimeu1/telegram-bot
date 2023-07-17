import { Input } from 'telegraf';

import { helpMessages, errorMessages } from '@constants/text.js';

import isUserRegistered from '@services/user/isUserRegistered.js';
import addUser from '@services/user/addUser.js';
import getRandomCat from '@root/api/getRandomCat.js';
import getRandomDog from '@root/api/getRandomDog.js';

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
    console.log(err);
    ctx.reply(errorMessage);
  }
};

export const dogCommand = async (ctx) => {
  try {
    const image = await getRandomDog();
    await ctx.replyWithPhoto(Input.fromURL(image));
  } catch (err) {
    console.log(err);
    ctx.reply(errorMessage);
  }
};

export const weatherCommand = async (ctx) => {
  return ctx.scene.enter('GET_WEATHER_BY_CITY');
};

export const subscribeCommand = async (ctx) => {
  return ctx.scene.enter('SUBSCRIBE_USER');
};

export const unsubscribeCommand = async (ctx) => {
  return ctx.scene.enter('UNSUBSCRIBE_USER');
};

export const taskCommand = async (ctx) => {
  return ctx.scene.enter('TASKS_SERVICE');
};

export const recommendCommand = async (ctx) => {
  return ctx.scene.enter('RECOMMEND');
};
