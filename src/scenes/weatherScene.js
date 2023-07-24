import { Scenes } from 'telegraf';

import sceneIds from '@constants/sceneIds';
import {
  errorMessages,
  statusMessages,
  weatherMessages,
} from '@constants/text.js';
import invalidCommandMiddleware from '@middlewares/invalidCommandMiddleware.js';
import getWeather from '@root/api/getWeather.js';

const weatherScene = new Scenes.BaseScene(sceneIds.weather);

weatherScene.enter((ctx) => ctx.reply(weatherMessages.enter));

weatherScene.use(invalidCommandMiddleware);

weatherScene.on('message', async (ctx) => {
  const city = ctx.update.message.text;
  ctx.reply('Сверяюсь с метеорологами...');

  const data = await getWeather(city);
  if (data instanceof Error) {
    return ctx.reply(errorMessages.noData);
  }

  ctx.reply(
    `${data.name}: ${
      data.weather[0].description
    } 🌤\nТемпература на данный момент: ${(data.main.temp / 10).toFixed(
      2,
    )} °C\n\nОщущается как ${(data.main.feels_like / 10).toFixed(
      2,
    )} °C\nМинимальная температура: ${(data.main.temp_min / 10).toFixed(
      2,
    )} °C\nМаксимальная температура: ${(data.main.temp_max / 10).toFixed(
      2,
    )} °C\nСкорость ветра: ${data.wind.speed} м/c\nВидимость: ${
      data.visibility
    } метров`,
  );

  ctx.scene.leave();
});

weatherScene.action('cancel', (ctx) => {
  ctx.editMessageReplyMarkup();

  ctx.reply('Вы отменили действие');
  ctx.scene.leave();
});

export default weatherScene;
