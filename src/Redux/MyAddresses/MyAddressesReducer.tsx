import { MYADDRESSES_REQUEST, MYADDRESSES_SUCCESS, MYADDRESSES_FAILD, MYADDRESSES_CLEAR, MYADDRESSES_ADD_UPDATE_CLEAR, MYADDRESSES_ADD_UPDATE_FAILD, MYADDRESSES_ADD_UPDATE_REQUEST, MYADDRESSES_ADD_UPDATE_SUCCESS, MYADDRESSES_DELETE_REQUEST, MYADDRESSES_DELETE_SUCCESS, MYADDRESSES_DELETE_FAILD, MYADDRESSES_DELETE_CLEAR } from "./MyAddressesTypes";

export function getAllAddress(state = {}, action: any) {
    switch (action.type) {
        case MYADDRESSES_REQUEST:
            return { ...action.payload };
        case MYADDRESSES_SUCCESS:
            return { ...action.payload };
        case MYADDRESSES_FAILD:
            return { ...action.payload };
        case MYADDRESSES_CLEAR:
            return {};
        default:
            return state;
    }
}

export function updateAddress(state = {}, action: any) {
    switch (action.type) {
        case MYADDRESSES_ADD_UPDATE_REQUEST:
            return { ...action.payload };
        case MYADDRESSES_ADD_UPDATE_SUCCESS:
            return { ...action.payload };
        case MYADDRESSES_ADD_UPDATE_FAILD:
            return { ...action.payload };
        case MYADDRESSES_ADD_UPDATE_CLEAR:
            return {};
        default:
            return state;
    }
}

export function deleteAddress(state = {}, action: any) {
    switch (action.type) {
        case MYADDRESSES_DELETE_REQUEST:
            return { ...action.payload };
        case MYADDRESSES_DELETE_SUCCESS:
            return { ...action.payload };
        case MYADDRESSES_DELETE_FAILD:
            return { ...action.payload };
        case MYADDRESSES_DELETE_CLEAR:
            return {};
        default:
            return state;
    }
}