import {PROMO_CODE_CLEAR, PROMO_CODE_FAILD, PROMO_CODE_LONG, PROMO_CODE_REQUEST, PROMO_CODE_SUCCESS } from "./PromoCodeTypes";

export function applyPromotion(state = {}, action: any) {
    switch (action.type) {
        case PROMO_CODE_REQUEST:
            return { ...action.payload };
        case PROMO_CODE_SUCCESS:
            return { ...action.payload };
        case PROMO_CODE_FAILD:
            return { ...action.payload };
        case PROMO_CODE_LONG:
            return { ...action.payload };
        case PROMO_CODE_CLEAR:
            return {};
        default:
            return state;
    }
}