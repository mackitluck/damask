import { END_POINTS, MAX_CALLS } from "../../Constant/Api";
import { NO_DATA_ERROR_CODE, SUCCESS_RESPONSE_CODE } from "../../Constant/Status";
import api from "../../Service/Axios";
import { showToast } from "../../Utility/General";
import { INSPIRATION_DETAIL_REQUEST, INSPIRATION_DETAIL_SUCCESS, INSPIRATION_DETAIL_FAILD, INSPIRATION_DETAIL_CLEAR, INSPIRATION_DETAIL_LONG, INSPIRATION_DETAIL_NO_DATA } from "./InspirationDetailTypes";



export function getInspirationPostDetails(queryParam: any) {
    let recallCount = 0;
    return (dispatch: any) => {
        dispatch({
            type: INSPIRATION_DETAIL_REQUEST,
            payload: { type: INSPIRATION_DETAIL_REQUEST },
        });
        function recursiveCall() {
            api.get(`${END_POINTS.getInspirationPostDetails + queryParam}`, {}).then((result) => {
                if (result.data.statusCode === SUCCESS_RESPONSE_CODE) {
                    dispatch({
                        type: INSPIRATION_DETAIL_SUCCESS,
                        payload: { data: result.data, type: INSPIRATION_DETAIL_SUCCESS },
                    });
                }
                else if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: INSPIRATION_DETAIL_LONG,
                        payload: { data: {}, type: INSPIRATION_DETAIL_LONG },
                    });
                }
                else if (result.data.errorCode === NO_DATA_ERROR_CODE) {
                    dispatch({
                        type: INSPIRATION_DETAIL_NO_DATA,
                        payload: { data: result.data, type: INSPIRATION_DETAIL_NO_DATA },
                    });
                }
                else {
                    dispatch({
                        type: INSPIRATION_DETAIL_FAILD,
                        payload: { data: {}, type: INSPIRATION_DETAIL_FAILD },
                    });
                }
            }).catch((error) => {
                showToast('error', error)
                if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: INSPIRATION_DETAIL_LONG,
                        payload: { data: {}, type: INSPIRATION_DETAIL_LONG },
                    });
                }
                else {
                    dispatch({
                        type: INSPIRATION_DETAIL_FAILD,
                        payload: { data: {}, type: INSPIRATION_DETAIL_FAILD },
                    });
                }
            });
        }
        recursiveCall()
    };
}

