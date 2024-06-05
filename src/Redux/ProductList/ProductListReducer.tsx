import { useNavigate } from "react-router-dom";
import { PRODUCT_LIST_FAILD, PRODUCT_LIST_LONG,PRODUCT_LIST_CLEAR ,PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_NO_DATA, CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESS, CATEGORY_LIST_FAILD, CATEGORY_LIST_LONG, CATEGORY_LIST_NO_DATA, CATEGORY_LIST_CLEAR } from "./ProductListTypes";

export function productList(state = {}, action:any) {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { ...action.payload };
        case PRODUCT_LIST_SUCCESS:
            return { ...action.payload };
        case PRODUCT_LIST_FAILD:
            return { ...action.payload };
        case PRODUCT_LIST_LONG:
            return { ...action.payload };
        case PRODUCT_LIST_NO_DATA:
            return { ...action.payload };        
        case PRODUCT_LIST_CLEAR:
            return {};
        default:
        return state;
    }
}


export function categoryList(state = {}, action:any) {
    switch (action.type) {
        case CATEGORY_LIST_REQUEST:
            return { ...action.payload };
        case CATEGORY_LIST_SUCCESS:
            return { ...action.payload };
        case CATEGORY_LIST_FAILD:
            return { ...action.payload };
        case CATEGORY_LIST_LONG:
            return { ...action.payload };
        case CATEGORY_LIST_NO_DATA:
            return { ...action.payload };        
        case CATEGORY_LIST_CLEAR:
            return {};
        default:
        return state;
    }
}