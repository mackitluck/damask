import { MY_SETTING_REQUEST, MY_SETTING_SUCCESS, MY_SETTING_FAILD, MY_SETTING_CLEAR, MY_SETTING_UPDATE_CLEAR, MY_SETTING_UPDATE_FAILD, MY_SETTING_UPDATE_REQUEST, MY_SETTING_UPDATE_SUCCESS } from "./MySettingTypes";

export function getMySetting(state = {}, action:any) {
    switch (action.type) {
        case MY_SETTING_REQUEST:
            return { ...action.payload };
        case MY_SETTING_SUCCESS:
            return { ...action.payload };
        case MY_SETTING_FAILD:
            return { ...action.payload };
        case MY_SETTING_CLEAR:
            return {};
        default:
            return state;
    }
}

export function mySettingUpdate(state = {}, action:any) {
    switch (action.type) {
        case MY_SETTING_UPDATE_REQUEST:
            return { ...action.payload };
        case MY_SETTING_UPDATE_SUCCESS:
            return { ...action.payload };
        case MY_SETTING_UPDATE_FAILD:
            return { ...action.payload };
        case MY_SETTING_UPDATE_CLEAR:
            return {};
        default:
            return state;
    }
}