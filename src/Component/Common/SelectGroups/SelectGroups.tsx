const SelectGroups = (props:any) => {
  return (
    <div className="input-groups">
      <label>{props.label}</label>
      <select
        onChange={props.onChange}
        name={props.name}
        id={props.id}
        value={props.defaultSelect}
        className={props.error && 'error'}
      >
        <option value="">Select...</option>
        {
          props?.value?.map((items:any, index:number) => (
            <option key={index} value={items.id}>
              {items.name}
            </option>
          ))
        }
      </select>
      {
        props.error &&
        <span className="error">{props.error}</span>
      }
    </div>
  );
};

export default SelectGroups;
