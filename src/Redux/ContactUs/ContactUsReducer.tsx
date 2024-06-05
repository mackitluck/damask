import { useNavigate } from "react-router-dom";
import { CONTACT_US_FAILD, CONTACT_US_LONG,CONTACT_US_CLEAR ,CONTACT_US_REQUEST, CONTACT_US_SUCCESS } from "./ContactUsTypes";

export function contactUs(state = {}, action:any) {
    switch (action.type) {
        case CONTACT_US_REQUEST:
            return { ...action.payload };
        case CONTACT_US_SUCCESS:
            return { ...action.payload };
        case CONTACT_US_FAILD:
            return { ...action.payload };
        case CONTACT_US_CLEAR:
            return {};
        default:
            return state;
    }
}