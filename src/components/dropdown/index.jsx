import { useState, useRef } from 'react';
import { useOnClickOutside } from '../../hooks/clickOutside';
import './styles.css';

export const DropDownList = ({variants, variant, setVariant, label}) => {
  const [open, setOpen] = useState(false);

  const ref = useRef();
  useOnClickOutside(ref, () => setOpen(false));

  function selectVariant(variant) {
    setVariant(variant);
    setOpen(false);
  }
  function openSelect() {
    setOpen(!open);
  }

  return (
    <div ref={ref} className="form-input dropdown">
      <div className="form-input__label">{label}</div>
      <div 
        className={"dropdown__select" + (open? " dropdown__select_clicked" : "")}
        onClick={openSelect}
      >
        <div className="dropdown__selected">{variant}</div>
        <div className={"dropdown__caret" + (open? " dropdown__caret_rotated" : "")}></div>
      </div>
      <div className={"dropdown-window dropdown__list" + (open? " dropdown-window_open" : "")}>
        {variants.map((v, index) => 
          <div
            key={index}
            className={"dropdown__variant" + (v===variant? " dropdown__variant_active" : "")} 
            onClick={()=>selectVariant(v)}
          >
            {v}
          </div>
        )}
      </div>
    </div>
  )
}
