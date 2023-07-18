import { Scenes } from 'telegraf';

import { countryRegex } from '@constants/regex.js';
import { errorMessages, eventMessages } from '@constants/text.js';
import invalidCommandMiddleware from '@middlewares/invalidCommandMiddleware.js';
import getEvents from '@root/api/getEvents.js';

const eventsScene = new Scenes.WizardScene(
  'GET_EVENTS',
  (ctx) => {
    ctx.reply(eventMessages.enter);

    return ctx.wizard.next();
  },
  async (ctx) => {
    try {
      const country = ctx.update.message.text;
      // Checking if date is in the correct format
      if (!countryRegex.test(country)) {
        return ctx.reply(errorMessages.validation);
      }

      const data = await getEvents(country);

      if (!data || data.length === 0) {
        ctx.reply(errorMessages.noDataMessage);
        return ctx.scene.leave();
      }

      // Filtering past holidays
      const currentDate = new Date();
      const filteredData = data.filter((holiday) => {
        const targetDate = new Date(holiday.date);
        return currentDate <= targetDate;
      });

      if (!filteredData) {
        ctx.reply(errorMessages.noDataMessage);
        return ctx.scene.leave();
      }

      // Formatting data for telegram message
      const formattedData = filteredData.reduce((acc, holiday) => {
        acc += `🚗 Название: ${holiday.name}\n📅 Дата: ${holiday.date}\n\n`;
        return acc;
      }, '');

      ctx.reply(formattedData);
    } catch (err) {
      ctx.reply(errorMessages.errorMessage);
    }
    ctx.scene.leave();
  },
);

eventsScene.use(invalidCommandMiddleware);

export default eventsScene;
