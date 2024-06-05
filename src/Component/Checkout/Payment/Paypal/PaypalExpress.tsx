import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPaypalExpressTokenAction } from "../../../../Redux/CheckOut/CheckOutAction";
import { CREATE_PAYPAL_EXPRESS_TOKEN_SUCCESS } from "../../../../Redux/CheckOut/CheckOutTypes";
import CustomeButton from "../../../Common/CustomeButton/CustomeButton";
import Payment1 from "../../../../Assets/img/payment-1.svg";
import Payment2 from "../../../../Assets/img/payment-2.svg";
import Payment3 from "../../../../Assets/img/payment-3.svg";
import Payment4 from "../../../../Assets/img/payment-4.svg";
import Payment5 from "../../../../Assets/img/payment-5.svg";
export default function PaypalExpress({handleContinuePaypal , paymentImage}:any) {
  const dispatch = useDispatch();
  const [data, setData] = useState<any>({
    token: "",
    paypal_urls: {
      start: "",
      edit: "",
    },
  });

  const payPalExpressTokeRes = useSelector(
    (state: any) => state?.createpaypalExpressToken
  );

  useEffect(() => {
    if (
      payPalExpressTokeRes &&
      payPalExpressTokeRes?.type === CREATE_PAYPAL_EXPRESS_TOKEN_SUCCESS
    ) {
      const tokenData = payPalExpressTokeRes?.data;
      setData({
        token:tokenData?.token,
        paypal_urls:{
          start:tokenData.paypal_urls?.start,
          edit:tokenData.paypal_urls?.edit,
      }});
    }
  }, [payPalExpressTokeRes]);

  // useEffect(() => {
  //   dispatch(createPaypalExpressTokenAction());
  // }, []);

  return (
    <>
      <div>
        <div className="paypal-image-points mb-3">
           <div className="card-imgs">
              <a className="card-links">
                <img src={Payment1} alt="" />
              </a>
              <a className="card-links">
                <img src={Payment2} alt="" />
              </a>
              <a className="card-links">
                <img src={Payment3} alt="" />
              </a>
              <a className="card-links">
                <img src={Payment4} alt="" />
              </a>
            
            </div>

        </div>
        {/* {data && data.paypal_urls?.start && ( */}
        <>
          <p className="bl paypal_text">
            You will be directed to a secure paypal checkout where you can pay
            via paypal or with a credit/debit card by selecting the option 'pay
            by debit or credit card'. If you are unable to select this option,
            please call or contact us and we will be able to resolve the order.
          </p>
          {data?.paypal_urls?.start ? (
            <CustomeButton
              className="continue-paypal-btn"
              onClick={handleContinuePaypal}
            >
              Continue to Paypal
            </CustomeButton>
          ) : null}
        </>
      </div>
      {/* )} */}
    </>
  );
}
