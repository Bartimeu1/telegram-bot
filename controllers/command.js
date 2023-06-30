import { Input } from 'telegraf';
import getRandomCat from '../services/getRandomCat.js';
import getRandomDog from '../services/getRandomDog.js';

export const start = (ctx) => {
  ctx.reply(`Рад видеть вас, ${ctx.from.first_name}!`);
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
