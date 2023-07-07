import Subscriber from '../../models/subscriberModel.js';

const addSubscriber = async (chatID, city, callTime) => {
  try {
    const subscriber = new Subscriber({ chatID, city, callTime });
    subscriber.save();
  } catch (error) {
    console.log('Ошибка при обращении к БД', error);
  }
};

export default addSubscriber;
