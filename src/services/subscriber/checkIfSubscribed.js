import Subscriber from '@models/subscriberModel.js';

const checkIfSubscribed = async (chatID) => {
  return await Subscriber.findOne({ chatID });
};

export default checkIfSubscribed;
