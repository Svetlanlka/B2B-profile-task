// import { InputValueMask } from './../../utils/inputMask';

// export function TimeValueFilter(oldValue, newValue) {
//   const time = {value: oldValue, pos: 0};

//   const {value, pos, index} = InputValueMask(oldValue, newValue, ':');
//   time.value = value;
//   time.pos = pos;

//   let timeParse = time.value.split(':');

//   const hours = Number(timeParse[0]);
//   if (!(hours >= 0 && hours <= 22)) {
//     if (index === 0 && hours >= 23 && hours <= 29) {
//       timeParse[0] = '20'; 
//     }
//     if (index === 0 && hours >= 30 && hours <= 99) {
//       timeParse[0] = ('0' + String(hours / 10)[0]);
//       time.pos = 1;
//     }
//     if (index === 1 && (hours % 10 >= 4)) {
//       timeParse[0] = (timeParse[0][0] + '0');
//       timeParse[1] = (hours % 10) + timeParse[1][1];
//       time.pos = 2;
//     }

//     if (hours === 0) time.pos = 0;
//   }

//   const minutes = Number(timeParse[1]);
//   if (!(minutes >= 0 && minutes <= 60)) {
//     if ((index === 3 || index === 1) && minutes >= 61 && minutes <= 99) {
//       timeParse[1] = ('0' + String(minutes / 10)[0]);
//       if (index === 1) time.pos = 3;
//       if (index === 3) time.pos = 2;
//     }
//     if (index === 4 && minutes >= 61 && minutes <= 99) {
//       timeParse[1] = (timeParse[1][0] + '0');
//     }

//     if (minutes === 0) time.pos = 0;
//   }

//   time.value = timeParse.join(':');
//   if (time.value.length > 5) time.value = time.value.slice(0, 5);

//   return time;
// }