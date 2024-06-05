import { useNavigate } from "react-router-dom";
import { GUEST_CHECKOUT_FAILD, GUEST_CHECKOUT_LONG, GUEST_CHECKOUT_CLEAR, GUEST_CHECKOUT_REQUEST, GUEST_CHECKOUT_SUCCESS, GUEST_CHECKOUT_ADD_UPDATE_ADDRESS_REQUEST, GUEST_CHECKOUT_ADD_UPDATE_ADDRESS_SUCCESS, GUEST_CHECKOUT_ADD_UPDATE_ADDRESS_FAILD, GUEST_CHECKOUT_ADD_UPDATE_ADDRESS_CLEAR, GUEST_CHECKOUT_ADD_UPDATE_DELIVERY_OPTION_REQUEST, GUEST_CHECKOUT_ADD_UPDATE_DELIVERY_OPTION_SUCCESS, GUEST_CHECKOUT_ADD_UPDATE_DELIVERY_OPTION_FAILD, GUEST_CHECKOUT_ADD_UPDATE_DELIVERY_OPTION_CLEAR, CHECKOUT_PLACE_ORDER_REQUEST, CHECKOUT_PLACE_ORDER_SUCCESS, CHECKOUT_PLACE_ORDER_FAILD, CHECKOUT_PLACE_ORDER_CLEAR, LOGGED_IN_USER_CHECKOUT_REQUEST, LOGGED_IN_USER_CHECKOUT_SUCCESS, LOGGED_IN_USER_CHECKOUT_FAILD, LOGGED_IN_USER_CHECKOUT_CLEAR, LOGGED_IN_USER_CHECKOUT_ADD_UPDATE_ADDRESS_REQUEST, LOGGED_IN_USER_CHECKOUT_ADD_UPDATE_ADDRESS_SUCCESS, LOGGED_IN_USER_CHECKOUT_ADD_UPDATE_ADDRESS_FAILD, LOGGED_IN_USER_CHECKOUT_ADD_UPDATE_ADDRESS_CLEAR, ADD_ADDRESS_IN_CHECKOUT_FOR_LOGGED_IN_USER_REQUEST, ADD_ADDRESS_IN_CHECKOUT_FOR_LOGGED_IN_USER_SUCCESS, ADD_ADDRESS_IN_CHECKOUT_FOR_LOGGED_IN_USER_FAILD, ADD_ADDRESS_IN_CHECKOUT_FOR_LOGGED_IN_USER_CLEAR, QUOTE_ADDRESS_UPDATE_REQUEST, QUOTE_ADDRESS_UPDATE_SUCCESS, QUOTE_ADDRESS_UPDATE_FAILD, QUOTE_ADDRESS_UPDATE_CLEAR, CREATE_PAYPAL_EXPRESS_TOKEN_SUCCESS, CREATE_PAYPAL_EXPRESS_TOKEN_FAILED, CREATE_PAYPAL_EXPRESS_TOKEN_REQUEST, PAYPAL_EXPRESS_ORDER_FAILED, PAYPAL_EXPRESS_ORDER_REQUEST, PAYPAL_EXPRESS_ORDER_SUCCESS, CREATE_APPLE_PAY_PAYMENT_INTENT_REQUEST, CREATE_APPLE_PAY_PAYMENT_INTENT_SUCCESS, CREATE_APPLE_PAY_PAYMENT_INTENT_FAILED, CREATE_APPLE_PAY_PAYMENT_INTENT_LONG } from "./CheckOutTypes";

export function getCheckoutList(state = {}, action: any) {
    switch (action.type) {
        case GUEST_CHECKOUT_REQUEST:
            return { ...action.payload };
        case GUEST_CHECKOUT_SUCCESS:
            return { ...action.payload };
        case GUEST_CHECKOUT_FAILD:
            return { ...action.payload };
        case GUEST_CHECKOUT_CLEAR:
            return {};
        default:
            return state;
    }
}

export const createpaypalExpressToken = (state = {}, action: any) => {
    switch (action.type) {
        case CREATE_PAYPAL_EXPRESS_TOKEN_REQUEST:
            return { ...action.payload };
      case CREATE_PAYPAL_EXPRESS_TOKEN_SUCCESS:
        return { ...action.payload };
      case CREATE_PAYPAL_EXPRESS_TOKEN_FAILED:
        return { ...action.payload };
     
      default:
        return state;
    }
  };

  export const paypalExpressPlaceOrder= (state = {}, action: any) => {
    switch (action.type) {
        case PAYPAL_EXPRESS_ORDER_REQUEST:
            return { ...action.payload };
      case PAYPAL_EXPRESS_ORDER_SUCCESS:
        return { ...action.payload };
      case PAYPAL_EXPRESS_ORDER_FAILED:
        return { ...action.payload };
      default:
        return state;
    }
  };

export function getCheckoutListForLoggedInUser(state = {}, action: any) {
    switch (action.type) {
        case LOGGED_IN_USER_CHECKOUT_REQUEST:
            return { ...action.payload };
        case LOGGED_IN_USER_CHECKOUT_SUCCESS:
            return { ...action.payload };
        case LOGGED_IN_USER_CHECKOUT_FAILD:
            return { ...action.payload };
        case LOGGED_IN_USER_CHECKOUT_CLEAR:
            return {};
        default:
            return state;
    }
}

export function addUpdateAddressInCheckout(state = {}, action: any) {
    switch (action.type) {
        case GUEST_CHECKOUT_ADD_UPDATE_ADDRESS_REQUEST:
            return { ...action.payload };
        case GUEST_CHECKOUT_ADD_UPDATE_ADDRESS_SUCCESS:
            return { ...action.payload };
        case GUEST_CHECKOUT_ADD_UPDATE_ADDRESS_FAILD:
            return { ...action.payload };
        case GUEST_CHECKOUT_ADD_UPDATE_ADDRESS_CLEAR:
            return {};
        default:
            return state;
    }
}

export function addUpdateAddressForLoggedInUserInCheckout(state = {}, action: any) {
    switch (action.type) {
        case LOGGED_IN_USER_CHECKOUT_ADD_UPDATE_ADDRESS_REQUEST:
            return { ...action.payload };
        case LOGGED_IN_USER_CHECKOUT_ADD_UPDATE_ADDRESS_SUCCESS:
            return { ...action.payload };
        case LOGGED_IN_USER_CHECKOUT_ADD_UPDATE_ADDRESS_FAILD:
            return { ...action.payload };
        case LOGGED_IN_USER_CHECKOUT_ADD_UPDATE_ADDRESS_CLEAR:
            return {};
        default:
            return state;
    }
}

export function addAddressForLoggedInUserInCheckout(state = {}, action: any) {
    switch (action.type) {
        case ADD_ADDRESS_IN_CHECKOUT_FOR_LOGGED_IN_USER_REQUEST:
            return { ...action.payload };
        case ADD_ADDRESS_IN_CHECKOUT_FOR_LOGGED_IN_USER_SUCCESS:
            return { ...action.payload };
        case ADD_ADDRESS_IN_CHECKOUT_FOR_LOGGED_IN_USER_FAILD:
            return { ...action.payload };
        case ADD_ADDRESS_IN_CHECKOUT_FOR_LOGGED_IN_USER_CLEAR:
            return {};
        default:
            return state;
    }
}

export function addUpdateDeliveryOptionInCheckout(state = {}, action: any) {
    switch (action.type) {
        case GUEST_CHECKOUT_ADD_UPDATE_DELIVERY_OPTION_REQUEST:
            return { ...action.payload };
        case GUEST_CHECKOUT_ADD_UPDATE_DELIVERY_OPTION_SUCCESS:
            return { ...action.payload };
        case GUEST_CHECKOUT_ADD_UPDATE_DELIVERY_OPTION_FAILD:
            return { ...action.payload };
        case GUEST_CHECKOUT_ADD_UPDATE_DELIVERY_OPTION_CLEAR:
            return {};
        default:
            return state;
    }
}

export function placeOrder(state = {}, action: any) {
    switch (action.type) {
        case CHECKOUT_PLACE_ORDER_REQUEST:
            return { ...action.payload };
        case CHECKOUT_PLACE_ORDER_SUCCESS:
            return { ...action.payload };
        case CHECKOUT_PLACE_ORDER_FAILD:
            return { ...action.payload };
        case CHECKOUT_PLACE_ORDER_CLEAR:
            return {};
        default:
            return state;
    }
}

export function quoteUpdateAddress(state = {}, action: any) {
    switch (action.type) {
        case QUOTE_ADDRESS_UPDATE_REQUEST:
            return { ...action.payload };
        case QUOTE_ADDRESS_UPDATE_SUCCESS:
            return { ...action.payload };
        case QUOTE_ADDRESS_UPDATE_FAILD:
            return { ...action.payload };
        case QUOTE_ADDRESS_UPDATE_CLEAR:
            return {};
        default:
            return state;
    }
}

export function createApplePayPaymentIntent(state = {}, action: any) {
    switch (action.type) {
        case CREATE_APPLE_PAY_PAYMENT_INTENT_REQUEST:
            return { ...action.payload };
        case CREATE_APPLE_PAY_PAYMENT_INTENT_SUCCESS:
            return { ...action.payload };
        case CREATE_APPLE_PAY_PAYMENT_INTENT_FAILED:
            return { ...action.payload };
        case CREATE_APPLE_PAY_PAYMENT_INTENT_LONG:
            return {};
        default:
            return state;
    }
}