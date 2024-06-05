import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import Badge from "../../Assets/img/Sucess-badge.svg";
import CustomeButton from "../Common/CustomeButton/CustomeButton";
import { useNavigate, useLocation } from "react-router-dom";
import { HOME } from "../../Constant/Route";

const OrderConfirmation = (props: any) => {
  const navigate = useNavigate();
  const location: any = useLocation();
  let orderId = location?.state?.orderId;

  return (
    <div className="order-confirmation">
      <Container>
        <img src={Badge} alt="" />
        <p className="tl">Order placed successfully!</p>
        <span className="bs">Order ID: {orderId}</span>
        <div className="hr"></div>
        <p className="bl">
          We’ll email you an order confirmation with details.
        </p>
        <p className="bl">
          For any delivery issue please contact us on delivery@damaskcakes.com
        </p>
        <CustomeButton bg="fill" onClick={() => navigate(HOME)}>
          Continue Shopping
        </CustomeButton>
      </Container>
    </div>
  );
};

export default OrderConfirmation;
