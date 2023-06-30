import { Scenes } from 'telegraf';
import subscribeUser from '../../services/subscribeUser.js';
import getWeather from '../../services/getWeather.js';

const subscribeScene = new Scenes.BaseScene('SUBSCRIBE_USER');

subscribeScene.enter((ctx) => ctx.reply('Введите город'));

subscribeScene.on('message', async (ctx) => {
  try {
    const city = ctx.update.message.text;
    ctx.reply('Сверяюсь с метеорологами...');

    const data = await getWeather(city);
    if (data) {
      subscribeUser({ chatID: ctx.message.from.id, city: ctx.update.message.text });
    }

    ctx.reply(`Вы подписались по городу: ${data.location.name}`);
  } catch (error) {
    console.log('Ошибка при отправке запроса', error);
    ctx.reply('Введите валидное название города');
  }
});

subscribeScene.hears('message', (ctx) => {
  ctx.scene.leave();
});

export default subscribeScene;