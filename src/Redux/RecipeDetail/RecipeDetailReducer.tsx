import { RECIPE_DETAIL_REQUEST, RECIPE_DETAIL_SUCCESS, RECIPE_DETAIL_FAILD, RECIPE_DETAIL_CLEAR, RECIPE_DETAIL_NO_DATA, RECIPE_DETAIL_SUBMIT_REVIEW_REQUEST, RECIPE_DETAIL_SUBMIT_REVIEW_SUCCESS, RECIPE_DETAIL_SUBMIT_REVIEW_FAILD, RECIPE_DETAIL_SUBMIT_REVIEW_NO_DATA, RECIPE_DETAIL_SUBMIT_REVIEW_CLEAR, RECIPE_DETAIL_SUBMIT_REVIEW_REPLY_REQUEST, RECIPE_DETAIL_SUBMIT_REVIEW_REPLY_SUCCESS, RECIPE_DETAIL_SUBMIT_REVIEW_REPLY_FAILD, RECIPE_DETAIL_SUBMIT_REVIEW_REPLY_NO_DATA, RECIPE_DETAIL_SUBMIT_REVIEW_REPLY_CLEAR } from "./RecipeDetailTypes";

export function getRecipesPostDetails(state = {}, action: any) {
    switch (action.type) {
        case RECIPE_DETAIL_REQUEST:
            return { ...action.payload };
        case RECIPE_DETAIL_SUCCESS:
            return { ...action.payload };
        case RECIPE_DETAIL_FAILD:
            return { ...action.payload };
        case RECIPE_DETAIL_NO_DATA:
            return { ...action.payload };
        case RECIPE_DETAIL_CLEAR:
            return {};
        default:
            return state;
    }
}

export function saveRecipesComment(state = {}, action: any) {
    switch (action.type) {
        case RECIPE_DETAIL_SUBMIT_REVIEW_REQUEST:
            return { ...action.payload };
        case RECIPE_DETAIL_SUBMIT_REVIEW_SUCCESS:
            return { ...action.payload };
        case RECIPE_DETAIL_SUBMIT_REVIEW_FAILD:
            return { ...action.payload };
        case RECIPE_DETAIL_SUBMIT_REVIEW_NO_DATA:
            return { ...action.payload };
        case RECIPE_DETAIL_SUBMIT_REVIEW_CLEAR:
            return {};
        default:
            return state;
    }
}

export function saveRecipesReplyComment(state = {}, action: any) {
    switch (action.type) {
        case RECIPE_DETAIL_SUBMIT_REVIEW_REPLY_REQUEST:
            return { ...action.payload };
        case RECIPE_DETAIL_SUBMIT_REVIEW_REPLY_SUCCESS:
            return { ...action.payload };
        case RECIPE_DETAIL_SUBMIT_REVIEW_REPLY_FAILD:
            return { ...action.payload };
        case RECIPE_DETAIL_SUBMIT_REVIEW_REPLY_NO_DATA:
            return { ...action.payload };
        case RECIPE_DETAIL_SUBMIT_REVIEW_REPLY_CLEAR:
            return {};
        default:
            return state;
    }
}