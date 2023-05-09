import { useState, useRef, useEffect } from 'react';
import { useOnClickOutside } from '../../hooks/clickOutside';
import { useSaveCursorPostion } from './../../hooks/saveCursorPosition';
import { InputValueFilter, dateLimits } from '../../utils/filter';
import { genNumbersArray } from './../../utils/genArray';
import { constants } from './calendarConstants';
import { getDays } from './calendarFuncs';
import { StringToDayJs, AddZerosToBegin, DateIsValid } from '../../utils/dateFuncs';
import calendarIcon from '../../images/calendar-icon.png';
import './styles.css';
import '../dropdown/styles.css';

export const DateInput = ({date, setDate, label}) => {
  const [navDate, setNavDate] = useState(StringToDayJs(date));
  const [daysObj, setDaysObj] = useState(getDays(navDate));
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState(0);

  const inputRef = useRef(null);
  const pickerRef = useRef(null);
  useOnClickOutside(pickerRef, () => setOpen(false));
  useSaveCursorPostion(inputRef, position);

  useEffect(() => {
    setDaysObj(getDays(navDate));
  }, [navDate]);

  useEffect(() => {
    setNavDate(StringToDayJs(date));
  }, [date]);

  function changeDateWithDatePicker(day, isDayOfPrevMonth, isDayOfNextMonth) {
    let newMonth = navDate.month();
    if (isDayOfPrevMonth) newMonth = navDate.add(-1, 'month').month();
    if (isDayOfNextMonth) newMonth = navDate.add(1, 'month').month();

    setDate(AddZerosToBegin(day, 2) + '.' + AddZerosToBegin(newMonth + 1, 2) + '.' + AddZerosToBegin(navDate.year(), 4));
    setOpen(false);
  }

  function changeDateWithInput(e) {
    const {value, pos} = InputValueFilter(date, e.target.value, '.', dateLimits);
    setPosition(e.target.selectionStart + pos);
    setDate(value);
  }

  return (
    <div className="form-input">
      <div className="form-input__label">{label}</div>
      <div className="form-input__field">
        <input ref={inputRef} 
          className={"form-input__text" + (!DateIsValid(date) ? " form-input__text_error" : "")} 
          value={date} onChange={(e)=>changeDateWithInput(e)}/>
        <img className="form-input__icon" src={calendarIcon} alt="clock" onClick={()=>setOpen(true)}/>
      </div>
      <div ref={pickerRef} className={"dropdown-window date-picker" + (open? " dropdown-window_open" : "")}>
        <div className="date-picker__header">
          <div className="date-picker__title">{constants.monthsLabels[navDate.month()]} {navDate.year()} г.</div>
          <div className="date-picker__arrows">
            <div className="arrow arrow_to-left" onClick={()=>setNavDate(navDate.add(-1, 'month'))}></div>
            <div className="arrow arrow_to-right" onClick={()=>setNavDate(navDate.add(1, 'month'))}></div>
          </div>
        </div>
        <div className="date-picker__days">
          <div className="date-picker__days-row">
            {constants.weekDaysLabels.map((label, labelIndex)=>
              <div key={labelIndex} className="date-picker__days-elem date-picker__label">{label}</div>
            )}
          </div>
          {genNumbersArray(1, Math.ceil(daysObj.days.length / 7)).map((row, rowIndex)=>
            <div key={rowIndex} className="date-picker__days-row">
              {daysObj.days.slice((rowIndex) * 7, (rowIndex + 1) * 7).map((day, dayIndex)=> {
                const dayNumber = rowIndex * 7 + dayIndex;

                return (<div 
                  key={dayIndex}
                  onClick={()=>changeDateWithDatePicker(day, 
                    dayNumber < daysObj.prevDaysCount, dayNumber > (daysObj.days.length - daysObj.nextDaysCount - 1))}
                  className={"date-picker__days-elem date-picker__day " 
                    + ((dayNumber < daysObj.prevDaysCount || (dayNumber > (daysObj.days.length - daysObj.nextDaysCount - 1)))? " date-picker__day-other" 
                    : ((navDate.month() + 1) === Number(date.slice(3, 5)) && day === Number(date.slice(0, 2)) ? " date-picker__day-cur": ""))
                  }>
                  {day}
                </div>);
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
