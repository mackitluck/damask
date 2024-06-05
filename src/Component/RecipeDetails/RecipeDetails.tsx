import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import BlankCupcake from "../../Assets/img/blank-cupcake.svg";
import Cupcake from "../../Assets/img/cupcake.svg";
import InputGroups from "../Common/InputGroups/InputGroups";
import TextareaGroups from "../Common/TextareaGroups/TextareaGroups";
import CustomeButton from "../Common/CustomeButton/CustomeButton";
import Pin from "../../Assets/img/pin.svg";
import FB from "../../Assets/img/fb-round.svg";
import TW from "../../Assets/img/twitter.svg";
import Share from "../../Assets/img/share.svg";
import Rating from "react-rating";
import { Link, useParams } from "react-router-dom";
import { RECIPEDETAILS } from "../../Constant/Route";
import { useDispatch, useSelector } from "react-redux";
import { generateQuery, getStarRating, isLoading } from "../../Utility/General";
import { getRecipesPostDetails, saveRecipesComment, saveRecipesReplyComment } from "../../Redux/RecipeDetail/RecipeDetailAction";
import { API_STATUS } from "../../Constant/Api";
import {
  RECIPE_DETAIL_FAILD,
  RECIPE_DETAIL_LONG,
  RECIPE_DETAIL_NO_DATA,
  RECIPE_DETAIL_REQUEST,
  RECIPE_DETAIL_SUBMIT_REVIEW_CLEAR,
  RECIPE_DETAIL_SUBMIT_REVIEW_FAILD,
  RECIPE_DETAIL_SUBMIT_REVIEW_LONG,
  RECIPE_DETAIL_SUBMIT_REVIEW_REPLY_CLEAR,
  RECIPE_DETAIL_SUBMIT_REVIEW_REPLY_FAILD,
  RECIPE_DETAIL_SUBMIT_REVIEW_REPLY_LONG,
  RECIPE_DETAIL_SUBMIT_REVIEW_REPLY_REQUEST,
  RECIPE_DETAIL_SUBMIT_REVIEW_REPLY_SUCCESS,
  RECIPE_DETAIL_SUBMIT_REVIEW_REQUEST,
  RECIPE_DETAIL_SUBMIT_REVIEW_SUCCESS,
  RECIPE_DETAIL_SUCCESS,
} from "../../Redux/RecipeDetail/RecipeDetailTypes";
import { SUCCESS_RESPONSE_CODE } from "../../Constant/Status";
import Loader from "../Loader/Loader";
import SomethingWrong from "../SomethingWrong/SomethingWrong";
import {
  COMPONENT_RECIPE_COMMENT_DATA,
  COMPONENT_RECIPE_DETAIL_DATA,
  COMPONENT_RECIPE_RECENT_POST,
  COMPONENT_RECIPE_SOCIAL_MEDIA,
} from "../../Constant/Component";
import {
  NEWSLETTER_SUBSCRIPTION_FAILD,
  NEWSLETTER_SUBSCRIPTION_LONG,
  NEWSLETTER_SUBSCRIPTION_REQUEST,
  NEWSLETTER_SUBSCRIPTION_SUCCESS,
} from "../../Redux/General/GeneralType";
import validate from "../../Utility/Validation";
import { newsletterSubscriptionAction } from "../../Redux/General/GeneralAction";
import { COMMENT, DESCRIPTION, EMAIL, NAME, RATING } from "../../Language/Validation";
import { RECIPE_DETAIL } from "../../Language/Recipe";
import { FacebookShareButton, PinterestShareButton, TwitterShareButton } from "react-share";
import COMMON from "../../Language/Common";


const RecipeDetails = () => {
  let fullName = useSelector((state: any) => state?.login?.data ? state?.login?.data?.firstName + ' ' + state?.login?.data?.lastName : '');
  //let isLoggedInFirstName = useSelector((state: any) => state?.login?.data?.firstName);
  //let isLoggedInLastName = useSelector((state: any) => state?.login?.data?.lastName);
  let isLoggedInEmail = useSelector((state: any) => state?.login?.data?.email ? state?.login?.data?.email : '');
  const dispatch = useDispatch();

  // START:: GET RECIPE DETAIL
  const [recipeDetailData, setRecipeDetailData] = useState<any>({});
  const [receipeDetailApiStatus, setReceipeDetailApiStatus] = useState<any>({});
  const recipeDetail = useSelector((state: any) => state?.getRecipesPostDetails?.data);
  const urlParams = useParams();
  let urlKey = urlParams.urlKey;
  const [queryParam, setQueryParam] = useState({
    urlKey: urlParams.urlKey,
  });
  useEffect(() => {
    let queryParamLocal = Object.assign({}, queryParam);
    queryParamLocal.urlKey = urlKey;
    if (queryParam.urlKey != urlKey) setQueryParam({ ...queryParamLocal });
    // dispatch(productDetailAction(generateQuery(queryParam)));
  }, [urlKey]);

  useEffect(() => {
    if (queryParam) {
      dispatch(getRecipesPostDetails(generateQuery(queryParam)));
    }
  }, [queryParam]);

  useEffect(() => {
    let componentData: any = {};
    recipeDetail?.component?.forEach((component: any) => {
      componentData[component?.componentId] = component;
    });
    setRecipeDetailData({ ...componentData });
  }, [recipeDetail]);
  // END:: GET RECIPE DETAIL


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
      setIsNewsletterFormButtonDisabled(true);
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

  // START:: SUBMIT RECIPE REVIEW
  const INITIAL_REVIEW_DATA: any = {
    name: { value: fullName, validation: ["required"], errors: [NAME.Required] },
    email: { value: isLoggedInEmail, validation: ["email", "required"], errors: [EMAIL.Valid, EMAIL.Required] },
    message: { value: "", validation: ["required"], errors: [COMMENT.Required] },
    ratings: { value: "", validation: ["required"], errors: [RATING.Required] },
    replayId: { value: "" },
  }
  const [reviewData, setReviewData] = useState({ ...INITIAL_REVIEW_DATA });
  const [reviewDataError, setReviewDataError] = useState<any>({})
  const [isReviewFormValidated, setIsReviewFormValidated] = useState(false)
  const [reviewApiStatus, setReviewApiStatus] = useState(API_STATUS.SUCCESS)
  const [isReviewFormButtonDisabled, setIsReviewFormButtonDisabled] = useState(false)

  const setDataForReview = (field: string, value: string) => {
    let reviewDetails = Object.assign({}, reviewData)
    reviewDetails[field].value = value
    setReviewData({ ...reviewDetails })
  }

  useEffect(() => {
    setReviewDataError({ ...validate(reviewData)?.errors })
  }, [reviewData])

  const onSubmit = () => {
    if (validate(reviewData).isValidated === true) {
      setIsReviewFormButtonDisabled(true);
      dispatch(saveRecipesComment({ name: reviewData.name.value, email: reviewData.email.value, message: reviewData.message.value, ratings: reviewData.ratings.value, replayId: reviewData.replayId.value, postId: recipeDetailData[COMPONENT_RECIPE_DETAIL_DATA]?.recipeDataComponent.id }))
    }
    else {
      setReviewDataError({ ...validate(reviewData)?.errors })
      setIsReviewFormValidated(true)
    }
  }
  // END:: SUBMIT RECIPE REVIEW

  // START:: REPLAY RECIPE REVIEW
  const INITIAL_REVIEW_DATA_FOR_REPLY: any = {
    name: { value: fullName, validation: ["required"], errors: [NAME.Required] },
    email: { value: isLoggedInEmail, validation: ["email", "required"], errors: [EMAIL.Valid, EMAIL.Required] },
    message: { value: "", validation: ["required"], errors: [COMMENT.Required] },
    ratings: { value: "", validation: ["required"], errors: [RATING.Required] },
    replayId: { value: "" },
  }
  const [reviewReplyData, setReviewReplyData] = useState({ ...INITIAL_REVIEW_DATA_FOR_REPLY });
  const [reviewReplyDataError, setReviewReplyDataError] = useState<any>({})
  const [isReviewReplyFormValidated, setIsReviewReplyFormValidated] = useState(false)
  const [reviewReplyApiStatus, setReviewReplyApiStatus] = useState(API_STATUS.SUCCESS)
  const [isReviewReplyFormButtonDisabled, setIsReviewReplyFormButtonDisabled] = useState(false)

  const setDataForReviewReply = (field: string, value: string) => {
    let reviewDetails = Object.assign({}, reviewReplyData)
    reviewDetails[field].value = value
    setReviewReplyData({ ...reviewDetails })
  }

  useEffect(() => {
    setReviewReplyDataError({ ...validate(reviewReplyData)?.errors })
  }, [reviewReplyData])

  const onSubmitReviewReply = () => {
    if (validate(reviewReplyData).isValidated === true) {
      setIsReviewReplyFormButtonDisabled(true);
      dispatch(saveRecipesReplyComment({ name: reviewReplyData.name.value, email: reviewReplyData.email.value, message: reviewReplyData.message.value, ratings: reviewReplyData.ratings.value, replayId: reviewReplyData.replayId.value, postId: recipeDetailData[COMPONENT_RECIPE_DETAIL_DATA]?.recipeDataComponent.id }))
    }
    else {
      setReviewReplyDataError({ ...validate(reviewReplyData)?.errors })
      setIsReviewReplyFormValidated(true)
    }
  }
  // END:: REPLAY RECIPE REVIEW

  // START:: USE SELECTOR FOR GETTING DATA FROM REDUX STATE AND SETTING TO STATE VARIABLES FOR DISPLAYING IN UI ELEMENTS
  useSelector((state: any) => {

    // START:: STATE FOR GETTING RECIPE DETAIL DATA 
    if (state?.getRecipesPostDetails?.type === RECIPE_DETAIL_REQUEST) {
      if (receipeDetailApiStatus !== API_STATUS.LOADING) {
        setReceipeDetailApiStatus(API_STATUS.LOADING);
      }
    } else if (
      state?.getRecipesPostDetails?.data?.statusCode ===
      SUCCESS_RESPONSE_CODE &&
      state?.getRecipesPostDetails?.type === RECIPE_DETAIL_SUCCESS
    ) {
      if (receipeDetailApiStatus !== API_STATUS.SUCCESS) {
        setReceipeDetailApiStatus(API_STATUS.SUCCESS);
      }
    } else if (state?.getRecipesPostDetails?.type === RECIPE_DETAIL_LONG) {
      if (receipeDetailApiStatus !== API_STATUS.LONG) {
        setReceipeDetailApiStatus(API_STATUS.LONG);
      }
    } else if (state?.getRecipesPostDetails?.type === RECIPE_DETAIL_NO_DATA) {
      if (receipeDetailApiStatus !== API_STATUS.NO_DATA) {
        setReceipeDetailApiStatus(API_STATUS.NO_DATA);
      }
    } else if (state?.getRecipesPostDetails?.type === RECIPE_DETAIL_FAILD) {
      if (receipeDetailApiStatus !== API_STATUS.FAILED) {
        setReceipeDetailApiStatus(API_STATUS.FAILED);
      }
    }
    // END:: STATE FOR GETTING RECIPE DETAIL DATA

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

    // START:: STATE FOR SUBMIT RECIPE REVIEW
    if (
      state?.saveRecipesComment?.type === RECIPE_DETAIL_SUBMIT_REVIEW_REQUEST
    ) {
      if (reviewApiStatus !== API_STATUS.LOADING) {
        setReviewApiStatus(API_STATUS.LOADING);
      }
    } else if (
      state?.saveRecipesComment?.data?.statusCode ===
      SUCCESS_RESPONSE_CODE &&
      state?.saveRecipesComment?.type === RECIPE_DETAIL_SUBMIT_REVIEW_SUCCESS
    ) {
      if (reviewApiStatus !== API_STATUS.SUCCESS) {
        setReviewApiStatus(API_STATUS.SUCCESS);
        dispatch({
          type: RECIPE_DETAIL_SUBMIT_REVIEW_CLEAR,
          payload: { type: RECIPE_DETAIL_SUBMIT_REVIEW_CLEAR },
        });
        setIsReviewFormButtonDisabled(false);
        setIsReviewFormValidated(false);
        setReviewData({ ...INITIAL_REVIEW_DATA });
      }
    } else if (
      state?.saveRecipesComment?.type === RECIPE_DETAIL_SUBMIT_REVIEW_LONG
    ) {
      if (reviewApiStatus !== API_STATUS.LONG) {
        setReviewApiStatus(API_STATUS.LONG);
      }
    } else if (
      state?.saveRecipesComment?.type === RECIPE_DETAIL_SUBMIT_REVIEW_FAILD
    ) {
      if (reviewApiStatus !== API_STATUS.FAILED) {
        setReviewApiStatus(API_STATUS.FAILED);
      }
    }
    // END:: STATE FOR SUBMIT RECIPE REVIEW

    // START:: STATE FOR SUBMIT RECIPE REVIEW REPLY
    if (
      state?.saveRecipesReplyComment?.type === RECIPE_DETAIL_SUBMIT_REVIEW_REPLY_REQUEST
    ) {
      if (reviewReplyApiStatus !== API_STATUS.LOADING) {
        setReviewReplyApiStatus(API_STATUS.LOADING);
      }
    } else if (
      state?.saveRecipesReplyComment?.data?.statusCode ===
      SUCCESS_RESPONSE_CODE &&
      state?.saveRecipesReplyComment?.type === RECIPE_DETAIL_SUBMIT_REVIEW_REPLY_SUCCESS
    ) {
      if (reviewReplyApiStatus !== API_STATUS.SUCCESS) {
        setReviewReplyApiStatus(API_STATUS.SUCCESS);
        dispatch({
          type: RECIPE_DETAIL_SUBMIT_REVIEW_REPLY_CLEAR,
          payload: { type: RECIPE_DETAIL_SUBMIT_REVIEW_REPLY_CLEAR },
        });
        setIsReviewReplyFormButtonDisabled(false);
        setIsReviewReplyFormValidated(false);
        setReviewReplyData({ ...INITIAL_REVIEW_DATA_FOR_REPLY });
      }
    } else if (
      state?.saveRecipesReplyComment?.type === RECIPE_DETAIL_SUBMIT_REVIEW_REPLY_LONG
    ) {
      if (reviewReplyApiStatus !== API_STATUS.LONG) {
        setReviewReplyApiStatus(API_STATUS.LONG);
      }
    } else if (
      state?.saveRecipesReplyComment?.type === RECIPE_DETAIL_SUBMIT_REVIEW_REPLY_FAILD
    ) {
      if (reviewReplyApiStatus !== API_STATUS.FAILED) {
        setReviewReplyApiStatus(API_STATUS.FAILED);
      }
    }
  });
  // END:: STATE FOR SUBMIT RECIPE REVIEW REPLY END
  // END:: USE SELECTOR FOR GETTING DATA FROM REDUX STATE AND SETTING TO STATE VARIABLES FOR DISPLAYING IN UI ELEMENTS

  // START:: HANDLE CLICK EVENT FOR REPLY SUBMITTED REVIEW
  const [currentReplyBox, setCurrentReplyBox] = useState(null);
  const [showHideComment, setShowHideComment] = useState(false);

  const replyBox = (value: any, commentId: any) => {
    setDataForReviewReply('replayId', commentId)
    setCurrentReplyBox(value)
    setShowHideComment((showHideComment == true && currentReplyBox == value) ? false : true)
  }
  // END:: HANDLE CLICK EVENT FOR REPLY SUBMITTED REVIEW

  const questionEL: any = useRef(null);
  var badgeHeight: any = document.getElementsByClassName('badge-header')[0]?.clientHeight;
  var navbarHeight: any = document.getElementById('navbar')?.clientHeight;
  const scrollLayout = () => {
    window.scrollTo(0, (questionEL.current.offsetTop - (badgeHeight + navbarHeight - 1)))
  };

  switch (receipeDetailApiStatus) {
    case API_STATUS.LOADING:
      return <Loader></Loader>;
    case API_STATUS.SUCCESS:
      return (
        <div className="recipe-details">
          <Container>
            <Row>
              <Col lg={12} xl={{ span: 10, offset: 1 }}>
                <div className="RD-wrapper">
                  <h2>{recipeDetailData[COMPONENT_RECIPE_DETAIL_DATA]?.recipeDataComponent.postTitle}</h2>
                  <div className="RD-content-wrapper">
                    <div className="RD-main-content">
                      <div className="this-content-box">
                        <div className="this-head-sec">
                          <div className="this-video-wrapper">
                            <div className="iframe-container">
                              {recipeDetailData[COMPONENT_RECIPE_DETAIL_DATA]?.recipeDataComponent.youTubeLink && recipeDetailData[COMPONENT_RECIPE_DETAIL_DATA]?.recipeDataComponent.youTubeLink != "" ?
                                <iframe
                                  width="100%"
                                  height="100%"
                                  src={recipeDetailData[COMPONENT_RECIPE_DETAIL_DATA]?.recipeDataComponent.youTubeLink}
                                  title="YouTube video player"
                                  frameBorder="0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                ></iframe>
                                :
                                <img src={recipeDetailData[COMPONENT_RECIPE_DETAIL_DATA]?.recipeDataComponent.recipeImage} alt="" />
                              }
                            </div>
                          </div>
                          <div className="video-title-review">
                            <h5>
                              {recipeDetailData[COMPONENT_RECIPE_DETAIL_DATA]?.recipeDataComponent.title}
                            </h5>
                            <div className="reviews-box">
                              {getStarRating(recipeDetailData[COMPONENT_RECIPE_DETAIL_DATA]?.recipeDataComponent.avrageRating)}
                              <p className="bm">
                                {recipeDetailData[COMPONENT_RECIPE_DETAIL_DATA]?.recipeDataComponent.totalReview}
                              </p>
                            </div>
                          </div>
                        </div>
                        {recipeDetailData[COMPONENT_RECIPE_COMMENT_DATA]?.commentData?.list.length > 0 ?
                          <div className="btn-wrapper">
                            {/* <PinterestShareButton url="https://goo.gl/hQmcWP" description="Test" media="https://i.picsum.photos/id/8/200/300.jpg?hmac=t2Camsbqc4OfjWMxFDwB32A8N4eu7Ido7ZV1elq4o5M">Share</PinterestShareButton> */}
                            {/* <CustomeButton bg="fill">
                            PIN THE Recipe
                          </CustomeButton> */}
                            <CustomeButton bg="fill" onClick={() => scrollLayout()}>
                              Questions & Reviews
                            </CustomeButton>
                          </div> : ''}
                        <div className="ck-content">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: recipeDetailData[COMPONENT_RECIPE_DETAIL_DATA]?.recipeDataComponent.fullDescription,
                            }}
                          ></div>
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
                          {/* <CustomeButton>
                            <img src={Pin} alt="" />
                            <p className="ts">
                              {
                                recipeDetailData[COMPONENT_RECIPE_SOCIAL_MEDIA]
                                  ?.socialMedia.pinterest
                              }
                            </p>
                          </CustomeButton> */}

                          <CustomeButton>
                            <FacebookShareButton
                              //url={RECIPEDETAILS + '/' + recipeDetailData[COMPONENT_RECIPE_DETAIL_DATA]?.recipeDataComponent.urlKey}
                              url={window.location.href}
                            >
                              <img src={FB} alt="" />
                              {/*   <p className="ts">
                                {
                                  recipeDetailData[COMPONENT_RECIPE_SOCIAL_MEDIA]
                                    ?.socialMedia.facebook
                                }
                              </p> */}
                            </FacebookShareButton>
                          </CustomeButton>

                          {/* <CustomeButton>
                            <img src={FB} alt="" />
                            <p className="ts">
                              {
                                recipeDetailData[COMPONENT_RECIPE_SOCIAL_MEDIA]
                                  ?.socialMedia.facebook
                              }
                            </p>
                          </CustomeButton> */}


                          <CustomeButton>
                            <TwitterShareButton url={window.location.href} title={recipeDetailData[COMPONENT_RECIPE_DETAIL_DATA]?.recipeDataComponent.title}>
                              <img src={TW} alt="" />
                              {/* <p className="ts">
                                {
                                  recipeDetailData[COMPONENT_RECIPE_SOCIAL_MEDIA]
                                    ?.socialMedia.twitter
                                }
                              </p> */}
                            </TwitterShareButton>
                          </CustomeButton>

                          {/* <CustomeButton>
                            <img src={TW} alt="" />
                          </CustomeButton> */}
                        </div>
                        <div className="share-block d-none">
                          <a className="share-data">
                            <img src={Share} alt="" />
                            <div className="share-content">
                              <p className="bm">
                                {
                                  recipeDetailData[
                                    COMPONENT_RECIPE_SOCIAL_MEDIA
                                  ]?.socialMedia.totalShare
                                }
                              </p>
                              <span className="ls">{COMMON.SHARES}</span>
                            </div>
                          </a>
                        </div>
                      </div>
                      <div className="reader-que-ans" ref={questionEL}>
                        {recipeDetailData[COMPONENT_RECIPE_COMMENT_DATA]
                          ?.commentData?.list.length > 0 ? (
                          <h5>{RECIPE_DETAIL.QUE_AND_REVIEWS}</h5>
                        ) : (
                          ""
                        )}
                        {recipeDetailData[
                          COMPONENT_RECIPE_COMMENT_DATA
                        ]?.commentData?.list?.map(
                          (items: any, index: number) => (
                            <>
                              <div className="received-review-wrapper">
                                <div className="this-review">
                                  <div className="this-review-header">
                                    <div className="name-date">
                                      <p className="tm">{items.name}</p>
                                      <span className="bm">
                                        {items.date}
                                      </span>
                                    </div>
                                    <div className="reviews-box">
                                      {getStarRating(items.ratings)}
                                    </div>
                                  </div>
                                  <p className="bl">{items.message}</p>
                                  <CustomeButton onClick={() => replyBox('replyBox' + index, items.commentId)} >REPLY</CustomeButton>
                                </div>

                                {(currentReplyBox == 'replyBox' + index && showHideComment) ? (
                                  <div className="leave-review-box">
                                    <h5>Reply to {items.name}</h5>
                                    <p className="bl">
                                      Your email address will not be published.
                                      Required fields are marked *
                                    </p>
                                    <div className="give-ratting-wrapper">
                                      <p className="tm">{RECIPE_DETAIL.LEAVE_REVIEW_LABEL_RATING}</p>
                                      <div className="rate-area">
                                        <Rating
                                          emptySymbol={<img src={BlankCupcake} />}
                                          fullSymbol={<img src={Cupcake} />}
                                          initialRating={reviewReplyData.ratings.value}
                                          onChange={(value: any) => setDataForReviewReply("ratings", value)}
                                        />
                                      </div>
                                      {isReviewReplyFormValidated && reviewReplyDataError['ratings'] ? <span className="error">{reviewReplyDataError['ratings']}</span> : ''}
                                    </div>
                                    <Row>
                                      <Col xs={12} sm={6}>
                                        <InputGroups
                                          //value={isLoggedInFirstName + ' ' + isLoggedInLastName} 
                                          value={reviewReplyData.name.value}
                                          onChange={(e: any) => setDataForReviewReply("name", e.target.value)}
                                          error={isReviewReplyFormValidated && reviewReplyDataError['name'] ? reviewReplyDataError['name'] : null}
                                          label={RECIPE_DETAIL.LEAVE_REVIEW_LABEL_NAME} />
                                      </Col>
                                      <Col xs={12} sm={6}>
                                        <InputGroups
                                          //value={isLoggedInEmail} 
                                          value={reviewReplyData.email.value}
                                          onChange={(e: any) => setDataForReviewReply("email", e.target.value)}
                                          error={isReviewReplyFormValidated && reviewReplyDataError['email'] ? reviewReplyDataError['email'] : null}
                                          label={RECIPE_DETAIL.LEAVE_REVIEW_LABEL_EMAIL} />
                                      </Col>
                                      <Col xs={12} sm={12}>
                                        <TextareaGroups
                                          defaultValue={reviewReplyData.message.value}
                                          value={reviewReplyData.message.value}
                                          onChange={(e: any) => setDataForReviewReply("message", e.target.value)}
                                          error={isReviewReplyFormValidated && reviewReplyDataError['message'] ? reviewReplyDataError['message'] : null}
                                          label={RECIPE_DETAIL.LEAVE_REVIEW_LABEL_COMMENT} />
                                      </Col>
                                    </Row>
                                    <CustomeButton bg="fill" disabled={isReviewReplyFormButtonDisabled} isLoading={isLoading(reviewReplyApiStatus)} onClick={() => onSubmitReviewReply()}>{RECIPE_DETAIL.LEAVE_REVIEW_SUBMIT}</CustomeButton>
                                  </div>
                                ) : ''}
                              </div>

                              {items?.innercomment?.map(
                                (
                                  itemsInnerComment: any,
                                  indexInnerComment: number
                                ) => (
                                  <div className="sended-review-wrapper">
                                    <div className="this-review">
                                      <div className="this-review-header">
                                        <div className="name-date">
                                          <p className="tm">
                                            {itemsInnerComment.name}
                                          </p>
                                          <span className="bm">
                                            {items.date}
                                          </span>
                                        </div>
                                        <div className="reviews-box">
                                          {getStarRating(
                                            itemsInnerComment.ratings
                                          )}
                                        </div>
                                      </div>
                                      <p className="bl">
                                        {itemsInnerComment.message}
                                      </p>
                                      {/* <CustomeButton>REPLY</CustomeButton> */}
                                    </div>
                                  </div>
                                )
                              )}
                            </>
                          )
                        )}

                        <div className="leave-review-box">
                          <h5>{RECIPE_DETAIL.LEAVE_REVIEW}</h5>
                          <p className="bl">
                            {RECIPE_DETAIL.LEAVE_REVIEW_DESC}
                          </p>
                          <div className="give-ratting-wrapper">
                            <p className="tm">{RECIPE_DETAIL.LEAVE_REVIEW_LABEL_RATING}</p>
                            <div className="rate-area">
                              <Rating
                                emptySymbol={<img src={BlankCupcake} />}
                                fullSymbol={<img src={Cupcake} />}
                                initialRating={reviewData.ratings.value}
                                onChange={(value: any) => setDataForReview("ratings", value)}
                              />
                            </div>
                            {isReviewFormValidated && reviewDataError['ratings'] ? <span className="error">{reviewDataError['ratings']}</span> : ''}
                          </div>
                          <Row>
                            <Col xs={12} sm={6}>
                              <InputGroups
                                //defaultValue={isLoggedInFirstName + ' ' + isLoggedInLastName}
                                value={reviewData.name.value}
                                onChange={(e: any) => setDataForReview("name", e.target.value)}
                                error={isReviewFormValidated && reviewDataError['name'] ? reviewDataError['name'] : null}
                                label={RECIPE_DETAIL.LEAVE_REVIEW_LABEL_NAME} />
                            </Col>
                            <Col xs={12} sm={6}>
                              <InputGroups
                                //defaultValue={isLoggedInEmail}
                                value={reviewData.email.value}
                                onChange={(e: any) => setDataForReview("email", e.target.value)}
                                error={isReviewFormValidated && reviewDataError['email'] ? reviewDataError['email'] : null}
                                label={RECIPE_DETAIL.LEAVE_REVIEW_LABEL_EMAIL} />
                            </Col>
                            <Col xs={12} sm={12}>
                              <TextareaGroups
                                value={reviewData.message.value}
                                defaultValue={reviewData.message.value}
                                onChange={(e: any) => setDataForReview("message", e.target.value)}
                                error={isReviewFormValidated && reviewDataError['message'] ? reviewDataError['message'] : null}
                                label={RECIPE_DETAIL.LEAVE_REVIEW_LABEL_COMMENT} />
                            </Col>
                          </Row>
                          <CustomeButton bg="fill" disabled={isReviewFormButtonDisabled} isLoading={isLoading(reviewApiStatus)} onClick={() => onSubmit()}>{RECIPE_DETAIL.LEAVE_REVIEW_SUBMIT}</CustomeButton>
                        </div>
                      </div>
                    </div>
                    <div className="recent-post">
                      <p className="tl">{RECIPE_DETAIL.RECENT_POST}</p>
                      <ul>
                        {recipeDetailData[
                          COMPONENT_RECIPE_RECENT_POST
                        ]?.recentData?.list?.map(
                          (items: any, index: number) => (
                            <li key={index}>
                              <div className="iframe-container">
                                {items.reecentYoutubeLink && items.reecentYoutubeLink != "" ?
                                  <iframe
                                    width="100%"
                                    height="100%"
                                    src={items.reecentYoutubeLink}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                  ></iframe>
                                  :
                                  <Link to={RECIPEDETAILS + '/' + items.recentUrlkey} className="product-and-title">
                                    <img src={items.recipeImage} alt="" />
                                  </Link>
                                }
                              </div>
                              <Link
                                to={RECIPEDETAILS + "/" + items.recentUrlkey}
                                className="recent-post-link"
                              >
                                {items.recentName}
                              </Link>
                            </li>
                          )
                        )}
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

export default RecipeDetails;
