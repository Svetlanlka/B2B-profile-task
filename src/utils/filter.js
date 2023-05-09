import { InputValueMask } from './inputMask';

export const dateLimits = {
  minFirstElem: 1,
  maxFirstElem: 31,
  minSecondElem: 1,
  maxSecondElem: 12,
  maxLength: 10,
}

export const timeLimits = {
  minFirstElem: 0,
  maxFirstElem: 23,
  minSecondElem: 0,
  maxSecondElem: 60,
  maxLength: 5,
}

export function InputValueFilter(oldValue, newValue, delimiter, limits) {
  const time = {value: oldValue, pos: 0};

  const {value, pos, index} = InputValueMask(oldValue, newValue, delimiter);
  time.value = value;
  time.pos = pos;

  let timeParse = time.value.split(delimiter);

  const firstElem = Number(timeParse[0]);
  if (!(firstElem >= limits.minFirstElem && firstElem <= limits.maxFirstElem)) {
    if (index === 0 && firstElem > limits.maxFirstElem && firstElem <= (Math.floor(limits.maxFirstElem / 10) * 10 + 9)) {
      timeParse[0] = String(Math.floor(limits.maxFirstElem / 10)) + '0'; 
    }
    if (index === 0 && firstElem >= (Math.floor(limits.maxFirstElem / 10 + 1) * 10)) {
      timeParse[0] = ('0' + String(firstElem / 10)[0]);
      time.pos = 1;
    }
    if (index === 1 && (firstElem % 10 >= (limits.maxFirstElem % 10 + 1))) {
      timeParse[0] = (timeParse[0][0] + '0');
      timeParse[1] = (firstElem % 10) + timeParse[1][1];
      time.pos = 2;
    }

    if (firstElem === 0) time.pos = 0;
  }

  const secondElem = Number(timeParse[1]);
  if (!(secondElem >= limits.minSecondElem && secondElem <= limits.maxSecondElem)) {
    if ((index === 3 || index === 1) && secondElem >= (limits.maxSecondElem + 1)) {
      timeParse[1] = ('0' + String(secondElem / 10)[0]);
      if (index === 1) time.pos = 3;
      if (index === 3) time.pos = 2;
    }
    if (index === 4 && secondElem >= (limits.maxSecondElem + 1)) {
      timeParse[1] = (timeParse[1][0] + '0');
    }

    if (secondElem === 0) time.pos = 0;
  }

  time.value = timeParse.join(delimiter);
  if (time.value.length > limits.maxLength) time.value = time.value.slice(0, limits.maxLength);

  return time;
}