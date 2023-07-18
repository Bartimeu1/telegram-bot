import { Scenes } from 'telegraf';

import { errorMessages } from '@constants/text';
import invalidCommandMiddleware from '@middlewares/invalidCommandMiddleware.js';
import getPlaces from '@root/api/getPlaces.js';

const placesScene = new Scenes.WizardScene(
  'GET_PLACE',
  (ctx) => {
    ctx.reply('Введите название города');

    return ctx.wizard.next();
  },
  async (ctx) => {
    try {
      const city = ctx.update.message.text;
      const data = await getPlaces(city);

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

placesScene.use(invalidCommandMiddleware);

export default placesScene;
