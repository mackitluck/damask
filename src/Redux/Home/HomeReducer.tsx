import { HOME_REQUEST, HOME_SUCCESS, HOME_FAILD, HOME_CLEAR } from "./HomeTypes";

export function home(state = {}, action:any) {
    switch (action.type) {
        case HOME_REQUEST:
            return { ...action.payload };
        case HOME_SUCCESS:
            return { ...action.payload };
        case HOME_FAILD:
            return { ...action.payload };
        case HOME_CLEAR:
            return {};
        default:
            return state;
    }
}