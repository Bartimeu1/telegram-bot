import { Scenes } from 'telegraf';

import {
  errorMessages,
  statusMessages,
  subscribeMessages,
} from '@constants/text.js';
import invalidCommandMiddleware from '@middlewares/invalidCommandMiddleware.js';
import checkIfSubscribed from '@services/subscriber/checkIfSubscribed.js';
import deleteSubscriber from '@services/subscriber/deleteSubscriber.js';

const unsubscribeScene = new Scenes.BaseScene('UNSUBSCRIBE_USER');

unsubscribeScene.enter(async (ctx) => {
  // Check if user is not subscribed
  if (!(await checkIfSubscribed(ctx.message.chat.id))) {
    ctx.reply(subscribeMessages.notSubscribed);
    ctx.scene.leave();
  } else {
    ctx.reply('Вы уверены, что хотите отписаться?', {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'Отписаться', callback_data: 'unsubscribe' },
            { text: 'Вернуться', callback_data: 'cancel' },
          ],
        ],
      },
    });
  }
});

unsubscribeScene.action('unsubscribe', async (ctx) => {
  try {
    ctx.editMessageReplyMarkup();

    const deletedObj = await deleteSubscriber(
      ctx.update.callback_query.from.id,
    );
    ctx.reply(`🌑 Ваша подписка по городу ${deletedObj.city} отменена 🌑`);
  } catch (err) {
    ctx.reply(errorMessages.error);
  }
  ctx.scene.leave();
});

unsubscribeScene.action('cancel', (ctx) => {
  ctx.editMessageReplyMarkup();

  ctx.reply(statusMessages.cancel);
  ctx.scene.leave();
});

unsubscribeScene.use(invalidCommandMiddleware);

export default unsubscribeScene;
