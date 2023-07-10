const dateFormatting = (date) => {
  const dateOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  return date.toLocaleString('ru-RU', dateOptions);
};

export default dateFormatting;
