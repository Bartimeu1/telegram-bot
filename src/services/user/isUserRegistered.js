import User from '@models/userModel.js';

const isUserRegistered = async (chatID) => await User.findOne({ chatID });

export default isUserRegistered;
