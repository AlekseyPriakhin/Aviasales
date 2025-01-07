import dayjs from 'dayjs';

export const parseToDateTime = (date: Date | string, format = 'DD.MM.YYYY HH:mm') => {
  return dayjs(date).format(format);
};

export const parseToDate = (date: Date | string, format = 'DD.MM.YYYY') => dayjs(date).format(format);

export const parseToTime = (date: Date | string, format = 'HH:mm') => dayjs(date).format(format);
