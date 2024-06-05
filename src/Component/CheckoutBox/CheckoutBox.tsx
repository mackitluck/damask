import { useEffect, useState } from "react";
import CloseIcon from "../../Assets/img/close.svg";
import CK1 from "../../Assets/img/ck1.png";
import CK2 from "../../Assets/img/ck2.png";
import OnlyPlus from "../../Assets/img/only-plus.svg";
import CloseX from "../../Assets/img/x.svg";
import Check from "../../Assets/img/check.svg";
import CustomeButton from "../Common/CustomeButton/CustomeButton";
import ProductData from "../Common/ProductData/ProductData";
import { useNavigate } from "react-router-dom";
import { CHECKOUT, PRODUCTLIST } from "../../Constant/Route";
import { useDispatch, useSelector } from "react-redux";
import { addRemoveCartAction, myCart } from "../../Redux/MyCart/MyCartAction";
import {
  ADD_REMOVE_CART_FROM_MINICART_FAILD,
  ADD_REMOVE_CART_FROM_MINICART_REQUEST,
  ADD_REMOVE_CART_FROM_MINICART_SUCCESS,
} from "../../Redux/MyCart/MyCartTypes";
import { API_STATUS } from "../../Constant/Api";
import { SUCCESS_RESPONSE_CODE } from "../../Constant/Status";
import {
  COMPONENT_MY_PRICE,
  COMPONENT_PRODUCT_LIST_FOR_CART,
  COMPONENT_PROMO_CODE,
} from "../../Constant/Component";
import MINICART from "../../Language/MiniCart";
import * as localStorageConstant from "../../Constant/LocalStorage";
import { PROMO_CODE } from "../../Language/Validation";
import validate from "../../Utility/Validation";
import { applyPromotion } from "../../Redux/PromoCode/PromoCodeAction";
import {
  PROMO_CODE_FAILD,
  PROMO_CODE_SUCCESS,
} from "../../Redux/PromoCode/PromoCodeTypes";

const CheckoutBox = (props: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [cart, setCart] = useState<any>({});
  const [addRemoveCartApiStatus, setAddRemoveCartApiStatus] = useState<any>({});
  //const cartData = useSelector((state: any) => state?.myCart?.data);
  const cartData = useSelector((state: any) => state?.myCartGlobalData?.data);
  const quoteIdGlobal = useSelector((state: any) => state?.quoteIdGlobal?.data);

  let quoteId = localStorage.getItem(localStorageConstant.QUOTE_ID)
    ? localStorage.getItem(localStorageConstant.QUOTE_ID)
    : "";
  useEffect(() => {
    if (quoteIdGlobal) {
      setPromoData("quoteId", quoteIdGlobal);
    }
  }, [quoteIdGlobal]);
  /* const [productQuery, setProductQuery] = useState({
    productQuery: [{
      cartFlag: "",
      itemId: "",
      productId: "",
      urlKey: "",
      qty: "",
      varientQuery: [{ "attributeId": "", "optionId": "" }]
    }]
  }); */

  useEffect(() => {
    dispatch(myCart({ quoteId: quoteId }));
  }, []);
  /*
    useEffect(() => {
      if (cartStatus === true) {
        dispatch(myCart())
      }
    }, [cartStatus]) */

  useEffect(() => {
    let componentData: any = {};
    cartData?.component?.forEach((component: any) => {
      componentData[component?.componentId] = component;
    });
    setCart({ ...componentData });
  }, [cartData]);

  /* useSelector(((state: any) => {
    if (state?.myCart?.type === MYCART_REQUEST) {
      if (cartApiStatus !== API_STATUS.LOADING) {
        setCartApiStatus(API_STATUS.LOADING)
      }
    }
    else if (state?.myCart?.data?.statusCode === SUCCESS_RESPONSE_CODE && state?.myCart?.type === MYCART_SUCCESS) {
      if (cartApiStatus !== API_STATUS.SUCCESS) {
        setCartApiStatus(API_STATUS.SUCCESS)
      }
    }
    else if (state?.myCart?.type === MYCART_LONG) {
      if (cartApiStatus !== API_STATUS.LONG) {
        setCartApiStatus(API_STATUS.LONG)
      }
    }
    else if (state?.myCart?.type === MYCART_FAILD) {
      if (cartApiStatus !== API_STATUS.FAILED) {
        setCartApiStatus(API_STATUS.FAILED)
      }
    }
  })) */

  useSelector((state: any) => {
    //add to cart selector
    if (
      state?.addRemoveCartFromMiniCart?.type ===
      ADD_REMOVE_CART_FROM_MINICART_REQUEST
    ) {
      if (addRemoveCartApiStatus !== API_STATUS.LOADING) {
        setAddRemoveCartApiStatus(API_STATUS.LOADING);
      }
    } else if (
      state?.addRemoveCartFromMiniCart?.data?.statusCode ===
        SUCCESS_RESPONSE_CODE &&
      state?.addRemoveCartFromMiniCart?.type ===
        ADD_REMOVE_CART_FROM_MINICART_SUCCESS
    ) {
      if (addRemoveCartApiStatus !== API_STATUS.SUCCESS) {
        setAddRemoveCartApiStatus(API_STATUS.SUCCESS);
        setDisableButton(false);
      }
    } else if (
      state?.addRemoveCartFromMiniCart?.type ===
      ADD_REMOVE_CART_FROM_MINICART_FAILD
    ) {
      if (addRemoveCartApiStatus !== API_STATUS.FAILED) {
        setAddRemoveCartApiStatus(API_STATUS.FAILED);
      }
    }
  });

  const [typePromoShow, setTypePromoShow] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  const typePromo = () => {
    setTypePromoShow(!typePromoShow);
    if (
      cart[COMPONENT_PROMO_CODE]?.promoCodeData?.isApplied == 1 &&
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

  const checkoutCall = () => {
    navigate(CHECKOUT);
    const pData = cart[COMPONENT_PRODUCT_LIST_FOR_CART]?.productListData;
    const priceDetail = cart[COMPONENT_MY_PRICE]?.myPrice;
    console.log("FBQ :: TRACK EVENT --> InitiateCheckout");
    typeof window.fbq === "function" &&
      window.fbq("track", "InitiateCheckout", {
        content_ids: pData?.map((i: any) => i.id),
        content_category: "products",
        contents: pData.map((i: any) => {
          return {
            id: i.itemId,
            title: i.title,
            sku: i.prosku || "SKU",
            type: i.type || "TYPE",
            price: i.price,
            qty: i.selectedQuantity,
          };
        }),
        currency: "$",
        num_items: priceDetail.noItems[0],
        value: priceDetail?.total.replace(/^\D+/g, ""),
      });
    console.log(
      "cart[COMPONENT_PRODUCT_LIST_FOR_CART]?.productListData ",
      cart[COMPONENT_PRODUCT_LIST_FOR_CART]?.productListData
    );
    props.toggleCheckoutMenu();
  };

  const shopNow = () => {
    props.toggleCheckoutMenu();
    navigate(PRODUCTLIST);
  };

  const getCurrentQty = (qty: any, action: any, datas: any) => {
    setDisableButton(true);
    let cartFlag = action === "add" ? "1" : "0";
    let productQuery = {
      cartFlag: cartFlag,
      itemId: datas.itemId,
      productId: datas.id,
      urlKey: datas.urlKey,
      qty: "1",
      varientQuery: datas.variant,
    };

    let productQueryData = {
      quoteId: quoteId,
      productQuery: [productQuery],
    };
    dispatch(addRemoveCartAction(productQueryData));
  };

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
    let reviewDetails = Object.assign({}, promoCodeData);
    reviewDetails[field].value = value;
    setPromoCodeData({ ...reviewDetails });
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

  return (
    <>
      <div className={`checkout-box ${props.toggleCheckout ? "active" : ""}`}>
        <img
          src={CloseIcon}
          alt=""
          className="close-icon"
          onClick={props.toggleCheckoutMenu}
        />
        {cartData?.statusCode === "200" ? (
          <>
            <div className="checkout-box-header">
              <p className="tl">{MINICART.MINICART}</p>
              <p className="tm">{cart[COMPONENT_MY_PRICE]?.myPrice?.noItems}</p>
              <CustomeButton bg="fill" onClick={() => checkoutCall()}>
                {MINICART.PROCEED_CHECKOUT}
              </CustomeButton>
            </div>
            <div className="checkout-box-content">
              <div className="product-wrapper">
                {cart[COMPONENT_PRODUCT_LIST_FOR_CART]?.productListData.map(
                  (items: any, index: number) => (
                    (items.value = items.selectedQuantity),
                    (
                      <ProductData
                        disableButton={disableButton}
                        onChange={(e: any, action: any) => {
                          getCurrentQty(e, action, items);
                        }}
                        data={items}
                        key={index}
                      />
                    )
                  )
                )}
              </div>
              <div className="calculate-table">
                <table className="value-table">
                  <tbody>
                    <tr>
                      <td>
                        <p className="bm">{MINICART.SUB_TOTAL}</p>
                      </td>
                      <td>
                        <p className="bm">
                          {cart[COMPONENT_MY_PRICE]?.myPrice?.subTotal}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p className="bm">{MINICART.SUB_TAX}</p>
                      </td>
                      <td>
                        <p className="bm">
                          {cart[COMPONENT_MY_PRICE]?.myPrice?.tax}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p className="bm">{MINICART.DELIVERY}</p>
                      </td>
                      <td>
                        <p className="bm">
                          {cart[COMPONENT_MY_PRICE]?.myPrice?.delivery}
                        </p>
                      </td>
                    </tr>
                    {cart[COMPONENT_MY_PRICE]?.myPrice?.discountAmount ? (
                      <tr>
                        <td>
                          <p className="bm">{MINICART.DISCOUNT}</p>
                        </td>
                        <td>
                          <p className="bm">
                            {cart[COMPONENT_MY_PRICE]?.myPrice?.discountAmount}
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
                          {cart[COMPONENT_MY_PRICE]?.myPrice?.total}
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="promo-box">
                <div
                  className={`detail-box ${
                    typePromoShow ||
                    cart[COMPONENT_PROMO_CODE]?.promoCodeData?.isApplied == 1
                      ? "hide"
                      : ""
                  }`}
                >
                  <p className="bm">{MINICART.PROMO_CODE}</p>
                  <img src={OnlyPlus} alt="" onClick={() => typePromo()} />
                </div>
                <div
                  className={`enter-detail-box ${
                    typePromoShow ||
                    cart[COMPONENT_PROMO_CODE]?.promoCodeData?.isApplied == 1
                      ? ""
                      : "hide"
                  }`}
                >
                  <input
                    value={
                      cart[COMPONENT_PROMO_CODE]?.promoCodeData?.isApplied == 1
                        ? cart[COMPONENT_PROMO_CODE]?.promoCodeData?.code
                        : promoCodeData.promocode.value
                    }
                    onChange={(e) => setPromoData("promocode", e.target.value)}
                    readOnly={
                      cart[COMPONENT_PROMO_CODE]?.promoCodeData?.isApplied == 1
                        ? true
                        : false
                    }
                    placeholder="Type promo code"
                  />
                  {cart[COMPONENT_PROMO_CODE]?.promoCodeData?.isApplied != 1 ? (
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
              <CustomeButton bg="fill" onClick={() => checkoutCall()}>
                {MINICART.PROCEED_CHECKOUT}
              </CustomeButton>
            </div>{" "}
          </>
        ) : (
          <>
            <div className="empty-cart-wrapper">
              <h3>Your cart is empty</h3>
              <CustomeButton onClick={() => shopNow()} bg="fill">
                Shop Now
              </CustomeButton>
            </div>
          </>
        )}
      </div>

      <div
        className={`side-checkout-back ${props.toggleCheckout ? "active" : ""}`}
        onClick={props.toggleCheckoutMenu}
      ></div>
    </>
  );
};

export default CheckoutBox;
