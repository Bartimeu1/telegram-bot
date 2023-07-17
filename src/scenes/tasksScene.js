import { Scenes } from 'telegraf';

import getTodaysTasks from '@services/task/getTodaysTasks.js';
import getAllTasks from '@services/task/getAllTasks.js';
import { errorMessages, taskMessages } from '@constants/text.js';

const tasksScene = new Scenes.BaseScene('TASKS_SERVICE');

const dateOptions = {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
};

tasksScene.enter((ctx) => {
  ctx.reply('Что нужно сделать? 🫡', {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Вывести все задачи 🛒', callback_data: 'showAll' }],
        [
          { text: 'Вывести задачи на сегодня 💻', callback_data: 'showTodays' },
          { text: 'Добавить задачу 📝', callback_data: 'addTask' },
        ],
      ],
      resize_keyboard: true,
    },
  });
});

tasksScene.action('addTask', (ctx) => {
  ctx.scene.enter('ADD_TASK');
  ctx.scene.leave();
});

tasksScene.action('showAll', async (ctx) => {
  try {
    const data = await getAllTasks();

    if (data.length === 0) {
      ctx.reply(taskMessages.emptyTasks);
      return ctx.scene.leave();
    }

    const formattedData = data.reduce(
      (acc, task) =>
        (acc += `📝 ${task.text}\n🕐 ${task.date.toLocaleString('ru-RU', dateOptions)}\n\n`),
      'Ваши задачи:\n',
    );

    ctx.reply(formattedData);
  } catch (error) {
    ctx.reply(errorMessages.error);
  }
  ctx.scene.leave();
});

tasksScene.action('showTodays', async (ctx) => {
  try {
    const data = await getTodaysTasks();

    // Check if there are no tasks
    if (data.length === 0) {
      ctx.reply(taskMessages.emptyTasks);
      return ctx.scene.leave();
    }

    const formattedData = data.reduce(
      (acc, task) =>
        (acc += `📝 ${task.text}\n🕐 ${task.date.toLocaleString('ru-RU', dateOptions)}\n\n`),
      'Ваши задачи на сегодня:\n',
    );

    ctx.reply(formattedData);
  } catch (err) {
    ctx.reply(errorMessages.error);
  }
  ctx.scene.leave();
});

export default tasksScene;
