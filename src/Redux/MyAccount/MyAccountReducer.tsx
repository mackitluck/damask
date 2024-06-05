import { MYACCOUNT_REQUEST, MYACCOUNT_SUCCESS, MYACCOUNT_FAILD, MYACCOUNT_CLEAR } from "./MyAccountTypes";

export function getMyaccount(state = {}, action: any) {
    switch (action.type) {
        case MYACCOUNT_REQUEST:
            return { ...action.payload };
        case MYACCOUNT_SUCCESS:
            return { ...action.payload };
        case MYACCOUNT_FAILD:
            return { ...action.payload };
        case MYACCOUNT_CLEAR:
            return {};
        default:
            return state;
    }
}