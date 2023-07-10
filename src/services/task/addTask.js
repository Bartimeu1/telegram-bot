import Task from '../../models/taskModel.js';

const addTask = async (chatID, text, date, callDate) => {
  try {
    const task = new Task({ chatID, text, date, callDate });
    task.save();
  } catch (error) {
    console.log('Ошибка при обращении к БД', error);
  }
};

export default addTask;
