import { useNavigate } from "react-router-dom";
import { END_POINTS, MAX_CALLS } from "../../Constant/Api";
import { USER } from "../../Constant/LocalStorage";
import { NO_DATA_ERROR_CODE, SUCCESS_RESPONSE_CODE } from "../../Constant/Status";
import api from "../../Service/Axios";
import { showToast } from "../../Utility/General";
import { PRODUCT_LIST_FAILD, PRODUCT_LIST_LONG, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_NO_DATA, CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESS, CATEGORY_LIST_LONG, CATEGORY_LIST_NO_DATA, CATEGORY_LIST_FAILD } from "./ProductListTypes";


export function productListAction(queryParam: any) {
    let recallCount = 0;
    return (dispatch: any) => {
        dispatch({
            type: PRODUCT_LIST_REQUEST,
            payload: { type: PRODUCT_LIST_REQUEST },
        });
        function recursiveCall() {
            api.get(`${END_POINTS.productList + queryParam}`, {}).then((result) => {
                if (result.data.statusCode === SUCCESS_RESPONSE_CODE) {
                    dispatch({
                        type: PRODUCT_LIST_SUCCESS,
                        payload: { data: result.data, type: PRODUCT_LIST_SUCCESS },
                    });
                }
                else if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: PRODUCT_LIST_LONG,
                        payload: { data: {}, type: PRODUCT_LIST_LONG },
                    });
                }
                else if (result.data.errorCode === NO_DATA_ERROR_CODE) {
                    dispatch({
                        type: PRODUCT_LIST_NO_DATA,
                        payload: { data: result.data, type: PRODUCT_LIST_NO_DATA },
                    });
                }
                else {
                    dispatch({
                        type: PRODUCT_LIST_FAILD,
                        payload: { data: {}, type: PRODUCT_LIST_FAILD },
                    });
                }
            }).catch((error) => {
                showToast('error', error)
                if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: PRODUCT_LIST_LONG,
                        payload: { data: {}, type: PRODUCT_LIST_LONG },
                    });
                }
                else {
                    dispatch({
                        type: PRODUCT_LIST_FAILD,
                        payload: { data: {}, type: PRODUCT_LIST_FAILD },
                    });
                }
            });
        }
        recursiveCall()
    };
}


export function categoryListAction(param: any) {
    let recallCount = 0;
    return (dispatch: any) => {
        dispatch({
            type: CATEGORY_LIST_REQUEST,
            payload: { type: CATEGORY_LIST_REQUEST },
        });
        function recursiveCall() {
            api.post(`${END_POINTS.categoryList}`, param).then((result) => {
                if (result.data.statusCode === SUCCESS_RESPONSE_CODE) {
                    dispatch({
                        type: CATEGORY_LIST_SUCCESS,
                        payload: { data: result.data, type: CATEGORY_LIST_SUCCESS },
                    });
                }
                else if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: CATEGORY_LIST_LONG,
                        payload: { data: {}, type: CATEGORY_LIST_LONG },
                    });
                }
                else if (result.data.errorCode === NO_DATA_ERROR_CODE) {
                    dispatch({
                        type: CATEGORY_LIST_NO_DATA,
                        payload: { data: result.data, type: CATEGORY_LIST_NO_DATA },
                    });
                }
                else {
                    dispatch({
                        type: CATEGORY_LIST_FAILD,
                        payload: { data: {}, type: CATEGORY_LIST_FAILD },
                    });
                }
            }).catch((error) => {
                showToast('error', error)
                if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: CATEGORY_LIST_LONG,
                        payload: { data: {}, type: CATEGORY_LIST_LONG },
                    });
                }
                else {
                    dispatch({
                        type: CATEGORY_LIST_FAILD,
                        payload: { data: {}, type: CATEGORY_LIST_FAILD },
                    });
                }
            });
        }
        recursiveCall()
    };
}
