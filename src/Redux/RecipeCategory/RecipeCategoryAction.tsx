import { END_POINTS, MAX_CALLS } from "../../Constant/Api";
import { NO_DATA_ERROR_CODE, SUCCESS_RESPONSE_CODE } from "../../Constant/Status";
import api from "../../Service/Axios";
import { showToast } from "../../Utility/General";
import { RECIPE_CATEGORY_REQUEST, RECIPE_CATEGORY_SUCCESS, RECIPE_CATEGORY_FAILD, RECIPE_CATEGORY_CLEAR, RECIPE_CATEGORY_LONG, RECIPE_CATEGORY_NO_DATA } from "./RecipeCategoryTypes";



export function getRecipesCategoryDetails(queryParam: any) {
    let recallCount = 0;
    return (dispatch: any) => {
        dispatch({
            type: RECIPE_CATEGORY_REQUEST,
            payload: { type: RECIPE_CATEGORY_REQUEST },
        });
        function recursiveCall() {
            api.get(`${END_POINTS.getRecipesCategoryDetails + queryParam}`, {}).then((result) => {
                if (result.data.statusCode === SUCCESS_RESPONSE_CODE) {
                    dispatch({
                        type: RECIPE_CATEGORY_SUCCESS,
                        payload: { data: result.data, type: RECIPE_CATEGORY_SUCCESS },
                    });
                }
                else if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: RECIPE_CATEGORY_LONG,
                        payload: { data: {}, type: RECIPE_CATEGORY_LONG },
                    });
                }
                else if (result.data.errorCode === NO_DATA_ERROR_CODE) {
                    dispatch({
                        type: RECIPE_CATEGORY_NO_DATA,
                        payload: { data: result.data, type: RECIPE_CATEGORY_NO_DATA },
                    });
                }
                else {
                    dispatch({
                        type: RECIPE_CATEGORY_FAILD,
                        payload: { data: {}, type: RECIPE_CATEGORY_FAILD },
                    });
                }
            }).catch((error) => {
                showToast('error', error)
                if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: RECIPE_CATEGORY_LONG,
                        payload: { data: {}, type: RECIPE_CATEGORY_LONG },
                    });
                }
                else {
                    dispatch({
                        type: RECIPE_CATEGORY_FAILD,
                        payload: { data: {}, type: RECIPE_CATEGORY_FAILD },
                    });
                }
            });
        }
        recursiveCall()
    };
}


