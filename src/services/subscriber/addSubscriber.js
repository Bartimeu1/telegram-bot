import Subscriber from '@models/subscriberModel.js';

const addSubscriber = async (chatID, city, callTime) => {
  const subscriber = new Subscriber({ chatID, city, callTime });
  subscriber.save();
};

export default addSubscriber;
