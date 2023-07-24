import Subscriber from '@models/subscriberModel.js';

const checkIfSubscribed = async (chatID) => await Subscriber.findOne({ chatID });

export default checkIfSubscribed;
