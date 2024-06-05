import { combineReducers } from "redux";
import { forgotPassword, login, logout, resetPassword } from "./Auth/AuthReducer";
import { addRemoveWishList, cartCountGlobalReducer, defaultParameter, getMetaTitleReducer, loginAlertPopup, master, miniCart, newsletterSubscription, newsletterSubscriptionForFooter, quoteIdGlobalReducer } from "./General/GeneralReducer";
import { home } from "./Home/HomeReducer";
import { contactUs } from "./ContactUs/ContactUsReducer";
import { getMyProfile, myProfileUpdate } from "./MyProfile/MyProfileReducer";
import { getOrderDetailReducer, getOrderListReducer } from "./Order/OrderReducer";
import { wishList } from "./WishList/WishListReducer";
import { deleteAddress, getAllAddress, updateAddress } from "./MyAddresses/MyAddressesReducer";
import { getAllCountry } from "./Country/CountryReducer";
import { getAllState, getAllStateForAddAddressPopup } from "./State/StateReducer";
import { categoryList, productList } from "./ProductList/ProductListReducer";
import { getMySetting, mySettingUpdate } from "./MySetting/MySettingReducer";
import { getMyaccount } from "./MyAccount/MyAccountReducer";
import { megaMenu } from "./Header/HeaderReducer";
import { addRemoveCartFromMiniCart, myCart, myCartGlobalReducer } from "./MyCart/MyCartReducer";
import { addProductReview, addToCart, notifyMe, productDetail, productReview, selectedVarient } from "./ProductDetail/ProductDetailReducer";
import { getRecipesList } from "./Recipe/RecipeReducer";
import { getRecipesCategoryDetails } from "./RecipeCategory/RecipeCategoryReducer";
import { getRecipesPostDetails, saveRecipesComment, saveRecipesReplyComment } from "./RecipeDetail/RecipeDetailReducer";
import { cmsPage } from "./CmsPage/CmsPageReducer";
import { deleteUser, getDeleteUser } from "./DeleteAccount/DeleteAccountReducer";
import { getInspirationPostDetails } from "./InspirationDetail/InspirationDetailReducer";
import { applyPromotion } from "./PromoCode/PromoCodeReducer";
import { getInspirationList } from "./Inspiration/InspirationReducer";
import { getInspirationCategoryDetails } from "./InspirationCategory/InspirationCategoryReducer";
import { addAddressForLoggedInUserInCheckout, addUpdateAddressInCheckout, addUpdateDeliveryOptionInCheckout, createApplePayPaymentIntent, createpaypalExpressToken, getCheckoutList, getCheckoutListForLoggedInUser, paypalExpressPlaceOrder, placeOrder, quoteUpdateAddress } from "./CheckOut/CheckOutReducer";


export default combineReducers({
    // DEMO
    // servicePackageList: servicePackageReducer,
    master: master,
    defaultParameter: defaultParameter,
    login: login,
    logout:logout,
    forgotPassword: forgotPassword,
    cart: miniCart,
    home: home,
    contactUs: contactUs,
    orderDetail: getOrderDetailReducer,
    orderList: getOrderListReducer,
    newsletterSubscription: newsletterSubscription,
    getMyProfile: getMyProfile,
    myProfileUpdate: myProfileUpdate,
    wishList: wishList,
    addRemoveWishList:addRemoveWishList,
    getAllAddress:getAllAddress,
    getAllCountry:getAllCountry,
    getAllState:getAllState,
    updateAddress:updateAddress,
    cmsPage:cmsPage,
    productList:productList,    
    categoryList:categoryList,
    getMySetting:getMySetting,
    mySettingUpdate:mySettingUpdate,
    getMyaccount:getMyaccount,
    megaMenu:megaMenu,
    myCart:myCart,
    addToCart:addToCart,
    productDetail:productDetail,
    productReview:productReview,
    addProductReview:addProductReview,
    getRecipesList:getRecipesList,
    getRecipesCategoryDetails:getRecipesCategoryDetails,
    getRecipesPostDetails:getRecipesPostDetails,
    saveRecipesComment:saveRecipesComment,
    selectedVarient:selectedVarient,
    notifyMe:notifyMe,
    cartCountGlobalData:cartCountGlobalReducer,
    myCartGlobalData:myCartGlobalReducer,
    addRemoveCartFromMiniCart:addRemoveCartFromMiniCart,
    getDeleteUser:getDeleteUser,
    deleteUser:deleteUser,
    getInspirationPostDetails:getInspirationPostDetails,
    applyPromotion:applyPromotion,
    resetPassword:resetPassword,
    getInspirationList:getInspirationList,
    getInspirationCategoryDetails:getInspirationCategoryDetails,
    loginAlertPopup:loginAlertPopup,
    getCheckoutList: getCheckoutList,
    getCheckoutListForLoggedInUser: getCheckoutListForLoggedInUser,
    addUpdateAddressInCheckout: addUpdateAddressInCheckout,
    addUpdateDeliveryOptionInCheckout: addUpdateDeliveryOptionInCheckout,
    addAddressForLoggedInUserInCheckout: addAddressForLoggedInUserInCheckout,
    createpaypalExpressToken:createpaypalExpressToken,
    paypalExpressPlaceOrder:paypalExpressPlaceOrder,
    deleteAddress: deleteAddress,
    placeOrder: placeOrder,
    getMetaTitleReducer:getMetaTitleReducer,
    getAllStateForAddAddressPopup:getAllStateForAddAddressPopup,
    quoteUpdateAddress:quoteUpdateAddress,
    saveRecipesReplyComment:saveRecipesReplyComment,
    quoteIdGlobal:quoteIdGlobalReducer,
    newsletterSubscriptionForFooter:newsletterSubscriptionForFooter,
    createApplePayPaymentIntent:createApplePayPaymentIntent
});
