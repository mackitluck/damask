import { DEMO_REQUEST, DEMO_SUCCESS, DEMO_FAILD, DEMO_CLEAR } from "./DemoTypes";

export function getMyOrdersReducer(state = {}, action:any) {
    switch (action.type) {
        case DEMO_REQUEST:
            return { ...action.payload };
        case DEMO_SUCCESS:
            return { ...action.payload };
        case DEMO_FAILD:
            return { ...action.payload };
        case DEMO_CLEAR:
            return {};
        default:
            return state;
    }
}