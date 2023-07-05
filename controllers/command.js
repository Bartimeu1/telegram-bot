import { Input } from 'telegraf';
import addUser from '../services/addUser.js';
import getRandomCat from '../services/getRandomCat.js';
import getRandomDog from '../services/getRandomDog.js';

export const start = async (ctx) => {
  const user = await addUser(ctx.message.from.id, ctx.from.first_name);
  ctx.reply(
    user ? `Рад видеть вас снова, ${user.nickname}` : `Рад знакомству, ${ctx.from.first_name}!`,
  );
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

export const task = async (ctx) => {
  return ctx.scene.enter('CREATE_TASK');
}