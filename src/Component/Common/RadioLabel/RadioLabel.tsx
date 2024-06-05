const RadioLabel = (props:any) => {
  return (
    <label className="rd">
      {props.children}
      <input
        type="radio"
        value={props.value}
        name={props.name}
        id={props.id}
        defaultChecked={props.defaultChecked}
        onChange={props.onChange} 
      />
      <span className="rd-checkmark"></span>
    </label>
  );
};

export default RadioLabel;
