import React from 'react';

const HeartLabel = (props:any) => {
  return (
    <label className="heart">{props.children}
      <input 
        type="checkbox"
        value={props.value}
        name={props.name}
        checked={props.checked}
        id={props.id}
        defaultChecked={props.defaultChecked}
        onChange={props.onChange}
        disabled={props.disabled}
      />
      <span className="heart-checkmark"></span>
    </label>
  );
}

export default HeartLabel;
