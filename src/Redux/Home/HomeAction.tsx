import { END_POINTS, MAX_CALLS } from "../../Constant/Api";
import { SUCCESS_RESPONSE_CODE } from "../../Constant/Status";
import api from "../../Service/Axios";
import { HOME_REQUEST, HOME_SUCCESS, HOME_FAILD, HOME_LONG } from "./HomeTypes";

export function homeAction() {
    let recallCount = 0;
    return (dispatch: any) => {
        dispatch({
            type: HOME_REQUEST,
            payload: { type: HOME_REQUEST },
        });
        function recursiveCall() {
            api.post(`${END_POINTS.home}`, {}).then((result) => {
                if (result.data.statusCode === SUCCESS_RESPONSE_CODE) {
                    dispatch({
                        type: HOME_SUCCESS,
                        payload: { data: result.data, type: HOME_SUCCESS },
                    });
                }
                else if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: HOME_LONG,
                        payload: { data: {}, type: HOME_LONG },
                    });
                }
                else {
                    dispatch({
                        type: HOME_FAILD,
                        payload: { data: {}, type: HOME_FAILD },
                    });
                }
            }).catch((error) => {
                if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: HOME_LONG,
                        payload: { data: {}, type: HOME_LONG },
                    });
                }
                else {
                    dispatch({
                        type: HOME_FAILD,
                        payload: { data: {}, type: HOME_FAILD },
                    });
                }
            });
        }
        recursiveCall()
    };
}