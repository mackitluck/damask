import { useNavigate } from "react-router-dom";
import { END_POINTS, MAX_CALLS } from "../../Constant/Api";
import { USER } from "../../Constant/LocalStorage";
import { SUCCESS_RESPONSE_CODE } from "../../Constant/Status";
import COMMON from "../../Language/Common";
import api from "../../Service/Axios";
import { getIPFromIPFY, showToast } from "../../Utility/General";
import {
  ADD_ADDRESS_IN_CHECKOUT_FOR_LOGGED_IN_USER_FAILD,
  ADD_ADDRESS_IN_CHECKOUT_FOR_LOGGED_IN_USER_LONG,
  ADD_ADDRESS_IN_CHECKOUT_FOR_LOGGED_IN_USER_REQUEST,
  ADD_ADDRESS_IN_CHECKOUT_FOR_LOGGED_IN_USER_SUCCESS,
  CHECKOUT_PLACE_ORDER_FAILD,
  CHECKOUT_PLACE_ORDER_LONG,
  CHECKOUT_PLACE_ORDER_REQUEST,
  CHECKOUT_PLACE_ORDER_SUCCESS,
  CREATE_APPLE_PAY_PAYMENT_INTENT_FAILED,
  CREATE_APPLE_PAY_PAYMENT_INTENT_LONG,
  CREATE_APPLE_PAY_PAYMENT_INTENT_REQUEST,
  CREATE_APPLE_PAY_PAYMENT_INTENT_SUCCESS,
  CREATE_PAYPAL_EXPRESS_TOKEN_FAILED,
  CREATE_PAYPAL_EXPRESS_TOKEN_LONG,
  CREATE_PAYPAL_EXPRESS_TOKEN_REQUEST,
  CREATE_PAYPAL_EXPRESS_TOKEN_SUCCESS,
  GUEST_CHECKOUT_ADD_UPDATE_ADDRESS_CLEAR,
  GUEST_CHECKOUT_ADD_UPDATE_ADDRESS_FAILD,
  GUEST_CHECKOUT_ADD_UPDATE_ADDRESS_LONG,
  GUEST_CHECKOUT_ADD_UPDATE_ADDRESS_REQUEST,
  GUEST_CHECKOUT_ADD_UPDATE_ADDRESS_SUCCESS,
  GUEST_CHECKOUT_ADD_UPDATE_DELIVERY_OPTION_FAILD,
  GUEST_CHECKOUT_ADD_UPDATE_DELIVERY_OPTION_LONG,
  GUEST_CHECKOUT_ADD_UPDATE_DELIVERY_OPTION_REQUEST,
  GUEST_CHECKOUT_ADD_UPDATE_DELIVERY_OPTION_SUCCESS,
  GUEST_CHECKOUT_FAILD,
  GUEST_CHECKOUT_LONG,
  GUEST_CHECKOUT_REQUEST,
  GUEST_CHECKOUT_SUCCESS,
  LOGGED_IN_USER_CHECKOUT_FAILD,
  LOGGED_IN_USER_CHECKOUT_LONG,
  LOGGED_IN_USER_CHECKOUT_REQUEST,
  LOGGED_IN_USER_CHECKOUT_SUCCESS,
  PAYPAL_EXPRESS_ORDER_FAILED,
  PAYPAL_EXPRESS_ORDER_LONG,
  PAYPAL_EXPRESS_ORDER_REQUEST,
  PAYPAL_EXPRESS_ORDER_SUCCESS,
  QUOTE_ADDRESS_UPDATE_FAILD,
  QUOTE_ADDRESS_UPDATE_LONG,
  QUOTE_ADDRESS_UPDATE_REQUEST,
  QUOTE_ADDRESS_UPDATE_SUCCESS,
} from "./CheckOutTypes";
import * as localStorageConstant from "../../Constant/LocalStorage";
import { myCart } from "../MyCart/MyCartAction";
import { CART_COUNT_GLOBAL } from "../General/GeneralType";
import axios from "axios";

export function getCheckoutList(param: any) {
  let recallCount = 0;
  return (dispatch: any) => {
    dispatch({
      type: GUEST_CHECKOUT_REQUEST,
      payload: { type: GUEST_CHECKOUT_REQUEST },
    });
    function recursiveCall() {
      api
        .post(`${END_POINTS.getCheckoutList}`, param)
        .then((result) => {
          if (result.data.statusCode === SUCCESS_RESPONSE_CODE) {
            dispatch({
              type: GUEST_CHECKOUT_SUCCESS,
              payload: { data: result.data, type: GUEST_CHECKOUT_SUCCESS },
            });
          } else if (recallCount < MAX_CALLS) {
            recursiveCall();
            recallCount++;
            dispatch({
              type: GUEST_CHECKOUT_LONG,
              payload: { data: {}, type: GUEST_CHECKOUT_LONG },
            });
          } else {
            dispatch({
              type: GUEST_CHECKOUT_FAILD,
              payload: { data: {}, type: GUEST_CHECKOUT_FAILD },
            });
          }
        })
        .catch((error) => {
          showToast("error", error);
          if (recallCount < MAX_CALLS) {
            recursiveCall();
            recallCount++;
            dispatch({
              type: GUEST_CHECKOUT_LONG,
              payload: { data: {}, type: GUEST_CHECKOUT_LONG },
            });
          } else {
            dispatch({
              type: GUEST_CHECKOUT_FAILD,
              payload: { data: {}, type: GUEST_CHECKOUT_FAILD },
            });
          }
        });
    }
    recursiveCall();
  };
}

export function getCheckoutListForLoggedInUser(param: any) {
  let recallCount = 0;
  return (dispatch: any) => {
    dispatch({
      type: LOGGED_IN_USER_CHECKOUT_REQUEST,
      payload: { type: LOGGED_IN_USER_CHECKOUT_REQUEST },
    });
    function recursiveCall() {
      api
        .post(`${END_POINTS.getCheckoutList}`, param)
        .then((result) => {
          if (result.data.statusCode === SUCCESS_RESPONSE_CODE) {
            dispatch({
              type: LOGGED_IN_USER_CHECKOUT_SUCCESS,
              payload: {
                data: result.data,
                type: LOGGED_IN_USER_CHECKOUT_SUCCESS,
              },
            });
          } else if (recallCount < MAX_CALLS) {
            recursiveCall();
            recallCount++;
            dispatch({
              type: LOGGED_IN_USER_CHECKOUT_LONG,
              payload: { data: {}, type: LOGGED_IN_USER_CHECKOUT_LONG },
            });
          } else {
            dispatch({
              type: LOGGED_IN_USER_CHECKOUT_FAILD,
              payload: { data: {}, type: LOGGED_IN_USER_CHECKOUT_FAILD },
            });
          }
        })
        .catch((error) => {
          showToast("error", error);
          if (recallCount < MAX_CALLS) {
            recursiveCall();
            recallCount++;
            dispatch({
              type: LOGGED_IN_USER_CHECKOUT_LONG,
              payload: { data: {}, type: LOGGED_IN_USER_CHECKOUT_LONG },
            });
          } else {
            dispatch({
              type: LOGGED_IN_USER_CHECKOUT_FAILD,
              payload: { data: {}, type: LOGGED_IN_USER_CHECKOUT_FAILD },
            });
          }
        });
    }
    recursiveCall();
  };
}

export function addUpdateAddressInCheckout(param: any) {
  let recallCount = 0;
  return (dispatch: any) => {
    dispatch({
      type: GUEST_CHECKOUT_ADD_UPDATE_ADDRESS_REQUEST,
      payload: { type: GUEST_CHECKOUT_ADD_UPDATE_ADDRESS_REQUEST },
    });
    function recursiveCall() {
      api
        .post(`${END_POINTS.getCheckoutList}`, param)
        .then((result) => {
          if (result.data.statusCode === SUCCESS_RESPONSE_CODE) {
            showToast("success", COMMON.CHECKOUT_ADDRESS_UPDATED_SUCCESSFULLY);
            dispatch({
              type: GUEST_CHECKOUT_ADD_UPDATE_ADDRESS_SUCCESS,
              payload: {
                data: result.data,
                type: GUEST_CHECKOUT_ADD_UPDATE_ADDRESS_SUCCESS,
              },
            });
          } else if (recallCount < MAX_CALLS) {
            recursiveCall();
            recallCount++;
            dispatch({
              type: GUEST_CHECKOUT_ADD_UPDATE_ADDRESS_LONG,
              payload: {
                data: {},
                type: GUEST_CHECKOUT_ADD_UPDATE_ADDRESS_LONG,
              },
            });
          } else {
            showToast("error", result.data.message);
            dispatch({
              type: GUEST_CHECKOUT_ADD_UPDATE_ADDRESS_FAILD,
              payload: {
                data: {},
                type: GUEST_CHECKOUT_ADD_UPDATE_ADDRESS_FAILD,
              },
            });
          }
        })
        .catch((error) => {
          showToast("error", error);
          if (recallCount < MAX_CALLS) {
            recursiveCall();
            recallCount++;
            dispatch({
              type: GUEST_CHECKOUT_ADD_UPDATE_ADDRESS_LONG,
              payload: {
                data: {},
                type: GUEST_CHECKOUT_ADD_UPDATE_ADDRESS_LONG,
              },
            });
          } else {
            dispatch({
              type: GUEST_CHECKOUT_ADD_UPDATE_ADDRESS_FAILD,
              payload: {
                data: {},
                type: GUEST_CHECKOUT_ADD_UPDATE_ADDRESS_FAILD,
              },
            });
          }
        });
    }
    recursiveCall();
  };
}

export function addUpdateDeliveryOptionInCheckout(param: any) {
  let recallCount = 0;
  return (dispatch: any) => {
    dispatch({
      type: GUEST_CHECKOUT_ADD_UPDATE_DELIVERY_OPTION_REQUEST,
      payload: { type: GUEST_CHECKOUT_ADD_UPDATE_DELIVERY_OPTION_REQUEST },
    });
    function recursiveCall() {
      api
        .post(`${END_POINTS.getCheckoutList}`, param)
        .then((result) => {
          if (result.data.statusCode === SUCCESS_RESPONSE_CODE) {
            showToast(
              "success",
              COMMON.CHECKOUT_DELIVERY_OPTION_UPDATED_SUCCESSFULLY
            );
            dispatch({
              type: GUEST_CHECKOUT_ADD_UPDATE_DELIVERY_OPTION_SUCCESS,
              payload: {
                data: result.data,
                type: GUEST_CHECKOUT_ADD_UPDATE_DELIVERY_OPTION_SUCCESS,
              },
            });

            let quoteId = localStorage.getItem(localStorageConstant.QUOTE_ID)
              ? localStorage.getItem(localStorageConstant.QUOTE_ID)
              : "";
            dispatch(myCart({ quoteId: quoteId }));
          } else if (recallCount < MAX_CALLS) {
            recursiveCall();
            recallCount++;
            dispatch({
              type: GUEST_CHECKOUT_ADD_UPDATE_DELIVERY_OPTION_LONG,
              payload: {
                data: {},
                type: GUEST_CHECKOUT_ADD_UPDATE_DELIVERY_OPTION_LONG,
              },
            });
          } else {
            showToast("error", result.data.message);
            dispatch({
              type: GUEST_CHECKOUT_ADD_UPDATE_DELIVERY_OPTION_FAILD,
              payload: {
                data: {},
                type: GUEST_CHECKOUT_ADD_UPDATE_DELIVERY_OPTION_FAILD,
              },
            });
          }
        })
        .catch((error) => {
          showToast("error", error);
          if (recallCount < MAX_CALLS) {
            recursiveCall();
            recallCount++;
            dispatch({
              type: GUEST_CHECKOUT_ADD_UPDATE_DELIVERY_OPTION_LONG,
              payload: {
                data: {},
                type: GUEST_CHECKOUT_ADD_UPDATE_DELIVERY_OPTION_LONG,
              },
            });
          } else {
            dispatch({
              type: GUEST_CHECKOUT_ADD_UPDATE_DELIVERY_OPTION_FAILD,
              payload: {
                data: {},
                type: GUEST_CHECKOUT_ADD_UPDATE_DELIVERY_OPTION_FAILD,
              },
            });
          }
        });
    }
    recursiveCall();
  };
}

export function placeOrder(param: any) {
  let recallCount = 0;
  return (dispatch: any) => {
    dispatch({
      type: CHECKOUT_PLACE_ORDER_REQUEST,
      payload: { type: CHECKOUT_PLACE_ORDER_REQUEST },
    });
    function recursiveCall() {
      api
        .post(`${END_POINTS.placeOrder}`, param)
        .then(async (result) => {
          if (result.data.statusCode === SUCCESS_RESPONSE_CODE) {
            console.log("param ", param);
            const facebookPixel = {
              event_name: "Purchase",
              order_id: result.data?.orderId,
              country: "USD",
              event_source_url: window.location.href,
              currency: "$",
              value: result.data?.ordergrandtotal,
              em: param.email,
              fn: param.firstName,
              ln: param.lastName,
              ip_address: await getIPFromIPFY(),
            };
            console.log("facebookPixel ", facebookPixel);
            try {
              await axios.post(`${END_POINTS.facebookPixel}`, facebookPixel);
              console.log("TRIGGER FACEBOOK PIXEL EVENT");
            } catch (error) {
              console.error("ERROR WHILE TRIGGERING FACEBOOK EVENT ", error);
            }
            showToast("success", result.data.message);
            dispatch({
              type: CHECKOUT_PLACE_ORDER_SUCCESS,
              payload: {
                data: result.data,
                type: CHECKOUT_PLACE_ORDER_SUCCESS,
              },
            });

            dispatch({
              type: GUEST_CHECKOUT_ADD_UPDATE_ADDRESS_CLEAR,
            });

            Object.keys(localStorage).forEach((key) => {
              if (key != USER) localStorage.removeItem(key);
            });

            dispatch({
              type: CART_COUNT_GLOBAL,
              payload: { data: "0" },
            });

            dispatch(myCart({ quoteId: "" }));
          } else if (recallCount < MAX_CALLS) {
            recursiveCall();
            recallCount++;
            dispatch({
              type: CHECKOUT_PLACE_ORDER_LONG,
              payload: { data: {}, type: CHECKOUT_PLACE_ORDER_LONG },
            });
          } else {
            showToast("error", result.data.message);
            dispatch({
              type: CHECKOUT_PLACE_ORDER_FAILD,
              payload: { data: {}, type: CHECKOUT_PLACE_ORDER_FAILD },
            });
          }
        })
        .catch((error) => {
          showToast("error", error);
          if (recallCount < MAX_CALLS) {
            recursiveCall();
            recallCount++;
            dispatch({
              type: CHECKOUT_PLACE_ORDER_LONG,
              payload: { data: {}, type: CHECKOUT_PLACE_ORDER_LONG },
            });
          } else {
            dispatch({
              type: CHECKOUT_PLACE_ORDER_FAILD,
              payload: { data: {}, type: CHECKOUT_PLACE_ORDER_FAILD },
            });
          }
        });
    }
    recursiveCall();
  };
}

export function addAddressForLoggedInUserInCheckout(param: any) {
  let recallCount = 0;
  return (dispatch: any) => {
    dispatch({
      type: ADD_ADDRESS_IN_CHECKOUT_FOR_LOGGED_IN_USER_REQUEST,
      payload: { type: ADD_ADDRESS_IN_CHECKOUT_FOR_LOGGED_IN_USER_REQUEST },
    });
    function recursiveCall() {
      return api
        .post(END_POINTS.updateAddress, param)
        .then((result) => {
          if (result.data.statusCode === SUCCESS_RESPONSE_CODE) {
            showToast("success", result.data.message);
            dispatch({
              type: ADD_ADDRESS_IN_CHECKOUT_FOR_LOGGED_IN_USER_SUCCESS,
              payload: {
                data: result.data,
                type: ADD_ADDRESS_IN_CHECKOUT_FOR_LOGGED_IN_USER_SUCCESS,
              },
            });
          } else if (recallCount < MAX_CALLS) {
            recursiveCall();
            recallCount++;
            dispatch({
              type: ADD_ADDRESS_IN_CHECKOUT_FOR_LOGGED_IN_USER_LONG,
              payload: {
                data: {},
                type: ADD_ADDRESS_IN_CHECKOUT_FOR_LOGGED_IN_USER_LONG,
              },
            });
          } else {
            dispatch({
              type: ADD_ADDRESS_IN_CHECKOUT_FOR_LOGGED_IN_USER_FAILD,
              payload: {
                data: {},
                type: ADD_ADDRESS_IN_CHECKOUT_FOR_LOGGED_IN_USER_FAILD,
              },
            });
          }
        })
        .catch((error) => {
          showToast("error", error);
          if (recallCount < MAX_CALLS) {
            recursiveCall();
            recallCount++;
            dispatch({
              type: ADD_ADDRESS_IN_CHECKOUT_FOR_LOGGED_IN_USER_LONG,
              payload: {
                data: {},
                type: ADD_ADDRESS_IN_CHECKOUT_FOR_LOGGED_IN_USER_LONG,
              },
            });
          } else {
            dispatch({
              type: ADD_ADDRESS_IN_CHECKOUT_FOR_LOGGED_IN_USER_FAILD,
              payload: {
                data: {},
                type: ADD_ADDRESS_IN_CHECKOUT_FOR_LOGGED_IN_USER_FAILD,
              },
            });
          }
        });
    }
    recursiveCall();
  };
}

export function quoteUpdateAddress(param: any) {
  let recallCount = 0;
  return (dispatch: any) => {
    dispatch({
      type: QUOTE_ADDRESS_UPDATE_REQUEST,
      payload: { type: QUOTE_ADDRESS_UPDATE_REQUEST },
    });
    function recursiveCall() {
      return api
        .post(END_POINTS.quoteUpdateAddress, param)
        .then((result) => {
          if (result.data.statusCode === SUCCESS_RESPONSE_CODE) {
            showToast("success", result.data.message);
            dispatch({
              type: QUOTE_ADDRESS_UPDATE_SUCCESS,
              payload: {
                data: result.data,
                type: QUOTE_ADDRESS_UPDATE_SUCCESS,
              },
            });
          } else if (recallCount < MAX_CALLS) {
            recursiveCall();
            recallCount++;
            dispatch({
              type: QUOTE_ADDRESS_UPDATE_LONG,
              payload: { data: {}, type: QUOTE_ADDRESS_UPDATE_LONG },
            });
          } else {
            dispatch({
              type: QUOTE_ADDRESS_UPDATE_FAILD,
              payload: { data: {}, type: QUOTE_ADDRESS_UPDATE_FAILD },
            });
          }
        })
        .catch((error) => {
          showToast("error", error);
          if (recallCount < MAX_CALLS) {
            recursiveCall();
            recallCount++;
            dispatch({
              type: QUOTE_ADDRESS_UPDATE_LONG,
              payload: { data: {}, type: QUOTE_ADDRESS_UPDATE_LONG },
            });
          } else {
            dispatch({
              type: QUOTE_ADDRESS_UPDATE_FAILD,
              payload: { data: {}, type: QUOTE_ADDRESS_UPDATE_FAILD },
            });
          }
        });
    }
    recursiveCall();
  };
}

export const createPaypalExpressTokenAction = () => {
  let recallCount = 0;
  return (dispatch: any) => {
    dispatch({
      type: CREATE_PAYPAL_EXPRESS_TOKEN_REQUEST,
      payload: { type: CREATE_PAYPAL_EXPRESS_TOKEN_REQUEST },
    });
    function recursiveCall() {
      let quoteId = localStorage.getItem(localStorageConstant.QUOTE_ID)
      ? localStorage.getItem(localStorageConstant.QUOTE_ID)
      : "";
       let userInfo : any = localStorage.getItem(USER)
       userInfo = JSON.parse(userInfo)
      return api
        .post(END_POINTS.createPaypalExpression, {cart_id:quoteId , cancel_url:"checkout",return_url:"checkout/onepage/success.html"},{
          'Authorization':`Bearer ${userInfo?.customerToken}`
      })
        .then((result) => {
          console.log(result , "result.data")
          if (result.data[0].statusCode === SUCCESS_RESPONSE_CODE) {
            // showToast("success", result.data.message);
            dispatch({
              type: CREATE_PAYPAL_EXPRESS_TOKEN_SUCCESS,
              payload: {
                data: result.data[0],
                type: CREATE_PAYPAL_EXPRESS_TOKEN_SUCCESS,
              },
            });
          } else if (recallCount < MAX_CALLS) {
            recursiveCall();
            recallCount++;
            dispatch({
              type: CREATE_PAYPAL_EXPRESS_TOKEN_LONG,
              payload: {
                data: {},
                type: CREATE_PAYPAL_EXPRESS_TOKEN_LONG,
              },
            });
          } else {
            showToast("error", result.data?.message);
            dispatch({
              type: CREATE_PAYPAL_EXPRESS_TOKEN_FAILED,
              payload: {
                data: {},
                type: CREATE_PAYPAL_EXPRESS_TOKEN_FAILED,
              },
            });
          }
        })
        .catch((error) => {
          showToast("error", error);
          if (recallCount < MAX_CALLS) {
            recursiveCall();
            recallCount++;
            dispatch({
              type: CREATE_PAYPAL_EXPRESS_TOKEN_LONG,
              payload: {
                data: {},
                type: CREATE_PAYPAL_EXPRESS_TOKEN_LONG,
              },
            });
          } else {
            dispatch({
              type: CREATE_PAYPAL_EXPRESS_TOKEN_FAILED,
              payload: {
                data: {},
                type: CREATE_PAYPAL_EXPRESS_TOKEN_FAILED,
              },
            });
          }
        });
    }
    recursiveCall();
  };
};

export const paypalExpressPlaceOrderAction = (param:any) => {
  let recallCount = 0;
  return (dispatch: any) => {
    dispatch({
      type: PAYPAL_EXPRESS_ORDER_REQUEST,
      payload: { type: PAYPAL_EXPRESS_ORDER_REQUEST },
    });
    function recursiveCall() {
      return api
        .post(END_POINTS.paypalExpressCreateOrder, param)
        .then((result) => {
          if (result.data.statusCode === SUCCESS_RESPONSE_CODE) {
            showToast("success", result.data.message);
            dispatch({
              type: PAYPAL_EXPRESS_ORDER_SUCCESS,
              payload: {
                data: result.data,
                type: PAYPAL_EXPRESS_ORDER_SUCCESS,
              },
            });
          } else if (recallCount < MAX_CALLS) {
            recursiveCall();
            recallCount++;
            dispatch({
              type: PAYPAL_EXPRESS_ORDER_LONG,
              payload: {
                data: {},
                type: PAYPAL_EXPRESS_ORDER_LONG,
              },
            });
          } else {
            dispatch({
              type: PAYPAL_EXPRESS_ORDER_FAILED,
              payload: {
                data: {},
                type: PAYPAL_EXPRESS_ORDER_FAILED,
              },
            });
          }
        })
        .catch((error) => {
          showToast("error", error);
          if (recallCount < MAX_CALLS) {
            recursiveCall();
            recallCount++;
            dispatch({
              type: CREATE_PAYPAL_EXPRESS_TOKEN_LONG,
              payload: {
                data: {},
                type: CREATE_PAYPAL_EXPRESS_TOKEN_LONG,
              },
            });
          } else {
            dispatch({
              type: CREATE_PAYPAL_EXPRESS_TOKEN_FAILED,
              payload: {
                data: {},
                type: CREATE_PAYPAL_EXPRESS_TOKEN_FAILED,
              },
            });
          }
        });
    }
    recursiveCall();
  };
};

export const createApplePayPaymentIntentAction = () => {
  let recallCount = 0;
  let quoteId = localStorage.getItem(localStorageConstant.QUOTE_ID)
  ? localStorage.getItem(localStorageConstant.QUOTE_ID)
  : "";
   let userInfo : any = localStorage.getItem(USER)
   userInfo = JSON.parse(userInfo);
   
  return (dispatch: any) => {
    dispatch({
      type: CREATE_APPLE_PAY_PAYMENT_INTENT_REQUEST,
      payload: { type: CREATE_APPLE_PAY_PAYMENT_INTENT_REQUEST },
    });
    function recursiveCall() {
      return api
        .post(END_POINTS.createApplePayPaymentIntent, {qutoe_id:quoteId})
        .then((result) => {
          if (result.data.statusCode === SUCCESS_RESPONSE_CODE) {
            // showToast("success", result.data.message);
            dispatch({
              type: CREATE_APPLE_PAY_PAYMENT_INTENT_SUCCESS,
              payload: {
                data: result.data,
                type: CREATE_APPLE_PAY_PAYMENT_INTENT_SUCCESS,
              },
            });
          } else if (recallCount < MAX_CALLS) {
            recursiveCall();
            recallCount++;
            dispatch({
              type: CREATE_APPLE_PAY_PAYMENT_INTENT_LONG,
              payload: {
                data: {},
                type: CREATE_APPLE_PAY_PAYMENT_INTENT_LONG,
              },
            });
          } else {
            dispatch({
              type: CREATE_APPLE_PAY_PAYMENT_INTENT_FAILED,
              payload: {
                data: {},
                type: CREATE_APPLE_PAY_PAYMENT_INTENT_FAILED,
              },
            });
          }
        })
        .catch((error) => {
          showToast("error", error);
          if (recallCount < MAX_CALLS) {
            recursiveCall();
            recallCount++;
            dispatch({
              type: CREATE_APPLE_PAY_PAYMENT_INTENT_LONG,
              payload: {
                data: {},
                type: CREATE_APPLE_PAY_PAYMENT_INTENT_LONG,
              },
            });
          } else {
            dispatch({
              type: CREATE_APPLE_PAY_PAYMENT_INTENT_FAILED,
              payload: {
                data: {},
                type: CREATE_APPLE_PAY_PAYMENT_INTENT_FAILED,
              },
            });
          }
        });
    }
    recursiveCall();
  };
};
