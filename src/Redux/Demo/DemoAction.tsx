import { MAX_CALLS } from "../../Constant/Api";
import { SUCCESS_RESPONSE_CODE } from "../../Constant/Status";
import api from "../../Service/Axios";
import { DEMO_REQUEST, DEMO_SUCCESS, DEMO_FAILD, DEMO_LONG } from "./DemoTypes";

export function getDemo() {
    return (dispatch: any) => {
        dispatch({
            type: DEMO_REQUEST,
            payload: { type: DEMO_REQUEST },
        });
        return api.post("API ROUTE", {}).then((result) => {
            dispatch({
                type: DEMO_SUCCESS,
                payload: { data: result.data, type: DEMO_SUCCESS },
            });
        }).catch((error) => {
            dispatch({
                type: DEMO_FAILD,
                payload: { data: {}, type: DEMO_FAILD, error },
            });
        });
    };
}

export function getDemoRecursive() {
    let recallCount = 0;
    return (dispatch: any) => {
        dispatch({
            type: DEMO_REQUEST,
            payload: { type: DEMO_REQUEST },
        });
        function recursiveCall() {
            return api.post("API ROUTE", {}).then((result) => {
                if (result.data.statusCode === SUCCESS_RESPONSE_CODE) {
                    dispatch({
                        type: DEMO_SUCCESS,
                        payload: { data: result.data, type: DEMO_SUCCESS },
                    });
                }
                else if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: DEMO_LONG,
                        payload: { data: {}, type: DEMO_LONG },
                    });
                }
                else {
                    dispatch({
                        type: DEMO_FAILD,
                        payload: { data: {}, type: DEMO_FAILD },
                    });
                }
            }).catch((error) => {
                if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: DEMO_LONG,
                        payload: { data: {}, type: DEMO_LONG },
                    });
                }
                else {
                    dispatch({
                        type: DEMO_FAILD,
                        payload: { data: {}, type: DEMO_FAILD },
                    });
                }
            });
        }
        recursiveCall()
    };
}