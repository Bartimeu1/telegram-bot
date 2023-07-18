import { errorMessages } from '@constants/text';

const invalidCommandMiddleware = (ctx, next) => {
  const message = ctx.message?.text;
  if (message?.startsWith('/')) {
    ctx.reply(errorMessages.invalidCommand);
    ctx.scene.leave();
    return;
  }
  next();
};

export default invalidCommandMiddleware;
