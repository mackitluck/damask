import { INSPIRATION_DETAIL_REQUEST, INSPIRATION_DETAIL_SUCCESS, INSPIRATION_DETAIL_FAILD, INSPIRATION_DETAIL_CLEAR, INSPIRATION_DETAIL_NO_DATA } from "./InspirationDetailTypes";

export function getInspirationPostDetails(state = {}, action: any) {
    switch (action.type) {
        case INSPIRATION_DETAIL_REQUEST:
            return { ...action.payload };
        case INSPIRATION_DETAIL_SUCCESS:
            return { ...action.payload };
        case INSPIRATION_DETAIL_FAILD:
            return { ...action.payload };
        case INSPIRATION_DETAIL_NO_DATA:
            return { ...action.payload };
        case INSPIRATION_DETAIL_CLEAR:
            return {};
        default:
            return state;
    }
}