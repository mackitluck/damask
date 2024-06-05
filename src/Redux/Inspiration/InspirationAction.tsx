import { END_POINTS, MAX_CALLS } from "../../Constant/Api";
import { NO_DATA_ERROR_CODE, SUCCESS_RESPONSE_CODE } from "../../Constant/Status";
import api from "../../Service/Axios";
import { showToast } from "../../Utility/General";
import { INSPIRATION_REQUEST, INSPIRATION_SUCCESS, INSPIRATION_FAILD, INSPIRATION_CLEAR, INSPIRATION_LONG } from "./InspirationTypes";



export function getInspirationList() {
    let recallCount = 0;
    return (dispatch: any) => {
        dispatch({
            type: INSPIRATION_REQUEST,
            payload: { type: INSPIRATION_REQUEST },
        });
        function recursiveCall() {
            return api.post(END_POINTS.getInspirationList, {}).then((result) => {
                if (result.data.statusCode === SUCCESS_RESPONSE_CODE) {
                    dispatch({
                        type: INSPIRATION_SUCCESS,
                        payload: { data: result.data, type: INSPIRATION_SUCCESS },
                    });
                }
                else if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: INSPIRATION_LONG,
                        payload: { data: {}, type: INSPIRATION_LONG },
                    });
                }
                else {
                    dispatch({
                        type: INSPIRATION_FAILD,
                        payload: { data: {}, type: INSPIRATION_FAILD },
                    });
                }
            }).catch((error) => {
                if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: INSPIRATION_LONG,
                        payload: { data: {}, type: INSPIRATION_LONG },
                    });
                }
                else {
                    dispatch({
                        type: INSPIRATION_FAILD,
                        payload: { data: {}, type: INSPIRATION_FAILD },
                    });
                }
            });
        }
        recursiveCall()
    };
}


