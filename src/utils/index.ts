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

export function formatCurrency(input: number | string): string {
  // Convert input to a number (if it's a string)
  const number: number = typeof input === `string` ? parseFloat(input) : input;

  // Check if the converted input is a valid number
  if (isNaN(number)) {
    return `0.00`; // return a default value
  }

  // Convert the number to a string with two decimal places
  const formattedNumber: string = number.toFixed(2);

  // Add commas as thousands separators
  const parts: string[] = formattedNumber.toString().split(`.`);
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, `,`);

  return parts.join(`.`);
}

export function truncateString(str: string, num: any) {
  const newStr = str?.toString();
  if (newStr?.length > num) {
    return newStr?.slice(0, num) + `.....`;
  } else {
    return newStr;
  }
}
