import { Scenes } from 'telegraf';

import addTask from '../services/task/addTask.js';
import { dateRegex } from '../config/consts.js';

const taskScene = new Scenes.WizardScene(
  'CREATE_TASK',
  (ctx) => {
    ctx.reply('📝 Введите текст задачи 📝', {
      reply_markup: {
        inline_keyboard: [[{ text: '❌ Отменить действие ❌', callback_data: 'cancel' }]],
      },
    });
    ctx.scene.session.task = {};

    return ctx.wizard.next();
  },
  (ctx) => {
    const message = ctx.update.message.text;
    // Check if message is more than 2 symbols long
    if (message.length < 2) {
      return ctx.reply('⛔️ Текст должен быть длиннее одного символа! ⛔️');
    }

    ctx.scene.session.task.text = message;
    ctx.reply(
      '📅 Введите дату напоминания 📅\n(Укажите время в формате дд.мм.гг чч:мм)\n\nБот живёт по времени (GMT-3) Москва, Россия',
    );
    return ctx.wizard.next();
  },
  (ctx) => {
    const inputDate = ctx.update.message.text;

    // Check if date is in the correct form
    if (!dateRegex.test(inputDate)) {
      return ctx.reply('⛔️ Введена некорректная дата, попробуйте ещё раз ⛔️');
    }
    // Check if date is not from the past
    const [day, month, year, hours, minutes] = inputDate.match(/\d+/g);
    const inputDateObject = new Date(year, month - 1, day, hours, minutes);
    const currentDate = new Date();
    if (currentDate > inputDateObject) {
      return ctx.reply(
        'Моих функций пока недостаточно, чтобы вернуться в прошлое 🦍🦍🦍\n\nВведите новую дату⏳',
      );
    }
    // Adding task to the DB
    addTask(ctx.message.from.id, ctx.scene.session.task.text, inputDateObject);
    ctx.reply(`👌🏻 Отлично, задача успешно добавлена! 👌🏻\n`);
    return ctx.scene.leave();
  },
);

taskScene.action('cancel', (ctx) => {
  ctx.editMessageReplyMarkup();

  ctx.reply('Вы отменили действие\n');
  ctx.scene.leave();
});

export default taskScene;
