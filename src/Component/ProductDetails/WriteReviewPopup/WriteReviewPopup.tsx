import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import CustomeButton from "../../Common/CustomeButton/CustomeButton";
import InputGroups from "../../Common/InputGroups/InputGroups";
import TextareaGroups from "../../Common/TextareaGroups/TextareaGroups";
import Rating from "react-rating";
import BlankCupcake from "../../../Assets/img/blank-cupcake.svg"
import Cupcake from "../../../Assets/img/cupcake.svg"
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { API_STATUS } from "../../../Constant/Api";
import { addProductReviewAction } from "../../../Redux/ProductDetail/ProductDetailAction";
import validate from "../../../Utility/Validation";
import { DESCRIPTION, NAME, RATING, SUMMARY } from "../../../Language/Validation";
import { ADD_PRODUCT_REVIEW_CLEAR, ADD_PRODUCT_REVIEW_FAILD, ADD_PRODUCT_REVIEW_LONG, ADD_PRODUCT_REVIEW_REQUEST, ADD_PRODUCT_REVIEW_SUCCESS } from "../../../Redux/ProductDetail/ProductDetailTypes";
import { SUCCESS_RESPONSE_CODE } from "../../../Constant/Status";
import { isLoading } from "../../../Utility/General";

const WriteReviewPopup = (props: any) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const INITIAL_REVIEW_DATA: any = {
    name: { value: null, validation: ["required"], errors: [NAME.Required] },
    summary: { value: null, validation: ["required"], errors: [SUMMARY.Required] },
    description: { value: null, validation: ["required"], errors: [DESCRIPTION.Required] },
    rating: { value: null, validation: ["required"], errors: [RATING.Required] },
  }

  const [reviewData, setReviewData] = useState(INITIAL_REVIEW_DATA);
  let demo: any = {}
  const location: any = useLocation();
  const [reviewDataError, setReviewDataError] = useState(demo)
  const [isFormValidated, setIsFormValidated] = useState(false)
  const [apiStatus, setApiStatus] = useState(API_STATUS.SUCCESS)
  const [isReviewFormButtonDisabled, setIsReviewFormButtonDisabled] = useState(false)
  
  const onSubmit = () => {
    if (validate(reviewData).isValidated === true) {
      setIsReviewFormButtonDisabled(true)
      dispatch(addProductReviewAction({nickname: reviewData.name.value, title:reviewData.summary.value, detail: reviewData.description.value, optionIds: reviewData.rating.value,urlKey:props.productKey})) 
    }
    else {
      setReviewDataError({ ...validate(reviewData)?.errors })
      setIsFormValidated(true)
    }
  }

  const setData = (field: string, value: string) => {
    let reviewDetails = Object.assign({}, reviewData)
    reviewDetails[field].value = value
    setReviewData({ ...reviewDetails })
  }
  useEffect(() => {
    setReviewDataError({ ...validate(reviewData)?.errors })
  }, [reviewData])

  useSelector((state: any) => {
    if (state?.addProductReview?.type === ADD_PRODUCT_REVIEW_REQUEST) {
      if (apiStatus !== API_STATUS.LOADING) {
        setApiStatus(API_STATUS.LOADING);
      }
    } else if (
      state?.addProductReview?.data?.statusCode === SUCCESS_RESPONSE_CODE &&
      state?.addProductReview?.type === ADD_PRODUCT_REVIEW_SUCCESS
    ) {
      if (apiStatus !== API_STATUS.SUCCESS) {
        setIsReviewFormButtonDisabled(false)
        setApiStatus(API_STATUS.SUCCESS);
        dispatch({
          type: ADD_PRODUCT_REVIEW_CLEAR,
          payload: { type: ADD_PRODUCT_REVIEW_CLEAR },
        });
        setReviewData(INITIAL_REVIEW_DATA);
        setIsFormValidated(false);
        props.onHide();
      }
    } else if (state?.addProductReview?.type === ADD_PRODUCT_REVIEW_LONG) {
      if (apiStatus !== API_STATUS.LONG) {
        setApiStatus(API_STATUS.LONG);
      }
    } else if (state?.addProductReview?.type === ADD_PRODUCT_REVIEW_FAILD) {
      if (apiStatus !== API_STATUS.FAILED) {
        setApiStatus(API_STATUS.FAILED);
      }
    }
  });


  return (
    <Modal {...props} centered className="review-popup">
      <Modal.Header closeButton onHide={()=>{setIsFormValidated(false);}}>
        <Modal.Title id="contained-modal-title-vcenter">
          Write a review
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="review-for">
          <p className="bl">You are reviewing: </p>
          <p className="tm">{props.productData?.title}</p>
        </div>
        <div className="give-ratting-wrapper">
          <p className="tm">Rating*</p>
          <div className="rate-area">
            <Rating 
                emptySymbol={<img src={BlankCupcake} />}
                fullSymbol={<img src={Cupcake} />}
                initialRating={reviewData.rating.value}
                onChange={(value:any) => setData("rating",value)}
            /> 
          </div>
          {isFormValidated && reviewDataError['rating'] ? <span className="error">{reviewDataError['rating']}</span> : ''}
        </div>
        <Row>
          <Col xs={12} sm={6}>
            <InputGroups label="Name*" 
            onChange={(e: any) => setData("name", e.target.value)} 
            error={isFormValidated && reviewDataError['name'] ? reviewDataError['name'] : null}/>
          </Col>
          <Col xs={12} sm={6}>
            <InputGroups label="Title*" 
            onChange={(e: any) => setData("summary", e.target.value)} 
            error={isFormValidated && reviewDataError['summary'] ? reviewDataError['summary'] : null}
            />
          </Col>
          <Col xs={12} sm={12}>
            <TextareaGroups label="Review*" 
            onChange={(e: any) => setData("description", e.target.value)} 
            error={isFormValidated && reviewDataError['description'] ? reviewDataError['description'] : null}
            />
          </Col>
        </Row>
        <CustomeButton disabled={isReviewFormButtonDisabled} bg="fill" isLoading={isLoading(apiStatus)} onClick={() => onSubmit()}>SUBMIT REVIEW</CustomeButton>
      </Modal.Body>
    </Modal>
  );
};

export default WriteReviewPopup;
