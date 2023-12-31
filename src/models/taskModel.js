import mongoose from 'mongoose';

const taskModel = new mongoose.Schema({
  chatID: { type: Number },
  text: { type: String, maxLength: 100 },
  date: { type: Date },
  callDate: { type: Date },
});

const Task = mongoose.model('Task', taskModel);
export default Task;
