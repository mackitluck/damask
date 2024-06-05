import { END_POINTS, MAX_CALLS } from "../../Constant/Api";
import { NO_DATA_ERROR_CODE, SUCCESS_RESPONSE_CODE } from "../../Constant/Status";
import api from "../../Service/Axios";
import { showToast } from "../../Utility/General";
import { MY_SETTING_CLEAR, MY_SETTING_LONG, MY_SETTING_FAILD, MY_SETTING_REQUEST, MY_SETTING_SUCCESS, MY_SETTING_UPDATE_CLEAR, MY_SETTING_UPDATE_FAILD, MY_SETTING_UPDATE_LONG, MY_SETTING_UPDATE_REQUEST, MY_SETTING_UPDATE_SUCCESS } from "./MySettingTypes";



export function getMySetting() {
    let recallCount = 0;
    return (dispatch: any) => {
        dispatch({
            type: MY_SETTING_REQUEST,
            payload: { type: MY_SETTING_REQUEST },
        });
        function recursiveCall() {
            return api.post(END_POINTS.getMySetting, {}).then((result) => {
                if (result.data.statusCode === SUCCESS_RESPONSE_CODE) {
                    dispatch({
                        type: MY_SETTING_SUCCESS,
                        payload: { data: result.data, type: MY_SETTING_SUCCESS },
                    });
                }
                else if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: MY_SETTING_LONG,
                        payload: { data: {}, type: MY_SETTING_LONG },
                    });
                }
                else {
                    dispatch({
                        type: MY_SETTING_FAILD,
                        payload: { data: {}, type: MY_SETTING_FAILD },
                    });
                }
            }).catch((error) => {
                if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: MY_SETTING_LONG,
                        payload: { data: {}, type: MY_SETTING_LONG },
                    });
                }
                else {
                    dispatch({
                        type: MY_SETTING_FAILD,
                        payload: { data: {}, type: MY_SETTING_FAILD },
                    });
                }
            });
        }
        recursiveCall()
    };
}

export function mySettingUpdate(param: any) {
    let recallCount = 0;
    return (dispatch: any) => {
        dispatch({
            type: MY_SETTING_UPDATE_REQUEST,
            payload: { type: MY_SETTING_UPDATE_REQUEST },
        });
        function recursiveCall() {
            api.post(`${END_POINTS.mySettingUpdate}`, param).then((result) => {
                if (result.data.statusCode === SUCCESS_RESPONSE_CODE) {
                    showToast('success', result.data.message)
                    dispatch({
                        type: MY_SETTING_UPDATE_SUCCESS,
                        payload: { data: result.data, type: MY_SETTING_UPDATE_SUCCESS },
                    });
                }
                else if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: MY_SETTING_UPDATE_LONG,
                        payload: { data: {}, type: MY_SETTING_UPDATE_LONG },
                    });
                }
                else {
                    showToast('error', result.data.message)
                    dispatch({
                        type: MY_SETTING_UPDATE_FAILD,
                        payload: { data: {}, type: MY_SETTING_UPDATE_FAILD },
                    });
                }
            }).catch((error) => {
                showToast('error', error)
                if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: MY_SETTING_UPDATE_LONG,
                        payload: { data: {}, type: MY_SETTING_UPDATE_LONG },
                    });
                }
                else {
                    dispatch({
                        type: MY_SETTING_UPDATE_FAILD,
                        payload: { data: {}, type: MY_SETTING_UPDATE_FAILD },
                    });
                }
            });
        }
        recursiveCall()
    };
}


