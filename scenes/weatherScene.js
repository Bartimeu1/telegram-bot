import { Scenes } from 'telegraf';
import slug from 'slug';
import cancelButton from '../utils/cancelButton.js';
import getWeather from '../services/getWeather.js';

const weatherScene = new Scenes.BaseScene('GET_WEATHER_BY_CITY');

weatherScene.enter((ctx) =>
  ctx.reply('Введите город, в котором вы хотите посмотреть погоду', {
    ...cancelButton,
  }),
);

weatherScene.hears('Отменить задачу', ctx => {
  ctx.reply('Задача отменена');
  ctx.scene.leave();
})

weatherScene.on('message', async (ctx) => {
  try {
    const city = slug(ctx.update.message.text);
    ctx.reply('Сверяюсь с метеорологами...');

    const data = await getWeather(city);

    ctx.reply(
      data
        ? `В ${data.location.name} сейчас ${data.current.temp_c} градусов! 🌤 `
        : 'Не могу найти информацию о таком городе 😔',
    );
    ctx.scene.leave();
  } catch (error) {
    console.log('Ошибка при отправке запроса', error);
  }
});

export default weatherScene;
