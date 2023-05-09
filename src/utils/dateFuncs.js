import dayjs from "dayjs";

export function StringToDayJs(str) {
  return dayjs(str.slice(6) + '-' + str.slice(3, 5) + '-' + str.slice(0, 2));
}

export function AddZerosToBegin(value, maxZeroCount = 0) {
  const str = String(value);
  if (str.length >= maxZeroCount) return str;

  return (new Array(maxZeroCount - str.length).fill('0').join('') + str);
}

export function DateIsValid(date) {
  const day = Number(date.slice(0, 2));
  const month = Number(date.slice(3, 5));
  const year = Number(date.slice(6));

  return (day > 0 && day <= 31 && month > 0 && month <= 12 && year > 0);
}