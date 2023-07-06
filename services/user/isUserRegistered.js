import User from '../../models/userModel.js';

const isUserRegistered = async (chatID) => {
  try {
    return await User.findOne({ chatID });
  } catch (error) {
    console.log('Ошибка при обращении к БД', error);
  }
};

export default isUserRegistered;
