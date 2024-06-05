import { END_POINTS, MAX_CALLS } from "../../Constant/Api";
import { NO_DATA_ERROR_CODE, SUCCESS_RESPONSE_CODE } from "../../Constant/Status";
import api from "../../Service/Axios";
import { showToast } from "../../Utility/General";
import { MYACCOUNT_REQUEST, MYACCOUNT_SUCCESS, MYACCOUNT_FAILD, MYACCOUNT_CLEAR, MYACCOUNT_LONG } from "./MyAccountTypes";



export function getMyaccount() {
    let recallCount = 0;
    return (dispatch: any) => {
        dispatch({
            type: MYACCOUNT_REQUEST,
            payload: { type: MYACCOUNT_REQUEST },
        });
        function recursiveCall() {
            return api.post(END_POINTS.myAccount, {}).then((result) => {
                if (result.data.statusCode === SUCCESS_RESPONSE_CODE) {
                    dispatch({
                        type: MYACCOUNT_SUCCESS,
                        payload: { data: result.data, type: MYACCOUNT_SUCCESS },
                    });
                }
                else if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: MYACCOUNT_LONG,
                        payload: { data: {}, type: MYACCOUNT_LONG },
                    });
                }
                else {
                    dispatch({
                        type: MYACCOUNT_FAILD,
                        payload: { data: {}, type: MYACCOUNT_FAILD },
                    });
                }
            }).catch((error) => {
                if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: MYACCOUNT_LONG,
                        payload: { data: {}, type: MYACCOUNT_LONG },
                    });
                }
                else {
                    dispatch({
                        type: MYACCOUNT_FAILD,
                        payload: { data: {}, type: MYACCOUNT_FAILD },
                    });
                }
            });
        }
        recursiveCall()
    };
}


