import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import BrowseBy from "../Common/BrowseBy/BrowseBy";
import CustomeButton from "../Common/CustomeButton/CustomeButton";
import ID1 from "../../Assets/img/ID1.png";
import ID2 from "../../Assets/img/ID2.png";
import ID3 from "../../Assets/img/ID3.png";
import Pin from "../../Assets/img/pin.svg";
import FB from "../../Assets/img/fb-round.svg";
import TW from "../../Assets/img/twitter.svg";
import Share from "../../Assets/img/share.svg";
import InputGroups from "../Common/InputGroups/InputGroups";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { INSPIRATIONDETAILS } from "../../Constant/Route";
import { useDispatch, useSelector } from "react-redux";
import { API_STATUS } from "../../Constant/Api";
import { INSPIRATION_DETAIL_FAILD, INSPIRATION_DETAIL_LONG, INSPIRATION_DETAIL_NO_DATA, INSPIRATION_DETAIL_REQUEST, INSPIRATION_DETAIL_SUCCESS } from "../../Redux/InspirationDetail/InspirationDetailTypes";
import { SUCCESS_RESPONSE_CODE } from "../../Constant/Status";
import { getInspirationPostDetails } from "../../Redux/InspirationDetail/InspirationDetailAction";
import { generateQuery, isLoading } from "../../Utility/General";
import SomethingWrong from "../SomethingWrong/SomethingWrong";
import Loader from "../Loader/Loader";
import { COMPONENT_INSPIRATION_DETAIL_DATA, COMPONENT_INSPIRATION_RECENT_POST, COMPONENT_INSPIRATION_SOCIAL_MEDIA } from "../../Constant/Component";
import { RECIPE_DETAIL } from "../../Language/Recipe";
import validate from "../../Utility/Validation";
import { newsletterSubscriptionAction } from "../../Redux/General/GeneralAction";
import { NEWSLETTER_SUBSCRIPTION_FAILD, NEWSLETTER_SUBSCRIPTION_LONG, NEWSLETTER_SUBSCRIPTION_REQUEST, NEWSLETTER_SUBSCRIPTION_SUCCESS } from "../../Redux/General/GeneralType";
import { EMAIL } from "../../Language/Validation";
import { FacebookShareButton, PinterestShareButton, PinterestShareCount, TwitterShareButton } from "react-share";
import COMMON from "../../Language/Common";
import { INSPIRATION_DETAIL, INSPIRATION_LISTING } from "../../Language/Inspiration";

const InspirationDetails = () => {

  const dispatch = useDispatch();

  // START:: GET INSPIRATION DETAIL
  const [inspirationDetailData, setInspirationDetailData] = useState<any>({});
  const [inspirationDetailApiStatus, setInspirationDetailApiStatus] = useState<any>({});
  const inspirationDetail = useSelector((state: any) => state?.getInspirationPostDetails?.data);
  const urlParams = useParams();
  let urlKey = urlParams.urlKey;
  const [queryParam, setQueryParam] = useState({
    urlKey: urlParams.urlKey,
  })

  useEffect(() => {
    let queryParamLocal = Object.assign({}, queryParam);
    queryParamLocal.urlKey = urlKey;
    if (queryParam.urlKey != urlKey) {
      setQueryParam({
        ...queryParamLocal
      })
    }
  }, [urlKey])

  useEffect(() => {
    if (queryParam) {
      dispatch(getInspirationPostDetails(generateQuery(queryParam)));
    }
  }, [queryParam])

  useEffect(() => {
    let componentData: any = {};
    inspirationDetail?.component?.forEach((component: any) => {
      componentData[component?.componentId] = component;
    });
    setInspirationDetailData({ ...componentData })


    let ckContents = document.getElementById("ck-content-wrapper");
    let inspirationDetails = document.getElementById("inspiration-details");

    ckContents?.addEventListener("mouseover", handleMouseHover);
    inspirationDetails?.addEventListener("mouseout", handleMouseOut);

    let pinIconClick = document.getElementById("pin-icon-hover");
    pinIconClick?.addEventListener("click", handleClickPinOfPinIt)

    // let pinImgs = document.getElementById("pin-icon-hover");
    // pinImgs?.addEventListener("mouseover", stablePin);

    /* let cls = document.getElementsByClassName("linkPinIt");
    for (let i = 0; i < cls.length; i++) {
      cls[i].addEventListener("click", handleClickOfPinIt);
    } */

  }, [inspirationDetail])

  // END:: GET INSPIRATION DETAIL

  const [pinTop, setPinTop] = useState("-100px");
  const [pinLeft, setPinLeft] = useState("-100px");

  const handleMouseHover = (event: any) => {
    console.log(event);
    if (event.srcElement.localName == 'img' || event.srcElement.className == 'pin-icon-hover') {
      if (event.srcElement.className != 'pin-icon-hover') {
        setPinTop((event.srcElement.offsetTop + 16) + "px");
        setPinLeft((event.srcElement.offsetLeft + 16) + "px");

        let url = window.location.href;
        let media = event.target.src;
        let desc = "TEST DESC";

        let pinHref = "https://pinterest.com/pin/create/button/" +
          "?url=" + url +
          "&media=" + media +
          "&description=" + desc;

        let pinIconImgTag: any = document.getElementById("pin-icon-hover")
        pinIconImgTag.dataset.pinHref = pinHref
      }
    }
    else {
      if (event.srcElement.className != 'pin-icon-hover') {
        setPinTop("-100px");
        setPinLeft("-100px");
      }
    }
  }

  const handleMouseOut = (event: any) => {
    if (event.srcElement.localName != 'img' && event.srcElement.className != 'pin-icon-hover') {
      setPinTop("-100px");
      setPinLeft("-100px");
    }
  }

  const handleClickPinOfPinIt = (event: any) => {
    window.open(event.target.dataset.pinHref, "_blank", "left=150,width=1000,height=730");
  }

  /* const handleClickOfPinIt = (event: any) => {
    if (event.srcElement.localName == 'img') {
      console.log("testset");
      let url = window.location.href;
      let media = event.target.src;
      let desc = "TEST DESC";
      window.open("//www.pinterest.com/pin/create/button/" +
        "?url=" + url +
        "&media=" + media +
        "&description=" + desc, "_blank", "top=0,right=0,width=750,height=320");
    } */

  /* let url = window.location.href;
  let media = event.target.src;
  let desc = "TEST DESC";
  window.open("//www.pinterest.com/pin/create/button/" +
    "?url=" + url +
    "&media=" + media +
    "&description=" + desc, "_blank", "top=0,right=0,width=750,height=320"); */
  // }

  // START:: NEWSLETTER SUBSCRIPTION
  const INITIAL_NEWSLETTER_DATA: any = {
    email: { value: null, validation: ["email", "required"], errors: [EMAIL.Valid, EMAIL.Required] },
  };
  const [newsletterData, setNewsletterData] = useState(INITIAL_NEWSLETTER_DATA)
  const [newsletterDataError, setNewsletterDataError] = useState<any>({})
  const [newsletterApiStatus, setNewsletterApiStatus] = useState(API_STATUS.SUCCESS)
  const [isFormValidated, setIsFormValidated] = useState(false)
  const [isNewsletterFormButtonDisabled, setIsNewsletterFormButtonDisabled] = useState(false)

  const setData = (field: string, value: string) => {
    let loginDetails = Object.assign({}, newsletterData);
    loginDetails[field].value = value;
    setNewsletterData({ ...loginDetails });
  };

  useEffect(() => {
    setNewsletterDataError({ ...validate(newsletterData)?.errors })
  }, [newsletterData])

  const onNewsletter = () => {
    if (validate(newsletterData).isValidated === true) {
      setIsNewsletterFormButtonDisabled(true)
      dispatch(
        newsletterSubscriptionAction({ email: newsletterData.email.value })
      );
      setIsFormValidated(false);
      //setData("email", "");
    } else {
      setNewsletterDataError({ ...validate(newsletterData)?.errors });
      setIsFormValidated(true);
    }
  };
  // END:: NEWSLETTER SUBSCRIPTION

  // START:: USE SELECTOR FOR GETTING DATA FROM REDUX STATE AND SETTING TO STATE VARIABLES FOR DISPLAYING IN UI ELEMENTS
  useSelector((state: any) => {

    // START:: STATE FOR GETTING INSPIRATION DETAIL DATA 
    if (state?.getInspirationPostDetails?.type === INSPIRATION_DETAIL_REQUEST) {
      if (inspirationDetailApiStatus !== API_STATUS.LOADING) {
        setInspirationDetailApiStatus(API_STATUS.LOADING);
      }
    } else if (
      state?.getInspirationPostDetails?.data?.statusCode === SUCCESS_RESPONSE_CODE &&
      state?.getInspirationPostDetails?.type === INSPIRATION_DETAIL_SUCCESS
    ) {
      if (inspirationDetailApiStatus !== API_STATUS.SUCCESS) {
        setInspirationDetailApiStatus(API_STATUS.SUCCESS);
      }
    } else if (state?.getInspirationPostDetails?.type === INSPIRATION_DETAIL_LONG) {
      if (inspirationDetailApiStatus !== API_STATUS.LONG) {
        setInspirationDetailApiStatus(API_STATUS.LONG);
      }
    } else if (state?.getInspirationPostDetails?.type === INSPIRATION_DETAIL_NO_DATA) {
      if (inspirationDetailApiStatus !== API_STATUS.NO_DATA) {
        setInspirationDetailApiStatus(API_STATUS.NO_DATA);
      }
    } else if (state?.getInspirationPostDetails?.type === INSPIRATION_DETAIL_FAILD) {
      if (inspirationDetailApiStatus !== API_STATUS.FAILED) {
        setInspirationDetailApiStatus(API_STATUS.FAILED);
      }
    }
    // END:: STATE FOR GETTING INSPIRATION DETAIL DATA

    // START:: STATE FOR GETTING NEWSLETTER DATA
    if (
      state?.newsletterSubscription?.type === NEWSLETTER_SUBSCRIPTION_REQUEST
    ) {
      if (newsletterApiStatus !== API_STATUS.LOADING) {
        setNewsletterApiStatus(API_STATUS.LOADING);
      }
    } else if (
      state?.newsletterSubscription?.data?.statusCode ===
      SUCCESS_RESPONSE_CODE &&
      state?.newsletterSubscription?.type === NEWSLETTER_SUBSCRIPTION_SUCCESS
    ) {
      if (newsletterApiStatus !== API_STATUS.SUCCESS) {
        setNewsletterApiStatus(API_STATUS.SUCCESS);
        setData("email", "");
        setIsNewsletterFormButtonDisabled(false);
      }
    } else if (
      state?.newsletterSubscription?.type === NEWSLETTER_SUBSCRIPTION_LONG
    ) {
      if (newsletterApiStatus !== API_STATUS.LONG) {
        setNewsletterApiStatus(API_STATUS.LONG);
      }
    } else if (
      state?.newsletterSubscription?.type === NEWSLETTER_SUBSCRIPTION_FAILD
    ) {
      if (newsletterApiStatus !== API_STATUS.FAILED) {
        setNewsletterApiStatus(API_STATUS.FAILED);
        setIsNewsletterFormButtonDisabled(false);
      }
    }
    // END:: STATE FOR GETTING NEWSLETTER DATA
  });

  switch (inspirationDetailApiStatus) {
    case API_STATUS.LOADING:
      return <Loader></Loader>;
    case API_STATUS.SUCCESS:
      return (
        <div className="inspiration-details" id="inspiration-details">
          <Container>
            <Row>
              <Col lg={12} xl={{ span: 10, offset: 1 }}>
                <div className="ID-wrapper">
                  {/* <h2>{INSPIRATION_LISTING.INSPIRATION}</h2> */}
                  <div className="ID-content-wrapper">
                    <div className="ID-main-content">
                      <h2>{inspirationDetailData[COMPONENT_INSPIRATION_DETAIL_DATA]?.inspirationPostComponent?.title}</h2>
                      <div className="name-and-pin">
                        <p className="bm">{inspirationDetailData[COMPONENT_INSPIRATION_DETAIL_DATA]?.inspirationPostComponent?.authoreName}</p>
                        <CustomeButton bg="fill">
                          <PinterestShareButton url={window.location.href} media={inspirationDetailData[COMPONENT_INSPIRATION_DETAIL_DATA]?.inspirationPostComponent?.postImage}>
                            {COMMON.PIN_THE_POST}
                          </PinterestShareButton>
                        </CustomeButton>
                      </div>

                      <div className="ck-content" id="ck-content-wrapper">
                        <span>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: inspirationDetailData[COMPONENT_INSPIRATION_DETAIL_DATA]?.inspirationPostComponent.shortDescription,
                            }}
                          ></div>
                        </span>
                        <img style={{ cursor: "pointer" }} className="linkPinIt" src={inspirationDetailData[COMPONENT_INSPIRATION_DETAIL_DATA]?.inspirationPostComponent?.postImage} alt="" />

                        <div>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: inspirationDetailData[COMPONENT_INSPIRATION_DETAIL_DATA]?.inspirationPostComponent.fullDescription,
                            }}
                            id="ck-ad-content" ></div>

                          <img src={Pin} className="pin-icon-hover" id="pin-icon-hover" style={{ left: pinLeft, top: pinTop }} alt="" />

                        </div>
                      </div>
                      <div className="join-community">
                        <div className="JC-content">
                          <h4>{RECIPE_DETAIL.NEWSLETTER_JOIN}</h4>
                          <p className="bl">{RECIPE_DETAIL.NEWSLETTER_SIGNUP}</p>
                        </div>
                        <div className="JC-field">
                          <InputGroups
                            placeholder="Email Address"
                            onChange={(e: any) =>
                              setData("email", e.target.value)
                            }
                            value={newsletterData.email.value}
                            error={
                              isFormValidated && newsletterDataError["email"]
                                ? newsletterDataError["email"]
                                : null
                            }
                          />
                          <CustomeButton
                            bg="fill"
                            isLoading={isLoading(newsletterApiStatus)}
                            onClick={() => onNewsletter()}
                            disabled={isNewsletterFormButtonDisabled}
                          >
                            {RECIPE_DETAIL.NEWSLETTER_SIGNUP_BTN}
                          </CustomeButton>
                        </div>
                      </div>

                      <div className="social-box-wrapper">
                        <div className="social-boxes">
                          <CustomeButton>
                            <PinterestShareButton url={window.location.href} media={inspirationDetailData[COMPONENT_INSPIRATION_DETAIL_DATA]?.inspirationPostComponent?.postImage}>
                              <img src={Pin} alt="" />
                              <p className="ts">
                                {
                                  <PinterestShareCount
                                    url={inspirationDetailData[COMPONENT_INSPIRATION_DETAIL_DATA]?.inspirationPostComponent?.postImage}
                                  />
                                  /* inspirationDetailData[COMPONENT_INSPIRATION_SOCIAL_MEDIA]
                                    ?.socialMedia.pinterest */
                                }
                              </p>
                            </PinterestShareButton>
                          </CustomeButton>

                          {/* <CustomeButton>
                            <img src={Pin} alt="" />
                            <p className="ts">78</p>
                          </CustomeButton> */}

                          <CustomeButton>
                            <FacebookShareButton
                              //url={RECIPEDETAILS + '/' + recipeDetailData[COMPONENT_RECIPE_DETAIL_DATA]?.recipeDataComponent.urlKey}
                              url={window.location.href}
                            >
                              <img src={FB} alt="" />
                              {/* <p className="ts">
                                {
                                  inspirationDetailData[COMPONENT_INSPIRATION_SOCIAL_MEDIA]
                                    ?.socialMedia.facebook
                                }
                              </p> */}
                            </FacebookShareButton>
                          </CustomeButton>

                          {/* <CustomeButton>
                            <img src={FB} alt="" />
                            <p className="ts">815</p>
                          </CustomeButton> */}

                          <CustomeButton>
                            <TwitterShareButton url={window.location.href} title={inspirationDetailData[COMPONENT_INSPIRATION_DETAIL_DATA]?.inspirationPostComponent.title}>
                              <img src={TW} alt="" />
                              {/* <p className="ts">
                                {
                                  inspirationDetailData[COMPONENT_INSPIRATION_SOCIAL_MEDIA]
                                    ?.socialMedia.twitter
                                }
                              </p> */}
                            </TwitterShareButton>
                          </CustomeButton>


                          {/*  <CustomeButton>
                            <img src={TW} alt="" />
                          </CustomeButton> */}
                        </div>
                        <div className="share-block d-none">
                          <a className="share-data">
                            <img src={Share} alt="" />
                            <div className="share-content">
                              <p className="bm">{
                                inspirationDetailData[
                                  COMPONENT_INSPIRATION_SOCIAL_MEDIA
                                ]?.socialMedia.totalShare
                              }</p>
                              <span className="ls">{COMMON.SHARES}</span>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="recent-post">
                      <p className="tl">{INSPIRATION_DETAIL.RECENT_POST}</p>
                      <ul>
                        {inspirationDetailData[
                          COMPONENT_INSPIRATION_RECENT_POST
                        ]?.recentData?.list?.map((items: any, index: number) => (
                          <li key={index}>
                            <Link to={INSPIRATIONDETAILS + "/" + items.recentUrlkey} className="recent-post-link">{items.recentName}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>


        </div>
      );
    case API_STATUS.LONG:
      return <SomethingWrong></SomethingWrong>;
    case API_STATUS.FAILED:
      return <SomethingWrong></SomethingWrong>;
    default:
      return <Loader></Loader>;
  }
};

export default InspirationDetails;
