const TextareaGroups = (props:any) => {
  return (
    <div className="input-groups">
      <label>{props.label}</label>
      <textarea
        className={props.error && 'error'}
        placeholder={props.placeholder}
        onChange={props.onChange}
        defaultValue={props.defaultValue}
        value={props.value}
        name={props.name}
        ref={props.ref}
      ></textarea>
      {
        props.error &&
        <span className="error">{props.error}</span>
      }
    </div>
  );
};

export default TextareaGroups;
