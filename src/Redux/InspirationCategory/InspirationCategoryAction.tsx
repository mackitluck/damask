import { END_POINTS, MAX_CALLS } from "../../Constant/Api";
import { NO_DATA_ERROR_CODE, SUCCESS_RESPONSE_CODE } from "../../Constant/Status";
import api from "../../Service/Axios";
import { showToast } from "../../Utility/General";
import { INSPIRATION_CATEGORY_REQUEST, INSPIRATION_CATEGORY_SUCCESS, INSPIRATION_CATEGORY_FAILD, INSPIRATION_CATEGORY_CLEAR, INSPIRATION_CATEGORY_LONG, INSPIRATION_CATEGORY_NO_DATA } from "./InspirationCategoryTypes";



export function getInspirationCategoryDetails(queryParam: any) {
    let recallCount = 0;
    return (dispatch: any) => {
        dispatch({
            type: INSPIRATION_CATEGORY_REQUEST,
            payload: { type: INSPIRATION_CATEGORY_REQUEST },
        });
        function recursiveCall() {
            api.get(`${END_POINTS.getInspirationCategoryDetails + queryParam}`, {}).then((result) => {
                if (result.data.statusCode === SUCCESS_RESPONSE_CODE) {
                    dispatch({
                        type: INSPIRATION_CATEGORY_SUCCESS,
                        payload: { data: result.data, type: INSPIRATION_CATEGORY_SUCCESS },
                    });
                }
                else if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: INSPIRATION_CATEGORY_LONG,
                        payload: { data: {}, type: INSPIRATION_CATEGORY_LONG },
                    });
                }
                else if (result.data.errorCode === NO_DATA_ERROR_CODE) {
                    dispatch({
                        type: INSPIRATION_CATEGORY_NO_DATA,
                        payload: { data: result.data, type: INSPIRATION_CATEGORY_NO_DATA },
                    });
                }
                else {
                    dispatch({
                        type: INSPIRATION_CATEGORY_FAILD,
                        payload: { data: {}, type: INSPIRATION_CATEGORY_FAILD },
                    });
                }
            }).catch((error) => {
                showToast('error', error)
                if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: INSPIRATION_CATEGORY_LONG,
                        payload: { data: {}, type: INSPIRATION_CATEGORY_LONG },
                    });
                }
                else {
                    dispatch({
                        type: INSPIRATION_CATEGORY_FAILD,
                        payload: { data: {}, type: INSPIRATION_CATEGORY_FAILD },
                    });
                }
            });
        }
        recursiveCall()
    };
}


