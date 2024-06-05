import { MYPROFILE_REQUEST, MYPROFILE_SUCCESS, MYPROFILE_FAILD, MYPROFILE_CLEAR, MYPROFILE_UPDATE_REQUEST, MYPROFILE_UPDATE_SUCCESS, MYPROFILE_UPDATE_CLEAR, MYPROFILE_UPDATE_FAILD } from "./MyProfileTypes";

export function getMyProfile(state = {}, action:any) {
    switch (action.type) {
        case MYPROFILE_REQUEST:
            return { ...action.payload };
        case MYPROFILE_SUCCESS:
            return { ...action.payload };
        case MYPROFILE_FAILD:
            return { ...action.payload };
        case MYPROFILE_CLEAR:
            return {};
        default:
            return state;
    }
}

export function myProfileUpdate(state = {}, action:any) {
    switch (action.type) {
        case MYPROFILE_UPDATE_REQUEST:
            return { ...action.payload };
        case MYPROFILE_UPDATE_SUCCESS:
            return { ...action.payload };
        case MYPROFILE_UPDATE_FAILD:
            return { ...action.payload };
        case MYPROFILE_UPDATE_CLEAR:
            return {};
        default:
            return state;
    }
}