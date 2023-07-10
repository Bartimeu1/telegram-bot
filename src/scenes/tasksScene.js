import { Scenes } from 'telegraf';

import getTodaysTasks from '../services/task/getTodaysTasks.js';
import getAllTasks from '../services/task/getAllTasks.js';

import dateFormatting from '../utils/dateFormatting.js';

const tasksScene = new Scenes.BaseScene('TASKS_SERVICE');

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

    // Check if there are no tasks
    if (data.length === 0) {
      ctx.reply('Ваш список задач 🚨');
      return ctx.scene.leave();
    }

    const formattedData = data.reduce(
      (acc, task) => (acc += `📝 ${task.text}\n🕐 ${dateFormatting(task.date)}\n\n`),
      'Ваши задачи:\n',
    );

    ctx.reply(formattedData);
    ctx.scene.leave();
  } catch (error) {
    console.log('Ошибка при выводе всех задач', error);
    ctx.reply('Что-то пошло не так 😔\nПовторите попытку позже');
    ctx.scene.leave();
  }
  ctx.scene.leave();
});

tasksScene.action('showTodays', async (ctx) => {
  try {
    const data = await getTodaysTasks();

    // Check if there are no tasks
    if (data.length === 0) {
      ctx.reply('Ваш список задач на сегодня пуст 🚨');
      return ctx.scene.leave();
    }

    const formattedData = data.reduce(
      (acc, task) => (acc += `📝 ${task.text}\n🕐 ${dateFormatting(task.date)}\n\n`),
      'Ваши задачи на сегодня:\n',
    );

    ctx.reply(formattedData);
    ctx.scene.leave();
  } catch (error) {
    console.log('Ошибка при выводе задач на сегодня', error);
    ctx.reply('Что-то пошло не так 😔\nПовторите попытку позже');
    ctx.scene.leave();
  }
});

export default tasksScene;
