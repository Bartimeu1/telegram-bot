import Task from '@models/taskModel.js';

const getAllTasks = async (chatID) => await Task.find(chatID);

export default getAllTasks;
