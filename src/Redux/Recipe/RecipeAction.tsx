import { END_POINTS, MAX_CALLS } from "../../Constant/Api";
import { NO_DATA_ERROR_CODE, SUCCESS_RESPONSE_CODE } from "../../Constant/Status";
import api from "../../Service/Axios";
import { showToast } from "../../Utility/General";
import { RECIPE_REQUEST, RECIPE_SUCCESS, RECIPE_FAILD, RECIPE_CLEAR, RECIPE_LONG } from "./RecipeTypes";



export function getRecipesList() {
    let recallCount = 0;
    return (dispatch: any) => {
        dispatch({
            type: RECIPE_REQUEST,
            payload: { type: RECIPE_REQUEST },
        });
        function recursiveCall() {
            return api.post(END_POINTS.getRecipesList, {}).then((result) => {
                if (result.data.statusCode === SUCCESS_RESPONSE_CODE) {
                    dispatch({
                        type: RECIPE_SUCCESS,
                        payload: { data: result.data, type: RECIPE_SUCCESS },
                    });
                }
                else if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: RECIPE_LONG,
                        payload: { data: {}, type: RECIPE_LONG },
                    });
                }
                else {
                    dispatch({
                        type: RECIPE_FAILD,
                        payload: { data: {}, type: RECIPE_FAILD },
                    });
                }
            }).catch((error) => {
                if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: RECIPE_LONG,
                        payload: { data: {}, type: RECIPE_LONG },
                    });
                }
                else {
                    dispatch({
                        type: RECIPE_FAILD,
                        payload: { data: {}, type: RECIPE_FAILD },
                    });
                }
            });
        }
        recursiveCall()
    };
}


