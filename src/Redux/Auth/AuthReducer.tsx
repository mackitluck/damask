import { USER } from "../../Constant/LocalStorage";
import { checkCookie, getCookie } from "../../Utility/Cookie";
import { lastLogin } from "../../Utility/General";
import { CHECK_AUTHORIZATION_FAILD, CHECK_AUTHORIZATION_REQUEST, CHECK_AUTHORIZATION_SUCCESS, FORGOT_PASSWORD_FAILD, FORGOT_PASSWORD_LONG, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_CLEAR, LOGIN_FAILD, LOGIN_LONG, LOGIN_REQUEST, LOGIN_SUCCESS, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILD, RESET_PASSWORD_CLEAR, LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILD, LOGOUT_CLEAR } from "./AuthType";
let user: any = localStorage.getItem(USER)
const data = JSON.parse(user);
const initialState = () => {
    if (checkCookie('user')) {
        let cookieData = JSON.parse(getCookie('user'))
        localStorage.setItem(USER, JSON.stringify(cookieData))
        return { isLoggedIn: true, data: cookieData }
    }
    /* else if (user) {
        let loginMinutes: number = lastLogin()
        if (loginMinutes < 1440) {
            return { isLoggedIn: true, data }
        }
        else {
            localStorage.removeItem(USER)
            return { isLoggedIn: false, data: null }
        }
    } */
    else {
        return { isLoggedIn: false, data: null }
    }
    // return data ? { isLoggedIn: true, data } : { isLoggedIn: false, data: null }
};

export function login(state = initialState(), action: any) {
    switch (action.type) {
        case LOGIN_REQUEST:
            state.isLoggedIn = false;
            action.payload["isLoggedIn"] = state.isLoggedIn;
            return { ...action.payload };
        case LOGIN_SUCCESS:
            state.isLoggedIn = true;
            action.payload["isLoggedIn"] = state.isLoggedIn;
            return { ...action.payload };
        case LOGIN_FAILD:
            state.isLoggedIn = false;
            action.payload["isLoggedIn"] = state.isLoggedIn;
            return { ...action.payload };
        case LOGIN_LONG:
            state.isLoggedIn = false;
            action.payload["isLoggedIn"] = state.isLoggedIn;
            return { ...action.payload };
        case CHECK_AUTHORIZATION_REQUEST:
            return { ...action.payload };
        case CHECK_AUTHORIZATION_SUCCESS:
            state.isLoggedIn = true;
            action.payload["isLoggedIn"] = state.isLoggedIn;
            return { ...action.payload };
        case CHECK_AUTHORIZATION_FAILD:
            state.isLoggedIn = false;
            action.payload["isLoggedIn"] = state.isLoggedIn;
            return { ...action.payload };
        default:
            return state;
    }
}

export function forgotPassword(state = {}, action: any) {
    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST:
            return { ...action.payload };
        case FORGOT_PASSWORD_SUCCESS:
            return { ...action.payload };
        case FORGOT_PASSWORD_FAILD:
            return { ...action.payload };
        case FORGOT_PASSWORD_CLEAR:
            return {};
        default:
            return state;
    }
}

export function resetPassword(state = {}, action: any) {
    switch (action.type) {
        case RESET_PASSWORD_REQUEST:
            return { ...action.payload };
        case RESET_PASSWORD_SUCCESS:
            return { ...action.payload };
        case RESET_PASSWORD_FAILD:
            return { ...action.payload };
        case RESET_PASSWORD_CLEAR:
            return {};
        default:
            return state;
    }
}

export function logout(state = {}, action: any) {
    switch (action.type) {
        case LOGOUT_REQUEST:
            return { ...action.payload };
        case LOGOUT_SUCCESS:
            return { ...action.payload };
        case LOGOUT_FAILD:
            return { ...action.payload };
        case LOGOUT_CLEAR:
            return {};
        default:
            return state;
    }
}