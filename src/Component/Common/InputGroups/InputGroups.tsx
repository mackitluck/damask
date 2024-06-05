const InputGroups = (props:any) => {
  return (
    <div className={`input-groups ${props.className}`}>
      <label>{props.label}</label>
      <input
        type={props.type}
        onChange={props.onChange}
        defaultValue={props.defaultValue}
        placeholder={props.placeholder}
        value={props.value}
        name={props.name}
        id={props.id}
        className={props.error && 'error'}
      />
      {
        props.error &&
        <span className="error">{props.error}</span>
      }
    </div>
  );
};

export default InputGroups;
