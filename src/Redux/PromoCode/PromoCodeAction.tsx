import { END_POINTS, MAX_CALLS } from "../../Constant/Api";
import { NO_DATA_ERROR_CODE, SUCCESS_RESPONSE_CODE } from "../../Constant/Status";
import api from "../../Service/Axios";
import { showToast } from "../../Utility/General";
import { PROMO_CODE_CLEAR, PROMO_CODE_FAILD, PROMO_CODE_LONG, PROMO_CODE_REQUEST, PROMO_CODE_SUCCESS } from "./PromoCodeTypes";
import * as localStorageConstant from "../../Constant/LocalStorage";
import { myCart } from "../MyCart/MyCartAction";
import { getCheckoutList } from "../CheckOut/CheckOutAction";

export function applyPromotion(param: any) {
    let recallCount = 0;
    return (dispatch: any) => {
        dispatch({
            type: PROMO_CODE_REQUEST,
            payload: { type: PROMO_CODE_REQUEST },
        });
        function recursiveCall() {
            return api.post(END_POINTS.applyPromotion, param).then((result) => {
                if (result.data.statusCode === SUCCESS_RESPONSE_CODE) {
                    showToast('success', result.data.message)
                    dispatch({
                        type: PROMO_CODE_SUCCESS,
                        payload: { data: result.data, type: PROMO_CODE_SUCCESS },
                    });

                    let quoteId = localStorage.getItem(localStorageConstant.QUOTE_ID) ? localStorage.getItem(localStorageConstant.QUOTE_ID) : "";
                    dispatch(myCart({quoteId: quoteId}));

                    dispatch(getCheckoutList({ address: {}, quoteId: quoteId, shipingId: '' }))
                }
               /*  else if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: PROMO_CODE_LONG,
                        payload: { data: {}, type: PROMO_CODE_LONG },
                    });
                } */
                else {
                    showToast('error', result.data.message)
                    dispatch({
                        type: PROMO_CODE_FAILD,
                        payload: { data: {}, type: PROMO_CODE_FAILD },
                    });
                }
            }).catch((error) => {
                showToast('error', error)
                if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: PROMO_CODE_LONG,
                        payload: { data: {}, type: PROMO_CODE_LONG },
                    });
                }
                else {
                    dispatch({
                        type: PROMO_CODE_FAILD,
                        payload: { data: {}, type: PROMO_CODE_FAILD },
                    });
                }
            });
        }
        recursiveCall()
    };
}

