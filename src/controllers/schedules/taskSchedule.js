import schedule from 'node-schedule';

import { errorMessages } from '@constants/text.js';
import { MAX_MINUTE, MIN_MINUTE } from '@constants/time.js';
import Task from '@models/taskModel.js';

const taskSchedule = (bot) => {
  const rule = new schedule.RecurrenceRule();
  rule.tz = 'Europe/Moscow';
  rule.minute = new schedule.Range(MIN_MINUTE, MAX_MINUTE);

  schedule.scheduleJob(rule, async () => {
    const currentDate = new Date();
    try {
      const reminderTasks = await Task.find({
        callDate: { $lte: currentDate },
      });
      if (reminderTasks) {
        for (const reminderTask of reminderTasks) {
          await bot.telegram.sendMessage(
            reminderTask.chatID,
            `Напоминание! ⏰\n${reminderTask.text}`,
          );
        }
        await Task.updateMany(
          { callDate: { $lte: currentDate } },
          { $unset: { callDate: '' } },
        );
      }

      await Task.deleteMany({ date: { $lte: currentDate } });
    } catch (err) {
      console.log(errorMessages.taskForecast, err);
    }
  });
};

export default taskSchedule;
