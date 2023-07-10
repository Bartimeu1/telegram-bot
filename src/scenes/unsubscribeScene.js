import { Scenes } from 'telegraf';

import isSubscribed from '@services/subscriber/isSubscribed.js';
import deleteSubscriber from '@services/subscriber/deleteSubscriber.js';

const unsubscribeScene = new Scenes.BaseScene('UNSUBSCRIBE_USER');

unsubscribeScene.enter(async (ctx) => {
  // Check if user is not subscribed
  if (!(await isSubscribed(ctx.message.chat.id))) {
    ctx.reply(
      'Вы ещё не подписаны на ежедневные уведомления о погоде\nЧтобы это сделать, введите команду /subscribe',
    );
    ctx.scene.leave();
  } else {
    ctx.reply(`Вы уверены, что хотите отписаться?`, {
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
  ctx.editMessageReplyMarkup();

  const deletedObj = await deleteSubscriber(ctx.update.callback_query.from.id);
  ctx.reply(`🌑 Ваша подписка по городу ${deletedObj.city} отменена 🌑`);
  ctx.scene.leave();
});

unsubscribeScene.action('cancel', (ctx) => {
  ctx.editMessageReplyMarkup();
  
  ctx.reply('Вы отменили действие\nУведомления продолжат поступать');
  ctx.scene.leave();
});

export default unsubscribeScene;
