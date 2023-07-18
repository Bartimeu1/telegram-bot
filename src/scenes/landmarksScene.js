import { Scenes } from 'telegraf';

import { errorMessages } from '@constants/text';
import invalidCommandMiddleware from '@middlewares/invalidCommandMiddleware.js';
import getLandmarks from '@root/api/getLandmarks.js';

const landmarksScene = new Scenes.WizardScene(
  'GET_LANDMARKS',
  (ctx) => {
    ctx.reply('Введите название города');

    return ctx.wizard.next();
  },
  async (ctx) => {
    try {
      const city = ctx.update.message.text;
      const data = await getLandmarks(city);

      if (data.length === 0) {
        return ctx.reply(errorMessages.noData);
      }

      const formattedData = await data.reduce((acc, place) => {
        acc += `🍙 Название: ${place.name}\n🚗 Адрес: ${place.location.address}\n\n`;
        return acc;
      }, '');

      ctx.reply(formattedData);
    } catch (err) {
      ctx.reply(errorMessages.error);
    }
    ctx.scene.leave();
  },
);

landmarksScene.use(invalidCommandMiddleware);

export default landmarksScene;
