import { useNavigate } from "react-router-dom";
import { MEGA_MENU_FAILD, MEGA_MENU_LONG,MEGA_MENU_CLEAR ,MEGA_MENU_REQUEST, MEGA_MENU_SUCCESS, MEGA_MENU_NO_DATA } from "./HeaderTypes";

export function megaMenu(state = {}, action:any) {
    switch (action.type) {
        case MEGA_MENU_REQUEST:
            return { ...action.payload };
        case MEGA_MENU_SUCCESS:
            return { ...action.payload };
        case MEGA_MENU_FAILD:
            return { ...action.payload };
        case MEGA_MENU_NO_DATA:
            return { ...action.payload };
        case MEGA_MENU_CLEAR:
            return {};
        default:
            return state;
    }
}