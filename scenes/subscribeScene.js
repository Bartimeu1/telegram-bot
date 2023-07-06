import { Scenes } from 'telegraf';

import { timeRegex } from '../config/consts.js';
import addSubscriber from '../services/subscriber/addSubscriber.js';
import isSubscribed from '../services/subscriber/isSubscribed.js';
import getWeather from '../services/api/getWeather.js';

const subscribeScene = new Scenes.WizardScene(
  'SUBSCRIBE_USER',
  async (ctx) => {
    // Check if user is already subscribed
    if (await isSubscribed(ctx.message.chat.id)) {
      ctx.reply('Вы уже подписаны!\nЧтобы отменить подписку, введите /unsubscribe');
      ctx.scene.leave();
    } else {
      ctx.reply(
        `Укажите город, по которому вам будут приходить ежедневные уведомления о погоде 🌆`,
        {
          reply_markup: {
            inline_keyboard: [[{ text: '❌ Отменить задачу ❌', callback_data: 'cancel' }]],
          },
        },
      );
    }
    ctx.scene.session.subscriber = {};

    return ctx.wizard.next();
  },
  async (ctx) => {
    const city = ctx.update.message.text;

    // Check if city existing
    const data = await getWeather(city);
    if (!data) {
      ctx.reply('Не могу найти такой город 😔\nВведите другой');
    }

    ctx.scene.session.subscriber.city = city;
    ctx.reply(
      '📅 Введите время ежедневных уведомлений 📅\n(Укажите время в формате чч:мм)\n\nБот живёт по времени (GMT-3) Москва, Россия',
    );
    return ctx.wizard.next();
  },
  (ctx) => {
    const inputTime = ctx.update.message.text;

    // Check if time is in the correct form
    if (!timeRegex.test(inputTime)) {
      return ctx.reply('⛔️ Введено некорректное время, попробуйте ещё раз ⛔️');
    }

    // Calculating time in minutes
    const [hours, minutes] = inputTime.split(':');
    const timeInMinutes = parseInt(hours) * 60 + parseInt(minutes);

    // Adding subscriber to the DB
    addSubscriber(ctx.message.from.id, ctx.scene.session.subscriber.city, timeInMinutes);
    ctx.reply(
      `Отлично, подписка успешно добавлена! 👌🏻\nЧтобы отменить подписку, введите /unsubscribe`,
    );
    return ctx.scene.leave();
  },
);

subscribeScene.action('cancel', (ctx) => {
  ctx.editMessageReplyMarkup();

  ctx.reply('Вы отменили действие\n');
  ctx.scene.leave();
});

export default subscribeScene;
