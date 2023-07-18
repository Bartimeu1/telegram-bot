import { Scenes } from 'telegraf';

import { dateRegex } from '@constants/regex.js';
import {
  errorMessages,
  statusMessages,
  taskMessages,
} from '@constants/text.js';
import invalidCommandMiddleware from '@middlewares/invalidCommandMiddleware.js';
import addTask from '@services/task/addTask.js';

const addTaskScene = new Scenes.WizardScene(
  'ADD_TASK',
  enterTaskText,
  validateTaskText,
  enterTaskDate,
  validateTaskDate,
  setReminder,
);

addTaskScene.use(invalidCommandMiddleware);

function enterTaskText(ctx) {
  ctx.reply('📝 Введите текст задачи 📝', {
    reply_markup: {
      inline_keyboard: [
        [{ text: '❌ Отменить действие ❌', callback_data: 'cancel' }],
      ],
    },
  });
  ctx.scene.session.task = {};

  return ctx.wizard.next();
}

function validateTaskText(ctx) {
  const message = ctx.update.message.text;

  if (message.length < 2) {
    return ctx.reply(errorMessages.lengthError);
  }

  ctx.scene.session.task.text = message;
  ctx.reply(taskMessages.dateFormat);
  return ctx.wizard.next();
}

function enterTaskDate(ctx) {
  const inputDate = ctx.update.message.text;

  if (!dateRegex.test(inputDate)) {
    return ctx.reply(errorMessages.validation);
  }
  // Check if date is not from the past
  const [day, month, year, hours, minutes] = inputDate.match(/\d+/g);
  const inputDateObject = new Date(year, month - 1, day, hours, minutes);
  const currentDate = new Date();
  if (currentDate > inputDateObject) {
    return ctx.reply(errorMessages.pastDate);
  }

  // Adding tasks date
  ctx.scene.session.task.date = inputDateObject;

  ctx.reply('Хотите установить напоминание?', {
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
}

function validateTaskDate(ctx) {
  try {
    const agreement = ctx.callbackQuery.data;

    if (agreement === 'no') {
      addTask(
        ctx.update.callback_query.from.id,
        ctx.scene.session.task.text,
        ctx.scene.session.task.date,
      );
      ctx.reply(taskMessages.taskSuccess);
      return ctx.scene.leave();
    }

    ctx.reply(taskMessages.dateFormat);
    return ctx.wizard.next();
  } catch (err) {
    ctx.reply(errorMessages.error);
    return ctx.scene.leave();
  }
}

function setReminder(ctx) {
  try {
    const inputDate = ctx.update.message.text;

    if (!dateRegex.test(inputDate)) {
      return ctx.reply(errorMessages.validation);
    }

    const [day, month, year, hours, minutes] = inputDate.match(/\d+/g);
    const inputDateObject = new Date(year, month - 1, day, hours, minutes);
    const currentDate = new Date();

    if (currentDate > inputDateObject) {
      return ctx.reply(errorMessages.pastDate);
    }

    addTask(
      ctx.update.message.from.id,
      ctx.scene.session.task.text,
      ctx.scene.session.task.date,
      inputDateObject,
    );
    ctx.reply(taskMessages.taskSuccess);
  } catch (err) {
    ctx.reply(errorMessages.error);
  }
  return ctx.scene.leave();
}

addTaskScene.action('cancel', (ctx) => {
  ctx.editMessageReplyMarkup();

  ctx.reply(statusMessages.cancel);
  ctx.scene.leave();
});

export default addTaskScene;
