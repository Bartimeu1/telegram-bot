import Task from '@models/taskModel.js';

const addTask = async (chatID, text, date, callDate) => {
  const task = new Task({
    chatID,
    text,
    date,
    callDate,
  });
  task.save();
};

export default addTask;
