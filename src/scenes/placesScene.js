import { Scenes } from 'telegraf';

import getPlaces from '@services/api/getPlaces.js';

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

      // Checking if data is not defined
      if (data.length === 0) {
        return ctx.reply('Не могу найти данных по введённому городу 😔\nПопробуйте ввести другой');
      }

      // Formatting data for telegram message
      const formattedData = await data.reduce((acc, place) => {
        acc += `🍙 Название: ${place.name}\n🚗 Адрес: ${place.location.address}\n\n`;
        return acc;
      }, '');

      ctx.reply(formattedData);
      ctx.scene.leave();
    } catch (error) {
      console.log('Ошибка при получении заведений', error);
      ctx.reply(
        'Что-то пошло не так 😔\nПопробуйте ввести другой город или повторите попытку позже',
      );
      ctx.scene.leave();
    }
  },
);

export default placesScene;
