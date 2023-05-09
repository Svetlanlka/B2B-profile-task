import { genNumbersArray } from './../../utils/genArray';

export function getDays(date) {
  const daysInMonth = date.daysInMonth();
  let dayOfWeekForFirstDayOfMonth = date.startOf('month').day();
  let dayOfWeekForLastDayOfMonth = date.endOf('month').day();

  // в dayjs дни недели с воскресенья, поэтому нужно переводить
  if (dayOfWeekForFirstDayOfMonth === 0) dayOfWeekForFirstDayOfMonth = 7;
  if (dayOfWeekForLastDayOfMonth === 0) dayOfWeekForLastDayOfMonth = 7;

  const daysInPrevMonth = dayOfWeekForFirstDayOfMonth !== 1 ? date.add(-1, 'month').daysInMonth() : 0;
  const firstDayNumberInPrevMonth = daysInPrevMonth - dayOfWeekForFirstDayOfMonth + 2;

  const days = genNumbersArray(1, daysInMonth);
  const prevDays = firstDayNumberInPrevMonth >= 0 ? genNumbersArray(firstDayNumberInPrevMonth, daysInPrevMonth) : [];
  const nextDays = dayOfWeekForLastDayOfMonth !== 7 ? genNumbersArray(1, 7 - dayOfWeekForLastDayOfMonth) : [];

  return {prevDaysCount: prevDays.length, nextDaysCount: nextDays.length, days: prevDays.concat(days).concat(nextDays)};
}