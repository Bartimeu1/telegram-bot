import { Scenes } from 'telegraf';

import sceneIds from '@constants/sceneIds';
import { errorMessages, statusMessages } from '@constants/text';
import invalidCommandMiddleware from '@middlewares/invalidCommandMiddleware.js';
import getPlaces from '@root/api/getPlaces.js';

const placesScene = new Scenes.WizardScene(
  sceneIds.places,
  (ctx) => {
    ctx.reply('Введите название города');

    return ctx.wizard.next();
  },
  async (ctx) => {
    try {
      const city = ctx.update.message.text;
      ctx.reply(statusMessages.wait);

      const data = await getPlaces(city);

      if (!data.length) {
        return ctx.reply(errorMessages.noData);
      }

      const formattedData = await data.reduce((acc, place) => {
        acc += `🍙 Название: ${place.name}\n🚗 Адрес: ${place.location.address}\n\n`;
        return acc;
      }, '');

      ctx.reply(formattedData);
    } catch (err) {
      return ctx.reply(errorMessages.noData);
    }
    ctx.scene.leave();
  },
);

placesScene.use(invalidCommandMiddleware);

export default placesScene;
