import { RECIPE_REQUEST, RECIPE_SUCCESS, RECIPE_FAILD, RECIPE_CLEAR } from "./RecipeTypes";

export function getRecipesList(state = {}, action: any) {
    switch (action.type) {
        case RECIPE_REQUEST:
            return { ...action.payload };
        case RECIPE_SUCCESS:
            return { ...action.payload };
        case RECIPE_FAILD:
            return { ...action.payload };
        case RECIPE_CLEAR:
            return {};
        default:
            return state;
    }
}