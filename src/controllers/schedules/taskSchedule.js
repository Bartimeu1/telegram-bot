import schedule from 'node-schedule';
import Task from '@models/taskModel.js';

// Rules for a schedule
const rule = new schedule.RecurrenceRule();
rule.tz = 'Europe/Moscow';
rule.minute = new schedule.Range(0, 59);

const taskSchedule = (bot) => {
  // Callback tasks schedule
  schedule.scheduleJob(rule, async () => {
    const currentDate = new Date();
    try {
      const reminderTasks = await Task.find({ callDate: { $lte: currentDate } });
      if (reminderTasks) {
        for (const reminderTask of reminderTasks) {
          await bot.telegram.sendMessage(
            reminderTask.chatID,
            `Напоминание! ⏰\n${reminderTask.text}`,
          );
        }
        await Task.updateMany({ callDate: { $lte: currentDate } }, { $unset: { callDate: '' } });
      }

      await Task.deleteMany({ date: { $lte: currentDate } });
    } catch (err) {
      console.log('Ошибка при рассылке уведомлений', err);
    }
  });
};

export default taskSchedule;
