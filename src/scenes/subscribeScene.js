import { Scenes } from 'telegraf';

import { timeRegex } from '@constants/regex.js';
import sceneIds from '@constants/sceneIds';
import {
  errorMessages,
  statusMessages,
  subscribeMessages,
} from '@constants/text';
import { MINUTES_IN_HOUR } from '@constants/time.js';
import getWeather from '@root/api/getWeather.js';
import addSubscriber from '@services/subscriber/addSubscriber.js';
import checkIfSubscribed from '@services/subscriber/checkIfSubscribed.js';

const subscribeScene = new Scenes.WizardScene(
  sceneIds.subscribe,
  checkSubscription,
  enterCity,
  saveSubscriber,
);

async function checkSubscription(ctx) {
  if (await checkIfSubscribed(ctx.message.chat.id)) {
    ctx.reply(subscribeMessages.alreadySubscribed);
    ctx.scene.leave();
  } else {
    ctx.reply(subscribeMessages.subscribe, {
      reply_markup: {
        inline_keyboard: [
          [{ text: statusMessages.stop, callback_data: 'cancel' }],
        ],
      },
    });
  }
  ctx.scene.session.subscriber = {};

  return ctx.wizard.next();
}

async function enterCity(ctx) {
  const city = ctx.update.message.text;

  const data = await getWeather(city);
  if (data instanceof Error) {
    return ctx.reply(errorMessages.noData, {
      reply_markup: {
        inline_keyboard: [
          [{ text: statusMessages.stop, callback_data: 'cancel' }],
        ],
      },
    });
  }

  ctx.scene.session.subscriber.city = city;
  ctx.reply(subscribeMessages.subscribeDate);
  return ctx.wizard.next();
}

async function saveSubscriber(ctx) {
  try {
    const inputTime = ctx.update.message.text;

    if (!timeRegex.test(inputTime)) {
      return ctx.reply(errorMessages.validation, {
        reply_markup: {
          inline_keyboard: [
            [{ text: statusMessages.stop, callback_data: 'cancel' }],
          ],
        },
      });
    }

    const [hours, minutes] = inputTime.split(':');
    const timeInMinutes = parseInt(hours) * MINUTES_IN_HOUR + parseInt(minutes);

    addSubscriber(
      ctx.message.from.id,
      ctx.scene.session.subscriber.city,
      timeInMinutes,
    );
    ctx.reply(subscribeMessages.subscribeSuccess);
  } catch (err) {
    ctx.reply(errorMessages.error);
  }

  return ctx.scene.leave();
}

subscribeScene.action('cancel', (ctx) => {
  ctx.editMessageReplyMarkup();

  ctx.reply(statusMessages.cancel);
  ctx.scene.leave();
});

export default subscribeScene;
