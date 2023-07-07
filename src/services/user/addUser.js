import User from '../../models/userModel.js';

const addUser = async (chatID, nickname) => {
  try {
    const user = new User({ chatID, nickname });
    user.save();
  } catch (error) {
    console.log('Ошибка при обращении к БД', error);
  }
};

export default addUser;
