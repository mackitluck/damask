import { ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_LONG, ORDER_LIST_FAILD, ORDER_DETAIL_REQUEST, ORDER_DETAIL_SUCCESS, ORDER_DETAIL_LONG, ORDER_DETAIL_FAILD, ORDER_LIST_CLEAR, ORDER_DETAIL_CLEAR, ORDER_LIST_NO_DATA, ORDER_DETAIL_NO_DATA } from "./OrderTypes";

export function getOrderListReducer(state = {}, action: any) {
    switch (action.type) {
        case ORDER_LIST_REQUEST:
            return { ...action.payload };
        case ORDER_LIST_SUCCESS:
            return { ...action.payload };
        case ORDER_LIST_FAILD:
            return { ...action.payload };
        case ORDER_LIST_LONG:
            return { ...action.payload };
        case ORDER_LIST_NO_DATA:
            return { ...action.payload };
        case ORDER_LIST_CLEAR:
            return {};
        default:
            return state;
    }
}

export function getOrderDetailReducer(state = {}, action: any) {
    switch (action.type) {
        case ORDER_DETAIL_REQUEST:
            return { ...action.payload };
        case ORDER_DETAIL_SUCCESS:
            return { ...action.payload };
        case ORDER_DETAIL_FAILD:
            return { ...action.payload };
        case ORDER_DETAIL_LONG:
            return { ...action.payload };
        case ORDER_DETAIL_NO_DATA:
            return { ...action.payload };
        case ORDER_DETAIL_CLEAR:
            return {};
        default:
            return state;
    }
}