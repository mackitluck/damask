import React, { useEffect, useRef, useState } from "react";
import { Col } from "react-bootstrap";
import ReactImageMagnify from "react-image-magnify";
import ReactOwlCarousel from "react-owl-carousel";
import Slider from "react-slick";
import PRODUCT_DETAIL from "../../../Language/ProductDetail";
import Loader from "../../Loader/Loader";

function ProductCarousel(props: any) {
  const [show , setShow] = useState(true)

  useEffect(() => {
    setShow(false);
    setTimeout(() => {
        setShow(true);
    }, 0);
  }, [props?.productImage])
  
  return props?.productImage ? (
    <Col sm={12} md={6} lg={6}>
      <div className="product-slider">
        <div className="v-slider-wrapper">
          <Slider {...props?.settings}>
            {props?.productImage?.map((items: any, index: number) => (
              <img
                src={items.link}
                key={index}
                alt=""
                onClick={() => props.setBigImg(items.link)}
                className={items.link === props.bigImg ? "borderd" : ""}
              />
            ))}
          </Slider>
          {show && (
            <ReactOwlCarousel
              className="owl-theme tablet-slider"
              rtlClass="owl-rtl"
              {...props?.options}
              nav
            >
              {props?.productImage &&
                props?.productImage?.map((items: any, index: number) => {
                  return (
                    <div className="item" key={index}>
                      <img
                        src={items.link}
                        alt=""
                        onClick={() => props.setBigImg(items.link)}
                        className={`slider-web-img ${
                          items.link === props.bigImg ? "borderd" : ""
                        }`}
                      />
                      <img
                        src={items.link}
                        alt=""
                        onClick={() => props.setZoomModalShow(true)}
                        className={`slider-mobile-img ${
                          items.link === props.bigImg ? "borderd" : ""
                        }`}
                      />
                    </div>
                  );
                })}
            </ReactOwlCarousel>
          )}
        </div>
        <div className="big-img">
          <ReactImageMagnify
            {...{
              smallImage: {
                alt: "Wristwatch by Ted Baker London",
                isFluidWidth: true,
                src:
                  props.bigImg !== ""
                    ? props.bigImg
                    : props?.productImage[0]?.link,
              },
              largeImage: {
                src:
                  props.bigImg !== ""
                    ? props.bigImg
                    : props?.productImage[0]?.link,
                width: 1000,
                height: 1000,
              },
              enlargedImageContainerClassName: "enlarge-img",
              isActivatedOnTouch: true,
            }}
          />
        </div>
      </div>
      {/* web view start 1 */}
      <div className="slider-content-web">
        <p className="bm">{PRODUCT_DETAIL.NOTE_GIFT_WRAP}</p>
      </div>
      {/* web view end 1 */}
    </Col>
  ) : (
    <Loader />
  );
}

export default ProductCarousel;
