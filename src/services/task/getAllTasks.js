import Task from '../../models/taskModel.js';

const getAllTasks = async (chatID) => {
  return await Task.find(chatID);
};

export default getAllTasks;
