import dayjs from 'dayjs';

export const parseToDateTime = (date: Date, format = 'DD.MM.YYYY HH:mm') => {
  return dayjs(date).format(format);
};

export const parseToDate = (date: Date, format = 'DD.MM.YYYY') => dayjs(date).format(format);

export const parseToTime = (date: Date, format = 'HH:mm') => dayjs(date).format(format);
