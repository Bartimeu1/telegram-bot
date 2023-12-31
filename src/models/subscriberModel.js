import mongoose from 'mongoose';

const subscriberSchema = new mongoose.Schema({
  chatID: { type: Number },
  city: { type: String, maxLength: 100 },
  callTime: { type: Number },
});

const Subscriber = mongoose.model('Subscriber', subscriberSchema);
export default Subscriber;
