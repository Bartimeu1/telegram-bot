import axios from 'axios';
import { Scenes } from 'telegraf';

const recommendScene = new Scenes.BaseScene('RECOMMEND');

recommendScene.enter((ctx) => {
  ctx.reply(
    'Я могу предложить тебе список достопримечательностей, событий или же ресторанов в городе.\nВыбери свои путь, воин 🥷',
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Достопримечательности 🏰', callback_data: 'landmarks' }],
          [
            { text: 'События 👔', callback_data: 'events' },
            { text: 'Еда 🥩', callback_data: 'places' },
          ],
        ],
        resize_keyboard: true,
      },
    },
  );
});

recommendScene.action('landmarks', (ctx) => {
  ctx.scene.enter('GET_LANDMARKS');
  ctx.scene.leave();
});

recommendScene.action('places', (ctx) => {
  ctx.scene.enter('GET_PLACE');
  ctx.scene.leave();
});

recommendScene.action('events', (ctx) => {
  ctx.scene.enter('GET_EVENTS');
  ctx.scene.leave();
});

export default recommendScene;
