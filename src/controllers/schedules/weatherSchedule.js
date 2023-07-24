import schedule from 'node-schedule';

import { errorMessages } from '@constants/text.js';
import { MAX_MINUTE, MIN_MINUTE, MINUTES_IN_HOUR } from '@constants/time.js';
import Subscriber from '@models/subscriberModel.js';
import getWeather from '@root/api/getWeather.js';

const weatherSchedule = async (bot) => {
  const rule = new schedule.RecurrenceRule();
  rule.tz = 'Europe/Moscow';
  rule.minute = new schedule.Range(MIN_MINUTE, MAX_MINUTE);

  schedule.scheduleJob(rule, () => {
    try {
      const currentDate = new Date();
      const timeInMinutes = currentDate.getHours() * MINUTES_IN_HOUR + currentDate.getMinutes();

      Subscriber.find({ callTime: { $eq: timeInMinutes } }).then(
        (subscribers) => {
          subscribers.forEach(async (subscriber) => {
            const { city } = subscriber;
            const data = await getWeather(city);

            bot.telegram.sendMessage(
              subscriber.chatID,
              `${data.name}: ${
                data.weather[0].description
              } 🌤\nТемпература на данный момент: ${(
                data.main.temp / 10
              ).toFixed(2)} °C\n\nОщущается как ${(
                data.main.feels_like / 10
              ).toFixed(2)} °C\nМинимальная температура: ${(
                data.main.temp_min / 10
              ).toFixed(2)} °C\nМаксимальная температура: ${(
                data.main.temp_max / 10
              ).toFixed(2)} °C\nСкорость ветра: ${
                data.wind.speed
              } м/c\nВидимость: ${data.visibility} метров`,
            );
          });
        },
      );
    } catch (err) {
      console.log(errorMessages.weatherForecast, err);
    }
  });
};

export default weatherSchedule;
