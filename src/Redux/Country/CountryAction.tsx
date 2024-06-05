import { END_POINTS, MAX_CALLS } from "../../Constant/Api";
import { NO_DATA_ERROR_CODE, SUCCESS_RESPONSE_CODE } from "../../Constant/Status";
import api from "../../Service/Axios";
import { showToast } from "../../Utility/General";
import { COUNTRY_CLEAR, COUNTRY_LONG, COUNTRY_FAILD, COUNTRY_REQUEST,COUNTRY_SUCCESS } from "./CountryTypes";



export function getAllCountry() {
    let recallCount = 0;
    return (dispatch: any) => {
        dispatch({
            type: COUNTRY_REQUEST,
            payload: { type: COUNTRY_REQUEST },
        });
        function recursiveCall() {
            return api.post(END_POINTS.getAllCountry, {}).then((result) => {
                if (result.data.statusCode === SUCCESS_RESPONSE_CODE) {
                    dispatch({
                        type: COUNTRY_SUCCESS,
                        payload: { data: result.data, type: COUNTRY_SUCCESS },
                    });
                }
                else if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: COUNTRY_LONG,
                        payload: { data: {}, type: COUNTRY_LONG },
                    });
                }
                else {
                    dispatch({
                        type: COUNTRY_FAILD,
                        payload: { data: {}, type: COUNTRY_FAILD },
                    });
                }
            }).catch((error) => {
                if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: COUNTRY_LONG,
                        payload: { data: {}, type: COUNTRY_LONG },
                    });
                }
                else {
                    dispatch({
                        type: COUNTRY_FAILD,
                        payload: { data: {}, type: COUNTRY_FAILD },
                    });
                }
            });
        }
        recursiveCall()
    };
}

