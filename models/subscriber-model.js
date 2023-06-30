import mongoose from 'mongoose';

const subscriberSchema = new mongoose.Schema({
  chatID: { type: String },
  city: { type: String },
});

const Subscriber = mongoose.model('Subscriber', subscriberSchema);
export default Subscriber;
