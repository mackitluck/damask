import axios from "axios";
import { END_POINTS, MAX_CALLS } from "../../Constant/Api";
import { MASTER_API } from "../../Constant/Config";
import { USER, QUOTE_ID } from "../../Constant/LocalStorage";
import { SUCCESS_RESPONSE_CODE } from "../../Constant/Status";
import api from "../../Service/Axios";
import { showToast } from "../../Utility/General";
import { CART_COUNT_GLOBAL } from "../General/GeneralType";
import { myCart } from "../MyCart/MyCartAction";
import { CHECK_AUTHORIZATION_FAILD, CHECK_AUTHORIZATION_REQUEST, CHECK_AUTHORIZATION_SUCCESS, FORGOT_PASSWORD_FAILD, FORGOT_PASSWORD_LONG, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, LOGIN_FAILD, LOGIN_LONG, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAILD, LOGOUT_LONG, LOGOUT_REQUEST, LOGOUT_SUCCESS, RESET_PASSWORD_FAILD, RESET_PASSWORD_LONG, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS } from "./AuthType";
import * as localStorageConstant from "../../Constant/LocalStorage";
import { MYCART_GLOBAL } from "../MyCart/MyCartTypes";

export function loginAction(param: any) {
    let recallCount = 0;
    return (dispatch: any) => {
        dispatch({
            type: LOGIN_REQUEST,
            payload: { type: LOGIN_REQUEST },
        });
        function recursiveCall() {
            api.post(`${END_POINTS.login}`, param).then((result) => {
                if (result.data.statusCode === SUCCESS_RESPONSE_CODE) {
                    localStorage.setItem(USER, JSON.stringify(result.data))
                    showToast('success', result.data.message)
                    dispatch({
                        type: LOGIN_SUCCESS,
                        payload: { data: result.data, type: LOGIN_SUCCESS },
                    });

                    localStorage.removeItem(QUOTE_ID);
                    
                    let quoteId = localStorage.getItem(localStorageConstant.QUOTE_ID) ? localStorage.getItem(localStorageConstant.QUOTE_ID) : "";
                    dispatch(myCart({quoteId: quoteId}));

                    dispatch({
                        type: CART_COUNT_GLOBAL,
                        payload: { data: result.data?.cartCount},
                    });
                }
                else if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: LOGIN_LONG,
                        payload: { data: {}, type: LOGIN_LONG },
                    });
                }
                else {
                    showToast('error', result.data.message)
                    dispatch({
                        type: LOGIN_FAILD,
                        payload: { data: {}, type: LOGIN_FAILD },
                    });
                }
            }).catch((error) => {
                showToast('error', error)
                if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: LOGIN_LONG,
                        payload: { data: {}, type: LOGIN_LONG },
                    });
                }
                else {
                    dispatch({
                        type: LOGIN_FAILD,
                        payload: { data: {}, type: LOGIN_FAILD },
                    });
                }
            });
        }
        recursiveCall()
    };
}

export const checkAuthorizationAction = () => {
    return (dispatch: any) => {
        dispatch({
            type: CHECK_AUTHORIZATION_REQUEST,
            payload: { data: {}, type: CHECK_AUTHORIZATION_REQUEST },
        });
        let usetData = localStorage.getItem(USER)
        if (usetData) {
            dispatch({
                type: CHECK_AUTHORIZATION_SUCCESS,
                payload: {
                    data: JSON.parse(usetData),
                    type: CHECK_AUTHORIZATION_SUCCESS,
                },
            });
        } else {
            dispatch({
                type: CHECK_AUTHORIZATION_FAILD,
                payload: { data: {}, type: CHECK_AUTHORIZATION_FAILD },
            });
        }
    };
};

export default function forgotPasswordAction(param: any) {
    let recallCount = 0;
    return (dispatch: any) => {
        dispatch({
            type: FORGOT_PASSWORD_REQUEST,
            payload: { type: FORGOT_PASSWORD_REQUEST },
        });
        function recursiveCall() {
            api.post(`${END_POINTS.forgotPassword}`, param).then((result) => {
                if (result.data.statusCode === SUCCESS_RESPONSE_CODE) {
                    showToast('success', result.data.message)
                    dispatch({
                        type: FORGOT_PASSWORD_SUCCESS,
                        payload: { data: result.data, type: FORGOT_PASSWORD_SUCCESS },
                    });
                }
                else if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: FORGOT_PASSWORD_LONG,
                        payload: { data: {}, type: FORGOT_PASSWORD_LONG },
                    });
                }
                else {
                    showToast('error', result.data.message)
                    dispatch({
                        type: FORGOT_PASSWORD_FAILD,
                        payload: { data: {}, type: FORGOT_PASSWORD_FAILD },
                    });
                }
            }).catch((error) => {
                showToast('error', error)
                if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: FORGOT_PASSWORD_LONG,
                        payload: { data: {}, type: FORGOT_PASSWORD_LONG },
                    });
                }
                else {
                    dispatch({
                        type: FORGOT_PASSWORD_FAILD,
                        payload: { data: {}, type: FORGOT_PASSWORD_FAILD },
                    });
                }
            });
        }
        recursiveCall()
    };
}


export function resetPasswordAction(param: any) {
    let recallCount = 0;
    return (dispatch: any) => {
        dispatch({
            type: RESET_PASSWORD_REQUEST,
            payload: { type: RESET_PASSWORD_REQUEST },
        });
        function recursiveCall() {
            api.post(`${END_POINTS.resetPassword}`, param).then((result) => {
                if (result.data.statusCode === SUCCESS_RESPONSE_CODE) {
                    showToast('success', result.data.message)
                    dispatch({
                        type: RESET_PASSWORD_SUCCESS,
                        payload: { data: result.data, type: RESET_PASSWORD_SUCCESS },
                    });
                }
                else if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: RESET_PASSWORD_LONG,
                        payload: { data: {}, type: RESET_PASSWORD_LONG },
                    });
                }
                else {
                    showToast('error', result.data.message)
                    dispatch({
                        type: RESET_PASSWORD_FAILD,
                        payload: { data: {}, type: RESET_PASSWORD_FAILD },
                    });
                }
            }).catch((error) => {
                showToast('error', error)
                if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: RESET_PASSWORD_LONG,
                        payload: { data: {}, type: RESET_PASSWORD_LONG },
                    });
                }
                else {
                    showToast('error', error)
                    dispatch({
                        type: RESET_PASSWORD_FAILD,
                        payload: { data: {}, type: RESET_PASSWORD_FAILD },
                    });
                }
            });
        }
        recursiveCall()
    };
}


export function logOutAction(param: any) {
    let recallCount = 0;
    return (dispatch: any) => {
        dispatch({
            type: LOGOUT_REQUEST,
            payload: { type: LOGOUT_REQUEST },
        });
        function recursiveCall() {
            api.post(`${END_POINTS.logout}`, param).then((result) => {
                if (result.data.statusCode === SUCCESS_RESPONSE_CODE) {
                    showToast('success', result.data.message)
                    dispatch({
                        type: LOGOUT_SUCCESS,
                        payload: { data: result.data, type: LOGOUT_SUCCESS },
                    });

                    dispatch({
                        type: CART_COUNT_GLOBAL,
                        payload: { data: '0'},
                    });

                    dispatch({
                        type: MYCART_GLOBAL,
                        payload: { data: []},
                    });
                }
                else if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: LOGOUT_LONG,
                        payload: { data: {}, type: LOGOUT_LONG },
                    });
                }
                else {
                    showToast('error', result.data.message)
                    dispatch({
                        type: LOGOUT_FAILD,
                        payload: { data: {}, type: LOGOUT_FAILD },
                    });
                }
            }).catch((error) => {
                showToast('error', error)
                if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: LOGOUT_LONG,
                        payload: { data: {}, type: LOGOUT_LONG },
                    });
                }
                else {
                    showToast('error', error)
                    dispatch({
                        type: LOGOUT_FAILD,
                        payload: { data: {}, type: LOGOUT_FAILD },
                    });
                }
            });
        }
        recursiveCall()
    };
}