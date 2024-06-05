import { END_POINTS, MAX_CALLS } from "../../Constant/Api";
import { NO_DATA_ERROR_CODE, SUCCESS_RESPONSE_CODE } from "../../Constant/Status";
import api from "../../Service/Axios";
import { showToast } from "../../Utility/General";
import { MYADDRESSES_CLEAR, MYADDRESSES_LONG, MYADDRESSES_FAILD, MYADDRESSES_REQUEST, MYADDRESSES_SUCCESS, MYADDRESSES_ADD_UPDATE_CLEAR, MYADDRESSES_ADD_UPDATE_FAILD, MYADDRESSES_ADD_UPDATE_LONG, MYADDRESSES_ADD_UPDATE_REQUEST, MYADDRESSES_ADD_UPDATE_SUCCESS, MYADDRESSES_DELETE_REQUEST, MYADDRESSES_DELETE_SUCCESS, MYADDRESSES_DELETE_LONG, MYADDRESSES_DELETE_FAILD } from "./MyAddressesTypes";



export function getAllAddress() {
    let recallCount = 0;
    return (dispatch: any) => {
        dispatch({
            type: MYADDRESSES_REQUEST,
            payload: { type: MYADDRESSES_REQUEST },
        });
        function recursiveCall() {
            return api.post(END_POINTS.getAllAddress, {}).then((result) => {
                if (result.data.statusCode === SUCCESS_RESPONSE_CODE) {
                    dispatch({
                        type: MYADDRESSES_SUCCESS,
                        payload: { data: result.data, type: MYADDRESSES_SUCCESS },
                    });
                }
                else if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: MYADDRESSES_LONG,
                        payload: { data: {}, type: MYADDRESSES_LONG },
                    });
                }
                else {
                    dispatch({
                        type: MYADDRESSES_FAILD,
                        payload: { data: {}, type: MYADDRESSES_FAILD },
                    });
                }
            }).catch((error) => {
                if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: MYADDRESSES_LONG,
                        payload: { data: {}, type: MYADDRESSES_LONG },
                    });
                }
                else {
                    dispatch({
                        type: MYADDRESSES_FAILD,
                        payload: { data: {}, type: MYADDRESSES_FAILD },
                    });
                }
            });
        }
        recursiveCall()
    };
}

export function updateAddress(param: any) {
    let recallCount = 0;
    return (dispatch: any) => {
        dispatch({
            type: MYADDRESSES_ADD_UPDATE_REQUEST,
            payload: { type: MYADDRESSES_ADD_UPDATE_REQUEST },
        });
        function recursiveCall() {
            return api.post(END_POINTS.updateAddress, param).then((result) => {
                if (result.data.statusCode === SUCCESS_RESPONSE_CODE) {
                    showToast('success', result.data.message)
                    dispatch({
                        type: MYADDRESSES_ADD_UPDATE_SUCCESS,
                        payload: { data: result.data, type: MYADDRESSES_ADD_UPDATE_SUCCESS },
                    });
                }
                else if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: MYADDRESSES_ADD_UPDATE_LONG,
                        payload: { data: {}, type: MYADDRESSES_ADD_UPDATE_LONG },
                    });
                }
                else {
                    dispatch({
                        type: MYADDRESSES_ADD_UPDATE_FAILD,
                        payload: { data: {}, type: MYADDRESSES_ADD_UPDATE_FAILD },
                    });
                }
            }).catch((error) => {
                showToast('error', error)
                if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: MYADDRESSES_ADD_UPDATE_LONG,
                        payload: { data: {}, type: MYADDRESSES_ADD_UPDATE_LONG },
                    });
                }
                else {
                    dispatch({
                        type: MYADDRESSES_ADD_UPDATE_FAILD,
                        payload: { data: {}, type: MYADDRESSES_ADD_UPDATE_FAILD },
                    });
                }
            });
        }
        recursiveCall()
    };
}

export function deleteAddress(param: any) {
    let recallCount = 0;
    return (dispatch: any) => {
        dispatch({
            type: MYADDRESSES_DELETE_REQUEST,
            payload: { type: MYADDRESSES_DELETE_REQUEST },
        });
        function recursiveCall() {
            return api.post(END_POINTS.deleteAddress, param).then((result) => {
                if (result.data.statusCode === SUCCESS_RESPONSE_CODE) {
                    showToast('success', result.data.message)
                    dispatch({
                        type: MYADDRESSES_DELETE_SUCCESS,
                        payload: { data: result.data, type: MYADDRESSES_DELETE_SUCCESS },
                    });
                    dispatch(getAllAddress())
                }
                else if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: MYADDRESSES_DELETE_LONG,
                        payload: { data: {}, type: MYADDRESSES_DELETE_LONG },
                    });
                }
                else {
                    dispatch({
                        type: MYADDRESSES_DELETE_FAILD,
                        payload: { data: {}, type: MYADDRESSES_DELETE_FAILD },
                    });
                }
            }).catch((error) => {
                showToast('error', error)
                if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: MYADDRESSES_DELETE_LONG,
                        payload: { data: {}, type: MYADDRESSES_DELETE_LONG },
                    });
                }
                else {
                    dispatch({
                        type: MYADDRESSES_DELETE_FAILD,
                        payload: { data: {}, type: MYADDRESSES_DELETE_FAILD },
                    });
                }
            });
        }
        recursiveCall()
    };
}

