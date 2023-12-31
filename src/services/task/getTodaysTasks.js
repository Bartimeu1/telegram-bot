import Task from '@models/taskModel.js';

const getTodaysTasks = async () => {
  const todayEnd = new Date(new Date().setHours(23, 59, 59, 999));

  return await Task.find({ date: { $lte: todayEnd } });
};

export default getTodaysTasks;
