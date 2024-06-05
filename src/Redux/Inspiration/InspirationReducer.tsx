import { INSPIRATION_REQUEST, INSPIRATION_SUCCESS, INSPIRATION_FAILD, INSPIRATION_CLEAR, INSPIRATION_LONG } from "./InspirationTypes";

export function getInspirationList(state = {}, action: any) {
    switch (action.type) {
        case INSPIRATION_REQUEST:
            return { ...action.payload };
        case INSPIRATION_SUCCESS:
            return { ...action.payload };
        case INSPIRATION_FAILD:
            return { ...action.payload };
        case INSPIRATION_LONG:
            return { ...action.payload };
        case INSPIRATION_CLEAR:
            return {};
        default:
            return state;
    }
}