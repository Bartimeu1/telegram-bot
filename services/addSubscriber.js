import Subscriber from '../models/subscriberModel.js';

const addSubscribe = async (chatID, city) => {
  try {
    const isSubscribed = await Subscriber.findOne({ chatID });
    if (!isSubscribed) {
      const subscriber = new Subscriber({ chatID, city });
      subscriber.save();
    }
    return isSubscribed;
  } catch (error) {
    console.log('Ошибка при обращении к БД', error);
  }
};

export default addSubscribe;
