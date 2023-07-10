import Subscriber from '@models/subscriberModel.js';

const deleteSubscriber = async (chatID) => {
  try {
    return Subscriber.findOneAndRemove({ chatID });
  } catch (error) {
    console.log('Ошибка при обращении к БД', error);
  }
};

export default deleteSubscriber;
