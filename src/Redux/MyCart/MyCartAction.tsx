import { END_POINTS, MAX_CALLS } from "../../Constant/Api";
import {
  NO_DATA_ERROR_CODE,
  SUCCESS_RESPONSE_CODE,
} from "../../Constant/Status";
import api from "../../Service/Axios";
import { showToast } from "../../Utility/General";
import { CART_COUNT_GLOBAL } from "../General/GeneralType";
import {
  MYCART_REQUEST,
  MYCART_SUCCESS,
  MYCART_FAILD,
  MYCART_CLEAR,
  MYCART_LONG,
  MYCART_GLOBAL,
  ADD_REMOVE_CART_FROM_MINICART_REQUEST,
  ADD_REMOVE_CART_FROM_MINICART_SUCCESS,
  ADD_REMOVE_CART_FROM_MINICART_LONG,
  ADD_REMOVE_CART_FROM_MINICART_NO_DATA,
  ADD_REMOVE_CART_FROM_MINICART_FAILD,
  MYCART_NO_DATA,
} from "./MyCartTypes";
import * as localStorageConstant from "../../Constant/LocalStorage";
import { getCheckoutList } from "../CheckOut/CheckOutAction";

export function myCart(params: any) {
  let recallCount = 0;
  return (dispatch: any) => {
    dispatch({
      type: MYCART_REQUEST,
      payload: { type: MYCART_REQUEST },
    });
    function recursiveCall() {
      return api
        .post(END_POINTS.myCart, params)
        .then((result) => {
          if (result.data.statusCode === SUCCESS_RESPONSE_CODE) {
            /* dispatch({
                        type: MYCART_SUCCESS,
                        payload: { data: result.data, type: MYCART_SUCCESS },
                    }); */

            dispatch({
              type: MYCART_GLOBAL,
              payload: { data: result.data },
            });
          } else if (result.data.errorCode === NO_DATA_ERROR_CODE) {
            /* else if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: MYCART_LONG,
                        payload: { data: {}, type: MYCART_LONG },
                    });
                } */
            dispatch({
              type: MYCART_NO_DATA,
              payload: { data: result.data, type: MYCART_NO_DATA },
            });

            dispatch({
              type: MYCART_GLOBAL,
              payload: { data: result.data },
            });
          } else {
            dispatch({
              type: MYCART_FAILD,
              payload: { data: {}, type: MYCART_FAILD },
            });
          }
        })
        .catch((error) => {
          if (recallCount < MAX_CALLS) {
            recursiveCall();
            recallCount++;
            dispatch({
              type: MYCART_LONG,
              payload: { data: {}, type: MYCART_LONG },
            });
          } else {
            dispatch({
              type: MYCART_FAILD,
              payload: { data: {}, type: MYCART_FAILD },
            });
          }
        });
    }
    recursiveCall();
  };
}

export function addRemoveCartAction(param: any) {
  let recallCount = 0;
  return (dispatch: any) => {
    dispatch({
      type: ADD_REMOVE_CART_FROM_MINICART_REQUEST,
      payload: { type: ADD_REMOVE_CART_FROM_MINICART_REQUEST },
    });
    function recursiveCall() {
      api
        .post(`${END_POINTS.addToCart}`, param)
        .then((result) => {
          if (result.data.statusCode === SUCCESS_RESPONSE_CODE) {
            //showToast('success', result.data.message)
            dispatch({
              type: ADD_REMOVE_CART_FROM_MINICART_SUCCESS,
              payload: {
                data: result.data,
                type: ADD_REMOVE_CART_FROM_MINICART_SUCCESS,
              },
            });
            if (result.data && result.data.statusCode === "200") {
              const quoteId = result.data.quoteId;
              localStorage.setItem(localStorageConstant.QUOTE_ID, quoteId?quoteId:"");
              dispatch({
                type: CART_COUNT_GLOBAL,
                payload: { data: result.data?.cartCount },
              });
              dispatch(myCart({ quoteId: quoteId }));
              dispatch(
                getCheckoutList({
                  address: {},
                  quoteId: quoteId,
                  shipingId: "",
                })
              );
            }
          } else if (recallCount < MAX_CALLS) {
            recursiveCall();
            recallCount++;
            dispatch({
              type: ADD_REMOVE_CART_FROM_MINICART_LONG,
              payload: { data: {}, type: ADD_REMOVE_CART_FROM_MINICART_LONG },
            });
          } else if (result.data.errorCode === NO_DATA_ERROR_CODE) {
            dispatch({
              type: ADD_REMOVE_CART_FROM_MINICART_NO_DATA,
              payload: {
                data: result.data,
                type: ADD_REMOVE_CART_FROM_MINICART_NO_DATA,
              },
            });
          } else {
            dispatch({
              type: ADD_REMOVE_CART_FROM_MINICART_FAILD,
              payload: { data: {}, type: ADD_REMOVE_CART_FROM_MINICART_FAILD },
            });
          }
        })
        .catch((error) => {
          showToast("error", error);
          if (recallCount < MAX_CALLS) {
            recursiveCall();
            recallCount++;
            dispatch({
              type: ADD_REMOVE_CART_FROM_MINICART_LONG,
              payload: { data: {}, type: ADD_REMOVE_CART_FROM_MINICART_LONG },
            });
          } else {
            dispatch({
              type: ADD_REMOVE_CART_FROM_MINICART_FAILD,
              payload: { data: {}, type: ADD_REMOVE_CART_FROM_MINICART_FAILD },
            });
          }
        });
    }
    recursiveCall();
  };
}
