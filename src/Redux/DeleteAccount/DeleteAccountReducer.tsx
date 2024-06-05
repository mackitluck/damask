import { DELETE_ACCOUNT_REQUEST, DELETE_ACCOUNT_SUCCESS, DELETE_ACCOUNT_FAILD, DELETE_ACCOUNT_CLEAR, DELETE_ACCOUNT_ACTION_REQUEST, DELETE_ACCOUNT_ACTION_SUCCESS, DELETE_ACCOUNT_ACTION_FAILD, DELETE_ACCOUNT_ACTION_CLEAR, DELETE_ACCOUNT_ACTION_LONG } from "./DeleteAccountTypes";

export function getDeleteUser(state = {}, action:any) {
    switch (action.type) {
        case DELETE_ACCOUNT_REQUEST:
            return { ...action.payload };
        case DELETE_ACCOUNT_SUCCESS:
            return { ...action.payload };
        case DELETE_ACCOUNT_FAILD:
            return { ...action.payload };
        case DELETE_ACCOUNT_CLEAR:
            return {};
        default:
            return state;
    }
}

export function deleteUser(state = {}, action:any) {
    switch (action.type) {
        case DELETE_ACCOUNT_ACTION_REQUEST:
            return { ...action.payload };
        case DELETE_ACCOUNT_ACTION_SUCCESS:
            return { ...action.payload };
        case DELETE_ACCOUNT_ACTION_FAILD:
            return { ...action.payload };
        case DELETE_ACCOUNT_ACTION_LONG:
            return { ...action.payload };
        case DELETE_ACCOUNT_ACTION_CLEAR:
            return {};
        default:
            return state;
    }
}