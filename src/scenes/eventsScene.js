import { Scenes } from 'telegraf';

import { countryRegex } from '@constants/regex.js';
import getEvents from '@services/api/getEvents.js';

const eventsScene = new Scenes.WizardScene(
  'GET_EVENTS',
  (ctx) => {
    ctx.reply('Введите страну на латинском. Пример: Belarus/USA');

    return ctx.wizard.next();
  },
  async (ctx) => {
    try {
      const country = ctx.update.message.text;
      // Checking if date is in the correct format
      if (!countryRegex.test(country)) {
        return ctx.reply(
          '⛔️ Страна введена в неправильном формате! ⛔️\nОбратите внимание, принимаются только латинские символы',
        );
      }

      const data = await getEvents(country);

      // Checking if data is not defined
      if (!data || data.length === 0) {
        ctx.reply('Не могу найти данных по введённой стране 😔\n');
        return ctx.scene.leave();
      }

      // Filtering past holidays
      const currentDate = new Date();
      const filteredData = data.filter((holiday) => {
        const targetDate = new Date(holiday.date);
        return currentDate <= targetDate;
      });

      // Checking if holidays are found
      if (filteredData.length === 0) {
        ctx.reply('По моим данным, в этой стране ничего не ожидается 🧐\n');
        return ctx.scene.leave();
      }

      // Formatting data for telegram message
      const formattedData = filteredData.reduce((acc, holiday) => {
        acc += `🚗 Название: ${holiday.name}\n📅 Дата: ${holiday.date}\n\n`;
        return acc;
      }, '');

      ctx.reply(formattedData);
      ctx.scene.leave();
    } catch (error) {
      console.log('Ошибка при получении событий', error);
      ctx.reply(
        'Что-то пошло не так 😔\nПопробуйте ввести другой город или повторите попытку позже',
      );
      ctx.scene.leave();
    }
  },
);

export default eventsScene;
