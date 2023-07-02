import { Scenes } from 'telegraf';
import slug from 'slug';
import addSubscribe from '../services/addSubscriber.js';
import getWeather from '../services/getWeather.js';

const subscribeScene = new Scenes.BaseScene('SUBSCRIBE_USER');

subscribeScene.enter((ctx) =>
  ctx.reply(`Введите город`),
);

subscribeScene.on('message', async (ctx) => {
  const message = slug(ctx.update.message.text);

  const data = await getWeather(message);
  if (!data) {
    ctx.reply('Не могу найти такой город 😔');
  } else {
    const candidate = await addSubscribe(ctx.message.from.id, ctx.update.message.text);

    ctx.reply(
      candidate ? 'Вы уже зарегистрированы' : `Вы подписались по городу: ${data.location.name} 🌤`,
    );
    ctx.scene.leave();
  }
});

export default subscribeScene;
