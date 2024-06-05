import { END_POINTS, MAX_CALLS } from "../../Constant/Api";
import { NO_DATA_ERROR_CODE, SUCCESS_RESPONSE_CODE } from "../../Constant/Status";
import api from "../../Service/Axios";
import { showToast } from "../../Utility/General";
import { MYPROFILE_CLEAR, MYPROFILE_LONG, MYPROFILE_FAILD, MYPROFILE_REQUEST, MYPROFILE_SUCCESS, MYPROFILE_UPDATE_REQUEST, MYPROFILE_UPDATE_SUCCESS, MYPROFILE_UPDATE_LONG, MYPROFILE_UPDATE_FAILD } from "./MyProfileTypes";



export function myProfile() {
    let recallCount = 0;
    return (dispatch: any) => {
        dispatch({
            type: MYPROFILE_REQUEST,
            payload: { type: MYPROFILE_REQUEST },
        });
        function recursiveCall() {
            return api.post(END_POINTS.myAccount, {}).then((result) => {
                if (result.data.statusCode === SUCCESS_RESPONSE_CODE) {
                    dispatch({
                        type: MYPROFILE_SUCCESS,
                        payload: { data: result.data, type: MYPROFILE_SUCCESS },
                    });
                }
                else if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: MYPROFILE_LONG,
                        payload: { data: {}, type: MYPROFILE_LONG },
                    });
                }
                else {
                    dispatch({
                        type: MYPROFILE_FAILD,
                        payload: { data: {}, type: MYPROFILE_FAILD },
                    });
                }
            }).catch((error) => {
                if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: MYPROFILE_LONG,
                        payload: { data: {}, type: MYPROFILE_LONG },
                    });
                }
                else {
                    dispatch({
                        type: MYPROFILE_FAILD,
                        payload: { data: {}, type: MYPROFILE_FAILD },
                    });
                }
            });
        }
        recursiveCall()
    };
}

export function updateProfileAction(param: any) {
    let recallCount = 0;
    return (dispatch: any) => {
        dispatch({
            type: MYPROFILE_UPDATE_REQUEST,
            payload: { type: MYPROFILE_UPDATE_REQUEST },
        });
        function recursiveCall() {
            api.post(`${END_POINTS.myProfileUpdate}`, param).then((result) => {
                if (result.data.statusCode === SUCCESS_RESPONSE_CODE) {
                    showToast('success', result.data.message)
                    dispatch({
                        type: MYPROFILE_UPDATE_SUCCESS,
                        payload: { data: result.data, type: MYPROFILE_UPDATE_SUCCESS },
                    });
                }
                else if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: MYPROFILE_UPDATE_LONG,
                        payload: { data: {}, type: MYPROFILE_UPDATE_LONG },
                    });
                }
                else {
                    showToast('error', result.data.message)
                    dispatch({
                        type: MYPROFILE_UPDATE_FAILD,
                        payload: { data: result.data, type: MYPROFILE_UPDATE_FAILD },
                    });
                }
            }).catch((error) => {
                showToast('error', error)
                if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: MYPROFILE_UPDATE_LONG,
                        payload: { data: {}, type: MYPROFILE_UPDATE_LONG },
                    });
                }
                else {
                    dispatch({
                        type: MYPROFILE_UPDATE_FAILD,
                        payload: { data: {}, type: MYPROFILE_UPDATE_FAILD },
                    });
                }
            });
        }
        recursiveCall()
    };
}