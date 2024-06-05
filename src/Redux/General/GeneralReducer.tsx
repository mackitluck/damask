import { ADD_REMOVE_WISH_LIST_CLEAR, ADD_REMOVE_WISH_LIST_FAILD, ADD_REMOVE_WISH_LIST_LONG, ADD_REMOVE_WISH_LIST_REQUEST, ADD_REMOVE_WISH_LIST_SUCCESS, CART_COUNT_GLOBAL, DEFAULT_PARAMETER, GET_META_TITLE_SUCCESS, LOGIN_POPUP_SHOW, MASTER_FAILD, MASTER_LONG, MASTER_REQUEST, MASTER_SUCCESS, MINI_CART_FALSE, MINI_CART_TRUE, NEWSLETTER_SUBSCRIPTION_FOR_FOOTER_FAILD, NEWSLETTER_SUBSCRIPTION_FOR_FOOTER_LONG, NEWSLETTER_SUBSCRIPTION_FOR_FOOTER_REQUEST, NEWSLETTER_SUBSCRIPTION_FOR_FOOTER_SUCCESS, QUOTE_ID_GLOBAL } from "./GeneralType";
import { NEWSLETTER_SUBSCRIPTION_FAILD, NEWSLETTER_SUBSCRIPTION_LONG, NEWSLETTER_SUBSCRIPTION_REQUEST, NEWSLETTER_SUBSCRIPTION_SUCCESS } from "./GeneralType"; const defaultParameters = {
    customerId: "",
    customerToken: "",
    websiteId: "",
    groupId: "",
    storeId: ""
}
export function master(state = {}, action: any) {
    switch (action.type) {
        case MASTER_REQUEST:
            return { ...action.payload };
        case MASTER_SUCCESS:
            return { ...action.payload };
        case MASTER_FAILD:
            return { ...action.payload };
        case MASTER_LONG:
            return { ...action.payload };
        default:
            return state;
    }
}

export function cartCountGlobalReducer(state = {}, action: any) {
    switch (action.type) {
        case CART_COUNT_GLOBAL:
            return { ...action.payload };
        default:
            return state;
    }
}

export function miniCart(state = false, action: any) {
    switch (action.type) {
        case MINI_CART_TRUE:
            return action.payload;
        case MINI_CART_FALSE:
            return action.payload;
        default:
            return state;
    }
}

export function defaultParameter(state = defaultParameters, action: any) {
    switch (action.type) {
        case DEFAULT_PARAMETER:
            return { ...action.payload.data };
        default:
            return state;
    }
}

export function newsletterSubscription(state = {}, action: any) {
    switch (action.type) {
        case NEWSLETTER_SUBSCRIPTION_REQUEST:
            return { ...action.payload };
        case NEWSLETTER_SUBSCRIPTION_SUCCESS:
            return { ...action.payload };
        case NEWSLETTER_SUBSCRIPTION_FAILD:
            return { ...action.payload };
        case NEWSLETTER_SUBSCRIPTION_LONG:
            return { ...action.payload };
        default:
            return state;
    }
}

export function newsletterSubscriptionForFooter(state = {}, action: any) {
    switch (action.type) {
        case NEWSLETTER_SUBSCRIPTION_FOR_FOOTER_REQUEST:
            return { ...action.payload };
        case NEWSLETTER_SUBSCRIPTION_FOR_FOOTER_SUCCESS:
            return { ...action.payload };
        case NEWSLETTER_SUBSCRIPTION_FOR_FOOTER_FAILD:
            return { ...action.payload };
        case NEWSLETTER_SUBSCRIPTION_FOR_FOOTER_LONG:
            return { ...action.payload };
        default:
            return state;
    }
}

export function addRemoveWishList(state = {}, action: any) {
    switch (action.type) {
        case ADD_REMOVE_WISH_LIST_REQUEST:
            return { ...action.payload };
        case ADD_REMOVE_WISH_LIST_SUCCESS:
            return { ...action.payload };
        case ADD_REMOVE_WISH_LIST_FAILD:
            return { ...action.payload };
        case ADD_REMOVE_WISH_LIST_LONG:
            return { ...action.payload };
        case ADD_REMOVE_WISH_LIST_CLEAR:
            return { };
        default:
            return state;
    }
}

export function loginAlertPopup(state = {}, action: any) {
    switch (action.type) {
        case LOGIN_POPUP_SHOW:
            return { ...action.payload };
        default:
            return state;
    }
}

export function quoteIdGlobalReducer(state = {}, action: any) {
    switch (action.type) {
        case QUOTE_ID_GLOBAL:
            return { ...action.payload };
        default:
            return state;
    }
}

export function getMetaTitleReducer(state = {}, action: any) {
    switch (action.type) {
      case GET_META_TITLE_SUCCESS:
        return { ...action.payload };
      default:
        return state;
    }
  }