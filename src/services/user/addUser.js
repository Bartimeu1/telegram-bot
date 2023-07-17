import User from '@models/userModel.js';

const addUser = async (chatID, nickname) => {
  const user = new User({ chatID, nickname });
  user.save();
};

export default addUser;
