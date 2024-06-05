import { MYCART_REQUEST, MYCART_SUCCESS, MYCART_FAILD, MYCART_CLEAR, MYCART_GLOBAL, ADD_REMOVE_CART_FROM_MINICART_REQUEST, ADD_REMOVE_CART_FROM_MINICART_SUCCESS, ADD_REMOVE_CART_FROM_MINICART_FAILD, ADD_REMOVE_CART_FROM_MINICART_LONG, ADD_REMOVE_CART_FROM_MINICART_NO_DATA, ADD_REMOVE_CART_FROM_MINICART_CLEAR } from "./MyCartTypes";

export function myCart(state = {}, action: any) {
    switch (action.type) {
        case MYCART_REQUEST:
            return { ...action.payload };
        case MYCART_SUCCESS:
            return { ...action.payload };
        case MYCART_FAILD:
            return { ...action.payload };
        case MYCART_CLEAR:
            return {};
        default:
            return state;
    }
}

export function myCartGlobalReducer(state = {}, action: any) {
    switch (action.type) {
        case MYCART_GLOBAL:
            return { ...action.payload };
        default:
            return state;
    }
}

export function addRemoveCartFromMiniCart(state = {}, action:any) {
    switch (action.type) {
        case ADD_REMOVE_CART_FROM_MINICART_REQUEST:
            return { ...action.payload };
        case ADD_REMOVE_CART_FROM_MINICART_SUCCESS:
            return { ...action.payload };
        case ADD_REMOVE_CART_FROM_MINICART_FAILD:
            return { ...action.payload };
        case ADD_REMOVE_CART_FROM_MINICART_LONG:
            return { ...action.payload };
        case ADD_REMOVE_CART_FROM_MINICART_NO_DATA:
            return { ...action.payload };        
        case ADD_REMOVE_CART_FROM_MINICART_CLEAR:
            return {};
        default:
        return state;
    }
}