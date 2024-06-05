import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import minus from "../../../Assets/img/minus.svg";
import plus from "../../../Assets/img/plus.svg";

const IncDecBoxProductDetail = (props: any) => {
  const [currentQty, setCurrentQty] = useState(props.value);
  useEffect(() => {
    setCurrentQty(props.value);
  }, [props])

  const incDecQty = (type: any) => {
    let currentQtyVal = parseInt(currentQty);
    if (type === "inc") {
      if(currentQtyVal < props.maxqty) {
        setCurrentQty(currentQtyVal + 1)
        props.onChange(currentQtyVal + 1,'add',props.data);
      }      
    }else if(type==="dec"){
      if(currentQtyVal >= 1) {
      setCurrentQty(currentQtyVal - 1)  
      props.onChange(currentQtyVal - 1,'remove',props.data);
      }    
    }
  }

  return (
    <div className="inc-dec-box">
      <button disabled={props.disableButton} onClick={()=>incDecQty('dec')}>
        <img src={minus} alt="" />
      </button>
      <input value={currentQty} readOnly />
      <button disabled={props.disableButton} onClick={()=>incDecQty('inc')}>
        <img src={plus} alt="" />
      </button>
    </div>
  );
};

export default IncDecBoxProductDetail;