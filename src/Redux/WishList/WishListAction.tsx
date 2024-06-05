import { useNavigate } from "react-router-dom";
import { END_POINTS, MAX_CALLS } from "../../Constant/Api";
import { USER } from "../../Constant/LocalStorage";
import { NO_DATA_ERROR_CODE, SUCCESS_RESPONSE_CODE } from "../../Constant/Status";
import api from "../../Service/Axios";
import { showToast } from "../../Utility/General";
import { WISH_LIST_FAILD, WISH_LIST_LONG, WISH_LIST_NO_DATA, WISH_LIST_REQUEST, WISH_LIST_SUCCESS } from "./WishListTypes";


export default function wishListAction(param: any) {
    let recallCount = 0;
    return (dispatch: any) => {
        dispatch({
            type: WISH_LIST_REQUEST,
            payload: { type: WISH_LIST_REQUEST },
        });
        function recursiveCall() {
            api.post(`${END_POINTS.wishlist}`, param).then((result) => {
                if (result.data.statusCode === SUCCESS_RESPONSE_CODE) {
                    dispatch({
                        type: WISH_LIST_SUCCESS,
                        payload: { data: result.data, type: WISH_LIST_SUCCESS },
                    });
                }
                else if (result.data.errorCode === NO_DATA_ERROR_CODE) {
                    dispatch({
                        type: WISH_LIST_NO_DATA,
                        payload: { data: result.data, type: WISH_LIST_NO_DATA },
                    });
                }
                else if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: WISH_LIST_LONG,
                        payload: { data: {}, type: WISH_LIST_LONG },
                    });
                }
                else {
                    dispatch({
                        type: WISH_LIST_FAILD,
                        payload: { data: {}, type: WISH_LIST_FAILD },
                    });
                }
            }).catch((error) => {
                showToast('error', error)
                if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: WISH_LIST_LONG,
                        payload: { data: {}, type: WISH_LIST_LONG },
                    });
                }
                else {
                    dispatch({
                        type: WISH_LIST_FAILD,
                        payload: { data: {}, type: WISH_LIST_FAILD },
                    });
                }
            });
        }
        recursiveCall()
    };
}
