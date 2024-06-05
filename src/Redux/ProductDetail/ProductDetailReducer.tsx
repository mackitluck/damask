import { useNavigate } from "react-router-dom";
import { PRODUCT_DETAIL_FAILD, PRODUCT_DETAIL_LONG,PRODUCT_DETAIL_CLEAR ,PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS, PRODUCT_DETAIL_NO_DATA, PRODUCT_REVIEW_REQUEST, PRODUCT_REVIEW_SUCCESS, PRODUCT_REVIEW_FAILD, PRODUCT_REVIEW_LONG, PRODUCT_REVIEW_NO_DATA, PRODUCT_REVIEW_CLEAR, ADD_PRODUCT_REVIEW_REQUEST, ADD_PRODUCT_REVIEW_SUCCESS, ADD_PRODUCT_REVIEW_FAILD, ADD_PRODUCT_REVIEW_LONG, ADD_PRODUCT_REVIEW_NO_DATA, ADD_PRODUCT_REVIEW_CLEAR, ADD_TO_CART_CLEAR, ADD_TO_CART_NO_DATA, ADD_TO_CART_LONG, ADD_TO_CART_FAILD, ADD_TO_CART_SUCCESS, ADD_TO_CART_REQUEST, SELECT_VARIENT_REQUEST, SELECT_VARIENT_SUCCESS, SELECT_VARIENT_FAILD, SELECT_VARIENT_LONG, SELECT_VARIENT_NO_DATA, SELECT_VARIENT_CLEAR, NOTIFY_ME_REQUEST, NOTIFY_ME_SUCCESS, NOTIFY_ME_FAILD, NOTIFY_ME_LONG, NOTIFY_ME_NO_DATA, NOTIFY_ME_CLEAR} from "./ProductDetailTypes";

export function productDetail(state = {}, action:any) {
    switch (action.type) {
        case PRODUCT_DETAIL_REQUEST:
            return { ...action.payload };
        case PRODUCT_DETAIL_SUCCESS:
            return { ...action.payload };
        case PRODUCT_DETAIL_FAILD:
            return { ...action.payload };
        case PRODUCT_DETAIL_LONG:
            return { ...action.payload };
        case PRODUCT_DETAIL_NO_DATA:
            return { ...action.payload };        
        case PRODUCT_DETAIL_CLEAR:
            return {};
        default:
        return state;
    }
}


export function productReview(state = {}, action:any) {
    switch (action.type) {
        case PRODUCT_REVIEW_REQUEST:
            return { ...action.payload };
        case PRODUCT_REVIEW_SUCCESS:
            return { ...action.payload };
        case PRODUCT_REVIEW_FAILD:
            return { ...action.payload };
        case PRODUCT_REVIEW_LONG:
            return { ...action.payload };
        case PRODUCT_REVIEW_NO_DATA:
            return { ...action.payload };        
        case PRODUCT_REVIEW_CLEAR:
            return {};
        default:
        return state;
    }
}


export function addProductReview(state = {}, action:any) {
    switch (action.type) {
        case ADD_PRODUCT_REVIEW_REQUEST:
            return { ...action.payload };
        case ADD_PRODUCT_REVIEW_SUCCESS:
            return { ...action.payload };
        case ADD_PRODUCT_REVIEW_FAILD:
            return { ...action.payload };
        case ADD_PRODUCT_REVIEW_LONG:
            return { ...action.payload };
        case ADD_PRODUCT_REVIEW_NO_DATA:
            return { ...action.payload };        
        case ADD_PRODUCT_REVIEW_CLEAR:
            return {};
        default:
        return state;
    }
}


export function addToCart(state = {}, action:any) {
    switch (action.type) {
        case ADD_TO_CART_REQUEST:
            return { ...action.payload };
        case ADD_TO_CART_SUCCESS:
            return { ...action.payload };
        case ADD_TO_CART_FAILD:
            return { ...action.payload };
        case ADD_TO_CART_LONG:
            return { ...action.payload };
        case ADD_TO_CART_NO_DATA:
            return { ...action.payload };        
        case ADD_TO_CART_CLEAR:
            return {};
        default:
        return state;
    }
}


export function selectedVarient(state = {}, action:any) {
    switch (action.type) {
        case SELECT_VARIENT_REQUEST:
            return { ...action.payload };
        case SELECT_VARIENT_SUCCESS:
            return { ...action.payload };
        case SELECT_VARIENT_FAILD:
            return { ...action.payload };
        case SELECT_VARIENT_LONG:
            return { ...action.payload };
        case SELECT_VARIENT_NO_DATA:
            return { ...action.payload };        
        case SELECT_VARIENT_CLEAR:
            return {};
        default:
        return state;
    }
}


export function notifyMe(state = {}, action:any) {
    switch (action.type) {
        case NOTIFY_ME_REQUEST:
            return { ...action.payload };
        case NOTIFY_ME_SUCCESS:
            return { ...action.payload };
        case NOTIFY_ME_FAILD:
            return { ...action.payload };
        case NOTIFY_ME_LONG:
            return { ...action.payload };
        case NOTIFY_ME_NO_DATA:
            return { ...action.payload };        
        case NOTIFY_ME_CLEAR:
            return {};
        default:
        return state;
    }
}
