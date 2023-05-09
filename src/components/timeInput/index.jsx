import { useState, useRef } from 'react';
import clockIcon from '../../images/clock-icon.png';
import { genStringsArrayWithAddZero } from '../../utils/genArray';
import { useOnClickOutside } from '../../hooks/clickOutside';
import { useSaveCursorPostion } from './../../hooks/saveCursorPosition';
import { InputValueFilter, timeLimits } from '../../utils/filter';
import { TimeInputVariants } from './variants';
import '../dropdown/styles.css';

export const TimeInput = ({time, setTime, label}) => {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState(0);
  const inputRef = useRef(null);
  const selectRef = useRef(null);

  useOnClickOutside(selectRef, () => setOpen(false));
  useSaveCursorPostion(inputRef, position);

  return (
    <div className="form-input">
      <div className="form-input__label">{label}</div>
      <div className="form-input__field">
        <input ref={inputRef} className="form-input__text" value={time} onChange={(e)=>{
          const {value, pos} = InputValueFilter(time, e.target.value, ':', timeLimits);
          setPosition(e.target.selectionStart + pos);
          setTime(value);
        }}
          placeholder="00:00"/>
        <img className="form-input__icon" src={clockIcon} alt="clock" onClick={()=>setOpen(true)}/>
      </div>
      <div ref={selectRef} className={"dropdown-window dropdown-multiple-list" + (open? " dropdown-window_open" : "")}>
        <div className="dropdown-multiple-list__selects">
          <TimeInputVariants variants={genStringsArrayWithAddZero(0, 23)}
            variant={time.slice(0, 2)} setVariant={(v)=>{
              setTime(v + time.slice(2));
            }}/>
          <TimeInputVariants variants={genStringsArrayWithAddZero(0, 60, 5)}
            variant={time.slice(3, 5) % 5 === 0? time.slice(3, 5) : '00'} setVariant={(v)=>{
              setTime(time.slice(0, 3) + v);
            }}/>
        </div>
        <div className="dropdown-multiple-list__footer">
          <button className="btn dropdown-multiple-list__btn-ok" onClick={()=>setOpen(false)}>ok</button>
        </div>
      </div>
    </div>
  )
}
