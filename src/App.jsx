import { useState } from 'react';
import { defaultForm, formTowerVariants, formFloorVariants, roomNumberVariants } from './utils/constants';
import { DropDownList } from './components/dropdown';
import { TextareaInput } from './components/textarea';
import { TimeInput } from './components/timeInput';
import { DateInput } from './components/dateInput';
import './App.css';

const App = () => {
  const [form, setForm] = useState(defaultForm);

  function sendData() {
    console.log(JSON.stringify(form));
  }
  function cleanData() {
    setForm(defaultForm);
  }

  return (
    <div className="App">
      <div className="form">
        <div className="form__title">Бронирование переговорной</div>
        <div className="form__content">
          <DropDownList variants={formTowerVariants} variant={form.tower} 
            setVariant={(v)=>setForm({...form, tower: v})} label="Выберите номер башни:"/>
          <DropDownList variants={formFloorVariants} variant={form.floor} 
            setVariant={(v)=>setForm({...form, floor: v})}label="Выберите этаж:"/>
          <DropDownList variants={roomNumberVariants} variant={form.roomNumber} 
            setVariant={(v)=>setForm({...form, roomNumber: v})} label="Выберите номер переговорной:"/>
          <DateInput date={form.date} setDate={(date)=>setForm({...form, date: date})} label="Дата:"/>
          <TimeInput time={form.timeBegin} setTime={(time)=>setForm({...form, timeBegin: time})} label="Время начала:"/>
          <TimeInput time={form.timeEnd} setTime={(time)=>setForm({...form, timeEnd: time})} label="Время окончания:"/>
          <TextareaInput value={form.comments} setValue={(e)=>setForm({...form, comments: e.target.value})} 
            label="Комментарии:"/>
        </div>
        <div className="form__footer">
          <button className='btn' onClick={cleanData}>Очистить</button>
          <button className='btn' onClick={sendData}>Отправить</button>
        </div>
      </div>
    </div>
  );
}

export default App;
