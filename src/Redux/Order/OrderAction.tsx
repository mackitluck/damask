import { END_POINTS, MAX_CALLS } from "../../Constant/Api";
import { NO_DATA_ERROR_CODE, SUCCESS_RESPONSE_CODE } from "../../Constant/Status";
import api from "../../Service/Axios";
import { ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_LONG, ORDER_LIST_FAILD, ORDER_DETAIL_REQUEST, ORDER_DETAIL_SUCCESS, ORDER_DETAIL_LONG, ORDER_DETAIL_FAILD, ORDER_LIST_NO_DATA, ORDER_DETAIL_NO_DATA } from "./OrderTypes";

export function getOrderListAction() {
    let recallCount = 0;
    return (dispatch: any) => {
        dispatch({
            type: ORDER_LIST_REQUEST,
            payload: { type: ORDER_LIST_REQUEST },
        });
        function recursiveCall() {
            return api.post(END_POINTS.myOrders, {}).then((result) => {
                if (result.data.statusCode === SUCCESS_RESPONSE_CODE) {
                    dispatch({
                        type: ORDER_LIST_SUCCESS,
                        payload: { data: result.data, type: ORDER_LIST_SUCCESS },
                    });
                }
                else if (result.data.errorCode === NO_DATA_ERROR_CODE) {
                    dispatch({
                        type: ORDER_LIST_NO_DATA,
                        payload: { data: result.data, type: ORDER_LIST_NO_DATA },
                    });
                }
                else if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: ORDER_LIST_LONG,
                        payload: { data: {}, type: ORDER_LIST_LONG },
                    });
                }
                else {
                    dispatch({
                        type: ORDER_LIST_FAILD,
                        payload: { data: {}, type: ORDER_LIST_FAILD },
                    });
                }
            }).catch((error) => {
                if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: ORDER_LIST_LONG,
                        payload: { data: {}, type: ORDER_LIST_LONG },
                    });
                }
                else {
                    dispatch({
                        type: ORDER_LIST_FAILD,
                        payload: { data: {}, type: ORDER_LIST_FAILD },
                    });
                }
            });
        }
        recursiveCall()
    };
}

export function getOrderDetailAction(param: any) {
    let recallCount = 0;
    return (dispatch: any) => {
        dispatch({
            type: ORDER_DETAIL_REQUEST,
            payload: { type: ORDER_DETAIL_REQUEST },
        });
        function recursiveCall() {
            return api.post(END_POINTS.myOrderDetail, param).then((result) => {
                if (result.data.statusCode === SUCCESS_RESPONSE_CODE) {
                    dispatch({
                        type: ORDER_DETAIL_SUCCESS,
                        payload: { data: result.data, type: ORDER_DETAIL_SUCCESS },
                    });
                }
                else if (result.data.errorCode === NO_DATA_ERROR_CODE) {
                    dispatch({
                        type: ORDER_DETAIL_NO_DATA,
                        payload: { data: result.data, type: ORDER_DETAIL_NO_DATA },
                    });
                }
                else if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: ORDER_DETAIL_LONG,
                        payload: { data: {}, type: ORDER_DETAIL_LONG },
                    });
                }
                else {
                    dispatch({
                        type: ORDER_DETAIL_FAILD,
                        payload: { data: {}, type: ORDER_DETAIL_FAILD },
                    });
                }
            }).catch((error) => {
                if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: ORDER_DETAIL_LONG,
                        payload: { data: {}, type: ORDER_DETAIL_LONG },
                    });
                }
                else {
                    dispatch({
                        type: ORDER_DETAIL_FAILD,
                        payload: { data: {}, type: ORDER_DETAIL_FAILD },
                    });
                }
            });
        }
        recursiveCall()
    };
}