const CheckboxLabel = (props:any) => {
  return (
    <label className="ck">{props.children}
      <input 
        type="checkbox"
        value={props.value}
        name={props.name}
        id={props.id}
        defaultChecked={props.defaultChecked}
        checked={props.checked}
        onChange={props.onChange} 
      />
      <span className="ck-checkmark"></span>
    </label>
  );
};

export default CheckboxLabel;
