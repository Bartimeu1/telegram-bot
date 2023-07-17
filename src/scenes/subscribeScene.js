import { Scenes } from 'telegraf';

import addSubscriber from '@services/subscriber/addSubscriber.js';
import checkIfSubscribed from '@services/subscriber/checkIfSubscribed.js';
import getWeather from '@root/api/getWeather.js';
import { timeRegex } from '@constants/regex.js';
import { errorMessages, subscribeMessages, statusMessages } from '@constants/text';

const subscribeScene = new Scenes.WizardScene(
  'SUBSCRIBE_USER',
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
        inline_keyboard: [[{ text: '❌ Отменить задачу ❌', callback_data: 'cancel' }]],
      },
    });
  }
  ctx.scene.session.subscriber = {};

  return ctx.wizard.next();
}

async function enterCity(ctx) {
  const city = ctx.update.message.text;

  // Check if city existing
  const data = await getWeather(city);
  if (!data) {
    return ctx.reply(errorMessages.noData, {
      reply_markup: {
        inline_keyboard: [[{ text: '❌ Отменить задачу ❌', callback_data: 'cancel' }]],
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
      return ctx.reply(errorMessages.validation);
    }

    // Calculating time in minutes
    const [hours, minutes] = inputTime.split(':');
    const timeInMinutes = parseInt(hours) * 60 + parseInt(minutes);

    addSubscriber(ctx.message.from.id, ctx.scene.session.subscriber.city, timeInMinutes);
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
