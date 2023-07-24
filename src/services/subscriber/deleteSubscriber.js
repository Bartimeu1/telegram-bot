import Subscriber from '@models/subscriberModel.js';

const deleteSubscriber = async (chatID) => Subscriber.findOneAndRemove({ chatID });

export default deleteSubscriber;
