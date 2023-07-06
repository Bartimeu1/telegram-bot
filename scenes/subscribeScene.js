import { Scenes } from 'telegraf';

import addSubscriber from '../services/subscriber/addSubscriber.js';
import isSubscribed from '../services/subscriber/isSubscribed.js';
import getWeather from '../services/api/getWeather.js';

const subscribeScene = new Scenes.BaseScene('SUBSCRIBE_USER');

subscribeScene.enter(async (ctx) => {
  if (await isSubscribed(ctx.message.chat.id)) {
    ctx.reply('Вы уже подписаны!\nЧтобы отменить подписку введите /unsubscribe');
    ctx.scene.leave();
  } else {
    ctx.reply(`Укажите город, по которому вам будут приходить ежедневные уведомления о погоде 🌆`, {
      reply_markup: {
        inline_keyboard: [[{ text: '❌ Отменить задачу ❌', callback_data: 'cancel' }]],
      },
    });
  }
});

subscribeScene.on('message', async (ctx) => {
  const city = ctx.update.message.text;
  const data = await getWeather(city);

  if (!data) {
    ctx.reply('Не могу найти такой город 😔\nВведите другой');
  } else {
    addSubscriber(ctx.message.from.id, city);
    ctx.reply(`Вы подписались по городу: ${data.location.name}! 🌤`);

    ctx.scene.leave();
  }
});

subscribeScene.action('cancel', (ctx) => {
  ctx.editMessageReplyMarkup();

  ctx.reply('Вы отменили действие');
  ctx.scene.leave();
});

export default subscribeScene;
