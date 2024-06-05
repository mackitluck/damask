import { END_POINTS, MAX_CALLS } from "../../Constant/Api";
import { NO_DATA_ERROR_CODE, SUCCESS_RESPONSE_CODE } from "../../Constant/Status";
import api from "../../Service/Axios";
import { showToast } from "../../Utility/General";
import { RECIPE_DETAIL_REQUEST, RECIPE_DETAIL_SUCCESS, RECIPE_DETAIL_FAILD, RECIPE_DETAIL_CLEAR, RECIPE_DETAIL_LONG, RECIPE_DETAIL_NO_DATA, RECIPE_DETAIL_SUBMIT_REVIEW_REQUEST, RECIPE_DETAIL_SUBMIT_REVIEW_SUCCESS, RECIPE_DETAIL_SUBMIT_REVIEW_LONG, RECIPE_DETAIL_SUBMIT_REVIEW_NO_DATA, RECIPE_DETAIL_SUBMIT_REVIEW_FAILD, RECIPE_DETAIL_SUBMIT_REVIEW_REPLY_REQUEST, RECIPE_DETAIL_SUBMIT_REVIEW_REPLY_SUCCESS, RECIPE_DETAIL_SUBMIT_REVIEW_REPLY_LONG, RECIPE_DETAIL_SUBMIT_REVIEW_REPLY_NO_DATA, RECIPE_DETAIL_SUBMIT_REVIEW_REPLY_FAILD } from "./RecipeDetailTypes";



export function getRecipesPostDetails(queryParam: any) {
    let recallCount = 0;
    return (dispatch: any) => {
        dispatch({
            type: RECIPE_DETAIL_REQUEST,
            payload: { type: RECIPE_DETAIL_REQUEST },
        });
        function recursiveCall() {
            api.get(`${END_POINTS.getRecipesPostDetails + queryParam}`, {}).then((result) => {
                if (result.data.statusCode === SUCCESS_RESPONSE_CODE) {
                    dispatch({
                        type: RECIPE_DETAIL_SUCCESS,
                        payload: { data: result.data, type: RECIPE_DETAIL_SUCCESS },
                    });
                }
                else if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: RECIPE_DETAIL_LONG,
                        payload: { data: {}, type: RECIPE_DETAIL_LONG },
                    });
                }
                else if (result.data.errorCode === NO_DATA_ERROR_CODE) {
                    dispatch({
                        type: RECIPE_DETAIL_NO_DATA,
                        payload: { data: result.data, type: RECIPE_DETAIL_NO_DATA },
                    });
                }
                else {
                    dispatch({
                        type: RECIPE_DETAIL_FAILD,
                        payload: { data: {}, type: RECIPE_DETAIL_FAILD },
                    });
                }
            }).catch((error) => {
                showToast('error', error)
                if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: RECIPE_DETAIL_LONG,
                        payload: { data: {}, type: RECIPE_DETAIL_LONG },
                    });
                }
                else {
                    dispatch({
                        type: RECIPE_DETAIL_FAILD,
                        payload: { data: {}, type: RECIPE_DETAIL_FAILD },
                    });
                }
            });
        }
        recursiveCall()
    };
}

export function saveRecipesComment(param: any) {
    let recallCount = 0;
    return (dispatch: any) => {
        dispatch({
            type: RECIPE_DETAIL_SUBMIT_REVIEW_REQUEST,
            payload: { type: RECIPE_DETAIL_SUBMIT_REVIEW_REQUEST },
        });
        function recursiveCall() {
            api.post(`${END_POINTS.saveRecipesComment}`, param).then((result) => {
                if (result.data.statusCode === SUCCESS_RESPONSE_CODE) {
                    showToast('success', result.data.message)
                    dispatch({
                        type: RECIPE_DETAIL_SUBMIT_REVIEW_SUCCESS,
                        payload: { data: result.data, type: RECIPE_DETAIL_SUBMIT_REVIEW_SUCCESS },
                    });
                }
                else if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: RECIPE_DETAIL_SUBMIT_REVIEW_LONG,
                        payload: { data: {}, type: RECIPE_DETAIL_SUBMIT_REVIEW_LONG },
                    });
                }
                else if (result.data.errorCode === NO_DATA_ERROR_CODE) {
                    dispatch({
                        type: RECIPE_DETAIL_SUBMIT_REVIEW_NO_DATA,
                        payload: { data: result.data, type: RECIPE_DETAIL_SUBMIT_REVIEW_NO_DATA },
                    });
                }
                else {
                    showToast('error', result.data.message)
                    dispatch({
                        type: RECIPE_DETAIL_SUBMIT_REVIEW_FAILD,
                        payload: { data: {}, type: RECIPE_DETAIL_SUBMIT_REVIEW_FAILD },
                    });
                }
            }).catch((error) => {
                showToast('error', error)
                if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: RECIPE_DETAIL_SUBMIT_REVIEW_LONG,
                        payload: { data: {}, type: RECIPE_DETAIL_SUBMIT_REVIEW_LONG },
                    });
                }
                else {
                    dispatch({
                        type: RECIPE_DETAIL_SUBMIT_REVIEW_FAILD,
                        payload: { data: {}, type: RECIPE_DETAIL_SUBMIT_REVIEW_FAILD },
                    });
                }
            });
        }
        recursiveCall()
    };
}

export function saveRecipesReplyComment(param: any) {
    let recallCount = 0;
    return (dispatch: any) => {
        dispatch({
            type: RECIPE_DETAIL_SUBMIT_REVIEW_REPLY_REQUEST,
            payload: { type: RECIPE_DETAIL_SUBMIT_REVIEW_REPLY_REQUEST },
        });
        function recursiveCall() {
            api.post(`${END_POINTS.saveRecipesComment}`, param).then((result) => {
                if (result.data.statusCode === SUCCESS_RESPONSE_CODE) {
                    showToast('success', result.data.message)
                    dispatch({
                        type: RECIPE_DETAIL_SUBMIT_REVIEW_REPLY_SUCCESS,
                        payload: { data: result.data, type: RECIPE_DETAIL_SUBMIT_REVIEW_REPLY_SUCCESS },
                    });
                }
                else if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: RECIPE_DETAIL_SUBMIT_REVIEW_REPLY_LONG,
                        payload: { data: {}, type: RECIPE_DETAIL_SUBMIT_REVIEW_REPLY_LONG },
                    });
                }
                else if (result.data.errorCode === NO_DATA_ERROR_CODE) {
                    dispatch({
                        type: RECIPE_DETAIL_SUBMIT_REVIEW_REPLY_NO_DATA,
                        payload: { data: result.data, type: RECIPE_DETAIL_SUBMIT_REVIEW_REPLY_NO_DATA },
                    });
                }
                else {
                    showToast('error', result.data.message)
                    dispatch({
                        type: RECIPE_DETAIL_SUBMIT_REVIEW_REPLY_FAILD,
                        payload: { data: {}, type: RECIPE_DETAIL_SUBMIT_REVIEW_REPLY_FAILD },
                    });
                }
            }).catch((error) => {
                showToast('error', error)
                if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: RECIPE_DETAIL_SUBMIT_REVIEW_REPLY_LONG,
                        payload: { data: {}, type: RECIPE_DETAIL_SUBMIT_REVIEW_REPLY_LONG },
                    });
                }
                else {
                    dispatch({
                        type: RECIPE_DETAIL_SUBMIT_REVIEW_REPLY_FAILD,
                        payload: { data: {}, type: RECIPE_DETAIL_SUBMIT_REVIEW_REPLY_FAILD },
                    });
                }
            });
        }
        recursiveCall()
    };
}


