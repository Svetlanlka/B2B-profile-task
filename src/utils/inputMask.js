export function InputValueMask(oldValue, newValue, delimiter) {
  const valueObj = {value: oldValue, pos: 0, index: Math.max(newValue.length, oldValue.length)};

  if (oldValue.length < newValue.length) {
    for (let i = 0; i < oldValue.length; i++) {
      if (oldValue[i] !== newValue[i]) {
        if (Number.isNaN(Number(newValue[i]))) {
          break;
        };

        if (oldValue[i] === delimiter) {
          valueObj.value = oldValue.slice(0, i + 1) + newValue[i] + oldValue.slice(i + 2);
          valueObj.pos = 1;
          valueObj.index = i + 1;
          break;
        } else {
          if ((i + 1) < oldValue.length) {
            valueObj.value =  (newValue.slice(0, i + 1)).concat(oldValue.slice(i + 1));
            valueObj.index = i;
            break;
          } else {
            valueObj.value = (newValue.slice(0, i + 1));
            valueObj.index = i;
            break;
          }
        }
      }
    }
  }

  if (oldValue.length - newValue.length === 1) {
    for (let i = 0; i < oldValue.length; i++) {
      if (i === newValue.length) {
        valueObj.value =  (newValue + '0');
        break;
      }

      if (oldValue[i] !== newValue[i] ) {
        if (oldValue[i] === delimiter) {
          valueObj.value = oldValue.slice(0, i - 1) + '0' + oldValue.slice(i);
          valueObj.pos = -1;
          valueObj.index = i + 1;
          break;
        } else {
          if (i > 0) {
            valueObj.value = (oldValue.slice(0, i) + '0' + oldValue.slice(i + 1));
            valueObj.index = i;
            break;
          } else {
            valueObj.value = ('0' + newValue);
            valueObj.index = i;
            break;
          }
        }
      }
    }
  }

  return valueObj;
}