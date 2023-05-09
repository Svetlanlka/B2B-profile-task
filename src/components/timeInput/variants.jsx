export const TimeInputVariants = ({variants, variant, setVariant}) => {
  return (        
  <div className="dropdown-multiple-list__select-elem">
    {variants.map((v, index) => 
      <div
        key={index}
        className={"dropdown__variant" + (v===variant? " dropdown__variant_active" : "")} 
        onClick={()=>setVariant(v)}
      >
        {v}
      </div>
    )}
  </div>);
}
