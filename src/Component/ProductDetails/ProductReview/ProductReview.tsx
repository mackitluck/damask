import { getStarRating, isLoading } from "../../../Utility/General";
import CustomeButton from "../../Common/CustomeButton/CustomeButton";

import React from 'react'
import PRODUCT_DETAIL from "../../../Language/ProductDetail";

function ProductReview(props:any) {
  return (
    <div className="review-section">
    <div className="review-section-header">
        <p className="tl">Reviews</p>
        <div className="reviews-box">
            {getStarRating(props?.productData?.rating)}
            <p className="bm">{props?.productData?.review} {PRODUCT_DETAIL.REVIEWS}</p>
        </div>
        <CustomeButton bg="fill" onClick={() => props?.setReviewModalShow(true)}>{PRODUCT_DETAIL.WRITE_REVIEW}</CustomeButton>
    </div>
    <div className="RVB-wrapper">
        {props?.reviewData?.map((items: any, index: number) => (
            <div className="RVB" key={index}>
                <div className="star-date">
                    <div className="reviews-box">
                        {getStarRating(items.rating)}
                    </div>
                    <p className="bl">{items.reviewDate}</p>
                </div>
                <p className="tm">{items.reviewTitle}</p>
                <span className="bl">{items.reviewDetail}</span>
                <label className="bm">{items?.reviewFromText}</label>
            </div>
        ))}
        {(props?.reviewPage * props?.reviewPagesize < props?.totalReviewCount) ?
            <div className="text-center">
                <CustomeButton isLoading={isLoading(props.reviewApiStatus)} onClick={() => props.fetchMoreData()}>{PRODUCT_DETAIL.LOAD_MORE}</CustomeButton>
            </div> : ""
        }
    </div>
    </div>
  )
}

export default ProductReview