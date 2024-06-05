import { END_POINTS, MAX_CALLS } from "../../Constant/Api";
import { NO_DATA_ERROR_CODE, SUCCESS_RESPONSE_CODE } from "../../Constant/Status";
import api from "../../Service/Axios";
import { showToast } from "../../Utility/General";
import { STATE_CLEAR, STATE_LONG, STATE_FAILD, STATE_REQUEST,STATE_SUCCESS, STATE_FOR_ADD_ADDRESS_POPUP_REQUEST, STATE_FOR_ADD_ADDRESS_POPUP_SUCCESS, STATE_FOR_ADD_ADDRESS_POPUP_LONG, STATE_FOR_ADD_ADDRESS_POPUP_FAILD } from "./StateTypes";



export function getAllState(param : any) {
    let recallCount = 0;
    return (dispatch: any) => {
        dispatch({
            type: STATE_REQUEST,
            payload: { type: STATE_REQUEST },
        });
        function recursiveCall() {
            return api.post(END_POINTS.getAllState, param).then((result) => {
                if (result.data.statusCode === SUCCESS_RESPONSE_CODE) {
                    dispatch({
                        type: STATE_SUCCESS,
                        payload: { data: result.data, type: STATE_SUCCESS },
                    });
                }
                else if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: STATE_LONG,
                        payload: { data: {}, type: STATE_LONG },
                    });
                }
                else {
                    dispatch({
                        type: STATE_FAILD,
                        payload: { data: {}, type: STATE_FAILD },
                    });
                }
            }).catch((error) => {
                if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: STATE_LONG,
                        payload: { data: {}, type: STATE_LONG },
                    });
                }
                else {
                    dispatch({
                        type: STATE_FAILD,
                        payload: { data: {}, type: STATE_FAILD },
                    });
                }
            });
        }
        recursiveCall()
    };
}

export function getAllStateForAddAddressPopup(param : any) {
    let recallCount = 0;
    return (dispatch: any) => {
        dispatch({
            type: STATE_FOR_ADD_ADDRESS_POPUP_REQUEST,
            payload: { type: STATE_FOR_ADD_ADDRESS_POPUP_REQUEST },
        });
        function recursiveCall() {
            return api.post(END_POINTS.getAllState, param).then((result) => {
                if (result.data.statusCode === SUCCESS_RESPONSE_CODE) {
                    dispatch({
                        type: STATE_FOR_ADD_ADDRESS_POPUP_SUCCESS,
                        payload: { data: result.data, type: STATE_FOR_ADD_ADDRESS_POPUP_SUCCESS },
                    });
                }
                else if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: STATE_FOR_ADD_ADDRESS_POPUP_LONG,
                        payload: { data: {}, type: STATE_FOR_ADD_ADDRESS_POPUP_LONG },
                    });
                }
                else {
                    dispatch({
                        type: STATE_FOR_ADD_ADDRESS_POPUP_FAILD,
                        payload: { data: {}, type: STATE_FOR_ADD_ADDRESS_POPUP_FAILD },
                    });
                }
            }).catch((error) => {
                if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: STATE_FOR_ADD_ADDRESS_POPUP_LONG,
                        payload: { data: {}, type: STATE_FOR_ADD_ADDRESS_POPUP_LONG },
                    });
                }
                else {
                    dispatch({
                        type: STATE_FOR_ADD_ADDRESS_POPUP_FAILD,
                        payload: { data: {}, type: STATE_FOR_ADD_ADDRESS_POPUP_FAILD },
                    });
                }
            });
        }
        recursiveCall()
    };
}

