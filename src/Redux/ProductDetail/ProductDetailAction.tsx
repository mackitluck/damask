import { useNavigate } from "react-router-dom";
import { END_POINTS, MAX_CALLS } from "../../Constant/Api";
import { USER } from "../../Constant/LocalStorage";
import {
  NO_DATA_ERROR_CODE,
  SUCCESS_RESPONSE_CODE,
} from "../../Constant/Status";
import api from "../../Service/Axios";
import { getIPFromIPFY, showToast } from "../../Utility/General";
import { CART_COUNT_GLOBAL, QUOTE_ID_GLOBAL } from "../General/GeneralType";
import { myCart } from "../MyCart/MyCartAction";
import {
  PRODUCT_DETAIL_FAILD,
  PRODUCT_DETAIL_LONG,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_NO_DATA,
  PRODUCT_REVIEW_REQUEST,
  PRODUCT_REVIEW_SUCCESS,
  PRODUCT_REVIEW_LONG,
  PRODUCT_REVIEW_NO_DATA,
  PRODUCT_REVIEW_FAILD,
  ADD_PRODUCT_REVIEW_REQUEST,
  ADD_PRODUCT_REVIEW_SUCCESS,
  ADD_PRODUCT_REVIEW_LONG,
  ADD_PRODUCT_REVIEW_NO_DATA,
  ADD_PRODUCT_REVIEW_FAILD,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_LONG,
  ADD_TO_CART_NO_DATA,
  ADD_TO_CART_FAILD,
  SELECT_VARIENT_FAILD,
  SELECT_VARIENT_LONG,
  SELECT_VARIENT_SUCCESS,
  SELECT_VARIENT_NO_DATA,
  SELECT_VARIENT_REQUEST,
  NOTIFY_ME_REQUEST,
  NOTIFY_ME_SUCCESS,
  NOTIFY_ME_LONG,
  NOTIFY_ME_FAILD,
  NOTIFY_ME_NO_DATA,
} from "./ProductDetailTypes";
import * as localStorageConstant from "../../Constant/LocalStorage";

export function productDetailAction(queryParam: any) {
  let recallCount = 0;
  return (dispatch: any) => {
    dispatch({
      type: PRODUCT_DETAIL_REQUEST,
      payload: { type: PRODUCT_DETAIL_REQUEST },
    });
    function recursiveCall() {
      api
        .get(`${END_POINTS.productDetail + queryParam}`, {})
        .then((result) => {
          if (result.data.statusCode === SUCCESS_RESPONSE_CODE) {
            dispatch({
              type: PRODUCT_DETAIL_SUCCESS,
              payload: { data: result.data, type: PRODUCT_DETAIL_SUCCESS },
            });
          } else if (recallCount < MAX_CALLS) {
            recursiveCall();
            recallCount++;
            dispatch({
              type: PRODUCT_DETAIL_LONG,
              payload: { data: {}, type: PRODUCT_DETAIL_LONG },
            });
          } else if (result.data.errorCode === NO_DATA_ERROR_CODE) {
            dispatch({
              type: PRODUCT_DETAIL_NO_DATA,
              payload: { data: result.data, type: PRODUCT_DETAIL_NO_DATA },
            });
          } else {
            dispatch({
              type: PRODUCT_DETAIL_FAILD,
              payload: { data: {}, type: PRODUCT_DETAIL_FAILD },
            });
          }
        })
        .catch((error) => {
          showToast("error", error);
          if (recallCount < MAX_CALLS) {
            recursiveCall();
            recallCount++;
            dispatch({
              type: PRODUCT_DETAIL_LONG,
              payload: { data: {}, type: PRODUCT_DETAIL_LONG },
            });
          } else {
            dispatch({
              type: PRODUCT_DETAIL_FAILD,
              payload: { data: {}, type: PRODUCT_DETAIL_FAILD },
            });
          }
        });
    }
    recursiveCall();
  };
}

export function productReviewAction(param: any) {
  let recallCount = 0;
  return (dispatch: any) => {
    dispatch({
      type: PRODUCT_REVIEW_REQUEST,
      payload: { type: PRODUCT_REVIEW_REQUEST },
    });
    function recursiveCall() {
      api
        .post(`${END_POINTS.getProductReview}`, param)
        .then((result) => {
          if (result.data.statusCode === SUCCESS_RESPONSE_CODE) {
            dispatch({
              type: PRODUCT_REVIEW_SUCCESS,
              payload: { data: result.data, type: PRODUCT_REVIEW_SUCCESS },
            });
          } else if (recallCount < MAX_CALLS) {
            recursiveCall();
            recallCount++;
            dispatch({
              type: PRODUCT_REVIEW_LONG,
              payload: { data: {}, type: PRODUCT_REVIEW_LONG },
            });
          } else if (result.data.errorCode === NO_DATA_ERROR_CODE) {
            dispatch({
              type: PRODUCT_REVIEW_NO_DATA,
              payload: { data: result.data, type: PRODUCT_REVIEW_NO_DATA },
            });
          } else {
            dispatch({
              type: PRODUCT_REVIEW_FAILD,
              payload: { data: {}, type: PRODUCT_REVIEW_FAILD },
            });
          }
        })
        .catch((error) => {
          showToast("error", error);
          if (recallCount < MAX_CALLS) {
            recursiveCall();
            recallCount++;
            dispatch({
              type: PRODUCT_REVIEW_LONG,
              payload: { data: {}, type: PRODUCT_REVIEW_LONG },
            });
          } else {
            dispatch({
              type: PRODUCT_REVIEW_FAILD,
              payload: { data: {}, type: PRODUCT_REVIEW_FAILD },
            });
          }
        });
    }
    recursiveCall();
  };
}

export function addProductReviewAction(param: any) {
  let recallCount = 0;
  return (dispatch: any) => {
    dispatch({
      type: ADD_PRODUCT_REVIEW_REQUEST,
      payload: { type: ADD_PRODUCT_REVIEW_REQUEST },
    });
    function recursiveCall() {
      api
        .post(`${END_POINTS.addProductReview}`, param)
        .then((result) => {
          if (result.data.statusCode === SUCCESS_RESPONSE_CODE) {
            showToast("success", result.data.message);
            dispatch({
              type: ADD_PRODUCT_REVIEW_SUCCESS,
              payload: { data: result.data, type: ADD_PRODUCT_REVIEW_SUCCESS },
            });
          } else if (recallCount < MAX_CALLS) {
            recursiveCall();
            recallCount++;
            dispatch({
              type: ADD_PRODUCT_REVIEW_LONG,
              payload: { data: {}, type: ADD_PRODUCT_REVIEW_LONG },
            });
          } else if (result.data.errorCode === NO_DATA_ERROR_CODE) {
            dispatch({
              type: ADD_PRODUCT_REVIEW_NO_DATA,
              payload: { data: result.data, type: ADD_PRODUCT_REVIEW_NO_DATA },
            });
          } else {
            dispatch({
              type: ADD_PRODUCT_REVIEW_FAILD,
              payload: { data: {}, type: ADD_PRODUCT_REVIEW_FAILD },
            });
          }
        })
        .catch((error) => {
          showToast("error", error);
          if (recallCount < MAX_CALLS) {
            recursiveCall();
            recallCount++;
            dispatch({
              type: ADD_PRODUCT_REVIEW_LONG,
              payload: { data: {}, type: ADD_PRODUCT_REVIEW_LONG },
            });
          } else {
            dispatch({
              type: ADD_PRODUCT_REVIEW_FAILD,
              payload: { data: {}, type: ADD_PRODUCT_REVIEW_FAILD },
            });
          }
        });
    }
    recursiveCall();
  };
}

export function addToCartAction(param: any, price = 0) {
  let recallCount = 0;
  return (dispatch: any) => {
    dispatch({
      type: ADD_TO_CART_REQUEST,
      payload: { type: ADD_TO_CART_REQUEST },
    });
    function recursiveCall() {
      api
        .post(`${END_POINTS.addToCart}`, param)
        .then(async (result) => {
          if (result.data.statusCode === SUCCESS_RESPONSE_CODE) {
            showToast("success", result.data.message);
            let facebookPixel: any = {
              event_name: "AddToCart",
              product_id: result.data?.productId,
              event_source_url: window.location.href,
              country: "USD",
              currency: "",
              value: price,
            };
            if (
              !localStorage.getItem(localStorageConstant.USER) &&
              !localStorage.getItem(localStorageConstant.QUOTE_ID)
            )
              localStorage.setItem(
                localStorageConstant.QUOTE_ID,
                result.data?.quoteId ? result.data?.quoteId : ""
              );

            const uData: any = localStorage.getItem(localStorageConstant.USER);
            let userData = JSON.parse(uData);
            if (userData) {
              facebookPixel["em"] = userData.email;
              facebookPixel["fn"] = userData.firstName;
              facebookPixel["ln"] = userData.lastName;
              userData.cartCount = result.data.cartCount;
              facebookPixel["em"] = userData.email;
            }
            facebookPixel["currency"] = "$";
            facebookPixel["ip_address"] = await getIPFromIPFY();
            console.log("ADD TO CART >>> facebookPixel >> ", facebookPixel);
            try {
              await api.post(`${END_POINTS.facebookPixel}`, facebookPixel);
              console.log("TRIGGER FACEBOOK PIXEL EVENT");
            } catch (error) {
              console.error("ERROR WHILE TRIGGERING FACEBOOK EVENT ", error);
            }
            dispatch({
              type: ADD_TO_CART_SUCCESS,
              payload: { data: result.data, type: ADD_TO_CART_SUCCESS },
            });

            dispatch({
              type: CART_COUNT_GLOBAL,
              payload: { data: result.data?.cartCount },
            });

            let quoteId = localStorage.getItem(localStorageConstant.QUOTE_ID)
              ? localStorage.getItem(localStorageConstant.QUOTE_ID)
              : "";
            dispatch(myCart({ quoteId: quoteId }));

            dispatch({
              type: QUOTE_ID_GLOBAL,
              payload: { data: quoteId },
            });
          } else if (recallCount < MAX_CALLS) {
            recursiveCall();
            recallCount++;
            dispatch({
              type: ADD_TO_CART_LONG,
              payload: { data: {}, type: ADD_TO_CART_LONG },
            });
          } else if (result.data.errorCode === NO_DATA_ERROR_CODE) {
            dispatch({
              type: ADD_TO_CART_NO_DATA,
              payload: { data: result.data, type: ADD_TO_CART_NO_DATA },
            });
          } else {
            showToast("error", result.data.message);
            dispatch({
              type: ADD_TO_CART_FAILD,
              payload: { data: {}, type: ADD_TO_CART_FAILD },
            });
          }
        })
        .catch((error) => {
          showToast("error", error);
          if (recallCount < MAX_CALLS) {
            recursiveCall();
            recallCount++;
            dispatch({
              type: ADD_TO_CART_LONG,
              payload: { data: {}, type: ADD_TO_CART_LONG },
            });
          } else {
            dispatch({
              type: ADD_TO_CART_FAILD,
              payload: { data: {}, type: ADD_TO_CART_FAILD },
            });
          }
        });
    }
    recursiveCall();
  };
}

export function selectVarientAction(param: any) {
  let recallCount = 0;
  return (dispatch: any) => {
    dispatch({
      type: SELECT_VARIENT_REQUEST,
      payload: { type: SELECT_VARIENT_REQUEST },
    });
    function recursiveCall() {
      api
        .post(`${END_POINTS.selectVarient}`, param)
        .then((result) => {
          if (result.data.statusCode === SUCCESS_RESPONSE_CODE) {
            dispatch({
              type: SELECT_VARIENT_SUCCESS,
              payload: { data: result.data, type: SELECT_VARIENT_SUCCESS },
            });
          } else if (recallCount < MAX_CALLS) {
            recursiveCall();
            recallCount++;
            dispatch({
              type: SELECT_VARIENT_LONG,
              payload: { data: {}, type: SELECT_VARIENT_LONG },
            });
          } else if (result.data.errorCode === NO_DATA_ERROR_CODE) {
            dispatch({
              type: SELECT_VARIENT_NO_DATA,
              payload: { data: result.data, type: SELECT_VARIENT_NO_DATA },
            });
          } else {
            dispatch({
              type: SELECT_VARIENT_FAILD,
              payload: { data: {}, type: SELECT_VARIENT_FAILD },
            });
          }
        })
        .catch((error) => {
          showToast("error", error);
          if (recallCount < MAX_CALLS) {
            recursiveCall();
            recallCount++;
            dispatch({
              type: SELECT_VARIENT_LONG,
              payload: { data: {}, type: SELECT_VARIENT_LONG },
            });
          } else {
            dispatch({
              type: SELECT_VARIENT_FAILD,
              payload: { data: {}, type: SELECT_VARIENT_FAILD },
            });
          }
        });
    }
    recursiveCall();
  };
}

export function notifyMeAction(param: any) {
  let recallCount = 0;
  return (dispatch: any) => {
    dispatch({
      type: NOTIFY_ME_REQUEST,
      payload: { type: NOTIFY_ME_REQUEST },
    });
    function recursiveCall() {
      api
        .post(`${END_POINTS.notifyMe}`, param)
        .then((result) => {
          if (result.data.statusCode === SUCCESS_RESPONSE_CODE) {
            showToast("success", result.data.message);
            dispatch({
              type: NOTIFY_ME_SUCCESS,
              payload: { data: result.data, type: NOTIFY_ME_SUCCESS },
            });
          } else if (recallCount < MAX_CALLS) {
            recursiveCall();
            recallCount++;
            dispatch({
              type: NOTIFY_ME_LONG,
              payload: { data: {}, type: NOTIFY_ME_LONG },
            });
          } else if (result.data.errorCode === NO_DATA_ERROR_CODE) {
            dispatch({
              type: NOTIFY_ME_NO_DATA,
              payload: { data: result.data, type: NOTIFY_ME_NO_DATA },
            });
          } else {
            dispatch({
              type: NOTIFY_ME_FAILD,
              payload: { data: {}, type: NOTIFY_ME_FAILD },
            });
          }
        })
        .catch((error) => {
          showToast("error", error);
          if (recallCount < MAX_CALLS) {
            recursiveCall();
            recallCount++;
            dispatch({
              type: NOTIFY_ME_LONG,
              payload: { data: {}, type: NOTIFY_ME_LONG },
            });
          } else {
            dispatch({
              type: NOTIFY_ME_FAILD,
              payload: { data: {}, type: NOTIFY_ME_FAILD },
            });
          }
        });
    }
    recursiveCall();
  };
}
