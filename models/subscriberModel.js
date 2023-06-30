import mongoose from 'mongoose';

const subscriberSchema = new mongoose.Schema({
  chatID: { type: Number },
  city: { type: String },
});

const Subscriber = mongoose.model('Subscriber', subscriberSchema);
export default Subscriber;
