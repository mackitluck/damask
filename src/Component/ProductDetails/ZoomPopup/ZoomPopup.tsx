import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import CloseIcon from "../../../Assets/img/close.svg";
import OwlCarousel from "react-owl-carousel";
import sliderImg1 from "../../../Assets/img/creation4.png";
import sliderImg2 from "../../../Assets/img/creation1.png";
import sliderImg3 from "../../../Assets/img/creation3.png";
import sliderImg4 from "../../../Assets/img/creation1.png";
import sliderImg5 from "../../../Assets/img/creation2.png";
import InnerImageZoom from 'react-inner-image-zoom';
import Banner from "../../../Assets/img/home-banner.png";


const ZoomPopup = (props: any) => {
 const [currentImage , setCurentImage] = useState<any>(0);

  const imgArr: any = [
    sliderImg1,
    sliderImg2,
    sliderImg3,
    sliderImg4,
    sliderImg5
  ];

  const options = {
    autoplay: false,
    smartSpeed: 300,
    mouseDrag: false,
    touchDrag: false,
    items: 1,
    margin: 0,
    nav: true,
    dots: false,
    loop: true
  };

  // const handleCarosalChange = (e: any) => {
  //   var items = e.item.count;
  //   var item = e.item.index + 1;
  //   item = item - items ;
  //   // setCurentImage(item);
  //   // props.setBigImg(props?.productImage?.[item]?.link);
  // }


  return (
    <Modal {...props} centered className="zoom-popup">
      <Modal.Body>
        <div className="close-icon" onClick={props.onHide}>
          <img src={CloseIcon} alt="" />
        </div>

        <div className="zoom-img-wrapper">
          <OwlCarousel
            className="owl-theme tablet-slider"
            rtlClass="owl-rtl"
            {...options}
            nav
          >
            {props?.productImage && props?.productImage?.map((items: any, index: number) => (
              <div className="item" key={index}>
                <InnerImageZoom src={items.link} zoomSrc={items.link} />
              </div>
            ))}
          </OwlCarousel>
          <div className="all-imgs" >
            {props?.productImage && props?.productImage?.map((items: any, index: number) => (
              <div  className={`img-border ${currentImage === index ? "" : ""}`} key={index}>
                <img src={items.link} alt="" />
              </div>
            ))}
          </div>
        </div>
                
      </Modal.Body>
    </Modal>
  );
};

export default ZoomPopup;
