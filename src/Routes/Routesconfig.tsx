// Created by @MIS1131 for routing directory

import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AccountPages from "../Component/AccountPages/AccountPages";
import BadgeHeader from "../Component/BadgeHeader/BadgeHeader";
import Checkout from "../Component/Checkout/Checkout";
import ContactUs from "../Component/ContactUs/ContactUs";
import Digest from "../Component/Digest/Digest";
import DigestDetails from "../Component/DigestDetails/DigestDetails";
import FooterWithMenu from "../Component/FooterWithMenu/FooterWithMenu";
import Header from "../Component/Header/Header";
import HomePage from "../Component/HomePage/HomePage";
import Login from "../Component/Login/Login";
import OrderConfirmation from "../Component/OrderConfirmation/OrderConfirmation";
import OurStory from "../Component/OurStory/OurStory";
import ProductDetails from "../Component/ProductDetails/ProductDetails";
import ProductListing from "../Component/ProductListing/ProductListing";
import SignUp from "../Component/SignUp/SignUp";
import ScrollToTop from "../Constant/ScrollToTop";
import PageNotFound from "../Component/PageNotFound/PageNotFound";
import NoDataFound from "../Component/NoDataFound/NoDataFound";
import SomethingWrong from "../Component/SomethingWrong/SomethingWrong";
import ForgotPassword from "../Component/ForgotPassword/ForgotPassword";
import ResetPassword from "../Component/ResetPassword/ResetPassword";
import InspirationListing from "../Component/InspirationListing/InspirationListing";
import InspirationDetails from "../Component/InspirationDetails/InspirationDetails";
import RecipeDetails from "../Component/RecipeDetails/RecipeDetails";
import RecipeLanding from "../Component/RecipeLanding/RecipeLanding";
import RecipeListing from "../Component/RecipeListing/RecipeListing";
import PrivacyPolicy from "../Component/PrivacyPolicy/PrivacyPolicy";
import TermsAndCondition from "../Component/TermsAndCondition/TermsAndCondition";

import {
  ACCOUNT,
  CHECKOUT,
  CONFIRM_ORDER,
  CONTACT_US,
  DIGEST,
  DIGESTDETAIL,
  HOME,
  LOGIN,
  OURSTORY,
  PRODUCTDETAIL,
  PRODUCTLIST,
  SIGNUP,
  PAGENOTFOUND,
  NODATAFOUND,
  SOMETHINGWRONG,
  FORGOTPASSWORD,
  RESETPASSWORD,
  INSPIRATIONLISTING,
  INSPIRATIONDETAILS,
  RECIPEDETAILS,
  RECIPELANDING,
  RECIPELISTING,
  PRIVACYPOLICY,
  TERMSANDCONDITION,
  MYORDERS,
  ORDERDETAILS,
  FAVORITES,
  MYACCOUNTS,
  MYADDRESSES,
  ADDNEWADDRESS,
  ACCOUNTINFORMATION,
  NEWSLETTER,
  DELETEACCOUNT,
  INSPIRATIONCATEGORY,
  PAYPAL_RETURN_URL,
} from "../Constant/Route";
import MyOrder from "../Component/AccountPages/MyOrder/MyOrder";
import OrderDetails from "../Component/AccountPages/OrderDetails/OrderDetails";
import Favorites from "../Component/AccountPages/Favorites/Favorites";
import MyAccount from "../Component/AccountPages/MyAccount/MyAccount";
import MyAddresses from "../Component/AccountPages/MyAddresses/MyAddresses";
import AddNewAddress from "../Component/AccountPages/AddNewAddress/AddNewAddress";
import AccountInformation from "../Component/AccountPages/AccountInformation/AccountInformation";
import NewsletterSubscription from "../Component/AccountPages/NewsletterSubscription/NewsletterSubscription";
import DeleteAccount from "../Component/AccountPages/DeleteAccount/DeleteAccount";
import InspirationCategory from "../Component/InspirationCategory/InspirationCategory";
import PaypalSuccess from "../Component/PaypalSuccess/PaypalSuccess";
import PaymentLoader from "../Component/PaymentLoader/PaymentLoader";

const Routesconfig = () => {
  return (
    <>
      <BrowserRouter>
        <BadgeHeader />
        <Header />
        <ScrollToTop>
          <Routes>
            <Route path={HOME} element={<HomePage />} />
            <Route path={LOGIN} element={<Login />} />
            <Route path={SIGNUP} element={<SignUp />} />
            <Route path={RESETPASSWORD + "/:token"} element={<ResetPassword />} />
            <Route path={CONTACT_US} element={<ContactUs />} />
            <Route path={CONFIRM_ORDER} element={<OrderConfirmation />} />
            <Route path={ACCOUNT} element={<AccountPages />}>
              <Route path={MYORDERS} element={<MyOrder />} />
              <Route path={ORDERDETAILS} element={<OrderDetails />} />
              <Route path={FAVORITES} element={<Favorites />} />
              <Route path={MYACCOUNTS} element={<MyAccount />} />
              <Route path={MYADDRESSES} element={<MyAddresses />} />
              <Route path={ADDNEWADDRESS} element={<AddNewAddress />} />
              <Route path={ACCOUNTINFORMATION} element={<AccountInformation />} />
              <Route path={NEWSLETTER} element={<NewsletterSubscription />} />
              <Route path={DELETEACCOUNT} element={<DeleteAccount />} />
            </Route>
            <Route path={PRODUCTLIST + "/:category"} element={<ProductListing />} />
            <Route path={PRODUCTLIST} element={<ProductListing />} />
            <Route path={PRODUCTLIST + "/:category" + "/:subcat"} element={<ProductListing />} />
            <Route path={CHECKOUT} element={<Checkout />} />
            <Route path={DIGEST} element={<Digest />} />
            <Route path={DIGESTDETAIL} element={<DigestDetails />} />
            <Route path={OURSTORY} element={<OurStory />} />
            <Route path={PRODUCTDETAIL + "/:productKey"} element={<ProductDetails />} />
            <Route path={PRODUCTDETAIL} element={<ProductDetails />} />
            <Route path={PAGENOTFOUND} element={<PageNotFound />} />
            <Route path={NODATAFOUND} element={<NoDataFound />} />
            <Route path={SOMETHINGWRONG} element={<SomethingWrong />} />
            <Route path={FORGOTPASSWORD} element={<ForgotPassword />} />
            {/* <Route path={RESETPASSWORD} element={<ResetPassword />} /> */}
            <Route path={INSPIRATIONLISTING} element={<InspirationListing />} />
            <Route path={INSPIRATIONCATEGORY + "/:category"} element={<InspirationCategory />} />
            <Route path={INSPIRATIONDETAILS  + "/:urlKey"} element={<InspirationDetails />} />
            <Route path={RECIPEDETAILS + "/:urlKey"} element={<RecipeDetails />} />
            <Route path={RECIPELANDING} element={<RecipeLanding />} />
            <Route path={RECIPELISTING + "/:category"} element={<RecipeListing />} />
            <Route path={PRIVACYPOLICY} element={<PrivacyPolicy />} />
            <Route path={TERMSANDCONDITION} element={<TermsAndCondition />} />
            <Route path={PAYPAL_RETURN_URL} element={<PaypalSuccess />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </ScrollToTop>
        <FooterWithMenu />
      </BrowserRouter>
    </>
  );
};

export default Routesconfig;
