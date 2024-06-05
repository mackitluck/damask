import axios from "axios";
import { END_POINTS, MAX_CALLS } from "../../Constant/Api";
import { MASTER_API } from "../../Constant/Config";
import { SUCCESS_RESPONSE_CODE } from "../../Constant/Status";
import api from "../../Service/Axios";
import { getIPFromIPFY, showToast } from "../../Utility/General";
import * as localStorageConstant from "../../Constant/LocalStorage";
import {
  ADD_REMOVE_WISH_LIST_FAILD,
  ADD_REMOVE_WISH_LIST_LONG,
  ADD_REMOVE_WISH_LIST_REQUEST,
  ADD_REMOVE_WISH_LIST_SUCCESS,
  CART_COUNT_GLOBAL,
  DEFAULT_PARAMETER,
  GET_META_TITLE_SUCCESS,
  MASTER_FAILD,
  MASTER_LONG,
  MASTER_REQUEST,
  MASTER_SUCCESS,
  MINI_CART_FALSE,
  MINI_CART_TRUE,
  NEWSLETTER_SUBSCRIPTION_FAILD,
  NEWSLETTER_SUBSCRIPTION_FOR_FOOTER_FAILD,
  NEWSLETTER_SUBSCRIPTION_FOR_FOOTER_LONG,
  NEWSLETTER_SUBSCRIPTION_FOR_FOOTER_REQUEST,
  NEWSLETTER_SUBSCRIPTION_FOR_FOOTER_SUCCESS,
  NEWSLETTER_SUBSCRIPTION_LONG,
  NEWSLETTER_SUBSCRIPTION_REQUEST,
  NEWSLETTER_SUBSCRIPTION_SUCCESS,
} from "./GeneralType";

export function getMaster(params: any) {
  let recallCount = 0;
  return (dispatch: any) => {
    dispatch({
      type: MASTER_REQUEST,
      payload: { type: MASTER_REQUEST },
    });
    function recursiveCall() {
      api
        .post(MASTER_API, params)
        .then((result) => {
          if (result.data.statusCode === SUCCESS_RESPONSE_CODE) {
            dispatch({
              type: MASTER_SUCCESS,
              payload: { data: result.data, type: MASTER_SUCCESS },
            });
            dispatch({
              type: CART_COUNT_GLOBAL,
              payload: { data: result.data?.cartCount },
            });
          } else if (recallCount < MAX_CALLS) {
            recursiveCall();
            recallCount++;
            dispatch({
              type: MASTER_LONG,
              payload: { data: {}, type: MASTER_LONG },
            });
          } else {
            dispatch({
              type: MASTER_FAILD,
              payload: { data: {}, type: MASTER_FAILD },
            });
          }
        })
        .catch((error) => {
          if (recallCount < MAX_CALLS) {
            recursiveCall();
            recallCount++;
            dispatch({
              type: MASTER_LONG,
              payload: { data: {}, type: MASTER_LONG },
            });
          } else {
            dispatch({
              type: MASTER_FAILD,
              payload: { data: {}, type: MASTER_FAILD },
            });
          }
        });
    }
    recursiveCall();
  };
}

export const showMinicart = {
  type: MINI_CART_TRUE,
  payload: true,
};

export const hideMinicart = {
  type: MINI_CART_FALSE,
  payload: false,
};

export function defaultParameterAction(param: any) {
  return (dispatch: any) => {
    dispatch({
      type: DEFAULT_PARAMETER,
      payload: { data: param, type: DEFAULT_PARAMETER },
    });
  };
}

export function newsletterSubscriptionAction(param: any) {
  let recallCount = 0;
  return (dispatch: any) => {
    dispatch({
      type: NEWSLETTER_SUBSCRIPTION_REQUEST,
      payload: { type: NEWSLETTER_SUBSCRIPTION_REQUEST },
    });
    function recursiveCall() {
      api
        .post(END_POINTS.newsletterSubscription, param)
        .then((result) => {
          if (result.data.statusCode === SUCCESS_RESPONSE_CODE) {
            showToast("success", result.data.message);
            dispatch({
              type: NEWSLETTER_SUBSCRIPTION_SUCCESS,
              payload: {
                data: result.data,
                type: NEWSLETTER_SUBSCRIPTION_SUCCESS,
              },
            });
          } else if (recallCount < MAX_CALLS) {
            recursiveCall();
            recallCount++;
            dispatch({
              type: NEWSLETTER_SUBSCRIPTION_LONG,
              payload: { data: {}, type: NEWSLETTER_SUBSCRIPTION_LONG },
            });
          } else {
            showToast("error", result.data.message);
            dispatch({
              type: NEWSLETTER_SUBSCRIPTION_FAILD,
              payload: { data: {}, type: NEWSLETTER_SUBSCRIPTION_FAILD },
            });
          }
        })
        .catch((error) => {
          showToast("error", error);
          if (recallCount < MAX_CALLS) {
            recursiveCall();
            recallCount++;
            dispatch({
              type: NEWSLETTER_SUBSCRIPTION_LONG,
              payload: { data: {}, type: NEWSLETTER_SUBSCRIPTION_LONG },
            });
          } else {
            dispatch({
              type: NEWSLETTER_SUBSCRIPTION_FAILD,
              payload: { data: {}, type: NEWSLETTER_SUBSCRIPTION_FAILD },
            });
          }
        });
    }
    recursiveCall();
  };
}

export function newsletterSubscriptionForFooterAction(param: any) {
  let recallCount = 0;
  return (dispatch: any) => {
    dispatch({
      type: NEWSLETTER_SUBSCRIPTION_FOR_FOOTER_REQUEST,
      payload: { type: NEWSLETTER_SUBSCRIPTION_FOR_FOOTER_REQUEST },
    });
    function recursiveCall() {
      api
        .post(END_POINTS.newsletterSubscription, param)
        .then((result) => {
          if (result.data.statusCode === SUCCESS_RESPONSE_CODE) {
            showToast("success", result.data.message);
            dispatch({
              type: NEWSLETTER_SUBSCRIPTION_FOR_FOOTER_SUCCESS,
              payload: {
                data: result.data,
                type: NEWSLETTER_SUBSCRIPTION_FOR_FOOTER_SUCCESS,
              },
            });
          } else if (recallCount < MAX_CALLS) {
            recursiveCall();
            recallCount++;
            dispatch({
              type: NEWSLETTER_SUBSCRIPTION_FOR_FOOTER_LONG,
              payload: {
                data: {},
                type: NEWSLETTER_SUBSCRIPTION_FOR_FOOTER_LONG,
              },
            });
          } else {
            showToast("error", result.data.message);
            dispatch({
              type: NEWSLETTER_SUBSCRIPTION_FOR_FOOTER_FAILD,
              payload: {
                data: {},
                type: NEWSLETTER_SUBSCRIPTION_FOR_FOOTER_FAILD,
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
              type: NEWSLETTER_SUBSCRIPTION_FOR_FOOTER_LONG,
              payload: {
                data: {},
                type: NEWSLETTER_SUBSCRIPTION_FOR_FOOTER_LONG,
              },
            });
          } else {
            dispatch({
              type: NEWSLETTER_SUBSCRIPTION_FOR_FOOTER_FAILD,
              payload: {
                data: {},
                type: NEWSLETTER_SUBSCRIPTION_FOR_FOOTER_FAILD,
              },
            });
          }
        });
    }
    recursiveCall();
  };
}

export function addRemoveWishListAction(param: any, price = 0) {
  let recallCount = 0;
  return (dispatch: any) => {
    dispatch({
      type: ADD_REMOVE_WISH_LIST_REQUEST,
      payload: { type: ADD_REMOVE_WISH_LIST_REQUEST },
    });
    function recursiveCall() {
      api
        .post(END_POINTS.addRemoveWishlist, param)
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
              type: ADD_REMOVE_WISH_LIST_SUCCESS,
              payload: {
                data: result.data,
                type: ADD_REMOVE_WISH_LIST_SUCCESS,
              },
            });
          } else if (recallCount < MAX_CALLS) {
            recursiveCall();
            recallCount++;
            dispatch({
              type: ADD_REMOVE_WISH_LIST_LONG,
              payload: { data: {}, type: ADD_REMOVE_WISH_LIST_LONG },
            });
          } else {
            showToast("error", result.data.message);
            dispatch({
              type: ADD_REMOVE_WISH_LIST_FAILD,
              payload: { data: {}, type: ADD_REMOVE_WISH_LIST_FAILD },
            });
          }
        })
        .catch((error) => {
          showToast("error", error);
          if (recallCount < MAX_CALLS) {
            recursiveCall();
            recallCount++;
            dispatch({
              type: ADD_REMOVE_WISH_LIST_LONG,
              payload: { data: {}, type: ADD_REMOVE_WISH_LIST_LONG },
            });
          } else {
            dispatch({
              type: ADD_REMOVE_WISH_LIST_FAILD,
              payload: { data: {}, type: ADD_REMOVE_WISH_LIST_FAILD },
            });
          }
        });
    }
    recursiveCall();
  };
}

export const getMetaTitleDetail = (payload: any) => {
  return async (dispatch: any) => {
    try {
      const result = await api.post(`${END_POINTS.getMetaInfo}`, payload);

      if (result.data.statusCode === SUCCESS_RESPONSE_CODE) {
        dispatch({
          type: GET_META_TITLE_SUCCESS,
          payload: {
            type: GET_META_TITLE_SUCCESS,
            data: result.data,
          },
        });
      } else {
        // showToast("error", result.data.message);
      }
    } catch (error: any) {
      // showToast("error", error.message);
    }
  };
};
