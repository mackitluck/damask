import { END_POINTS, MAX_CALLS } from "../../Constant/Api";
import { SUCCESS_RESPONSE_CODE } from "../../Constant/Status";
import api from "../../Service/Axios";
import { showToast } from "../../Utility/General";
import { DELETE_ACCOUNT_REQUEST, DELETE_ACCOUNT_SUCCESS, DELETE_ACCOUNT_FAILD, DELETE_ACCOUNT_LONG, DELETE_ACCOUNT_ACTION_REQUEST, DELETE_ACCOUNT_ACTION_SUCCESS, DELETE_ACCOUNT_ACTION_LONG, DELETE_ACCOUNT_ACTION_FAILD } from "./DeleteAccountTypes";

export function getDemo() {
    return (dispatch: any) => {
        dispatch({
            type: DELETE_ACCOUNT_REQUEST,
            payload: { type: DELETE_ACCOUNT_REQUEST },
        });
        return api.post("API ROUTE", {}).then((result) => {
            dispatch({
                type: DELETE_ACCOUNT_SUCCESS,
                payload: { data: result.data, type: DELETE_ACCOUNT_SUCCESS },
            });
        }).catch((error) => {
            dispatch({
                type: DELETE_ACCOUNT_FAILD,
                payload: { data: {}, type: DELETE_ACCOUNT_FAILD, error },
            });
        });
    };
}

export function getdeleteuser() {
    let recallCount = 0;
    return (dispatch: any) => {
        dispatch({
            type: DELETE_ACCOUNT_REQUEST,
            payload: { type: DELETE_ACCOUNT_REQUEST },
        });
        function recursiveCall() {
            return api.post(END_POINTS.getDeleteUser, {}).then((result) => {
                if (result.data.statusCode === SUCCESS_RESPONSE_CODE) {
                    dispatch({
                        type: DELETE_ACCOUNT_SUCCESS,
                        payload: { data: result.data, type: DELETE_ACCOUNT_SUCCESS },
                    });
                }
                else if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: DELETE_ACCOUNT_LONG,
                        payload: { data: {}, type: DELETE_ACCOUNT_LONG },
                    });
                }
                else {
                    dispatch({
                        type: DELETE_ACCOUNT_FAILD,
                        payload: { data: {}, type: DELETE_ACCOUNT_FAILD },
                    });
                }
            }).catch((error) => {
                if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: DELETE_ACCOUNT_LONG,
                        payload: { data: {}, type: DELETE_ACCOUNT_LONG },
                    });
                }
                else {
                    dispatch({
                        type: DELETE_ACCOUNT_FAILD,
                        payload: { data: {}, type: DELETE_ACCOUNT_FAILD },
                    });
                }
            });
        }
        recursiveCall()
    };
}

export function deleteUser() {
    let recallCount = 0;
    return (dispatch: any) => {
        dispatch({
            type: DELETE_ACCOUNT_ACTION_REQUEST,
            payload: { type: DELETE_ACCOUNT_ACTION_REQUEST },
        });
        function recursiveCall() {
            api.post(`${END_POINTS.deleteUser}`, {}).then((result) => {
                if (result.data.statusCode === SUCCESS_RESPONSE_CODE) {
                    showToast('success', result.data.message)
                    dispatch({
                        type: DELETE_ACCOUNT_ACTION_SUCCESS,
                        payload: { data: result.data, type: DELETE_ACCOUNT_ACTION_SUCCESS },
                    });
                }
                else if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: DELETE_ACCOUNT_ACTION_LONG,
                        payload: { data: {}, type: DELETE_ACCOUNT_ACTION_LONG },
                    });
                }
                else {
                    showToast('error', result.data.message)
                    dispatch({
                        type: DELETE_ACCOUNT_ACTION_FAILD,
                        payload: { data: {}, type: DELETE_ACCOUNT_ACTION_FAILD },
                    });
                }
            }).catch((error) => {
                showToast('error', error)
                if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: DELETE_ACCOUNT_ACTION_LONG,
                        payload: { data: {}, type: DELETE_ACCOUNT_ACTION_LONG },
                    });
                }
                else {
                    dispatch({
                        type: DELETE_ACCOUNT_ACTION_FAILD,
                        payload: { data: {}, type: DELETE_ACCOUNT_ACTION_FAILD },
                    });
                }
            });
        }
        recursiveCall()
    };
}