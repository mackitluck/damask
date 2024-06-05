import { INSPIRATION_CATEGORY_REQUEST, INSPIRATION_CATEGORY_SUCCESS, INSPIRATION_CATEGORY_FAILD, INSPIRATION_CATEGORY_CLEAR, INSPIRATION_CATEGORY_NO_DATA } from "./InspirationCategoryTypes";

export function getInspirationCategoryDetails(state = {}, action: any) {
    switch (action.type) {
        case INSPIRATION_CATEGORY_REQUEST:
            return { ...action.payload };
        case INSPIRATION_CATEGORY_SUCCESS:
            return { ...action.payload };
        case INSPIRATION_CATEGORY_FAILD:
            return { ...action.payload };
        case INSPIRATION_CATEGORY_NO_DATA:
            return { ...action.payload };        
        case INSPIRATION_CATEGORY_CLEAR:
            return {};
        default:
            return state;
    }
}