import dayjs from 'dayjs';
import { genNumbersArray } from './genArray';

export const defaultForm = {
  tower: 'A',
  floor: 3,
  roomNumber: 1,
  date: dayjs().format('DD.MM.YYYY'),
  timeBegin: '00:00',
  timeEnd: '00:00',
  comments: '',
}

export const formTowerVariants = ['A', 'Б'];
export const formFloorVariants = genNumbersArray(3, 27);
export const roomNumberVariants = genNumbersArray(1, 10);
