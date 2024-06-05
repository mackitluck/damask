/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Dropdown } from "react-bootstrap";
import Pin from "../../Assets/img/pin.svg";
import Fb from "../../Assets/img/fb-round.svg";
import Tw from "../../Assets/img/twitter.svg";
import CustomeButton from "../Common/CustomeButton/CustomeButton";
import HeartLabel from "../Common/HeartLabel/HeartLabel";
import FrostingPopup from "./FrostingPopup/FrostingPopup";
import WriteReviewPopup from "./WriteReviewPopup/WriteReviewPopup";
import ZoomPopup from "./ZoomPopup/ZoomPopup";
import { useNavigate } from "react-router-dom";
import { LOGIN, PRODUCTLIST } from "../../Constant/Route";
import { useDispatch, useSelector } from "react-redux";
import {
  addRemoveWishListAction,
  showMinicart,
} from "../../Redux/General/GeneralAction";
import { generateQuery, getStarRating, isLoading } from "../../Utility/General";
import { API_STATUS } from "../../Constant/Api";
import { useParams } from "react-router-dom";
import {
  addToCartAction,
  notifyMeAction,
  productDetailAction,
  productReviewAction,
  selectVarientAction,
} from "../../Redux/ProductDetail/ProductDetailAction";
import {
  ADD_TO_CART_FAILD,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  PRODUCT_DETAIL_FAILD,
  PRODUCT_DETAIL_LONG,
  PRODUCT_DETAIL_NO_DATA,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  SELECT_VARIENT_FAILD,
  SELECT_VARIENT_LONG,
  SELECT_VARIENT_NO_DATA,
  SELECT_VARIENT_REQUEST,
  SELECT_VARIENT_SUCCESS,
  PRODUCT_REVIEW_REQUEST,
  PRODUCT_REVIEW_FAILD,
  PRODUCT_REVIEW_SUCCESS,
  NOTIFY_ME_SUCCESS,
  NOTIFY_ME_REQUEST,
  NOTIFY_ME_FAILD,
} from "../../Redux/ProductDetail/ProductDetailTypes";
import { SUCCESS_RESPONSE_CODE } from "../../Constant/Status";
import SomethingWrong from "../SomethingWrong/SomethingWrong";
import Loader from "../Loader/Loader";
import NoDataFound from "../NoDataFound/NoDataFound";
import * as localStorageConstant from "../../Constant/LocalStorage";
import {
  COMPONENT_PRODUCT_DETAIL_ACCORDION_DATA,
  COMPONENT_PRODUCT_DETAIL_ALSO_LIKE,
  COMPONENT_PRODUCT_DETAIL_ATTRIBUTES,
  COMPONENT_PRODUCT_DETAIL_BOUGHT_TO_GETHER,
  COMPONENT_PRODUCT_DETAIL_DATA,
  COMPONENT_PRODUCT_DETAIL_DESCRIPTION,
  COMPONENT_PRODUCT_DETAIL_PRODUCT_IMAGE,
  COMPONENT_PRODUCT_DETAIL_REVIEW,
} from "../../Constant/Component";
import PRODUCT_DETAIL from "../../Language/ProductDetail";
import ProductReview from "./ProductReview/ProductReview";
import YouMayLike from "./YouMayLike/YouMayLike";
import ProductDetailPanel from "./ProductDetailPanel/ProductDetailPanel";
import ProductOverview from "./ProductOverview/ProductOverview";
import BoughtTogether from "./BoughtTogether/BoughtTogether";
import ProductCarousel from "./Product-Carousel/ProductCarousel";
import { EMAIL } from "../../Language/Validation";
import validate from "../../Utility/Validation";
import LoginAlertPopup from "./LoginAlertPopup/LoginAlertPopup";
import {
  FacebookShareButton,
  PinterestShareButton,
  TwitterShareButton,
} from "react-share";
import COMMON from "../../Language/Common";

const ProductDetails = (props: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [apiStatus, setApiStatus] = useState(API_STATUS.LOADING);
  const cartData = useSelector((state: any) => state?.myCartGlobalData?.data);
  const [variantApiStatus, setVariantApiStatus] = useState(API_STATUS.SUCCESS);
  const [reviewApiStatus, setReviewApiStatus] = useState(API_STATUS.SUCCESS);
  const [notifyApiStatus, setNotifyApiStatus] = useState(API_STATUS.SUCCESS);
  const [addToCartApiStatus, setAddToCartApiStatus] = useState(
    API_STATUS.SUCCESS
  );
  const [productDetailData, setProductDetailData] = useState<any>({});
  const [productReviewData, setProductReviewData] = useState<any>({});
  const productDetail = useSelector((state: any) => state?.productDetail?.data);
  const productReview = useSelector((state: any) => state?.productReview?.data);
  const urlParams = useParams();
  const selectVarient = useSelector(
    (state: any) => state?.selectedVarient?.data
  );
  const isLogin = useSelector((state: any) => state?.login?.isLoggedIn);
  const [loginAlertModalShow, setLoginAlertModalShow] = useState<any>(false);
  const [loginAlertMessage, setLoginAlertMessage] = useState<any>("");
  const [selectVarientData, setSelectVarientData] = useState<any>({});
  const [productImageData, setProductImageData] = useState<any>([]);
  const [productVariantData, setProductVariantData] = useState<any>({});
  const [frostingFlag, setFrostingFlag] = useState<any>(false);
  const [disableButton, setDisableButton] = useState(false);
  let productKey = urlParams.productKey;
  const [isValidate, setIsValidate] = useState(false);
  const [message, setMessage] = useState("");
  const [reviewPage, setReviewPage] = useState(1);
  let reviewPagesize = 5;
  // let isWishListed = 0;
  const [isWishListed, setIsWishListed] = useState(0);
  const [selectedOptions, setOptions] = useState<any>([]);
  const [isAddToCartButtonDisabled, setIsAddToCartButtonDisabled] =
    useState(false);

  let auth = useSelector((state: any) => state?.login?.isLoggedIn);
  const [quoteId, setQuoteId] = useState(
    localStorage.getItem(localStorageConstant.QUOTE_ID)
      ? localStorage.getItem(localStorageConstant.QUOTE_ID)
      : ""
  );
  const [productQuery, setProductQuery] = useState({
    quoteId: quoteId,
    productQuery: [
      {
        cartFlag: 1,
        itemId: "",
        productId: "",
        urlKey: productKey,
        qty: 1,
        varientQuery: [{ attributeId: "", optionId: "" }],
      },
    ],
  });

  const INITIAL_NOTIFY_DATA: any = {
    email: {
      value: null,
      validation: ["email", "required"],
      errors: [EMAIL.Valid, EMAIL.Required],
    },
  };

  const [notifyData, setNotifyData] = useState(INITIAL_NOTIFY_DATA);
  let demo: any = {};
  const [notifyDataError, setNotifyDataError] = useState(demo);
  const [isFormValidated, setIsFormValidated] = useState(false);

  const setData = (field: string, value: string) => {
    let notifyDetails = Object.assign({}, notifyData);
    notifyDetails[field].value = value;
    setNotifyData({ ...notifyDetails });
  };
  useEffect(() => {
    setNotifyDataError({ ...validate(notifyData)?.errors });
  }, [notifyData]);

  const [queryParam, setQueryParam] = useState({
    urlKey: urlParams.productKey,
    quoteId: quoteId,
  });

  const [reviewQueryParam, setReviewQueryParam] = useState({
    pageSize: reviewPagesize,
    pageNo: reviewPage,
    urlKey: urlParams.productKey,
  });

  useEffect(() => {
    let queryParamLocal = Object.assign({}, queryParam);
    let reviewQueryParamLocal = Object.assign({}, reviewQueryParam);
    queryParamLocal.urlKey = productKey;
    reviewQueryParamLocal.urlKey = productKey;
    if (queryParam.urlKey != productKey) {
      setQueryParam({ ...queryParamLocal });
      setReviewQueryParam({ ...reviewQueryParamLocal });
    }
    // dispatch(productDetailAction(generateQuery(queryParam)));
    if (productKey != productQuery.productQuery[0].urlKey) {
      localStorage.removeItem(localStorageConstant.CONFIGURABLE_DATA);
      localStorage.removeItem(localStorageConstant.PRODUCTQUERY);
      setAttributeData({});
    }

    let productQueryLocal = Object.assign({}, productQuery);
    productQueryLocal.productQuery[0].urlKey = productKey;
    setProductQuery({ ...productQuery, ...productQueryLocal });
  }, [productKey]);

  useEffect(() => {
    if (queryParam) {
      dispatch(productDetailAction(generateQuery(queryParam)));
      dispatch(productReviewAction(reviewQueryParam));
    }
    setMessage("");
    setIsValidate(false);
  }, [queryParam]);

  useEffect(() => {
    if (reviewQueryParam) {
      dispatch(productReviewAction(reviewQueryParam));
    }
  }, [reviewQueryParam]);

  useEffect(() => {
    let componentData: any = {};
    productDetail?.component?.forEach((component: any) => {
      componentData[component?.componentId] = component;
      if (component?.componentId === COMPONENT_PRODUCT_DETAIL_ATTRIBUTES) {
        fetchDataFromLocal(component["attributesData"].list);
        setIsValidate(true);
      }
      setProductDetailData({ ...componentData });
    });
    setBigImg("");
  }, [productDetail]);

  const fetchDataFromLocal = (list: any[]) => {
    const data = localStorage.getItem(localStorageConstant.PRODUCTQUERY);
    if (data) {
      const { productQuery } = JSON.parse(data);
      let pQ: { attributeId: string; optionId: string }[] =
        productQuery[0].varientQuery;
      if (pQ && pQ.length > 0) {
        pQ = pQ.map((c) => {
          const option = list.find(
            (cc) => Number(cc.attributeId) === Number(c.attributeId)
          );
          const value = option?.options.find(
            (cc: any) => Number(cc.optionId) === Number(c.optionId)
          )?.value;
          return { ...c, value };
        });
        setOptions(pQ);
      }
    }
  };

  useEffect(() => {
    if (productDetailData) {
      setProductImageData(
        productDetailData[COMPONENT_PRODUCT_DETAIL_PRODUCT_IMAGE]?.productImage
      );
      setProductVariantData(
        productDetailData[COMPONENT_PRODUCT_DETAIL_DATA]?.productData
      );
      const pData =
        productDetailData[COMPONENT_PRODUCT_DETAIL_DATA]?.productData;
      typeof window.fbq === "function" &&
        window.fbq("track", "ViewContent", {
          content_type: "product",
          content_name: pData?.title,
          currency: "$",
          value: pData?.actualPrice?.split("$")[1],
          content_ids: [pData?.productId],
          source: "magento2",
        });
    }
  }, [productDetailData]);

  useEffect(() => {
    let componentData: any = {};
    productReview?.component?.forEach((component: any) => {
      componentData[component?.componentId] = component;
      setProductReviewData({ ...componentData });
    });
  }, [productReview]);

  // useEffect(() => {
  //   dispatch(productDetailAction(generateQuery(queryParam)));
  // }, [addRemoveFromMiniCart]);

  // const cartListData = cartData.component[1].productListData;
  const [cartListData, setCartListData] = useState<any>({});

  useEffect(() => {
    let componentData: any = {};
    if (cartData && cartData.statusCode === SUCCESS_RESPONSE_CODE) {
      cartData?.component?.forEach((component: any) => {
        if (component?.componentId == "productList") {
          componentData[component?.componentId] = component;
          setCartListData(componentData?.productList?.productListData);
        }
      });
    } else {
      setCartListData({ ...componentData });
    }
  }, [cartData]);

  const addToCart = (frostingFlag: any) => {
    setFrostingFlag(frostingFlag);
    if (!isValidate) {
      setIsAddToCartButtonDisabled(true);
      dispatch(
        addToCartAction(
          productQuery,
          productDetailData?.productData?.productData?.actualPrice.split("$")[1]
        )
      );
      setAddToCartApiStatus(API_STATUS.LOADING);
    } else {
      setMessage("Please select atleast one variant");
    }
  };

  const notifyMeClicked = (email: string) => {
    if (!isLogin) {
      setLoginAlertMessage(COMMON.MESSAGE_IN_LOGIN_POPUP_FOR_NOTIFY);
      setLoginAlertModalShow(true);
    } else {
      if (validate(notifyData).isValidated === true) {
        dispatch(
          notifyMeAction({ email: email, urlKey: productKey, isSubscribe: 1 })
        );
      } else {
        setNotifyDataError({ ...validate(notifyData)?.errors });
        setIsFormValidated(true);
      }
    }
  };

  const onYes = () => {
    setFrostingModalShow(false);
    navigate(PRODUCTLIST + "/" + productDetail?.frostingUrlKey);
  };
  const onLoginYes = () => {
    setLoginAlertModalShow(false);
    navigate(LOGIN);
  };
  const onNo = () => {
    setFrostingModalShow(false);
    dispatch(showMinicart);
  };

  const onWishListToggle = (urlkey: any, flag: number, itemId: any) => {
    if (isLogin) {
      dispatch(
        addRemoveWishListAction({
          urlKey: urlkey,
          flag: flag,
          WishlistItemId: itemId ? itemId : "",
        })
      );
      setIsWishListed(flag);
    } else {
      setLoginAlertMessage(COMMON.MESSAGE_IN_LOGIN_POPUP_FOR_WISHLIST);
      setLoginAlertModalShow(true);
      setIsValidate(false);
    }
  };

  const getCurrentQty = (qty: any, action: any, datas: any) => {
    setDisableButton(true);
    let cartFlag = action === "add" ? "1" : "0";
    let productQuery = {
      cartFlag: cartFlag,
      itemId: datas.itemId ? datas.itemId : "",
      productId: datas.id,
      urlKey: datas.urlKey,
      qty: "1",
      varientQuery: datas.variant ? datas.variant : [],
    };

    let productQueryData = {
      quoteId: quoteId,
      productQuery: [productQuery],
    };
    dispatch(
      addToCartAction(
        productQueryData,
        productDetailData?.productData?.productData?.actualPrice.split("$")[1]
      )
    );
  };

  var settings = {
    dots: false,
    vertical: true,
    infinite: false,
    speed: 300,
    draggable: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 2000,
        settings: {
          vertical: true,
        },
      },
      {
        breakpoint: 991,
        settings: {
          vertical: false,
        },
      },
    ],
  };

  const options = {
    responsiveClass: true,
    autoplay: false,
    smartSpeed: 300,
    responsive: {
      0: {
        items: 1,
        margin: 0,
        nav: false,
        dots: true,
        loop: true,
      },
      768: {
        items: 4,
        margin: 16,
        nav: true,
        dots: false,
        loop: false,
      },
    },
  };

  const [attributeData, setAttributeData] = useState<any>({});
  const [frostingModalFlag, setFrostingModalFlag] = React.useState(false);

  function setConfigurableData(option: any, attributeId: any, data?: any[]) {
    setIsValidate(false);
    let attributeLocal = Object.assign({}, attributeData);
    let productQueryLocal = Object.assign({}, productQuery);
    productQueryLocal.productQuery[0].urlKey = productKey;
    attributeLocal.urlKey = productKey;
    let varientQuery = [
      { attributeId: attributeId, optionId: option.optionId },
    ];
    if (data) {
      varientQuery = data.map((c) => {
        return { attributeId: c.attributeId, optionId: c.optionId };
      });
    }
    productQueryLocal.productQuery[0].varientQuery = varientQuery;
    attributeLocal.varientQuery = varientQuery;

    setAttributeData(attributeLocal);
    //productQueryLocal.productQuery = [{"cartFlag":1,"itemId":"","productId":"","urlKey": productKey,"qty":1,"varientQuery": [{"attributeId": attributeId, "optionId": option.optionId}]}];
    setProductQuery({ ...productQuery, ...productQueryLocal });
    localStorage.setItem(
      localStorageConstant.CONFIGURABLE_DATA,
      JSON.stringify(attributeLocal)
    );
    localStorage.setItem(
      localStorageConstant.PRODUCTQUERY,
      JSON.stringify(productQueryLocal)
    );
    // setAttributeData({...attributeData, "option": option, "attribute": attributeId});
    // getSelectedVarient();
  }

  function isCheckedWaferType(
    attributeId: any,
    optionId: number,
    waferType: any,
    options: any[]
  ): boolean {
    let varients = attributeData.varientQuery;
    let returnVal = false;

    if (varients) {
      for (let i = 0; i < varients.length; i++) {
        if (
          attributeId === varients[i].attributeId &&
          optionId === varients[i].optionId
        ) {
          returnVal = true;
          if (selectedOptions.length === 0) {
            // toggleLabel(waferType, options, attributeId);
          }
        }
      }
    }
    return returnVal;
  }

  const toggleLabel = (option: any, options: any[], attributeId: string) => {
    const data: any[] = Object.assign(
      [],
      JSON.parse(JSON.stringify(selectedOptions))
    );
    const index = data.findIndex(
      (c: any) =>
        options.filter((cc: any) => cc.optionId === c.optionId).length > 0
    );
    option.attributeId = attributeId;
    if (index > -1) {
      data[index] = option;
    } else {
      data.push(option);
    }
    setOptions(data);
    setConfigurableData(option, attributeId, data);
  };

  useEffect(() => {
    if (attributeData.urlKey) {
      dispatch(selectVarientAction(attributeData));
      setIsValidate(false);
    }
  }, [attributeData]);

  useEffect(() => {
    let componentData: any = {};
    selectVarient?.component?.forEach((component: any) => {
      componentData[component?.componentId] = component;
      setSelectVarientData({ ...componentData });
    });
    setIsWishListed(
      productDetailData[COMPONENT_PRODUCT_DETAIL_DATA]?.productData
        ?.isWishlisted
    );
  }, [selectVarient]);

  useEffect(() => {
    if (selectVarientData)
      setProductImageData(
        selectVarientData[COMPONENT_PRODUCT_DETAIL_PRODUCT_IMAGE]?.productImage
      );
    setProductVariantData(
      selectVarientData[COMPONENT_PRODUCT_DETAIL_DATA]?.productData
    );
  }, [selectVarientData]);

  useSelector((state: any) => {
    //product detail selector
    if (state?.productDetail?.type === PRODUCT_DETAIL_REQUEST) {
      if (apiStatus !== API_STATUS.LOADING) {
        setApiStatus(API_STATUS.LOADING);
      }
    } else if (
      state?.productDetail?.data?.statusCode === SUCCESS_RESPONSE_CODE &&
      state?.productDetail?.type === PRODUCT_DETAIL_SUCCESS
    ) {
      if (apiStatus !== API_STATUS.SUCCESS) {
        setApiStatus(API_STATUS.SUCCESS);
        // setIsWishListed(
        //   productDetailData[
        //     COMPONENT_PRODUCT_DETAIL_DATA
        //   ]?.productData?.isWishlisted
        // );
        setFrostingModalFlag(
          state?.productDetail?.data?.isFrostingAvailable == 1 ? true : false
        );
        let data =
          localStorageConstant && localStorageConstant.CONFIGURABLE_DATA
            ? localStorage.getItem(localStorageConstant.CONFIGURABLE_DATA)
            : null;
        if (data) {
          setIsValidate(false);
          setAttributeData(JSON.parse(data));
        }
        // let productData = localStorageConstant && localStorageConstant.PRODUCTQUERY ?
        // localStorage.getItem(localStorageConstant.PRODUCTQUERY) : null;
        // if(productData){
        //   setProductQuery(JSON.parse(productData));
        // }
      }
    } else if (state?.productDetail?.type === PRODUCT_DETAIL_LONG) {
      if (apiStatus !== API_STATUS.LONG) {
        setApiStatus(API_STATUS.LONG);
      }
    } else if (state?.productDetail?.type === PRODUCT_DETAIL_NO_DATA) {
      if (apiStatus !== API_STATUS.NO_DATA) {
        setApiStatus(API_STATUS.NO_DATA);
      }
    } else if (state?.productDetail?.type === PRODUCT_DETAIL_FAILD) {
      if (apiStatus !== API_STATUS.FAILED) {
        setApiStatus(API_STATUS.FAILED);
      }
    }

    //varient selector
    if (state?.selectedVarient?.type === SELECT_VARIENT_REQUEST) {
      if (variantApiStatus !== API_STATUS.LOADING) {
        setVariantApiStatus(API_STATUS.LOADING);
      }
    } else if (
      state?.selectedVarient?.data?.statusCode === SUCCESS_RESPONSE_CODE &&
      state?.selectedVarient?.type === SELECT_VARIENT_SUCCESS
    ) {
      if (variantApiStatus !== API_STATUS.SUCCESS) {
        setVariantApiStatus(API_STATUS.SUCCESS);
      }
    } else if (state?.selectedVarient?.type === SELECT_VARIENT_LONG) {
      if (variantApiStatus !== API_STATUS.LONG) {
        setVariantApiStatus(API_STATUS.LONG);
      }
    } else if (state?.selectedVarient?.type === SELECT_VARIENT_NO_DATA) {
      if (variantApiStatus !== API_STATUS.NO_DATA) {
        setVariantApiStatus(API_STATUS.NO_DATA);
      }
    } else if (state?.selectedVarient?.type === SELECT_VARIENT_FAILD) {
      if (variantApiStatus !== API_STATUS.FAILED) {
        setVariantApiStatus(API_STATUS.FAILED);
      }
    }

    //add to cart selector
    if (state?.addToCart?.type === ADD_TO_CART_REQUEST) {
      if (addToCartApiStatus !== API_STATUS.LOADING) {
        setAddToCartApiStatus(API_STATUS.LOADING);
        setDisableButton(true);
      }
    } else if (
      state?.addToCart?.data?.statusCode === SUCCESS_RESPONSE_CODE &&
      state?.addToCart?.type === ADD_TO_CART_SUCCESS
    ) {
      if (addToCartApiStatus !== API_STATUS.SUCCESS) {
        setIsAddToCartButtonDisabled(false);
        setAddToCartApiStatus(API_STATUS.SUCCESS);
        setQuoteId(state?.addToCart?.data?.quoteId);
        setProductQuery({
          ...productQuery,
          quoteId: state?.addToCart?.data?.quoteId,
        });
        setDisableButton(false);
        if (frostingFlag) {
          setFrostingModalShow(true);
        } else {
          dispatch(showMinicart);
        }
      }
    } else if (state?.addToCart?.type === ADD_TO_CART_FAILD) {
      if (addToCartApiStatus !== API_STATUS.FAILED) {
        setAddToCartApiStatus(API_STATUS.FAILED);
        setIsAddToCartButtonDisabled(false);
      }
    }

    //product review selector
    if (state?.productReview?.type === PRODUCT_REVIEW_REQUEST) {
      if (reviewApiStatus !== API_STATUS.LOADING) {
        setReviewApiStatus(API_STATUS.LOADING);
      }
    } else if (
      state?.productReview?.data?.statusCode === SUCCESS_RESPONSE_CODE &&
      state?.productReview?.type === PRODUCT_REVIEW_SUCCESS
    ) {
      if (reviewApiStatus !== API_STATUS.SUCCESS) {
        setReviewApiStatus(API_STATUS.SUCCESS);
      } else if (state?.productReview?.type === PRODUCT_REVIEW_FAILD) {
        if (reviewApiStatus !== API_STATUS.FAILED) {
          setReviewApiStatus(API_STATUS.FAILED);
        }
      }
    }

    //notify me selector
    if (state?.notifyMe?.type === NOTIFY_ME_REQUEST) {
      if (notifyApiStatus !== API_STATUS.LOADING) {
        setNotifyApiStatus(API_STATUS.LOADING);
      }
    } else if (
      state?.notifyMe?.data?.statusCode === SUCCESS_RESPONSE_CODE &&
      state?.notifyMe?.type === NOTIFY_ME_SUCCESS
    ) {
      if (notifyApiStatus !== API_STATUS.SUCCESS) {
        setNotifyApiStatus(API_STATUS.SUCCESS);
      } else if (state?.notifyMe?.type === NOTIFY_ME_FAILD) {
        if (notifyApiStatus !== API_STATUS.FAILED) {
          setNotifyApiStatus(API_STATUS.FAILED);
        }
      }
    }
  });

  const fetchMoreReviewData = () => {
    let reviewQueryParamLocal = Object.assign({}, reviewQueryParam);
    reviewQueryParamLocal.pageNo = reviewQueryParamLocal.pageNo + 1;
    setReviewPage(reviewQueryParamLocal.pageNo);
    setReviewQueryParam({ ...reviewQueryParamLocal });
    // dispatch(productListAction(generateQuery(reviewQueryParamLocal)));
  };

  const [bigImg, setBigImg] = useState("");
  const [frostingModalShow, setFrostingModalShow] = React.useState(false);
  const [reviewModalShow, setReviewModalShow] = React.useState(false);
  const [zoomModalShow, setZoomModalShow] = React.useState(false);

  function isChecked(attributeId: any, optionId: number) {
    let varients = attributeData.varientQuery;
    let returnVal = false;
    if (varients) {
      for (let i = 0; i < varients.length; i++) {
        if (
          attributeId === varients[i].attributeId &&
          optionId === varients[i].optionId
        ) {
          returnVal = true;
        }
      }
    }
    return returnVal;
  }

  switch (apiStatus) {
    case API_STATUS.LOADING:
      return <Loader></Loader>;
    case API_STATUS.SUCCESS:
      return (
        <div className="product-details-wrapper">
          <Container>
            {/* <Carousel images={images} style={{ width: '100%' }} /> */}
            <Row>
              <Col lg={12} xl={{ span: 10, offset: 1 }}>
                {variantApiStatus === API_STATUS.LOADING ? (
                  <Loader></Loader>
                ) : (
                  <Row>
                    {productImageData && productImageData.length > 0 && (
                      <ProductCarousel
                        settings={settings}
                        options={options}
                        bigImg={bigImg}
                        // productImage={productDetailData[COMPONENT_PRODUCT_DETAIL_PRODUCT_IMAGE]?.productImage}
                        productImage={productImageData}
                        setBigImg={(string: any) => setBigImg(string)}
                        setZoomModalShow={(bool: any) => setZoomModalShow(bool)}
                      ></ProductCarousel>
                    )}
                    <Col sm={12} md={6} lg={6}>
                      <div className="PD-functionality">
                        <p className="tl">{productVariantData?.title}</p>

                        {/* DISPLAYING PRICE */}
                        <div className="product-price">
                          {productVariantData?.discountedPrice ? (
                            <del className="bm blur-color">
                              {productVariantData?.actualPrice}
                            </del>
                          ) : (
                            <span className="bm">
                              {productVariantData?.actualPrice}
                            </span>
                          )}

                          <span className="bm">
                            {productVariantData?.discountedPrice}
                          </span>
                        </div>

                        {/* DISPLAY STOCK STATUS */}
                        <label className="bm">
                          {productVariantData?.is_instock === "1"
                            ? "In Stock"
                            : "Out of Stock"}
                        </label>
                        {productVariantData?.is_instock !== "1" && (
                          <div className="notify-section">
                            <p className="bm">{PRODUCT_DETAIL.GET_NOTIFY}</p>
                            <div className="notify-wrapper">
                              <input
                                placeholder="Email Address"
                                onChange={(e: any) =>
                                  setData("email", e.target.value)
                                }
                              />
                              <CustomeButton
                                bg="fill"
                                isLoading={isLoading(notifyApiStatus)}
                                onClick={() =>
                                  notifyMeClicked(notifyData.email.value)
                                }
                              >
                                {PRODUCT_DETAIL.NOTIFY_ME}
                              </CustomeButton>
                            </div>
                            <span className="error">
                              {isFormValidated && notifyDataError["email"]
                                ? notifyDataError["email"]
                                : null}
                            </span>
                          </div>
                        )}

                        {/* <div className="frosting">
                        <SelectGroups label="Choose Frosting" value={frosting} />
                      </div> */}
                        {productDetailData[COMPONENT_PRODUCT_DETAIL_ATTRIBUTES]
                          ?.attributesData?.list?.length > 0 && (
                          <div className="color-selection">
                            {productDetailData[
                              COMPONENT_PRODUCT_DETAIL_ATTRIBUTES
                            ]?.attributesData?.list?.map((item: any) =>
                              item?.isColor === "1" ? (
                                item?.options.map(
                                  (items: any, index: number) => (
                                    <label
                                      className="color-box"
                                      key={"color-selection" + index}
                                    >
                                      <input
                                        type="radio"
                                        value="color"
                                        name="color"
                                        defaultChecked={isChecked(
                                          item.attributeId,
                                          items.optionId
                                        )}
                                        onChange={(e) =>
                                          setConfigurableData(
                                            items,
                                            item.attributeId
                                          )
                                        }
                                      />
                                      <span
                                        className="color-checkmark"
                                        style={{
                                          backgroundColor: items.colorCode,
                                        }}
                                      ></span>
                                    </label>
                                  )
                                )
                              ) : (
                                <div className="type-section">
                                  <div className="type-section-header">
                                    <p className="ll">{item?.title}</p>
                                    <p className="bm">
                                      {
                                        selectedOptions?.find(
                                          (c: { attributeId: string }) =>
                                            Number(item.attributeId) ===
                                            Number(c.attributeId)
                                        )?.value
                                      }
                                    </p>
                                  </div>
                                  <div className="label-btns-parents">
                                    {item?.options.map((items: any) => (
                                      <button
                                        onClick={(e) => {
                                          toggleLabel(
                                            items,
                                            item.options,
                                            item.attributeId
                                          );
                                          // setConfigurableData(
                                          //   items,
                                          //   item.attributeId
                                          // );
                                        }}
                                        className={`border-btn ${
                                          isCheckedWaferType(
                                            item.attributeId,
                                            items.optionId,
                                            items,
                                            item.options
                                          )
                                            ? "active"
                                            : ""
                                        }`} /* onClick={() => toggleLable(items.value)} */
                                      >
                                        {items.value}
                                      </button>
                                    ))}
                                    {/* <button className={`border-btn ${selectedType == 'chocolate' ? 'active' : ''}`} onClick={() => toggleLable('chocolate')}>Chocolate</button> */}
                                  </div>
                                </div>
                              )
                            )}
                            <span className="error">
                              {isValidate ? message : ""}
                            </span>
                          </div>
                        )}

                        {productVariantData?.is_instock === "1" ? (
                          <CustomeButton
                            bg="fill"
                            isLoading={isLoading(addToCartApiStatus)}
                            onClick={() => {
                              addToCart(
                                productDetail.isFrostingAvailable == 1
                                  ? true
                                  : false
                              );
                            }}
                            disabled={isAddToCartButtonDisabled}
                          >
                            {PRODUCT_DETAIL.ADD_TO_CART}
                          </CustomeButton>
                        ) : null}

                        <p className="bm mt-10">
                          {productDetail.isFrostingAvailable == 1
                            ? PRODUCT_DETAIL.NOTE_FROSTING
                            : null}
                        </p>
                        <div className="reviews-box">
                          {getStarRating(
                            productDetailData[COMPONENT_PRODUCT_DETAIL_DATA]
                              ?.productData?.rating
                          )}
                          <p className="bm">
                            {
                              productDetailData[COMPONENT_PRODUCT_DETAIL_DATA]
                                ?.productData?.review
                            }{" "}
                            {PRODUCT_DETAIL.REVIEWS}
                          </p>
                        </div>
                        <div className="like-share-btn">
                          <div className="surface-bg">
                            {isLogin &&
                            productDetailData[COMPONENT_PRODUCT_DETAIL_DATA]
                              ?.productData ? (
                              <HeartLabel
                                defaultChecked={Number(
                                  productDetailData[
                                    COMPONENT_PRODUCT_DETAIL_DATA
                                  ]?.productData?.isWishlisted
                                )}
                                // checked={Number(productDetailData[
                                //   COMPONENT_PRODUCT_DETAIL_DATA
                                // ]?.productData?.isWishlisted)}
                                onChange={(e: any) =>
                                  onWishListToggle(
                                    productKey,
                                    e.target.checked ? 1 : 0,
                                    ""
                                  )
                                }
                              ></HeartLabel>
                            ) : (
                              <label
                                className="heart"
                                onClick={() => onWishListToggle("", 0, "")}
                              >
                                <span className="heart-checkmark"></span>
                              </label>
                            )}
                          </div>
                          {/* <div className="surface-bg">
                            <a className="share-icon"></a>
                          </div> */}
                          <Dropdown className="surface-bg-dropdown">
                            <Dropdown.Toggle>
                              <div className="share-icon"></div>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item href="#/action-1">
                                <PinterestShareButton
                                  url={window.location.href}
                                  media={
                                    productDetailData[
                                      COMPONENT_PRODUCT_DETAIL_PRODUCT_IMAGE
                                    ]?.productImage[0].link
                                  }
                                >
                                  <img src={Pin} alt="" />
                                </PinterestShareButton>
                              </Dropdown.Item>

                              <Dropdown.Item href="#/action-2">
                                <FacebookShareButton url={window.location.href}>
                                  <img src={Fb} alt="" />
                                </FacebookShareButton>
                              </Dropdown.Item>
                              <Dropdown.Item href="#/action-3">
                                <TwitterShareButton
                                  url={window.location.href}
                                  title={productVariantData?.title}
                                >
                                  <img src={Tw} alt="" />
                                </TwitterShareButton>
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        {productDetailData[
                          COMPONENT_PRODUCT_DETAIL_BOUGHT_TO_GETHER
                        ]?.frequentlyBoughtTogether?.length > 0 ? (
                          <div className="frequently-bought">
                            <p className="tl">Frequently Bought Together</p>
                            {productDetailData[
                              COMPONENT_PRODUCT_DETAIL_BOUGHT_TO_GETHER
                            ]?.frequentlyBoughtTogether ? (
                              <BoughtTogether
                                boughtTogether={
                                  productDetailData[
                                    COMPONENT_PRODUCT_DETAIL_BOUGHT_TO_GETHER
                                  ]?.frequentlyBoughtTogether
                                }
                                onChange={(e: any, action: any, items: any) => {
                                  getCurrentQty(e, action, items);
                                }}
                                addToCartApiStatus={addToCartApiStatus}
                                disableButton={disableButton}
                                cartListData={cartListData}
                              ></BoughtTogether>
                            ) : null}
                          </div>
                        ) : null}
                        {/* mobile view start 1 */}
                        <div className="slider-content-mobile">
                          <p className="bm">{PRODUCT_DETAIL.NOTE_GIFT_WRAP}</p>
                        </div>
                        {/* mobile view end 1 */}
                      </div>
                    </Col>
                  </Row>
                )}

                {productDetailData[COMPONENT_PRODUCT_DETAIL_DESCRIPTION]
                  ?.productDescription?.overview ? (
                  <ProductOverview
                    overview={
                      productDetailData[COMPONENT_PRODUCT_DETAIL_DESCRIPTION]
                        ?.productDescription
                    }
                  ></ProductOverview>
                ) : null}

                {productDetailData[COMPONENT_PRODUCT_DETAIL_ACCORDION_DATA]
                  ?.accordionData ? (
                  <ProductDetailPanel
                    panelData={
                      productDetailData[COMPONENT_PRODUCT_DETAIL_ACCORDION_DATA]
                        ?.accordionData
                    }
                  ></ProductDetailPanel>
                ) : null}

                <ProductReview
                  setReviewModalShow={(bool: any) => setReviewModalShow(bool)}
                  reviewPagesize={reviewPagesize}
                  reviewPage={reviewPage}
                  reviewApiStatus={reviewApiStatus}
                  setReviewPage={(number: any) => setReviewPage(number)}
                  fetchMoreData={() => fetchMoreReviewData()}
                  productData={
                    productDetailData[COMPONENT_PRODUCT_DETAIL_DATA]
                      ?.productData
                  }
                  reviewData={
                    productReviewData[COMPONENT_PRODUCT_DETAIL_REVIEW]
                      ?.myReviewsData
                  }
                  totalReviewCount={
                    productReviewData[COMPONENT_PRODUCT_DETAIL_REVIEW]
                      ?.reviewCount
                  }
                ></ProductReview>

                {productDetailData[COMPONENT_PRODUCT_DETAIL_ALSO_LIKE]
                  ?.youMayAlsoLike?.length >= 1 ? (
                  <YouMayLike
                    youMayAlsoLike={
                      productDetailData[COMPONENT_PRODUCT_DETAIL_ALSO_LIKE]
                        ?.youMayAlsoLike
                    }
                    navigate={(string: any) => navigate(string)}
                  ></YouMayLike>
                ) : null}
              </Col>
            </Row>
          </Container>

          <FrostingPopup
            show={frostingModalShow}
            onHide={() => setFrostingModalShow(false)}
            onYes={() => onYes()}
            onNo={() => onNo()}
          />
          <LoginAlertPopup
            show={loginAlertModalShow}
            onHide={() => setLoginAlertModalShow(false)}
            onLoginYes={() => onLoginYes()}
            onNo={() => onNo()}
            message={loginAlertMessage}
          />
          <WriteReviewPopup
            productData={
              productDetailData[COMPONENT_PRODUCT_DETAIL_DATA]?.productData
            }
            productKey={productKey}
            show={reviewModalShow}
            onHide={() => setReviewModalShow(false)}
          />
          <ZoomPopup
            show={zoomModalShow}
            productImage={productImageData}
            onHide={() => setZoomModalShow(false)}
          ></ZoomPopup>
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

export default ProductDetails;
