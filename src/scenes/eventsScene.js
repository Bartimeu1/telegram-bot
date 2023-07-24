import { Scenes } from 'telegraf';

import { countryRegex } from '@constants/regex.js';
import sceneIds from '@constants/sceneIds';
import {
  errorMessages,
  eventMessages,
  statusMessages,
} from '@constants/text.js';
import invalidCommandMiddleware from '@middlewares/invalidCommandMiddleware.js';
import getEvents from '@root/api/getEvents.js';

const eventsScene = new Scenes.WizardScene(
  sceneIds.events,
  (ctx) => {
    ctx.reply(eventMessages.enter);

    return ctx.wizard.next();
  },
  async (ctx) => {
    try {
      const country = ctx.update.message.text;
      if (!countryRegex.test(country)) {
        return ctx.reply(errorMessages.validation);
      }
      ctx.reply(statusMessages.wait);

      const data = await getEvents(country);

      if (!data || !data.length) {
        ctx.reply(errorMessages.noDataMessage);
        return ctx.scene.leave();
      }

      const currentDate = new Date();
      const filteredData = data.filter((holiday) => {
        const targetDate = new Date(holiday.date);
        return currentDate <= targetDate;
      });

      if (!filteredData) {
        ctx.reply(errorMessages.noDataMessage);
        return ctx.scene.leave();
      }

      const formattedData = filteredData.reduce((acc, holiday) => {
        acc += `🚗 Название: ${holiday.name}\n📅 Дата: ${holiday.date}\n\n`;
        return acc;
      }, '');

      ctx.reply(formattedData);
    } catch (err) {
      return ctx.reply(errorMessages.noData);
    }
    ctx.scene.leave();
  },
);

eventsScene.use(invalidCommandMiddleware);

export default eventsScene;
