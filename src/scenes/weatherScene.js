import { Scenes } from 'telegraf';

import getWeather from '@root/api/getWeather.js';
import { errorMessages, weatherMessages } from '@constants/text.js';

const weatherScene = new Scenes.BaseScene('GET_WEATHER_BY_CITY');

weatherScene.enter((ctx) => ctx.reply(weatherMessages.enter));

weatherScene.on('message', async (ctx) => {
  const city = ctx.update.message.text;
  ctx.reply('Сверяюсь с метеорологами...');
  try {
    const data = await getWeather(city);
    if (!data) {
      return ctx.reply(errorMessages.noData, {
        reply_markup: {
          inline_keyboard: [[{ text: '❌ Отменить задачу ❌', callback_data: 'cancel' }]],
        },
      });
    }

    ctx.reply(
      `${data.name}: ${data.weather[0].description} 🌤\nТемпература на данный момент: ${(
        data.main.temp / 10
      ).toFixed(2)} °C\n\nОщущается как ${(data.main.feels_like / 10).toFixed(
        2,
      )} °C\nМинимальная температура: ${(data.main.temp_min / 10).toFixed(
        2,
      )} °C\nМаксимальная температура: ${(data.main.temp_max / 10).toFixed(
        2,
      )} °C\nСкорость ветра: ${data.wind.speed} м/c\nВидимость: ${data.visibility} метров`,
    );
  } catch (err) {
    ctx.reply(errorMessages.error);
  }

  ctx.scene.leave();
});

weatherScene.action('cancel', (ctx) => {
  ctx.editMessageReplyMarkup();

  ctx.reply('Вы отменили действие');
  ctx.scene.leave();
});

export default weatherScene;
