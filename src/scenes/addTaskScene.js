import { Scenes } from 'telegraf';

import addTask from '../services/task/addTask.js';
import { dateRegex } from '../constants/regex.js';

const addTaskScene = new Scenes.WizardScene(
  'ADD_TASK',
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
      // '📅 Введите дату напоминания 📅\n(Укажите время в формате дд.мм.гг чч:мм)\n\nБот живёт по времени (GMT-3) Москва, Россия',
      '📅 Введите дату задачи 📅\n(Укажите время в формате дд.мм.гг чч:мм)\n\nБот живёт по времени (GMT-3) Москва, Россия',
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
        'Моих функций пока недостаточно, чтобы вернуться в прошлое\n\nВведите новую дату⏳',
      );
    }

    // Adding tasks date
    ctx.scene.session.task.date = inputDateObject;

    ctx.reply(`Хотите установить напоминание?`, {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'Да', callback_data: 'yes' },
            { text: 'Нет', callback_data: 'no' },
          ],
        ],
        resize_keyboard: true,
      },
    });
    return ctx.wizard.next();
  },
  (ctx) => {
    const agreement = ctx.callbackQuery.data;

    // If user don't need a reminder
    if (agreement === 'no') {
      // Adding task to the DB
      addTask(
        ctx.update.callback_query.from.id,
        ctx.scene.session.task.text,
        ctx.scene.session.task.date,
      );
      ctx.reply(`👌🏻 Отлично, задача успешно добавлена! 👌🏻\n`);
      return ctx.scene.leave();
    }

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
        'Моих функций пока недостаточно, чтобы вернуться в прошлое\n\nВведите новую дату⏳',
      );
    }

    // Adding task to the DB
    addTask(
      ctx.update.message.from.id,
      ctx.scene.session.task.text,
      ctx.scene.session.task.date,
      inputDateObject,
    );
    ctx.reply(`👌🏻 Отлично, задача и напоминание успешно добавлены! 👌🏻\n`);
    return ctx.scene.leave();
  },
);

addTaskScene.action('cancel', (ctx) => {
  ctx.editMessageReplyMarkup();

  ctx.reply('Вы отменили действие\n');
  ctx.scene.leave();
});

export default addTaskScene;
