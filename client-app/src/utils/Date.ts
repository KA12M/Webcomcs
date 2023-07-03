import { format } from 'date-fns';
import { th } from 'date-fns/locale';

export const DateFormatYear543 = (date: Date) => {
  let year = new Date(date!).getFullYear() + 543;
  return format(new Date(date!), "d MMMM " + year, {
    locale: th,
  });
};
