import schedule from 'node-schedule';
import Subscriber from '../models/subscriberModel.js';
import getWeather from '../services/getWeather.js';

// Rules for a schedule
const rule = new schedule.RecurrenceRule();
rule.tz = 'Europe/Moscow';
rule.hour = 9;
rule.minute = 0;
rule.second = 0;

const weatherSchedule = async (bot) => {
  schedule.scheduleJob(rule, () => {
    try {
      Subscriber.find().then((subscribers) => {
        subscribers.forEach(async (subscriber) => {
          const city = subscriber.city;
          const weather = await getWeather(city);

          bot.telegram.sendMessage(
            subscriber.chatID,
            `Доброе утро!🫡\nВ ${city} сейчас ${weather.current.temp_c} градусов`,
          );
        });
      });
    } catch (err) {
      console.log('Ошибка при рассылке погоды', err);
    }
  });
};

export default weatherSchedule;
