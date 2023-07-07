import schedule from 'node-schedule';
import Task from '../../models/taskModel.js';

// Rules for a schedule
const rule = new schedule.RecurrenceRule();
rule.tz = 'Europe/Moscow';
rule.minute = new schedule.Range(0, 59);

const taskSchedule = (bot) => {
  // Callback tasks schedule
  schedule.scheduleJob(rule, async () => {
    const currentDate = new Date();
    try {
      Task.find({ callDate: { $lte: currentDate } }).then((tasks) => {
        tasks.forEach((task) => {
          bot.telegram.sendMessage(task.chatID, `Напоминание! ⏰\n${task.text}`);
        });
      });
      await Task.deleteMany({ callDate: { $lte: currentDate } });
    } catch (err) {
      console.log('Ошибка при рассылке уведомлений', err);
    }
  });
};

export default taskSchedule;
