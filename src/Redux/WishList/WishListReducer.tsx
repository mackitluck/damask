import { useNavigate } from "react-router-dom";
import { WISH_LIST_FAILD, WISH_LIST_LONG,WISH_LIST_CLEAR ,WISH_LIST_REQUEST,WISH_LIST_NO_DATA, WISH_LIST_SUCCESS } from "./WishListTypes";

export function wishList(state = {}, action:any) {
    switch (action.type) {
        case WISH_LIST_REQUEST:
            return { ...action.payload };
        case WISH_LIST_SUCCESS:
            return { ...action.payload };
        case WISH_LIST_FAILD:
            return { ...action.payload };
        case WISH_LIST_LONG:
            return { ...action.payload };
        case WISH_LIST_NO_DATA:
            return { ...action.payload };
        case WISH_LIST_CLEAR:
            return {};
        default:
            return state;
    }
}