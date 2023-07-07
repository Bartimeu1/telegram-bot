import { Input } from 'telegraf';

import { helpMessage } from '../constants/text.js';

import isUserRegistered from '../services/user/isUserRegistered.js';
import addUser from '../services/user/addUser.js';
import getRandomCat from '../services/api/getRandomCat.js';
import getRandomDog from '../services/api/getRandomDog.js';

export const start = async (ctx) => {
  const familiar = await isUserRegistered(ctx.message.chat.id);
  if (!familiar) {
    ctx.reply(`Рад знакомству, ${ctx.from.first_name}! 🫡`);
    addUser(ctx.message.chat.id, ctx.from.first_name);
  } else {
    ctx.reply(`Рад видеть вас снова, ${familiar.nickname} 🫡`);
  }
};

export const help = async (ctx) => {
  ctx.reply(helpMessage);
};

export const cat = async (ctx) => {
  const image = await getRandomCat();
  await ctx.replyWithPhoto(Input.fromURL(image));
};

export const dog = async (ctx) => {
  const image = await getRandomDog();
  await ctx.replyWithPhoto(Input.fromURL(image));
};

export const weather = async (ctx) => {
  return ctx.scene.enter('GET_WEATHER_BY_CITY');
};

export const subscribe = async (ctx) => {
  return ctx.scene.enter('SUBSCRIBE_USER');
};

export const unsubscribe = async (ctx) => {
  return ctx.scene.enter('UNSUBSCRIBE_USER');
};

export const task = async (ctx) => {
  return ctx.scene.enter('CREATE_TASK');
};

export const recommend = async (ctx) => {
  return ctx.scene.enter('RECOMMEND');
};
