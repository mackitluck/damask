import { RECIPE_CATEGORY_REQUEST, RECIPE_CATEGORY_SUCCESS, RECIPE_CATEGORY_FAILD, RECIPE_CATEGORY_CLEAR, RECIPE_CATEGORY_NO_DATA } from "./RecipeCategoryTypes";

export function getRecipesCategoryDetails(state = {}, action: any) {
    switch (action.type) {
        case RECIPE_CATEGORY_REQUEST:
            return { ...action.payload };
        case RECIPE_CATEGORY_SUCCESS:
            return { ...action.payload };
        case RECIPE_CATEGORY_FAILD:
            return { ...action.payload };
        case RECIPE_CATEGORY_NO_DATA:
            return { ...action.payload };        
        case RECIPE_CATEGORY_CLEAR:
            return {};
        default:
            return state;
    }
}