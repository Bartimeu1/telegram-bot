import { Scenes } from 'telegraf';
import getWeather from '../../services/getWeather.js';

const weatherScene = new Scenes.BaseScene('GET_WEATHER_BY_CITY');

weatherScene.enter((ctx) => ctx.reply('Введите город, в котором вы хотите посмотреть погоду'));

weatherScene.on('message', async (ctx) => {
  try {
    const city = ctx.update.message.text;
    ctx.reply('Сверяюсь с метеорологами...');

    const data = await getWeather(city);

    ctx.reply(`В ${data.location.name} сейчас ${data.current.temp_c} градусов!`);
  } catch (error) {
    console.log('Ошибка при отправке запроса', error);
    ctx.reply('Введите валидное название города');
  }
});

export default weatherScene;

weatherScene.hears('message', ctx => {
  ctx.scene.leave();
})