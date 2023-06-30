import { Markup } from "telegraf";

const cancelButton = Markup.keyboard([
  Markup.button.text('Отменить задачу')
]).resize();

export default cancelButton;