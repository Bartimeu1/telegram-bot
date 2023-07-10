import { Scenes } from 'telegraf';
import getWeather from '@services/api/getWeather.js';

const weatherScene = new Scenes.BaseScene('GET_WEATHER_BY_CITY');

weatherScene.enter((ctx) =>
  ctx.reply('🌇 Введите город, в котором вы хотите посмотреть погоду 🌇', {
    reply_markup: {
      inline_keyboard: [[{ text: '❌ Отменить задачу ❌', callback_data: 'cancel' }]],
    },
  }),
);

weatherScene.on('message', async (ctx) => {
  try {
    const city = ctx.update.message.text;
    ctx.reply('Сверяюсь с метеорологами...');

    const data = await getWeather(city);

    ctx.reply(
      data
        ? `${data.name}: ${data.weather[0].description} 🌤\nТемпература на данный момент: ${(
            data.main.temp / 10
          ).toFixed(2)} °C\n\nОщущается как ${(data.main.feels_like / 10).toFixed(
            2,
          )} °C\nМинимальная температура: ${(data.main.temp_min / 10).toFixed(
            2,
          )} °C\nМаксимальная температура: ${(data.main.temp_max / 10).toFixed(
            2,
          )} °C\nСкорость ветра: ${data.wind.speed} м/c\nВидимость: ${data.visibility} метров`
        : 'Не могу найти информацию о таком городе 😔',
    );
    ctx.scene.leave();
  } catch (error) {
    console.log('Ошибка при отправке запроса', error);
  }
});

weatherScene.action('cancel', (ctx) => {
  ctx.editMessageReplyMarkup();

  ctx.reply('Вы отменили действие');
  ctx.scene.leave();
});

export default weatherScene;
