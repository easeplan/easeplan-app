import { parseISO, format } from 'date-fns';
import { enUS } from 'date-fns/locale';

export const dateFormater = (date: any) => {
  return new Date(date).toLocaleDateString(`en-US`, {
    month: `long`,
    year: `numeric`,
  });
};

export const dateFormaterAndTime = (date: any) => {
  return format(parseISO(date), `MM/d/yyyy`, { locale: enUS });
};

export const formatCurrency = (num: any) => {
  const formatter = new Intl.NumberFormat(`en-US`, {
    style: `currency`,
    currency: `NGN`,
  });
  return formatter.format(num);
};
