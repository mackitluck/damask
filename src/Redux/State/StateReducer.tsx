import { STATE_REQUEST, STATE_SUCCESS, STATE_FAILD, STATE_CLEAR, STATE_FOR_ADD_ADDRESS_POPUP_REQUEST, STATE_FOR_ADD_ADDRESS_POPUP_SUCCESS, STATE_FOR_ADD_ADDRESS_POPUP_FAILD, STATE_FOR_ADD_ADDRESS_POPUP_CLEAR } from "./StateTypes";

export function getAllState(state = {}, action:any) {
    switch (action.type) {
        case STATE_REQUEST:
            return { ...action.payload };
        case STATE_SUCCESS:
            return { ...action.payload };
        case STATE_FAILD:
            return { ...action.payload };
        case STATE_CLEAR:
            return {};
        default:
            return state;
    }
}

export function getAllStateForAddAddressPopup(state = {}, action:any) {
    switch (action.type) {
        case STATE_FOR_ADD_ADDRESS_POPUP_REQUEST:
            return { ...action.payload };
        case STATE_FOR_ADD_ADDRESS_POPUP_SUCCESS:
            return { ...action.payload };
        case STATE_FOR_ADD_ADDRESS_POPUP_FAILD:
            return { ...action.payload };
        case STATE_FOR_ADD_ADDRESS_POPUP_CLEAR:
            return {};
        default:
            return state;
    }
}