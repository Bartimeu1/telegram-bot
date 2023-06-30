import Subscriber from '../models/subscriber-model.js';

const subscribeUser = async (chatId, city) => {
  const candidate = await Subscriber.findOne({ chatId });
  if (candidate) {
    throw new Error(`Пользователь с ${chatId} уже подписан`);
  }

  const subscriber = new Subscriber(chatId, city);
  subscriber.save();
};

export default subscribeUser;