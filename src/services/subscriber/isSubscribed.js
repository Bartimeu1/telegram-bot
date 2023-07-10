import Subscriber from '@models/subscriberModel.js';

const isSubscribed = async (chatID) => {
  try {
    return await Subscriber.findOne({ chatID });
  } catch (error) {
    console.log('Ошибка при обращении к БД', error);
  }
};

export default isSubscribed;
