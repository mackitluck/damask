import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { API_STATUS } from "../../Constant/Api";
import { CONFIRM_ORDER, PAGENOTFOUND } from "../../Constant/Route";
import { SUCCESS_RESPONSE_CODE } from "../../Constant/Status";
import {
  paypalExpressPlaceOrderAction,
  placeOrder,
} from "../../Redux/CheckOut/CheckOutAction";
import {
  CHECKOUT_PLACE_ORDER_FAILD,
  CHECKOUT_PLACE_ORDER_LONG,
  CHECKOUT_PLACE_ORDER_REQUEST,
  CHECKOUT_PLACE_ORDER_SUCCESS,
  PAYPAL_EXPRESS_ORDER_REQUEST,
  PAYPAL_EXPRESS_ORDER_SUCCESS,
} from "../../Redux/CheckOut/CheckOutTypes";
import { showToast } from "../../Utility/General";
import Loader from "../Loader/Loader";
import PaymentLoader from "../PaymentLoader/PaymentLoader";
import SomethingWrong from "../SomethingWrong/SomethingWrong";

export default function PaypalSuccess() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [apiStatus, setApiStatus] = useState(API_STATUS.LOADING);
  const master = useSelector((state: any) => state?.master?.data);
  const authTokenAll = master?.authToken.split(" ");
  const authTokenFromMaster = authTokenAll[1];

  const placeOrderResponse = useSelector((state: any) => state?.placeOrder);

  useEffect(() => {
    console.log(placeOrderResponse, "placeOrderResponse");
    // START:: STATE FOR ORDER PLACE
    if (placeOrderResponse.type === CHECKOUT_PLACE_ORDER_REQUEST) {
      if (apiStatus !== API_STATUS.LOADING) {
        setApiStatus(API_STATUS.LOADING);
      }
    } else if (
      placeOrderResponse.data?.statusCode === SUCCESS_RESPONSE_CODE &&
      placeOrderResponse.type === CHECKOUT_PLACE_ORDER_SUCCESS
    ) {
      if (apiStatus !== API_STATUS.SUCCESS) {
        setApiStatus(API_STATUS.SUCCESS);
        //setAddressData(INITIAL_ADDRESS_DATA)
        navigate(CONFIRM_ORDER, {
          state: {
            orderId: placeOrderResponse.data?.orderIncreamentId,
            response: placeOrderResponse.data,
          },
        });
        localStorage.removeItem("paypal_order_info");
      }
    } else if (placeOrderResponse.type === CHECKOUT_PLACE_ORDER_LONG) {
      if (apiStatus !== API_STATUS.LONG) {
        setApiStatus(API_STATUS.LONG);
      }
    } else if (placeOrderResponse.type === CHECKOUT_PLACE_ORDER_FAILD) {
      if (apiStatus !== API_STATUS.FAILED) {
        showToast("error", "Somethig Went Wrong!");
        setApiStatus(API_STATUS.FAILED);
      }
    }
    // END:: STATE FOR ORDER PLACE
  }, [placeOrderResponse]);

  useEffect(() => {
    if (location.search !== "") {
      const params = location.search.substring(
        location.search.indexOf("?") + 1
      );
      const token = params.split("&")[0].split("token=")[1];
      const payer_id = params.split("&")[1].split("PayerID=")[1];
      let paypalOrderData: any = localStorage.getItem("paypal_order_info");
      paypalOrderData = JSON.parse(paypalOrderData);
      if (token && payer_id) {
        dispatch(
          placeOrder({
            ...paypalOrderData,
            authToken: authTokenFromMaster,
            token,
            payer_id,
          })
        );
      }
    } else {
      window.location.href = PAGENOTFOUND;
    }
  }, [location]);

  // return <Loader></Loader>;

  switch (apiStatus) {
    case API_STATUS.LOADING:
      return <PaymentLoader></PaymentLoader>;
    case API_STATUS.LONG:
      return <SomethingWrong></SomethingWrong>;
    case API_STATUS.FAILED:
      return <SomethingWrong></SomethingWrong>;
    default:
      return <PaymentLoader></PaymentLoader>;
  }
}
