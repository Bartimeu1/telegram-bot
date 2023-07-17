import schedule from 'node-schedule';
import Subscriber from '@models/subscriberModel.js';
import getWeather from '@root/api/getWeather.js';

// Rules for a schedule
const rule = new schedule.RecurrenceRule();
rule.tz = 'Europe/Moscow';
rule.minute = new schedule.Range(0, 59);

const weatherSchedule = async (bot) => {
  schedule.scheduleJob(rule, () => {
    try {
      // Calculating time in minutes
      const currentDate = new Date();
      const timeInMinutes = currentDate.getHours() * 60 + currentDate.getMinutes();

      Subscriber.find({ callTime: { $eq: timeInMinutes } }).then((subscribers) => {
        subscribers.forEach(async (subscriber) => {
          const city = subscriber.city;
          const data = await getWeather(city);

          bot.telegram.sendMessage(
            subscriber.chatID,
            `${data.name}: ${data.weather[0].description} 🌤\nТемпература на данный момент: ${(
              data.main.temp / 10
            ).toFixed(2)} °C\n\nОщущается как ${(data.main.feels_like / 10).toFixed(
              2,
            )} °C\nМинимальная температура: ${(data.main.temp_min / 10).toFixed(
              2,
            )} °C\nМаксимальная температура: ${(data.main.temp_max / 10).toFixed(
              2,
            )} °C\nСкорость ветра: ${data.wind.speed} м/c\nВидимость: ${data.visibility} метров`,
          );
        });
      });
    } catch (err) {
      console.log('Ошибка при рассылке погоды', err);
    }
  });
};

export default weatherSchedule;
