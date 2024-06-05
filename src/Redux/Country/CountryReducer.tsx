import { COUNTRY_REQUEST, COUNTRY_SUCCESS, COUNTRY_FAILD, COUNTRY_CLEAR } from "./CountryTypes";

export function getAllCountry(state = {}, action:any) {
    switch (action.type) {
        case COUNTRY_REQUEST:
            return { ...action.payload };
        case COUNTRY_SUCCESS:
            return { ...action.payload };
        case COUNTRY_FAILD:
            return { ...action.payload };
        case COUNTRY_CLEAR:
            return {};
        default:
            return state;
    }
}