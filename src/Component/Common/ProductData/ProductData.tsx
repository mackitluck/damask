import React from 'react';
import CK1 from "../../../Assets/img/ck1.png";
import CK2 from "../../../Assets/img/ck2.png";
import IncDecBox from '../Inc-Dec-box/Inc-Dec-box';

const ProductData = (props:any) => {
  return (
    <div className="product-data">
      <div className="PD-img">
        <img src={props.data.image} alt="" />
      </div>
      <div className="PD-content">
        <p className="bm">{props.data.title}</p>
        { 
          (props.data.discountedPrice || props.data.price) &&
          <div className="product-price">
          {
            props.data.price && 
            props.data.discountedPrice ?
            <del className="bm blur-color">{props.data.price}</del>
            :
            <span className="bm">{props.data.price}</span>
          }
          {
            props.data.discountedPrice &&
            <span className="bm">{props.data.discountedPrice}</span>
          }
          </div>
        }
        {
          props.data.value &&
          <IncDecBox disableButton={props.disableButton} onChange={props.onChange} maxqty={props.data.qty} value={props.data.value} />
        }
        {
          props.data.qtyExact && 
          <label className="bm">Qty: {props.data.qtyExact}</label>
        }
      </div>
    </div>
  );
}

export default ProductData;
