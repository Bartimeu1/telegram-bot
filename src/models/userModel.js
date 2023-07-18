import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  chatID: { type: Number },
  nickname: { type: String },
});

const User = mongoose.model('User', userSchema);
export default User;
