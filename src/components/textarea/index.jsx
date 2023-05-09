import './styles.css';

export const TextareaInput = ({value, setValue, label}) => {
  return (
    <div className="form-input textarea-input">
      <div className="form-input__label">{label}</div>
      <textarea className="textarea-input__text" value={value} onChange={setValue}/>  
    </div>
  )
}
