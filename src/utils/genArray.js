export function genNumbersArray(begin, end) {
  if (begin > end) return [];

  const array = [];
  for (let i = begin; i <= end; i++) {
    array.push(i)
  }

  return array;
}

export function genStringsArrayWithAddZero(begin, end, step = 1) {
  if (begin > end) return [];

  const array = [];
  for (let i = begin; i <= end; i+=step) {
    if (i >= 0 && i <= 9) {
      array.push('0' + String(i));
    } else {
      array.push(String(i));
    }
  }

  return array;
}