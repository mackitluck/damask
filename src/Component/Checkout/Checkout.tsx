import React, { useEffect, useState } from "react";
import CK1 from "../../Assets/img/ck1.png";
import CK2 from "../../Assets/img/ck2.png";
import { Container } from "react-bootstrap";
import ProductData from "../Common/ProductData/ProductData";
import CloseX from "../../Assets/img/x.svg";
import Check from "../../Assets/img/check.svg";
import Gift from "../../Assets/img/gift.svg";
import Payment1 from "../../Assets/img/payment-1.svg";
import Payment2 from "../../Assets/img/payment-2.svg";
import Payment3 from "../../Assets/img/payment-3.svg";
import Payment4 from "../../Assets/img/payment-4.svg";
import Payment5 from "../../Assets/img/payment-5.svg";
import CustomeButton from "../Common/CustomeButton/CustomeButton";
import AddNewAddressPopup from "./AddNewAddressPopup/AddNewAddressPopup";
import { useNavigate } from "react-router-dom";
import { CONFIRM_ORDER } from "../../Constant/Route";
import Delivery from "./Delivery/Delivery";
import Payment from "./Payment/Payment";
import { useDispatch, useSelector } from "react-redux";
import { getAllCountry } from "../../Redux/Country/CountryAction";
import Address from "./Address/Address";
import {
  getAllState,
  getAllStateForAddAddressPopup,
} from "../../Redux/State/StateAction";
import {
  ADDRESS,
  BIRTH_DATE,
  CITY,
  COUNTRY,
  DELIVERY_OPTION,
  EMAIL,
  FIRST_NAME,
  GIFT_MESSAGE,
  LAST_NAME,
  PAYMENT_METHOD,
  PHONE,
  PROMO_CODE,
  STATE,
  ZIP_CODE,
} from "../../Language/Validation";
import validate from "../../Utility/Validation";
import { API_STATUS } from "../../Constant/Api";
import { SUCCESS_RESPONSE_CODE } from "../../Constant/Status";
import {
  ADD_ADDRESS_IN_CHECKOUT_FOR_LOGGED_IN_USER_CLEAR,
  ADD_ADDRESS_IN_CHECKOUT_FOR_LOGGED_IN_USER_FAILD,
  ADD_ADDRESS_IN_CHECKOUT_FOR_LOGGED_IN_USER_LONG,
  ADD_ADDRESS_IN_CHECKOUT_FOR_LOGGED_IN_USER_REQUEST,
  ADD_ADDRESS_IN_CHECKOUT_FOR_LOGGED_IN_USER_SUCCESS,
  CHECKOUT_PLACE_ORDER_FAILD,
  CHECKOUT_PLACE_ORDER_LONG,
  CHECKOUT_PLACE_ORDER_REQUEST,
  CHECKOUT_PLACE_ORDER_SUCCESS,
  GUEST_CHECKOUT_ADD_UPDATE_ADDRESS_FAILD,
  GUEST_CHECKOUT_ADD_UPDATE_ADDRESS_LONG,
  GUEST_CHECKOUT_ADD_UPDATE_ADDRESS_REQUEST,
  GUEST_CHECKOUT_ADD_UPDATE_ADDRESS_SUCCESS,
  GUEST_CHECKOUT_ADD_UPDATE_DELIVERY_OPTION_FAILD,
  GUEST_CHECKOUT_ADD_UPDATE_DELIVERY_OPTION_LONG,
  GUEST_CHECKOUT_ADD_UPDATE_DELIVERY_OPTION_REQUEST,
  GUEST_CHECKOUT_ADD_UPDATE_DELIVERY_OPTION_SUCCESS,
  GUEST_CHECKOUT_FAILD,
  GUEST_CHECKOUT_LONG,
  GUEST_CHECKOUT_REQUEST,
  GUEST_CHECKOUT_SUCCESS,
  LOGGED_IN_USER_CHECKOUT_FAILD,
  LOGGED_IN_USER_CHECKOUT_LONG,
  LOGGED_IN_USER_CHECKOUT_REQUEST,
  LOGGED_IN_USER_CHECKOUT_SUCCESS,
  PAYPAL_EXPRESS_ORDER_FAILED,
  PAYPAL_EXPRESS_ORDER_LONG,
  PAYPAL_EXPRESS_ORDER_REQUEST,
  PAYPAL_EXPRESS_ORDER_SUCCESS,
  QUOTE_ADDRESS_UPDATE_FAILD,
  QUOTE_ADDRESS_UPDATE_LONG,
  QUOTE_ADDRESS_UPDATE_REQUEST,
  QUOTE_ADDRESS_UPDATE_SUCCESS,
} from "../../Redux/CheckOut/CheckOutTypes";
import * as localStorageConstant from "../../Constant/LocalStorage";
import {
  addAddressForLoggedInUserInCheckout,
  addUpdateAddressInCheckout,
  addUpdateDeliveryOptionInCheckout,
  getCheckoutList,
  paypalExpressPlaceOrderAction,
  placeOrder,
  quoteUpdateAddress,
} from "../../Redux/CheckOut/CheckOutAction";
import {
  COMPONENT_CHECKOUT_PRICE_DETAILS,
  COMPONENT_GUEST_CHECKOUT_ADDRESS,
  COMPONENT_NEWSLETTER,
  COMPONENT_PAYMENT,
  COMPONENT_PROMO_CODE,
  COMPONENT_PURCHASE_PRODUCT,
  COMPONENT_SHIPPING_METHODS,
} from "../../Constant/Component";
import Loader from "../Loader/Loader";
import SomethingWrong from "../SomethingWrong/SomethingWrong";
import MINICART from "../../Language/MiniCart";
import { applyPromotion } from "../../Redux/PromoCode/PromoCodeAction";
import { isLoading, showToast } from "../../Utility/General";
import LoggedInUserAddresses from "./LoggedInUserAddresses/LoggedInUserAddresses";
import NoDataFound from "../NoDataFound/NoDataFound";
import {
  PROMO_CODE_FAILD,
  PROMO_CODE_SUCCESS,
} from "../../Redux/PromoCode/PromoCodeTypes";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const master = useSelector((state: any) => state?.master?.data);
  let auth = useSelector((state: any) => state?.login?.isLoggedIn);
  const authTokenAll = master?.authToken.split(" ");
  const authTokenFromMaster = authTokenAll[1];
  const [isAddressFill, setIsAddressFill] = useState(false);
  const [isDeliveryOptionSet, setIsDeliveryOptionSet] = useState(false);
  const [isBothAddressSame, setIsBothAddressSame] = useState(true);

  const [deliveryCountry, setDeliveryCountry] = useState("");
  const [billingCountry, setBillingCountry] = useState("");
  const [whichCountrySelected, setWhichCountrySelected] = useState("");
  const [paidUsingApplePay , setPaidUsingApplePay] = useState(false);

  const obj: any = [
    {
      img: CK1,
      productName: "Pastel Sprinkles Cupcakes",
      deletePrice: "$16.30",
      price: "$14.50",
      qty: "1",
    },
    {
      img: CK2,
      productName: "Fiesta Topper",
      price: "$3.90",
      qty: "1",
    },
  ];

  // START:: GET COUNTRY DETAIL
  const [deliveryAddressCountryData, setDeliveryAddressCountryData] =
    useState<any>([]);
  const [billingAddressCountryData, setBillingAddressCountryData] =
    useState<any>([]);

  const country = useSelector((state: any) => {
    return state?.getAllCountry?.data;
  });

  useEffect(() => {
    dispatch(getAllCountry());
  }, []);

  useEffect(() => {
    let componentData: any = {};
    country?.component?.forEach((component: any) => {
      componentData[component?.componentId] = component;
    });
    setDeliveryAddressCountryData({ ...componentData });
    setBillingAddressCountryData({ ...componentData });
  }, [country]);
  // END:: GET COUNTRY DETAIL

  // START:: GET STATES DETAIL
  const [deliveryAddressStateData, setDeliveryAddressStateData] = useState<any>(
    []
  );
  const [billingAddressStateData, setBillingAddressStateData] = useState<any>(
    []
  );
  const states = useSelector((state: any) => {
    return state?.getAllState?.data;
  });

  useEffect(() => {
    let componentData: any = {};
    states?.component?.forEach((component: any) => {
      componentData[component?.componentId] = component;
    });
    /* if (deliveryCountry !== "" && whichCountrySelected == "delivery") {
      setDeliveryAddressStateData({ ...componentData })
    }
    if (billingCountry !== "" && whichCountrySelected == "billing") {
      setBillingAddressStateData({ ...componentData })
    } */

    if (
      deliveryCountry !== "" &&
      addressData?.address?.countryId?.value !== "" &&
      addressData?.address?.countryId?.value ==
        componentData["statelist"]?.countryCode
    ) {
      setDeliveryAddressStateData({ ...componentData });
    }
    if (
      billingCountry !== "" &&
      addressData?.address?.b_countryId?.value !== "" &&
      addressData?.address?.b_countryId?.value ==
        componentData["statelist"]?.countryCode
    ) {
      setBillingAddressStateData({ ...componentData });
    }
  }, [states]);

  const getDeliveryStates = (value: string) => {
    if (value !== "" && value !== undefined) {
      setDeliveryCountry(value);
      //setWhichCountrySelected('delivery');
      dispatch(getAllState({ countryCode: value }));
    }
  };

  const getBillingStates = (value: string) => {
    if (value !== "" && value !== undefined) {
      setBillingCountry(value);
      //setWhichCountrySelected('billing');
      dispatch(getAllState({ countryCode: value }));
    }
  };
  // END:: GET STATES DETAIL

  // START:: ADD NEW ADDRESS / DELIVERY OPTION
  const [quoteId, setQuoteId] = useState(
    localStorage.getItem(localStorageConstant.QUOTE_ID)
      ? localStorage.getItem(localStorageConstant.QUOTE_ID)
      : ""
  );
  const [addAddressModalShow, setAddAddressModalShow] = React.useState(false);
  const INITIAL_ADDRESS_DATA: any = {
    address: {
      firstName: {
        value: "",
        validation: [!auth ? "required" : ""],
        errors: [FIRST_NAME.Required],
      },
      lastName: {
        value: "",
        validation: [!auth ? "required" : ""],
        errors: [LAST_NAME.Required],
      },
      email: {
        value: "",
        validation: [!auth ? "email" : "", !auth ? "required" : ""],
        errors: [EMAIL.Valid, EMAIL.Required],
      },
      phonenumber: {
        value: "",
        validation: [
          // !auth ? "min:10" : "",
          // !auth ? "max:10" : "",
          !auth ? "number" : "",
          // !auth ? "required" : "",
        ],
        errors: [PHONE.MinLength, PHONE.MaxLength, PHONE.Valid],
        // errors: [PHONE.MinLength, PHONE.MaxLength, PHONE.Valid, PHONE.Required],
      },
      street: {
        value: "",
        validation: [!auth ? "required" : ""],
        errors: [ADDRESS.Required],
      },
      countryId: {
        value: "",
        validation: [!auth ? "required" : ""],
        errors: [COUNTRY.Required],
      },
      states: {
        value: "",
        validation: [!auth ? "required" : ""],
        errors: [STATE.Required],
      },
      city: {
        value: "",
        validation: [!auth ? "required" : ""],
        errors: [CITY.Required],
      },
      zipCode: {
        value: "",
        validation: [!auth ? "required" : ""],
        errors: [ZIP_CODE.Required],
      },
      isSelected: { value: isBothAddressSame ? "1" : "0" },
      /*   },
        bilingaddress: { */
      b_firstName: {
        value: "",
        validation: ["requiredIfNot:isBilingSelect"],
        errors: [FIRST_NAME.Required],
      },
      b_lastName: {
        value: "",
        validation: ["requiredIfNot:isBilingSelect"],
        errors: [LAST_NAME.Required],
      },
      b_phonenumber: {
        value: "",
        validation: [
          // "minIfNot:isBilingSelect",
          // "maxIfNot:isBilingSelect",
          "number",
          // "requiredIfNot:isBilingSelect",
        ],
        errors: [PHONE.MinLength, PHONE.MaxLength, PHONE.Valid, PHONE.Required],
      },
      b_street: {
        value: "",
        validation: ["requiredIfNot:isBilingSelect"],
        errors: [ADDRESS.Required],
      },
      b_countryId: {
        value: "",
        validation: ["requiredIfNot:isBilingSelect"],
        errors: [COUNTRY.Required],
      },
      b_states: {
        value: "",
        validation: ["requiredIfNot:isBilingSelect"],
        errors: [STATE.Required],
      },
      b_city: {
        value: "",
        validation: ["requiredIfNot:isBilingSelect"],
        errors: [CITY.Required],
      },
      b_zipCode: {
        value: "",
        validation: ["requiredIfNot:isBilingSelect"],
        errors: [ZIP_CODE.Required],
      },

      quoteId: { value: quoteId },
      //quoteId: { value: "572" },
      isAddressFillField: { value: "0" },
      shipingId: {
        value: "",
        validation: ["requiredIf:isAddressFillField"],
        errors: [DELIVERY_OPTION.Required],
      },
      isNewsletter: { value: "" },
      isBilingSelect: { value: "" },
    },
  };
  const [addressData, setAddressData] = useState(INITIAL_ADDRESS_DATA);
  const [addressDataError, setAddressDataError] = useState<any>({});
  const [isAddressDataFormValidated, setIsAddressDataFormValidated] =
    useState(false);
  const [addAddressApiStatus, setAddAddressApiStatus] = useState(
    API_STATUS.SUCCESS
  );
  const [updateDeliveryOptionApiStatus, setUpdateDeliveryOptionApiStatus] =
    useState(API_STATUS.SUCCESS);
  const deliveryOption = useSelector(
    (state: any) => state?.addUpdateDeliveryOptionInCheckout?.data
  );
  const [isAddressFormButtonDisabled, setIsAddressFormButtonDisabled] =
    useState(false);
  const [
    isDeliveyOptionFormButtonDisabled,
    setIsDeliveyOptionFormButtonDisabled,
  ] = useState(false);

  const setBillingShippingAddressData = (
    field: string,
    value: any,
    action = ""
  ) => {
    let addressDetails = Object.assign({}, addressData);
    if (addressDetails.address[field]) {
      addressDetails.address[field].value = value;
    }
    setAddressData({
      ...addressDetails,
      address: {
        ...addressDetails.address,
        isAddressFillField: { value: "0" },
      },
    });
    if (action != "") setIsAddressFill(false);
    setIsAddressFormButtonDisabled(false);
  };

  const setDeliveryOptionData = (field: string, value: any) => {
    let addressDetails = Object.assign({}, addressData);
    if (addressDetails.address[field]) {
      addressDetails.address[field].value = value;
    }
    setAddressData({ ...addressDetails });
    setIsDeliveryOptionSet(false);
    setIsDeliveyOptionFormButtonDisabled(false);
  };

  useEffect(() => {
    setAddressDataError({ ...validate(addressData.address)?.errors });
  }, [addressData]);

  useEffect(() => {
    let componentData: any = {};
    deliveryOption?.component?.forEach((component: any) => {
      if (component?.componentId == COMPONENT_CHECKOUT_PRICE_DETAILS) {
        componentData[component?.componentId] = component;
      }
    });
    setCheckOutListData({
      ...checkOutListData,
      priceDetails: componentData[COMPONENT_CHECKOUT_PRICE_DETAILS],
    });
  }, [deliveryOption]);

  const onSubmit = () => {
    if (validate(addressData.address).isValidated === true) {
      setIsAddressFormButtonDisabled(true);
      dispatch(
        addUpdateAddressInCheckout({
          address: {
            firstName: addressData.address.firstName.value,
            lastName: addressData.address.lastName.value,
            email: addressData.address.email.value,
            phonenumber: addressData.address.phonenumber.value,
            street: addressData.address.street.value,
            countryId: addressData.address.countryId.value,
            state: addressData.address.states.value,
            city: addressData.address.city.value,
            zipCode: addressData.address.zipCode.value,
          },
          bilingaddress: {
            firstName: addressData.address.b_firstName.value,
            lastName: addressData.address.b_lastName.value,
            phonenumber: addressData.address.b_phonenumber.value,
            street: addressData.address.b_street.value,
            countryId: addressData.address.b_countryId.value,
            state: addressData.address.b_states.value,
            city: addressData.address.b_city.value,
            zipCode: addressData.address.b_zipCode.value,
          },
          quoteId: addressData.address.quoteId.value,
          shipingId: addressData.address.shipingId.value,
          isNewsletter: addressData.address.isNewsletter.value,
          isBilingSelect: addressData.address.isBilingSelect.value,
        })
      );
    } else {
      setAddressDataError({ ...validate(addressData.address)?.errors });
      setIsAddressDataFormValidated(true);
    }
  };

  const onSubmitDeliveryOptions = () => {
    if (validate(addressData.address).isValidated === true) {
      setIsDeliveyOptionFormButtonDisabled(true);
      dispatch(
        addUpdateDeliveryOptionInCheckout({
          address: {
            firstName: addressData.address.firstName.value,
            lastName: addressData.address.lastName.value,
            email: addressData.address.email.value,
            phonenumber: addressData.address.phonenumber.value,
            street: addressData.address.street.value,
            countryId: addressData.address.countryId.value,
            state: addressData.address.states.value,
            city: addressData.address.city.value,
            zipCode: addressData.address.zipCode.value,
          },
          bilingaddress: {
            firstName: addressData.address.b_firstName.value,
            lastName: addressData.address.b_lastName.value,
            phonenumber: addressData.address.b_phonenumber.value,
            street: addressData.address.b_street.value,
            countryId: addressData.address.b_countryId.value,
            state: addressData.address.b_states.value,
            city: addressData.address.b_city.value,
            zipCode: addressData.address.b_zipCode.value,
          },
          quoteId: addressData.address.quoteId.value,
          shipingId: addressData.address.shipingId.value,
          isNewsletter: addressData.address.isNewsletter.value,
          isBilingSelect: addressData.address.isBilingSelect.value,
        })
      );
    } else {
      setAddressDataError({ ...validate(addressData.address)?.errors });
      setIsAddressDataFormValidated(true);
    }
  };
  // END:: ADD NEW ADDRESS / DELIVERY OPTION

  // START:: APPLY PROMO CODE
  const INITIAL_PROMO_DATA: any = {
    promocode: {
      value: "",
      validation: ["required"],
      errors: [PROMO_CODE.Required],
    },
    quoteId: { value: quoteId },
  };

  const [promoCodeData, setPromoCodeData] = useState({ ...INITIAL_PROMO_DATA });
  const [promoCodeDataError, setPromoCodeDataError] = useState<any>({});
  const [promoCodeFormValidated, setPromoCodeFormValidated] = useState(false);
  const [isFormButtonDisabled, setIsFormButtonDisabled] = useState(false);

  const setPromoData = (field: string, value: string) => {
    let promoCodeDetails = Object.assign({}, promoCodeData);
    promoCodeDetails[field].value = value;
    setPromoCodeData({ ...promoCodeDetails });
  };

  useEffect(() => {
    setPromoCodeDataError({ ...validate(promoCodeData)?.errors });
  }, [promoCodeData]);

  const applyPromo = () => {
    if (
      validate(promoCodeData).isValidated === true &&
      isFormButtonDisabled === false
    ) {
      setIsFormButtonDisabled(true);
      dispatch(
        applyPromotion({
          promocode: promoCodeData.promocode.value,
          quoteId: promoCodeData.quoteId.value,
        })
      );
    } else {
      setPromoCodeDataError({ ...validate(promoCodeData)?.errors });
      setPromoCodeFormValidated(true);
    }
  };

  const typePromo = () => {
    if (
      checkOutListData[COMPONENT_PROMO_CODE]?.promoCodeData?.isApplied == 1 &&
      isFormButtonDisabled === false
    ) {
      setIsFormButtonDisabled(true);
      dispatch(
        applyPromotion({ promocode: "", quoteId: promoCodeData.quoteId.value })
      );
    }
    setPromoData("promocode", "");
    setPromoCodeFormValidated(false);
  };

  const applyPromotionResponse = useSelector(
    (state: any) => state?.applyPromotion
  );

  useEffect(() => {
    if (
      applyPromotionResponse?.type === PROMO_CODE_SUCCESS ||
      applyPromotionResponse?.type === PROMO_CODE_FAILD
    ) {
      setIsFormButtonDisabled(false);
    }
  }, [applyPromotionResponse]);
  // END:: APPLY PROMO CODE

  // START:: PLACE ODER
  const [giftField, setGiftField] = useState(false);
  const toggleGift = () => {
    setGiftField(!giftField);
  };

  const INITIAL_PLACE_ORDER_DATA: any = {
    data: {
      birthDate: {
        value: "",
        validation: [!auth ? "validateBirthDate" : "", !auth ? "required" : ""],
        errors: [BIRTH_DATE.Valid, BIRTH_DATE.Required],
      },
      paymentMethod: {
        value: "",
        validation: ["required"],
        errors: [PAYMENT_METHOD.Required],
      },
      cardToken: { value: "" },
      authToken: { value: authTokenFromMaster },
      isGiftWrap: { value: giftField == true ? "1" : "0" },
      giftMessage: {
        value: "",
        validation: ["requiredIf:isGiftWrap"],
        errors: [GIFT_MESSAGE.Required],
      },
      isSave: { value: true },

      /* cardNumber: { value: "", validation: ["required"], errors: [CARD_NUMBER.Required] },
      cardExpiry: { value: "", validation: ["required"], errors: [CARD_EXPIRY.Required] },
      cardCvv: { value: "", validation: ["required"], errors: [CARD_CVV.Required] }, */
    },
  };
  const [orderPlaceData, setOrderPlaceData] = useState(
    INITIAL_PLACE_ORDER_DATA
  );
  const [orderPlaceDataError, setOrderPlaceDataError] = useState<any>({});
  const [isOrderPlaceDataFormValidated, setIsOrderPlaceDataFormValidated] =
    useState(false);
  const [orderPlaceDataApiStatus, setOrderPlaceDataApiStatus] = useState(
    API_STATUS.SUCCESS
  );

  const [cardNumberError, setCardNumberError] = useState<any>(
    "Please enter your card number"
  );
  const [cardExpiryError, setCardExpiryError] = useState<any>(
    "Please enter your card expiry"
  );
  const [cardCvvError, setCardCvvError] = useState<any>(
    "Please enter your card cvv"
  );

  const [cardTokenCreated, setCardTokenCreated] = useState<any>(false);
  const [cardToken, setCardToken] = useState<any>(false);

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<any>("");
  const [isPlaceOrderFormButtonDisabled, setIsPlaceOrderFormButtonDisabled] =
    useState(false);

  const setOrderData = (field: string, value: any) => {
    let orderPlaceDetails = Object.assign({}, orderPlaceData);
    if (orderPlaceDetails.data[field]) {
      orderPlaceDetails.data[field].value = value;
    }
    setOrderPlaceData({ ...orderPlaceDetails });
  };

  const whichPaymentMethodSelected = (paymentMethod: string) => {
    if (paymentMethod !== "stripe_payments") {
      setCardNumberError("");
      setCardExpiryError("");
      setCardCvvError("");
    } else {
      setCardNumberError("Please enter your card number");
      setCardExpiryError("Please enter your card expiry");
      setCardCvvError("Please enter your card cvv");
    }
    setSelectedPaymentMethod(paymentMethod);
  };

  useEffect(() => {
    setOrderPlaceDataError({ ...validate(orderPlaceData.data)?.errors });
  }, [orderPlaceData]);

  useEffect(() => {
    if (cardToken) {
      onSubmitOrder();
    }
  }, [cardToken]);

  useEffect(() => {
    if(paidUsingApplePay){
      onSubmitOrder();
    }
  }, [paidUsingApplePay])
  

  const onSubmitOrder = () => {
    let callApi = true;
    if (
      validate(addressData.address).isValidated === true &&
      validate(orderPlaceData.data).isValidated === true &&
      cardNumberError === "" &&
      cardExpiryError === "" &&
      cardCvvError === ""
    ) {
      if (selectedPaymentMethod == "stripe_payments") {
        setCardTokenCreated(true);
        if (cardToken === true) {
          setCardTokenCreated(false);
          setCardToken(false);
          callApi = true;
        } else {
          callApi = false;
        }
      }
      if(selectedPaymentMethod == "stripe_payments_apple_pay"){
         if(paidUsingApplePay){
          setPaidUsingApplePay(false);
          callApi = true;
         }
         else{
          callApi = false;
         }
      }
      if (callApi === true) {
        let orderParams = {
          quoteId: addressData.address.quoteId.value,
          paymentMethod: orderPlaceData.data.paymentMethod.value,
          cardToken: orderPlaceData.data.cardToken.value,
          authToken: orderPlaceData.data.authToken.value,
          isGiftWrap: orderPlaceData.data.isGiftWrap.value,
          giftMessage: orderPlaceData.data.giftMessage.value,
          isSave: orderPlaceData.data.isSave.value,
          birthDate: orderPlaceData.data.birthDate.value,
          firstName: addressData.address.firstName.value,
          lastName: addressData.address.lastName.value,
          email: addressData.address.email.value,
          phonenumber: addressData.address.phonenumber.value,
        };
        if (selectedPaymentMethod == "paypal_express") {
          localStorage.setItem(
            "paypal_order_info",
            JSON.stringify(orderParams)
          );
          //  dispatch(paypalExpressPlaceOrderAction({}))
          window.location.href = payPalExpressTokeRes?.data?.paypal_urls?.start;
        } else {
          setIsPlaceOrderFormButtonDisabled(true);
          dispatch(placeOrder(orderParams));
        }
      }
    } else {
      setOrderPlaceDataError({ ...validate(orderPlaceData.data)?.errors });
      setIsOrderPlaceDataFormValidated(true);
    }
  };
  // END:: PLACE ODER

  // START:: GET CHECKOUT LIST FOR GUEST USER
  const [checkOutListData, setCheckOutListData] = useState<any>({});
  const [checkOutListApiStatus, setCheckOutListApiStatus] = useState<any>({});
  const [paypalCreateOrderApiStatus, setPaypalCreateOrderApiStatus] =
    useState<any>({});
  const checkOutListDetail = useSelector(
    (state: any) => state?.getCheckoutList?.data
  );
  const checkOutAddressUpdatedDetail = useSelector(
    (state: any) => state?.addUpdateAddressInCheckout?.data
  );

  useEffect(() => {
    dispatch(
      getCheckoutList({
        address: {},
        quoteId: addressData.address.quoteId.value,
        shipingId: addressData.address.shipingId.value,
        isNewsletter: addressData.address.isNewsletter.value,
        isBilingSelect: "",
      })
    );
    /* if (auth)
      dispatch(getCheckoutListForLoggedInUser({ address: {}, quoteId: addressData.address.quoteId.value, shipingId: addressData.address.shipingId.value, isNewsletter: addressData.address.isNewsletter.value }))
    else
      dispatch(getCheckoutList({ address: {}, quoteId: addressData.address.quoteId.value, shipingId: addressData.address.shipingId.value, isNewsletter: addressData.address.isNewsletter.value })) */
  }, []);

  // START :: USE EFFECT FOR GET CHECKOUT LIST FOR GUEST USER
  useEffect(() => {
    let componentData: any = {};
    checkOutListDetail?.component?.forEach((component: any) => {
      componentData[component?.componentId] = component;
    });

    let requiredDataForShippingAddress = [
      "firstName",
      "lastName",
      "email",
      // "phonenumber",
      "street",
      "countryId",
      "states",
      "city",
      "zipCode",
      "isSelected",
    ];
    let requiredDataForBillingAddress = [
      "b_firstName",
      "b_lastName",
      // "b_phonenumber",
      "b_street",
      "b_countryId",
      "b_states",
      "b_city",
      "b_zipCode",
    ];
    let requiredRename = {
      postCode: "zipCode",
      stateId: "states",
      streetName: "street",
    } as any;
    let isSelected = "";
    if (
      !auth &&
      componentData[COMPONENT_GUEST_CHECKOUT_ADDRESS]?.checkoutAddressData
        ?.address?.list
    ) {
      componentData[
        COMPONENT_GUEST_CHECKOUT_ADDRESS
      ]?.checkoutAddressData?.address?.list?.map(
        (items: any, index: number) => {
          getDeliveryStates(items?.countryId);
          Object.keys(items).forEach((component: any) => {
            if (requiredDataForShippingAddress.includes(component)) {
              setBillingShippingAddressData(component, items[component]);
              /* if (component === 'isSelected') {
              isSelected = items[component]
              setIsBothAddressSame(isSelected === '1' ? true : false)
            } */
            } else if (requiredRename[component]) {
              setBillingShippingAddressData(
                requiredRename[component],
                items[component]
              );
            }
          });
        }
      );
    }

    if (componentData[COMPONENT_GUEST_CHECKOUT_ADDRESS]?.isBilingSelect) {
      isSelected =
        componentData[COMPONENT_GUEST_CHECKOUT_ADDRESS]?.isBilingSelect;
      setBillingShippingAddressData("isBilingSelect", isSelected);
      setIsBothAddressSame(isSelected === "1" ? true : false);
    }

    //if (isSelected === '0' && componentData[COMPONENT_GUEST_CHECKOUT_ADDRESS]?.checkoutAddressData?.bilingAddressData) {
    if (
      componentData[COMPONENT_GUEST_CHECKOUT_ADDRESS]?.checkoutAddressData
        ?.billingAddress
    ) {
      getBillingStates(
        componentData[COMPONENT_GUEST_CHECKOUT_ADDRESS]?.checkoutAddressData
          ?.billingAddress?.countryId
      );
      Object.keys(
        componentData[COMPONENT_GUEST_CHECKOUT_ADDRESS]?.checkoutAddressData
          ?.billingAddress
      ).forEach((component: any) => {
        if (requiredDataForBillingAddress.includes("b_" + component)) {
          setBillingShippingAddressData(
            "b_" + component,
            componentData[COMPONENT_GUEST_CHECKOUT_ADDRESS]?.checkoutAddressData
              ?.billingAddress[component]
          );
        } else if (requiredRename[component]) {
          setBillingShippingAddressData(
            "b_" + requiredRename[component],
            componentData[COMPONENT_GUEST_CHECKOUT_ADDRESS]?.checkoutAddressData
              ?.billingAddress[component]
          );
        }
      });
    }

    if (componentData[COMPONENT_NEWSLETTER]?.newsletter?.isNewsletter) {
      setBillingShippingAddressData(
        "isNewsletter",
        componentData[COMPONENT_NEWSLETTER]?.newsletter?.isNewsletter
      );
    }
    if (
      componentData[COMPONENT_SHIPPING_METHODS]?.shippingMethodData?.list
        ?.length > 0
    ) {
      componentData[COMPONENT_SHIPPING_METHODS]?.shippingMethodData?.list.map(
        (shippingMethod: any) => {
          if (shippingMethod.isSelected == "1") {
            setBillingShippingAddressData("shipingId", shippingMethod?.id);
          }
        }
      );
      // setBillingShippingAddressData('isNewsletter', componentData[COMPONENT_NEWSLETTER]?.newsletter?.isNewsletter)
    }

    setCheckOutListData({ ...componentData });
  }, [checkOutListDetail]);
  // END :: USE EFFECT FOR GET CHECKOUT LIST FOR GUEST USER

  // START :: USE EFFECT WHEN ADDRESS IS UPDATED IN CHECKOUT LIST FOR GUEST USER
  useEffect(() => {
    let componentData: any = {};
    checkOutAddressUpdatedDetail?.component?.forEach((component: any) => {
      componentData[component?.componentId] = component;
    });

    let requiredDataForShippingAddress = [
      "firstName",
      "lastName",
      "email",
      // "phonenumber",
      "street",
      "countryId",
      "states",
      "city",
      "zipCode",
      "isSelected",
    ];
    let requiredDataForBillingAddress = [
      "b_firstName",
      "b_lastName",
      // "b_phonenumber",
      "b_street",
      "b_countryId",
      "b_states",
      "b_city",
      "b_zipCode",
    ];
    let requiredRename = {
      postCode: "zipCode",
      stateId: "states",
      streetName: "street",
    } as any;
    let isSelected = "";
    if (
      componentData[COMPONENT_GUEST_CHECKOUT_ADDRESS]?.checkoutAddressData
        ?.address?.list
    ) {
      componentData[
        COMPONENT_GUEST_CHECKOUT_ADDRESS
      ]?.checkoutAddressData?.address?.list?.map(
        (items: any, index: number) => {
          getDeliveryStates(items?.countryId);
          Object.keys(items).forEach((component: any) => {
            if (requiredDataForShippingAddress.includes(component)) {
              setBillingShippingAddressData(component, items[component]);
              /* if (component === 'isSelected') {
              isSelected = items[component]
              setIsBothAddressSame(isSelected === '1' ? true : false)
            } */
            } else if (requiredRename[component]) {
              setBillingShippingAddressData(
                requiredRename[component],
                items[component]
              );
            }
          });
        }
      );
    }

    if (componentData[COMPONENT_GUEST_CHECKOUT_ADDRESS]?.isBilingSelect) {
      isSelected =
        componentData[COMPONENT_GUEST_CHECKOUT_ADDRESS]?.isBilingSelect;
      setBillingShippingAddressData("isBilingSelect", isSelected);
      setIsBothAddressSame(isSelected === "1" ? true : false);
    }

    //if (isSelected === '0' && componentData[COMPONENT_GUEST_CHECKOUT_ADDRESS]?.checkoutAddressData?.bilingAddressData) {
    if (
      componentData[COMPONENT_GUEST_CHECKOUT_ADDRESS]?.checkoutAddressData
        ?.billingAddress
    ) {
      getBillingStates(
        componentData[COMPONENT_GUEST_CHECKOUT_ADDRESS]?.checkoutAddressData
          ?.billingAddress?.countryId
      );
      Object.keys(
        componentData[COMPONENT_GUEST_CHECKOUT_ADDRESS]?.checkoutAddressData
          ?.billingAddress
      ).forEach((component: any) => {
        if (requiredDataForBillingAddress.includes("b_" + component)) {
          setBillingShippingAddressData(
            "b_" + component,
            componentData[COMPONENT_GUEST_CHECKOUT_ADDRESS]?.checkoutAddressData
              ?.billingAddress[component]
          );
        } else if (requiredRename[component]) {
          setBillingShippingAddressData(
            "b_" + requiredRename[component],
            componentData[COMPONENT_GUEST_CHECKOUT_ADDRESS]?.checkoutAddressData
              ?.billingAddress[component]
          );
        }
      });
    }

    if (componentData[COMPONENT_NEWSLETTER]?.newsletter?.isNewsletter) {
      setBillingShippingAddressData(
        "isNewsletter",
        componentData[COMPONENT_NEWSLETTER]?.newsletter?.isNewsletter
      );
    }
    if (
      componentData[COMPONENT_SHIPPING_METHODS]?.shippingMethodData?.list
        ?.length > 0
    ) {
      componentData[COMPONENT_SHIPPING_METHODS]?.shippingMethodData?.list.map(
        (shippingMethod: any) => {
          if (shippingMethod.isSelected == "1") {
            setBillingShippingAddressData("shipingId", shippingMethod?.id);
          }
        }
      );
    }

    setCheckOutListData({ ...componentData });
  }, [checkOutAddressUpdatedDetail]);
  // END :: USE EFFECT WHEN ADDRESS IS UPDATED IN CHECKOUT LIST FOR GUEST USER

  // END:: GET CHECKOUT LIST FOR GUEST USER

  // START:: GET CHECKOUT LIST FOR LOGGED IN USER
  const [checkOutListForLoggedInUserData, setCheckOutListForLoggedInUserData] =
    useState<any>({});
  const [
    checkOutListForLoggedInUserApiStatus,
    seCheckOutListForLoggedInUserApiStatus,
  ] = useState<any>({});
  const checkOutListForLoggedInUserDetail = useSelector(
    (state: any) => state?.getCheckoutListForLoggedInUser?.data
  );
  const checkOutAddressUpdatedForLoggedInUserDetail = useSelector(
    (state: any) => state?.addUpdateAddressForLoggedInUserInCheckout?.data
  );

  // START :: USE EFFECT FOR GET CHECKOUT LIST FOR LOGGED IN USER
  /* useEffect(() => {
    let componentData: any = {};
    checkOutListForLoggedInUserDetail?.component?.forEach((component: any) => {
      componentData[component?.componentId] = component;
    });

    let requiredDataForBillingAddress = ['b_firstName', 'b_lastName', 'b_phonenumber', 'b_street', 'b_countryId', 'b_states', 'b_city', 'b_zipCode'];
    let requiredRename = { 'postCode': 'zipCode', 'state': 'states' } as any;
    let isSelected = '';

    if (componentData[COMPONENT_GUEST_CHECKOUT_ADDRESS]?.checkoutAddressData?.bilingAddressData) {
      getBillingStates(componentData[COMPONENT_GUEST_CHECKOUT_ADDRESS]?.checkoutAddressData?.bilingAddressData?.countryId);
      Object.keys(componentData[COMPONENT_GUEST_CHECKOUT_ADDRESS]?.checkoutAddressData?.bilingAddressData).forEach((component: any) => {
        if (requiredDataForBillingAddress.includes('b_' + component)) {
          setBillingShippingAddressData('b_' + component, componentData[COMPONENT_GUEST_CHECKOUT_ADDRESS]?.checkoutAddressData?.bilingAddressData[component])
        } else if (requiredRename[component]) {
          setBillingShippingAddressData('b_' + requiredRename[component], componentData[COMPONENT_GUEST_CHECKOUT_ADDRESS]?.checkoutAddressData?.bilingAddressData[component])
        }
      });
    }

    if (componentData[COMPONENT_SHIPPING_METHODS]?.shippingMethodData?.list?.length > 0) {
      componentData[COMPONENT_SHIPPING_METHODS]?.shippingMethodData?.list.map((shippingMethod: any) => {
        if (shippingMethod.isSelected == '1') {
          setBillingShippingAddressData('shipingId', shippingMethod?.id);
        }
      })
    }

    setCheckOutListForLoggedInUserData({ ...componentData });
  }, [checkOutListForLoggedInUserDetail]); */
  // END :: USE EFFECT FOR GET CHECKOUT LIST FOR LOGGED IN USER

  // START :: USE EFFECT WHEN ADDRESS IS UPDATED IN CHECKOUT LIST FOR LOGGED IN USER
  /* useEffect(() => {
    let componentData: any = {};
    checkOutAddressUpdatedForLoggedInUserDetail?.component?.forEach((component: any) => {
      componentData[component?.componentId] = component;
    });

    let requiredDataForBillingAddress = ['b_firstName', 'b_lastName', 'b_phonenumber', 'b_street', 'b_countryId', 'b_states', 'b_city', 'b_zipCode'];
    let requiredRename = { 'postCode': 'zipCode', 'state': 'states' } as any;
    let isSelected = '';

    if (componentData[COMPONENT_GUEST_CHECKOUT_ADDRESS]?.checkoutAddressData?.bilingAddressData) {
      getBillingStates(componentData[COMPONENT_GUEST_CHECKOUT_ADDRESS]?.checkoutAddressData?.bilingAddressData?.countryId);
      Object.keys(componentData[COMPONENT_GUEST_CHECKOUT_ADDRESS]?.checkoutAddressData?.bilingAddressData).forEach((component: any) => {
        if (requiredDataForBillingAddress.includes('b_' + component)) {
          setBillingShippingAddressData('b_' + component, componentData[COMPONENT_GUEST_CHECKOUT_ADDRESS]?.checkoutAddressData?.bilingAddressData[component])
        } else if (requiredRename[component]) {
          setBillingShippingAddressData('b_' + requiredRename[component], componentData[COMPONENT_GUEST_CHECKOUT_ADDRESS]?.checkoutAddressData?.bilingAddressData[component])
        }
      });
    }

    if (componentData[COMPONENT_SHIPPING_METHODS]?.shippingMethodData?.list?.length > 0) {
      componentData[COMPONENT_SHIPPING_METHODS]?.shippingMethodData?.list.map((shippingMethod: any) => {
        if (shippingMethod.isSelected == '1') {
          setBillingShippingAddressData('shipingId', shippingMethod?.id);
        }
      })
    }

    setCheckOutListForLoggedInUserData({ ...componentData });
  }, [checkOutAddressUpdatedForLoggedInUserDetail]); */
  // END :: USE EFFECT WHEN ADDRESS IS UPDATED IN CHECKOUT LIST FOR LOGGED IN USER

  // END:: GET CHECKOUT LIST FOR LOGGED IN USER

  // START:: ADD ADDRESS FOR LOGGED IN USER
  const INITIAL_ADDRESS_DATA_FOR_ADD_ADDRESS: any = {
    addressData: {
      firstName: {
        value: null,
        validation: ["required"],
        errors: [FIRST_NAME.Required],
      },
      lastName: {
        value: null,
        validation: ["required"],
        errors: [LAST_NAME.Required],
      },
      phonenumber: {
        value: null,
        validation: ["number"],
        errors: [PHONE.Valid],
        // errors: [PHONE.Valid, PHONE.Required],
      },
      address: {
        value: null,
        validation: ["required"],
        errors: [ADDRESS.Required],
      },
      countryId: {
        value: null,
        validation: ["required"],
        errors: [COUNTRY.Required],
      },
      states: {
        value: null,
        validation: ["required"],
        errors: [STATE.Required],
      },
      city: { value: null, validation: ["required"], errors: [CITY.Required] },
      zipCode: {
        value: null,
        validation: ["required"],
        errors: [ZIP_CODE.Required],
      },
      isDefaultShipping: { value: "0" },
      isDefaultBilling: { value: "0" },
      isUpdate: { value: "0" },
      addressId: { value: null },
    },
  };

  const [addAddressDataForLoggedInUser, setAddAddressDataForLoggedInUser] =
    useState(INITIAL_ADDRESS_DATA_FOR_ADD_ADDRESS);
  const [
    addAddressDataForLoggedInUserError,
    setAddAddressDataForLoggedInUserError,
  ] = useState<any>({});
  const [
    isAddAddressDataForLoggedInUserFormValidated,
    setIsAddAddressDataForLoggedInUserFormValidated,
  ] = useState(false);
  const [
    addAddressDataForLoggedInUserApiStatus,
    setAddAddressDataForLoggedInUserApiStatus,
  ] = useState(API_STATUS.SUCCESS);
  const [stateDataForAddAddress, setStateDataForAddAddress] = useState<any>([]);
  const statesSelectorForAddAddress = useSelector((state: any) => {
    return state?.getAllStateForAddAddressPopup?.data;
  });

  useEffect(() => {
    let componentData: any = {};
    statesSelectorForAddAddress?.component?.forEach((component: any) => {
      componentData[component?.componentId] = component;
    });
    setStateDataForAddAddress({ ...componentData });
  }, [statesSelectorForAddAddress]);

  const setAddAddressData = (field: string, value: any) => {
    let addAddressDataForLoggedInUserDetails = Object.assign(
      {},
      addAddressDataForLoggedInUser
    );
    if (addAddressDataForLoggedInUserDetails.addressData[field]) {
      addAddressDataForLoggedInUserDetails.addressData[field].value = value;
    }
    setAddAddressDataForLoggedInUser({
      ...addAddressDataForLoggedInUserDetails,
    });
  };

  const getStatesForAddAddress = (value: string) => {
    if (value != "" && value !== undefined) {
      dispatch(getAllStateForAddAddressPopup({ countryCode: value }));
    }
  };

  useEffect(() => {
    setAddAddressDataForLoggedInUserError({
      ...validate(addAddressDataForLoggedInUser.addressData)?.errors,
    });
  }, [addAddressDataForLoggedInUser]);

  const onSubmitAddAddress = () => {
    if (
      validate(addAddressDataForLoggedInUser.addressData).isValidated === true
    ) {
      dispatch(
        addAddressForLoggedInUserInCheckout({
          addressData: {
            firstName:
              addAddressDataForLoggedInUser.addressData.firstName.value,
            lastName: addAddressDataForLoggedInUser.addressData.lastName.value,
            phonenumber:
              addAddressDataForLoggedInUser.addressData.phonenumber.value,
            address: addAddressDataForLoggedInUser.addressData.address.value,
            countryId:
              addAddressDataForLoggedInUser.addressData.countryId.value,
            state: addAddressDataForLoggedInUser.addressData.states.value,
            city: addAddressDataForLoggedInUser.addressData.city.value,
            zipCode: addAddressDataForLoggedInUser.addressData.zipCode.value,
            isDefaultShipping:
              addAddressDataForLoggedInUser.addressData.isDefaultShipping.value,
            isDefaultBilling:
              addAddressDataForLoggedInUser.addressData.isDefaultBilling.value,
          },
          isUpdate: addAddressDataForLoggedInUser.addressData.isUpdate.value,
          addressId: addAddressDataForLoggedInUser.addressData.addressId.value,
        })
      );
    } else {
      setAddAddressDataForLoggedInUserError({
        ...validate(addAddressDataForLoggedInUser.addressData)?.errors,
      });
      setIsAddAddressDataForLoggedInUserFormValidated(true);
    }
  };
  // END:: ADD ADDRESS FOR LOGGED IN USER

  // START:: SET DELIVERED TO SELECTGED LOGGED IN USER
  const [quoteUpdateAddressApiStatus, setQuoteUpdateAddressApiStatus] =
    useState(API_STATUS.SUCCESS);
  const setDeliveredAddress = (
    addressId: string,
    isDefaultShipping: string
  ) => {
    if (addressId != "") {
      dispatch(
        quoteUpdateAddress({
          addressId: addressId,
          isDefaultShipping: isDefaultShipping,
        })
      );
    }
  };
  // END:: SET DELIVERED TO SELECTGED LOGGED IN USER

  const checkoutListResponse = useSelector(
    (state: any) => state?.getCheckoutList
  );
  const checkoutListForLoggedInUserResponse = useSelector(
    (state: any) => state?.getCheckoutListForLoggedInUser
  );
  const addUpdateAddressInCheckoutResponse = useSelector(
    (state: any) => state?.addUpdateAddressInCheckout
  );
  const addUpdateDeliveryOptionInCheckoutResponse = useSelector(
    (state: any) => state?.addUpdateDeliveryOptionInCheckout
  );
  const placeOrderResponse = useSelector((state: any) => state?.placeOrder);
  const addAddressForLoggedInUserInCheckoutResponse = useSelector(
    (state: any) => state?.addAddressForLoggedInUserInCheckout
  );
  const quoteUpdateAddressResponse = useSelector(
    (state: any) => state?.quoteUpdateAddress
  );
  const paypalPlaceOrderResponse = useSelector(
    (state: any) => state?.paypalExpressPlaceOrder
  );

  const payPalExpressTokeRes = useSelector(
    (state: any) => state?.createpaypalExpressToken
  );

  useEffect(() => {
    if (paypalPlaceOrderResponse.type === PAYPAL_EXPRESS_ORDER_REQUEST) {
      if (paypalCreateOrderApiStatus !== API_STATUS.LOADING) {
        setPaypalCreateOrderApiStatus(API_STATUS.LOADING);
      }
    } else if (
      paypalPlaceOrderResponse.data?.statusCode ===
        PAYPAL_EXPRESS_ORDER_SUCCESS &&
      paypalPlaceOrderResponse.type === GUEST_CHECKOUT_SUCCESS
    ) {
      if (paypalCreateOrderApiStatus !== API_STATUS.SUCCESS) {
        setPaypalCreateOrderApiStatus(API_STATUS.SUCCESS);
        if (payPalExpressTokeRes?.data?.paypal_urls?.start) {
          window.location.href = payPalExpressTokeRes?.data?.paypal_urls?.start;
        } else {
          showToast("error", "Somethig Went Wrong!");
        }
      }
    } else if (paypalPlaceOrderResponse.type === PAYPAL_EXPRESS_ORDER_LONG) {
      if (paypalCreateOrderApiStatus !== API_STATUS.LONG) {
        setPaypalCreateOrderApiStatus(API_STATUS.LONG);
      }
    } else if (paypalPlaceOrderResponse.type === PAYPAL_EXPRESS_ORDER_FAILED) {
      if (paypalCreateOrderApiStatus !== API_STATUS.FAILED) {
        setPaypalCreateOrderApiStatus(API_STATUS.FAILED);
      }
    }
  }, [paypalPlaceOrderResponse]);

  useEffect(() => {
    if (checkoutListResponse.type === GUEST_CHECKOUT_REQUEST) {
      if (checkOutListApiStatus !== API_STATUS.LOADING) {
        setCheckOutListApiStatus(API_STATUS.LOADING);
      }
    } else if (
      checkoutListResponse.data?.statusCode === SUCCESS_RESPONSE_CODE &&
      checkoutListResponse.type === GUEST_CHECKOUT_SUCCESS
    ) {
      if (checkOutListApiStatus !== API_STATUS.SUCCESS) {
        setCheckOutListApiStatus(API_STATUS.SUCCESS);
      }
    } else if (checkoutListResponse.type === GUEST_CHECKOUT_LONG) {
      if (checkOutListApiStatus !== API_STATUS.LONG) {
        setCheckOutListApiStatus(API_STATUS.LONG);
      }
    } else if (checkoutListResponse.type === GUEST_CHECKOUT_FAILD) {
      if (checkOutListApiStatus !== API_STATUS.FAILED) {
        setCheckOutListApiStatus(API_STATUS.FAILED);
      }
    }
    // END:: STATE FOR GETTING CHECKOUT LIST DATA FOR GUEST USER
  }, [checkoutListResponse]);

  useEffect(() => {
    // START:: STATE FOR GETTING CHECKOUT LIST DATA FOR LOGGED IN USER
    if (
      checkoutListForLoggedInUserResponse.type ===
      LOGGED_IN_USER_CHECKOUT_REQUEST
    ) {
      if (checkOutListForLoggedInUserApiStatus !== API_STATUS.LOADING) {
        seCheckOutListForLoggedInUserApiStatus(API_STATUS.LOADING);
      }
    } else if (
      checkoutListForLoggedInUserResponse.data?.statusCode ===
        SUCCESS_RESPONSE_CODE &&
      checkoutListForLoggedInUserResponse.type ===
        LOGGED_IN_USER_CHECKOUT_SUCCESS
    ) {
      if (checkOutListForLoggedInUserApiStatus !== API_STATUS.SUCCESS) {
        seCheckOutListForLoggedInUserApiStatus(API_STATUS.SUCCESS);
      }
    } else if (
      checkoutListForLoggedInUserResponse.type === LOGGED_IN_USER_CHECKOUT_LONG
    ) {
      if (checkOutListForLoggedInUserApiStatus !== API_STATUS.LONG) {
        seCheckOutListForLoggedInUserApiStatus(API_STATUS.LONG);
      }
    } else if (
      checkoutListForLoggedInUserResponse.type === LOGGED_IN_USER_CHECKOUT_FAILD
    ) {
      if (checkOutListForLoggedInUserApiStatus !== API_STATUS.FAILED) {
        seCheckOutListForLoggedInUserApiStatus(API_STATUS.FAILED);
      }
    }
    // END:: STATE FOR GETTING CHECKOUT LIST DATA FOR LOGGED IN USER
  }, [checkoutListForLoggedInUserResponse]);

  useEffect(() => {
    // START:: STATE FOR ADD/UPDATE ADDRESS DATA FOR GUEST USER
    if (
      addUpdateAddressInCheckoutResponse.type ===
      GUEST_CHECKOUT_ADD_UPDATE_ADDRESS_REQUEST
    ) {
      if (addAddressApiStatus !== API_STATUS.LOADING) {
        setAddAddressApiStatus(API_STATUS.LOADING);
      }
    } else if (
      addUpdateAddressInCheckoutResponse.data?.statusCode ===
        SUCCESS_RESPONSE_CODE &&
      addUpdateAddressInCheckoutResponse.type ===
        GUEST_CHECKOUT_ADD_UPDATE_ADDRESS_SUCCESS
    ) {
      if (addAddressApiStatus !== API_STATUS.SUCCESS) {
        setAddAddressApiStatus(API_STATUS.SUCCESS);
        setIsAddressFill(true);
        //setBillingShippingAddressData('isAddressFillField', '1')
        setAddressData({
          ...addressData,
          address: {
            ...addressData.address,
            isAddressFillField: { value: "1" },
          },
        });
        setSelectedPaymentMethod("");
        setOrderData("paymentMethod", "");
        setGiftField(false);
        setOrderData("isGiftWrap", "0");
      }
    } else if (
      addUpdateAddressInCheckoutResponse.type ===
      GUEST_CHECKOUT_ADD_UPDATE_ADDRESS_LONG
    ) {
      if (addAddressApiStatus !== API_STATUS.LONG) {
        setAddAddressApiStatus(API_STATUS.LONG);
      }
    } else if (
      addUpdateAddressInCheckoutResponse.type ===
      GUEST_CHECKOUT_ADD_UPDATE_ADDRESS_FAILD
    ) {
      if (addAddressApiStatus !== API_STATUS.FAILED) {
        setAddAddressApiStatus(API_STATUS.FAILED);
      }
    }
    // END:: STATE FOR ADD/UPDATE ADDRESS DATA FOR GUEST USER
  }, [addUpdateAddressInCheckoutResponse]);

  useEffect(() => {
    // START:: STATE FOR ADD/UPDATE DELIVERY OPTION DATA FOR GUEST USER
    if (
      addUpdateDeliveryOptionInCheckoutResponse.type ===
      GUEST_CHECKOUT_ADD_UPDATE_DELIVERY_OPTION_REQUEST
    ) {
      if (updateDeliveryOptionApiStatus !== API_STATUS.LOADING) {
        setUpdateDeliveryOptionApiStatus(API_STATUS.LOADING);
      }
    } else if (
      addUpdateDeliveryOptionInCheckoutResponse.data?.statusCode ===
        SUCCESS_RESPONSE_CODE &&
      addUpdateDeliveryOptionInCheckoutResponse.type ===
        GUEST_CHECKOUT_ADD_UPDATE_DELIVERY_OPTION_SUCCESS
    ) {
      if (updateDeliveryOptionApiStatus !== API_STATUS.SUCCESS) {
        setUpdateDeliveryOptionApiStatus(API_STATUS.SUCCESS);
        setIsDeliveryOptionSet(true);
        setSelectedPaymentMethod("");
        setOrderData("paymentMethod", "");
        setGiftField(false);
        setOrderData("isGiftWrap", "0");
      }
    } else if (
      addUpdateDeliveryOptionInCheckoutResponse.type ===
      GUEST_CHECKOUT_ADD_UPDATE_DELIVERY_OPTION_LONG
    ) {
      if (updateDeliveryOptionApiStatus !== API_STATUS.LONG) {
        setUpdateDeliveryOptionApiStatus(API_STATUS.LONG);
      }
    } else if (
      addUpdateDeliveryOptionInCheckoutResponse.type ===
      GUEST_CHECKOUT_ADD_UPDATE_DELIVERY_OPTION_FAILD
    ) {
      if (updateDeliveryOptionApiStatus !== API_STATUS.FAILED) {
        setUpdateDeliveryOptionApiStatus(API_STATUS.FAILED);
      }
    }
    // END:: STATE FOR ADD/UPDATE DELIVERY OPTION DATA FOR GUEST USER
  }, [addUpdateDeliveryOptionInCheckoutResponse]);

  useEffect(() => {
    // START:: STATE FOR ORDER PLACE
    if (placeOrderResponse.type === CHECKOUT_PLACE_ORDER_REQUEST) {
      if (orderPlaceDataApiStatus !== API_STATUS.LOADING) {
        setOrderPlaceDataApiStatus(API_STATUS.LOADING);
      }
    } else if (
      placeOrderResponse.data?.statusCode === SUCCESS_RESPONSE_CODE &&
      placeOrderResponse.type === CHECKOUT_PLACE_ORDER_SUCCESS
    ) {
      if (orderPlaceDataApiStatus !== API_STATUS.SUCCESS) {
        setOrderPlaceDataApiStatus(API_STATUS.SUCCESS);
        setIsPlaceOrderFormButtonDisabled(false);
        //setAddressData(INITIAL_ADDRESS_DATA)
        navigate(CONFIRM_ORDER, {
          state: {
            orderId: placeOrderResponse.data?.orderIncreamentId,
            response: placeOrderResponse.data,
          },
        });
      }
    } else if (placeOrderResponse.type === CHECKOUT_PLACE_ORDER_LONG) {
      if (orderPlaceDataApiStatus !== API_STATUS.LONG) {
        setOrderPlaceDataApiStatus(API_STATUS.LONG);
      }
    } else if (placeOrderResponse.type === CHECKOUT_PLACE_ORDER_FAILD) {
      if (orderPlaceDataApiStatus !== API_STATUS.FAILED) {
        setOrderPlaceDataApiStatus(API_STATUS.FAILED);
      }
    }
    // END:: STATE FOR ORDER PLACE
  }, [placeOrderResponse]);

  useEffect(() => {
    // START:: STATE FOR ADD ADDRESS FOR LOGGED IN USER
    if (
      addAddressForLoggedInUserInCheckoutResponse?.type ===
      ADD_ADDRESS_IN_CHECKOUT_FOR_LOGGED_IN_USER_REQUEST
    ) {
      if (addAddressDataForLoggedInUserApiStatus !== API_STATUS.LOADING) {
        setAddAddressDataForLoggedInUserApiStatus(API_STATUS.LOADING);
      }
    } else if (
      addAddressForLoggedInUserInCheckoutResponse?.data?.statusCode ===
        SUCCESS_RESPONSE_CODE &&
      addAddressForLoggedInUserInCheckoutResponse?.type ===
        ADD_ADDRESS_IN_CHECKOUT_FOR_LOGGED_IN_USER_SUCCESS
    ) {
      if (addAddressDataForLoggedInUserApiStatus !== API_STATUS.SUCCESS) {
        setAddAddressDataForLoggedInUserApiStatus(API_STATUS.SUCCESS);
        dispatch({
          type: ADD_ADDRESS_IN_CHECKOUT_FOR_LOGGED_IN_USER_CLEAR,
          payload: { type: ADD_ADDRESS_IN_CHECKOUT_FOR_LOGGED_IN_USER_CLEAR },
        });
        setAddAddressDataForLoggedInUser(INITIAL_ADDRESS_DATA_FOR_ADD_ADDRESS);
        setIsAddAddressDataForLoggedInUserFormValidated(false);
        setAddAddressModalShow(false);
        getStatesForAddAddress("");
        dispatch(
          getCheckoutList({
            address: {},
            quoteId: addressData.address.quoteId.value,
            shipingId: addressData.address.shipingId.value,
            isNewsletter: addressData.address.isNewsletter.value,
            isBilingSelect: "",
          })
        );
      }
    } else if (
      addAddressForLoggedInUserInCheckoutResponse?.type ===
      ADD_ADDRESS_IN_CHECKOUT_FOR_LOGGED_IN_USER_LONG
    ) {
      if (addAddressDataForLoggedInUserApiStatus !== API_STATUS.LONG) {
        setAddAddressDataForLoggedInUserApiStatus(API_STATUS.LONG);
      }
    } else if (
      addAddressForLoggedInUserInCheckoutResponse?.type ===
      ADD_ADDRESS_IN_CHECKOUT_FOR_LOGGED_IN_USER_FAILD
    ) {
      if (addAddressDataForLoggedInUserApiStatus !== API_STATUS.FAILED) {
        setAddAddressDataForLoggedInUserApiStatus(API_STATUS.FAILED);
      }
    }
    // END:: STATE FOR ADD ADDRESS FOR LOGGED IN USER
  }, [addAddressForLoggedInUserInCheckoutResponse]);

  useEffect(() => {
    // START:: STATE FOR SET DELIVERED ADDRESS FOR LOGGED IN USER
    if (quoteUpdateAddressResponse.type === QUOTE_ADDRESS_UPDATE_REQUEST) {
      if (quoteUpdateAddressApiStatus !== API_STATUS.LOADING) {
        setQuoteUpdateAddressApiStatus(API_STATUS.LOADING);
      }
    } else if (
      quoteUpdateAddressResponse.data?.statusCode === SUCCESS_RESPONSE_CODE &&
      quoteUpdateAddressResponse.type === QUOTE_ADDRESS_UPDATE_SUCCESS
    ) {
      if (quoteUpdateAddressApiStatus !== API_STATUS.SUCCESS) {
        setQuoteUpdateAddressApiStatus(API_STATUS.SUCCESS);
        dispatch(
          getCheckoutList({
            address: {},
            quoteId: addressData.address.quoteId.value,
            shipingId: addressData.address.shipingId.value,
            isNewsletter: addressData.address.isNewsletter.value,
            isBilingSelect: "",
          })
        );
      }
    } else if (quoteUpdateAddressResponse.type === QUOTE_ADDRESS_UPDATE_LONG) {
      if (quoteUpdateAddressApiStatus !== API_STATUS.LONG) {
        setQuoteUpdateAddressApiStatus(API_STATUS.LONG);
      }
    } else if (quoteUpdateAddressResponse.type === QUOTE_ADDRESS_UPDATE_FAILD) {
      if (quoteUpdateAddressApiStatus !== API_STATUS.FAILED) {
        setQuoteUpdateAddressApiStatus(API_STATUS.FAILED);
      }
    }
  }, [quoteUpdateAddressResponse]);

  useSelector((state: any) => {
    /* // START:: STATE FOR GETTING CHECKOUT LIST DATA FOR GUEST USER 
    if (state?.getCheckoutList?.type === GUEST_CHECKOUT_REQUEST) {
      if (checkOutListApiStatus !== API_STATUS.LOADING) {
        setCheckOutListApiStatus(API_STATUS.LOADING)
      }
    }
    else if (state?.getCheckoutList?.data?.statusCode === SUCCESS_RESPONSE_CODE && state?.getCheckoutList?.type === GUEST_CHECKOUT_SUCCESS) {
      if (checkOutListApiStatus !== API_STATUS.SUCCESS) {
        setCheckOutListApiStatus(API_STATUS.SUCCESS)
      }
    }
    else if (state?.getCheckoutList?.type === GUEST_CHECKOUT_LONG) {
      if (checkOutListApiStatus !== API_STATUS.LONG) {
        setCheckOutListApiStatus(API_STATUS.LONG)
      }
    }
    else if (state?.getCheckoutList?.type === GUEST_CHECKOUT_FAILD) {
      if (checkOutListApiStatus !== API_STATUS.FAILED) {
        setCheckOutListApiStatus(API_STATUS.FAILED)
      }
    }
    // END:: STATE FOR GETTING CHECKOUT LIST DATA FOR GUEST USER

    // START:: STATE FOR GETTING CHECKOUT LIST DATA FOR LOGGED IN USER
    if (state?.getCheckoutListForLoggedInUser?.type === LOGGED_IN_USER_CHECKOUT_REQUEST) {
      if (checkOutListForLoggedInUserApiStatus !== API_STATUS.LOADING) {
        seCheckOutListForLoggedInUserApiStatus(API_STATUS.LOADING)
      }
    }
    else if (state?.getCheckoutListForLoggedInUser?.data?.statusCode === SUCCESS_RESPONSE_CODE && state?.getCheckoutListForLoggedInUser?.type === LOGGED_IN_USER_CHECKOUT_SUCCESS) {
      if (checkOutListForLoggedInUserApiStatus !== API_STATUS.SUCCESS) {
        seCheckOutListForLoggedInUserApiStatus(API_STATUS.SUCCESS)
      }
    }
    else if (state?.getCheckoutListForLoggedInUser?.type === LOGGED_IN_USER_CHECKOUT_LONG) {
      if (checkOutListForLoggedInUserApiStatus !== API_STATUS.LONG) {
        seCheckOutListForLoggedInUserApiStatus(API_STATUS.LONG)
      }
    }
    else if (state?.getCheckoutListForLoggedInUser?.type === LOGGED_IN_USER_CHECKOUT_FAILD) {
      if (checkOutListForLoggedInUserApiStatus !== API_STATUS.FAILED) {
        seCheckOutListForLoggedInUserApiStatus(API_STATUS.FAILED)
      }
    }
    // END:: STATE FOR GETTING CHECKOUT LIST DATA FOR LOGGED IN USER

    // START:: STATE FOR ADD/UPDATE ADDRESS DATA FOR GUEST USER 
    if (state?.addUpdateAddressInCheckout?.type === GUEST_CHECKOUT_ADD_UPDATE_ADDRESS_REQUEST) {
      if (addAddressApiStatus !== API_STATUS.LOADING) {
        setAddAddressApiStatus(API_STATUS.LOADING)
      }
    }
    else if (state?.addUpdateAddressInCheckout?.data?.statusCode === SUCCESS_RESPONSE_CODE && state?.addUpdateAddressInCheckout?.type === GUEST_CHECKOUT_ADD_UPDATE_ADDRESS_SUCCESS) {
      if (addAddressApiStatus !== API_STATUS.SUCCESS) {
        setAddAddressApiStatus(API_STATUS.SUCCESS)
        setIsAddressFill(true)
        //setBillingShippingAddressData('isAddressFillField', '1')
        setAddressData({ ...addressData, address: { ...addressData.address, isAddressFillField: { value: '1' } } })
      }
    }
    else if (state?.addUpdateAddressInCheckout?.type === GUEST_CHECKOUT_ADD_UPDATE_ADDRESS_LONG) {
      if (addAddressApiStatus !== API_STATUS.LONG) {
        setAddAddressApiStatus(API_STATUS.LONG)
      }
    }
    else if (state?.addUpdateAddressInCheckout?.type === GUEST_CHECKOUT_ADD_UPDATE_ADDRESS_FAILD) {
      if (addAddressApiStatus !== API_STATUS.FAILED) {
        setAddAddressApiStatus(API_STATUS.FAILED)
      }
    }
    // END:: STATE FOR ADD/UPDATE ADDRESS DATA FOR GUEST USER

    // START:: STATE FOR ADD/UPDATE DELIVERY OPTION DATA FOR GUEST USER 
    if (state?.addUpdateDeliveryOptionInCheckout?.type === GUEST_CHECKOUT_ADD_UPDATE_DELIVERY_OPTION_REQUEST) {
      if (updateDeliveryOptionApiStatus !== API_STATUS.LOADING) {
        setUpdateDeliveryOptionApiStatus(API_STATUS.LOADING)
      }
    }
    else if (state?.addUpdateDeliveryOptionInCheckout?.data?.statusCode === SUCCESS_RESPONSE_CODE && state?.addUpdateDeliveryOptionInCheckout?.type === GUEST_CHECKOUT_ADD_UPDATE_DELIVERY_OPTION_SUCCESS) {
      if (updateDeliveryOptionApiStatus !== API_STATUS.SUCCESS) {
        setUpdateDeliveryOptionApiStatus(API_STATUS.SUCCESS)
        setIsDeliveryOptionSet(true)
      }
    }
    else if (state?.addUpdateDeliveryOptionInCheckout?.type === GUEST_CHECKOUT_ADD_UPDATE_DELIVERY_OPTION_LONG) {
      if (updateDeliveryOptionApiStatus !== API_STATUS.LONG) {
        setUpdateDeliveryOptionApiStatus(API_STATUS.LONG)
      }
    }
    else if (state?.addUpdateDeliveryOptionInCheckout?.type === GUEST_CHECKOUT_ADD_UPDATE_DELIVERY_OPTION_FAILD) {
      if (updateDeliveryOptionApiStatus !== API_STATUS.FAILED) {
        setUpdateDeliveryOptionApiStatus(API_STATUS.FAILED)
      }
    }
    // END:: STATE FOR ADD/UPDATE DELIVERY OPTION DATA FOR GUEST USER 

    // START:: STATE FOR ORDER PLACE
    if (state?.placeOrder?.type === CHECKOUT_PLACE_ORDER_REQUEST) {
      if (orderPlaceDataApiStatus !== API_STATUS.LOADING) {
        setOrderPlaceDataApiStatus(API_STATUS.LOADING)
      }
    }
    else if (state?.placeOrder?.data?.statusCode === SUCCESS_RESPONSE_CODE && state?.placeOrder?.type === CHECKOUT_PLACE_ORDER_SUCCESS) {
      if (orderPlaceDataApiStatus !== API_STATUS.SUCCESS) {
        setOrderPlaceDataApiStatus(API_STATUS.SUCCESS)
        navigate(CONFIRM_ORDER, {
          state: {
            orderId: state?.placeOrder?.data?.orderIncreamentId,
          }
        })
      }
    }
    else if (state?.placeOrder?.type === CHECKOUT_PLACE_ORDER_LONG) {
      if (orderPlaceDataApiStatus !== API_STATUS.LONG) {
        setOrderPlaceDataApiStatus(API_STATUS.LONG)
      }
    }
    else if (state?.placeOrder?.type === CHECKOUT_PLACE_ORDER_FAILD) {
      if (orderPlaceDataApiStatus !== API_STATUS.FAILED) {
        setOrderPlaceDataApiStatus(API_STATUS.FAILED)
      }
    }
    // END:: STATE FOR ORDER PLACE

    // START:: STATE FOR ADD ADDRESS FOR LOGGED IN USER
    if (state?.addAddressForLoggedInUserInCheckout?.type === ADD_ADDRESS_IN_CHECKOUT_FOR_LOGGED_IN_USER_REQUEST) {
      if (addAddressDataForLoggedInUserApiStatus !== API_STATUS.LOADING) {
        setAddAddressDataForLoggedInUserApiStatus(API_STATUS.LOADING)
      }
    }
    else if (state?.addAddressForLoggedInUserInCheckout?.data?.statusCode === SUCCESS_RESPONSE_CODE && state?.addAddressForLoggedInUserInCheckout?.type === ADD_ADDRESS_IN_CHECKOUT_FOR_LOGGED_IN_USER_SUCCESS) {
      if (addAddressDataForLoggedInUserApiStatus !== API_STATUS.SUCCESS) {
        setAddAddressDataForLoggedInUserApiStatus(API_STATUS.SUCCESS)
        dispatch({
          type: ADD_ADDRESS_IN_CHECKOUT_FOR_LOGGED_IN_USER_CLEAR,
          payload: { type: ADD_ADDRESS_IN_CHECKOUT_FOR_LOGGED_IN_USER_CLEAR },
        });
        setAddAddressDataForLoggedInUser(INITIAL_ADDRESS_DATA_FOR_ADD_ADDRESS);
        setIsAddAddressDataForLoggedInUserFormValidated(false);
        setAddAddressModalShow(false)
        getStatesForAddAddress('');
        dispatch(getCheckoutList({ address: {}, quoteId: addressData.address.quoteId.value, shipingId: addressData.address.shipingId.value, isNewsletter: addressData.address.isNewsletter.value, isBilingSelect: addressData.address.isBilingSelect.value }))
      }
    }
    else if (state?.addAddressForLoggedInUserInCheckout?.type === ADD_ADDRESS_IN_CHECKOUT_FOR_LOGGED_IN_USER_LONG) {
      if (addAddressDataForLoggedInUserApiStatus !== API_STATUS.LONG) {
        setAddAddressDataForLoggedInUserApiStatus(API_STATUS.LONG)
      }
    }
    else if (state?.addAddressForLoggedInUserInCheckout?.type === ADD_ADDRESS_IN_CHECKOUT_FOR_LOGGED_IN_USER_FAILD) {
      if (addAddressDataForLoggedInUserApiStatus !== API_STATUS.FAILED) {
        setAddAddressDataForLoggedInUserApiStatus(API_STATUS.FAILED)
      }
    }
    // END:: STATE FOR ADD ADDRESS FOR LOGGED IN USER

    // START:: STATE FOR SET DELIVERED ADDRESS FOR LOGGED IN USER
    if (state?.quoteUpdateAddress?.type === QUOTE_ADDRESS_UPDATE_REQUEST) {
      if (quoteUpdateAddressApiStatus !== API_STATUS.LOADING) {
        setQuoteUpdateAddressApiStatus(API_STATUS.LOADING)
      }
    }
    else if (state?.quoteUpdateAddress?.data?.statusCode === SUCCESS_RESPONSE_CODE && state?.quoteUpdateAddress?.type === QUOTE_ADDRESS_UPDATE_SUCCESS) {
      if (quoteUpdateAddressApiStatus !== API_STATUS.SUCCESS) {
        setQuoteUpdateAddressApiStatus(API_STATUS.SUCCESS)
        dispatch(getCheckoutList({ address: {}, quoteId: addressData.address.quoteId.value, shipingId: addressData.address.shipingId.value, isNewsletter: addressData.address.isNewsletter.value, isBilingSelect: addressData.address.isBilingSelect.value }))
      }
    }
    else if (state?.quoteUpdateAddress?.type === QUOTE_ADDRESS_UPDATE_LONG) {
      if (quoteUpdateAddressApiStatus !== API_STATUS.LONG) {
        setQuoteUpdateAddressApiStatus(API_STATUS.LONG)
      }
    }
    else if (state?.quoteUpdateAddress?.type === QUOTE_ADDRESS_UPDATE_FAILD) {
      if (quoteUpdateAddressApiStatus !== API_STATUS.FAILED) {
        setQuoteUpdateAddressApiStatus(API_STATUS.FAILED)
      }
    }
    // END:: STATE FOR SET DELIVERED ADDRESS FOR LOGGED IN USER */
  });

  switch (checkOutListApiStatus) {
    case API_STATUS.LOADING:
      return <Loader></Loader>;
    case API_STATUS.SUCCESS:
      return (
        <div className="checkout">
          <Container>
            <h2>Checkout</h2>
            {/* {console.log("applyPromotionResponse", applyPromotionResponse)} */}
            {/* {console.log('checkOutListDetail',checkOutListDetail)}
            {console.log('checkOutAddressUpdatedDetail',checkOutAddressUpdatedDetail)}
            {console.log('addressData',addressData)}
            {console.log('addressDataError',addressDataError)} */}
            <div className="checkout-layout">
              <div className="checkout-content">
                {auth ? (
                  <LoggedInUserAddresses
                    setAddAddressModalShow={setAddAddressModalShow}
                    addressData={addressData}
                    country={deliveryAddressCountryData}
                    isBothAddressSame={isBothAddressSame}
                    setIsBothAddressSame={(bool: any) =>
                      setIsBothAddressSame(bool)
                    }
                    checkOutListData={checkOutListData}
                    getBillingState={(str: string) => getBillingStates(str)}
                    setBillingShippingAddressData={
                      setBillingShippingAddressData
                    }
                    billingState={billingAddressStateData}
                    setDeliveredAddress={(
                      addressId: string,
                      isDefaultShipping: string
                    ) => setDeliveredAddress(addressId, isDefaultShipping)}
                    onSubmit={onSubmit}
                    isAddressDataFormValidated={isAddressDataFormValidated}
                    addressDataError={addressDataError}
                    addAddressApiStatus={addAddressApiStatus}
                    isAddressFill={isAddressFill}
                    isAddressFormButtonDisabled={isAddressFormButtonDisabled}
                  ></LoggedInUserAddresses>
                ) : deliveryAddressCountryData ? (
                  <Address
                    country={deliveryAddressCountryData}
                    billingAddressCountry={billingAddressCountryData}
                    states={states}
                    deliveryState={deliveryAddressStateData}
                    billingState={billingAddressStateData}
                    isAddressFill={isAddressFill}
                    isBothAddressSame={isBothAddressSame}
                    setIsBothAddressSame={(bool: any) =>
                      setIsBothAddressSame(bool)
                    }
                    getDeliveryState={(str: string) => getDeliveryStates(str)}
                    getBillingState={(str: string) => getBillingStates(str)}
                    setIsAddressFill={(bool: any) => setIsAddressFill(bool)}
                    addAddressApiStatus={addAddressApiStatus}
                    onSubmit={onSubmit}
                    setBillingShippingAddressData={
                      setBillingShippingAddressData
                    }
                    isAddressDataFormValidated={isAddressDataFormValidated}
                    addressData={addressData}
                    addressDataError={addressDataError}
                    setOrderData={setOrderData}
                    isOrderPlaceDataFormValidated={
                      isOrderPlaceDataFormValidated
                    }
                    orderPlaceData={orderPlaceData}
                    orderPlaceDataError={orderPlaceDataError}
                    isAddressFormButtonDisabled={isAddressFormButtonDisabled}
                  ></Address>
                ) : null}

                {isAddressFill === true ? (
                  <Delivery
                    isDeliveryOptionSet={isDeliveryOptionSet}
                    setIsDeliveryOptionSet={(bool: any) =>
                      setIsDeliveryOptionSet(bool)
                    }
                    deliveryOptions={
                      checkOutListData[COMPONENT_SHIPPING_METHODS]
                        ?.shippingMethodData?.list
                    }
                    setDeliveryOptionData={setDeliveryOptionData}
                    updateDeliveryOptionApiStatus={
                      updateDeliveryOptionApiStatus
                    }
                    onSubmit={onSubmitDeliveryOptions}
                    error={
                      isAddressDataFormValidated && addressDataError.shipingId
                        ? addressDataError.shipingId
                        : null
                    }
                    isDeliveyOptionFormButtonDisabled={
                      isDeliveyOptionFormButtonDisabled
                    }
                  ></Delivery>
                ) : null}
                {isAddressFill === true && isDeliveryOptionSet === true ? (
                  <>
                    <Payment
                      Payment1={Payment1}
                      Payment2={Payment2}
                      Payment3={Payment3}
                      Payment4={Payment4}
                      Payment5={Payment5}
                      Gift={Gift}
                      checkOutListData={checkOutListData}
                      giftField={giftField}
                      toggleGift={() => toggleGift()}
                      paymentData={
                        checkOutListData[COMPONENT_PAYMENT]?.paymentData?.list
                      }
                      setOrderData={setOrderData}
                      isOrderPlaceDataFormValidated={
                        isOrderPlaceDataFormValidated
                      }
                      orderPlaceData={orderPlaceData}
                      orderPlaceDataError={orderPlaceDataError}
                      addressData={addressData}
                      cardNumberError={cardNumberError}
                      setCardNumberError={(str: string) =>
                        setCardNumberError(str)
                      }
                      cardExpiryError={cardExpiryError}
                      setCardExpiryError={(str: string) =>
                        setCardExpiryError(str)
                      }
                      cardCvvError={cardCvvError}
                      setCardCvvError={(str: string) => setCardCvvError(str)}
                      whichPaymentMothodSelected={(str: string) =>
                        whichPaymentMethodSelected(str)
                      }
                      selectedPaymentMethod={selectedPaymentMethod}
                      cardTokenCreated={cardTokenCreated}
                      setCardTokenCreated={setCardTokenCreated}
                      setCardToken={setCardToken}
                      handleSubmitOrder={() => onSubmitOrder()}
                      paidUsingApplePay={paidUsingApplePay}
                      setPaidUsingApplePay={(val:any) => {
                        setPaidUsingApplePay(val);
                      }}
                      error={
                        isOrderPlaceDataFormValidated &&
                        orderPlaceDataError.paymentMethod
                          ? orderPlaceDataError.paymentMethod
                          : null
                      }
                    ></Payment>

                    { !(selectedPaymentMethod === "paypal_express") ? (
                      <CustomeButton
                        bg="fill"
                        isLoading={isLoading(orderPlaceDataApiStatus)}
                        onClick={() => onSubmitOrder()}
                        disabled={isPlaceOrderFormButtonDisabled || selectedPaymentMethod === "stripe_payments_apple_pay" }
                        //onClick={() => navigate(CONFIRM_ORDER)}
                      >
                        Place Order
                      </CustomeButton>
                    ) : null}
                  </>
                ) : null}
              </div>
              <div className="checkout-box-layout">
                {checkOutListData[
                  COMPONENT_PURCHASE_PRODUCT
                ]?.purchasedProductData?.list?.map(
                  (items: any, index: number) => (
                    (items.qtyExact = items.selectedQuantity),
                    (<ProductData data={items} key={index} />)
                  )
                )}
                <div className="calculate-table">
                  <table className="value-table">
                    <tbody>
                      <tr>
                        <td>
                          <p className="bm">{MINICART.SUB_TOTAL}</p>
                        </td>
                        <td>
                          <p className="bm">
                            {
                              checkOutListData[COMPONENT_CHECKOUT_PRICE_DETAILS]
                                ?.priceDetailsData?.subTotal
                            }
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="bm">{MINICART.SUB_TAX}</p>
                        </td>
                        <td>
                          <p className="bm">
                            {
                              checkOutListData[COMPONENT_CHECKOUT_PRICE_DETAILS]
                                ?.priceDetailsData?.tax
                            }
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="bm">{MINICART.DELIVERY}</p>
                        </td>
                        <td>
                          <p className="bm">
                            {
                              checkOutListData[COMPONENT_CHECKOUT_PRICE_DETAILS]
                                ?.priceDetailsData?.delivery
                            }
                          </p>
                        </td>
                      </tr>
                      {checkOutListData[COMPONENT_CHECKOUT_PRICE_DETAILS]
                        ?.priceDetailsData?.discountAmount ? (
                        <tr>
                          <td>
                            <p className="bm">{MINICART.DISCOUNT}</p>
                          </td>
                          <td>
                            <p className="bm">
                              {
                                checkOutListData[
                                  COMPONENT_CHECKOUT_PRICE_DETAILS
                                ]?.priceDetailsData?.discountAmount
                              }
                            </p>
                          </td>
                        </tr>
                      ) : (
                        ""
                      )}
                    </tbody>
                  </table>
                  <div className="hr"></div>
                  <table className="total-table">
                    <tbody>
                      <tr>
                        <td>
                          <p className="tm">{MINICART.TOTAL}</p>
                        </td>
                        <td>
                          <p className="tm">
                            {
                              checkOutListData[COMPONENT_CHECKOUT_PRICE_DETAILS]
                                ?.priceDetailsData?.total
                            }
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="promo-box">
                  <div className="enter-detail-box">
                    <input
                      value={
                        checkOutListData[COMPONENT_PROMO_CODE]?.promoCodeData
                          ?.isApplied == 1
                          ? checkOutListData[COMPONENT_PROMO_CODE]
                              ?.promoCodeData?.code
                          : promoCodeData.promocode.value
                      }
                      onChange={(e) =>
                        setPromoData("promocode", e.target.value)
                      }
                      readOnly={
                        checkOutListData[COMPONENT_PROMO_CODE]?.promoCodeData
                          ?.isApplied == 1
                          ? true
                          : false
                      }
                      placeholder="Type promo code"
                    />
                    {checkOutListData[COMPONENT_PROMO_CODE]?.promoCodeData
                      ?.isApplied != 1 ? (
                      <img src={Check} alt="" onClick={() => applyPromo()} />
                    ) : (
                      ""
                    )}
                    <img src={CloseX} alt="" onClick={() => typePromo()} />
                  </div>
                  {promoCodeFormValidated && promoCodeDataError["promocode"] ? (
                    <span className="error">
                      {promoCodeDataError["promocode"]}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </Container>
          <AddNewAddressPopup
            show={addAddressModalShow}
            onHide={() => setAddAddressModalShow(false)}
            addAddressDataForLoggedInUserApiStatus={
              addAddressDataForLoggedInUserApiStatus
            }
            addAddressDataForLoggedInUserError={
              addAddressDataForLoggedInUserError
            }
            isAddAddressDataForLoggedInUserFormValidated={
              isAddAddressDataForLoggedInUserFormValidated
            }
            setIsAddAddressDataForLoggedInUserFormValidated={
              setIsAddAddressDataForLoggedInUserFormValidated
            }
            setAddAddressData={setAddAddressData}
            addAddressDataForLoggedInUser={addAddressDataForLoggedInUser}
            countryDataForAddAddress={deliveryAddressCountryData}
            getStatesForAddAddress={(str: string) =>
              getStatesForAddAddress(str)
            }
            stateDataForAddAddress={stateDataForAddAddress}
            onSubmitAddAddress={onSubmitAddAddress}
            setAddAddressDataForLoggedInUser={setAddAddressDataForLoggedInUser}
            initialDataForAddAddress={INITIAL_ADDRESS_DATA_FOR_ADD_ADDRESS}
          />
        </div>
      );
    case API_STATUS.LONG:
      return <SomethingWrong></SomethingWrong>;
    case API_STATUS.NO_DATA:
      return <NoDataFound></NoDataFound>;
    case API_STATUS.FAILED:
      return <SomethingWrong></SomethingWrong>;
    default:
      return <Loader></Loader>;
  }
};

export default Checkout;
