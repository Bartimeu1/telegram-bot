import User from '../models/userModel.js';

const addUser = async (chatID, nickname) => {
  try {
    const isRegistered = await User.findOne({ chatID });
    if (!isRegistered) {
      const user = new User({ chatID, nickname });
      user.save();
    }
    return isRegistered;
  } catch (error) {
    console.log('Ошибка при обращении к БД', error);
  }
};

export default addUser;
