import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import OwlCarousel from "react-owl-carousel";
import CustomeButton from "../Common/CustomeButton/CustomeButton";
import WebBanner from "../../Assets/img/home-banner.png";
import MobileBanner from "../../Assets/img/home-mobile-banner.png";
import Content1 from "../../Assets/img/content1.svg";
import Content2 from "../../Assets/img/content2.svg";
import Content3 from "../../Assets/img/content3.svg";
import Content4 from "../../Assets/img/content4.svg";
import Content5 from "../../Assets/img/content5.svg";
import MobileContent1 from "../../Assets/img/Mobilecontent1.svg";
import MobileContent2 from "../../Assets/img/Mobilecontent2.svg";
import MobileContent3 from "../../Assets/img/Mobilecontent3.svg";
import MobileContent4 from "../../Assets/img/Mobilecontent4.svg";
import MobileContent5 from "../../Assets/img/Mobilecontent5.svg";
import PB4 from "../../Assets/img/PB4.png";
import PB5 from "../../Assets/img/PB5.png";
import PB6 from "../../Assets/img/PB6.png";
import ProductBox from "../Common/ProductBox/ProductBox";
import SimpleSteps from "../Common/SimpleSteps/SimpleSteps";
import Marquee from "react-fast-marquee";
import BlankCupcake from "../../Assets/img/blank-cupcake.svg";
import Cupcake from "../../Assets/img/cupcake.svg";
import Creation1 from "../../Assets/img/creation1.png";
import Creation2 from "../../Assets/img/creation2.png";
import Creation3 from "../../Assets/img/creation3.png";
import Creation4 from "../../Assets/img/creation4.png";
import YoutubeIcon from "../../Assets/img/Youtube.svg";
import TW from "../../Assets/img/Tw.svg";
import FB from "../../Assets/img/Fb.svg";
import INSTA from "../../Assets/img/Inst.svg";
import PIN from "../../Assets/img/pin-black.svg";
import { useNavigate } from "react-router-dom";
import { PRODUCTLIST } from "../../Constant/Route";
import { useDispatch, useSelector } from "react-redux";
import { homeAction } from "../../Redux/Home/HomeAction";
import { SUCCESS_RESPONSE_CODE } from "../../Constant/Status";
import {
  HOME_FAILD,
  HOME_LONG,
  HOME_REQUEST,
  HOME_SUCCESS,
} from "../../Redux/Home/HomeTypes";
import { API_STATUS } from "../../Constant/Api";
import Loader from "../Loader/Loader";
import SomethingWrong from "../SomethingWrong/SomethingWrong";

import {
  COMPONENT_BANNER_DATA,
  COMPONENT_CATEGORY_PRODUCT,
  COMPONENT_MORE_SUPPORT_VIDEO,
  COMPONENT_PRIMARY_USP,
  COMPONENT_REVIEW,
  COMPONENT_SECONDARY_USP,
  COMPONENT_SHARE_YOUR_CREATION,
  COMPONENT_STEPS_DATA,
} from "../../Constant/Component";
import HOME from "../../Language/Home";
import * as localStorageConstant from "../../Constant/LocalStorage";
import P1 from "../../Assets/img/P1.svg";
import P2 from "../../Assets/img/P2.svg";
import P3 from "../../Assets/img/P3.svg";
import P4 from "../../Assets/img/P4.svg";
import P5 from "../../Assets/img/P5.svg";
import P6 from "../../Assets/img/P6.svg";

import P7 from "../../Assets/img/P7.svg";
import P8 from "../../Assets/img/P8.svg";
import P9 from "../../Assets/img/P9.svg";
import P10 from "../../Assets/img/P10.svg";

const demo = require("../../Assets/video/demo.mp4");

const HomePage = () => {
  const navigate = useNavigate();

  const options = {
    responsiveClass: true,
    autoplay: false,
    dots: false,
    responsive: {
      0: {
        items: 1.125,
        margin: 24,
        slideBy: 1,
        loop: true,
        nav: false,
        dotsEach: true,
      },
      450: {
        items: 2.2,
        slideBy: 1,
        margin: 24,
        nav: false,
        loop: true,
        dotsEach: true,
      },
      768: {
        items: 3,
        margin: 16,
        nav: true,
        loop: false,
      },
      992: {
        items: 3,
        margin: 28,
        nav: true,
        loop: false,
      },
    },
  };

  const HBoptions = {
    responsiveClass: true,
    autoplay: false,
    smartSpeed: 300,
    dots: false,
    loop: false,
    responsive: {
      0: {
        items: 1,
        margin: 0,
        nav: false,
      },
      768: {
        items: 2,
        margin: 40,
        nav: true,
      },
      992: {
        items: 3,
        margin: 40,
        nav: true,
      },
    },
  };

  const obj = [
    {
      id: "2",
      title: "Truffle Cake",
      urlKey: "truffle-cake",
      isWishlisted: "0",
      mapPath: "by-types/regular-cakes",
      image:
        "http://damaskcake.magneto.co.in/media/catalog/product/t/r/truffle-cake-545-_mfa__2.jpg",
      Ingredients: ["Sugar", " Vanilla", " Cherry"],
      price: "$660.00",
      discountedPrice: "",
    },
    {
      id: "3",
      title: "Yummy Sugarfree Chocolate Cake",
      urlKey: "yummy-sugarfree-chocolate-cake",
      isWishlisted: "0",
      mapPath: "by-types/sugarfree-cakes",
      image:
        "http://damaskcake.magneto.co.in/media/catalog/product/y/u/yummy_sugarfree_chocolate_cake.jpg",
      Ingredients: "",
      price: "$990.00",
      discountedPrice: "$899.00",
    },
    {
      id: "4",
      title: "Blackforest Photo Cake",
      urlKey: "blackforest-photo-cake",
      isWishlisted: "0",
      mapPath: "by-types/photo-cakes",
      image:
        "http://damaskcake.magneto.co.in/media/catalog/product/c/a/cake-page-photo-cake.jpg",
      Ingredients: "",
      price: "$1,980.00",
      discountedPrice: "",
    },
    {
      id: "5",
      title: "Tears Of Joy",
      urlKey: "tears-of-joy",
      isWishlisted: "0",
      mapPath: "by-types/smiley-cakes",
      image:
        "http://damaskcake.magneto.co.in/media/catalog/product/4/_/4_1_.jpg",
      Ingredients: "",
      price: "$3,205.00",
      discountedPrice: "",
    },
    {
      id: "6",
      title: "Chocolate Floral Heart",
      urlKey: "chocolate-floral-heart",
      isWishlisted: "0",
      mapPath: "by-types/heart-shaped-cakes",
      image:
        "http://damaskcake.magneto.co.in/media/catalog/product/c/h/chocolate_floral_heart.jpg",
      Ingredients: "",
      price: "$970.00",
      discountedPrice: "",
    },
    {
      id: "7",
      title: "Tasteful Strawberry Cake",
      urlKey: "tasteful-strawberry-cake",
      isWishlisted: "0",
      mapPath: "by-types/eggless-cakes",
      image:
        "http://damaskcake.magneto.co.in/media/catalog/product/t/a/tasteful_strawberry_cake.jpg",
      Ingredients: "",
      price: "$1,450.00",
      discountedPrice: "",
    },
    {
      id: "12",
      title: "5 Star Strawberry Cake",
      urlKey: "5-star-strawberry-cake",
      isWishlisted: "0",
      mapPath: "by-types/regular-cakes",
      image:
        "http://damaskcake.magneto.co.in/media/catalog/product/5/-/5-star-strawberry-cake-1745.jpg",
      Ingredients: "",
      price: "$1,780.00",
      discountedPrice: "",
    },
    {
      id: "13",
      title: "Red Velvet Cake Valentine",
      urlKey: "red-velvet-cake-valentine",
      isWishlisted: "0",
      mapPath: "by-types/regular-cakes",
      image:
        "http://damaskcake.magneto.co.in/media/catalog/product/r/e/red-velvet-cake-valentine-899.jpg",
      Ingredients: "",
      price: "$1,010.00",
      discountedPrice: "",
    },
    {
      id: "17",
      title: "Choco Coffee Cupcakes",
      urlKey: "choco-coffee-cupcakes",
      isWishlisted: "0",
      mapPath: "by-types/regular-cakes",
      image:
        "http://damaskcake.magneto.co.in/media/catalog/product/m/a/mask_group.jpg",
      Ingredients: "",
      price: "$140.00",
      discountedPrice: "",
    },
  ];

  const HBobj = [
    {
      msg: "Sed sit amet enim massa. Praesent sollicitudin lacus ut ligula elementum porttitor at et erat. Nam facilisis ut velit a pharetra. Mauris justo quam, condimentum vitae magna ut, cursus vulputate nunc.",
      client: "Jodie Judge",
    },
    {
      msg: "Aenean pellentesque aliquam consequat. Pellentesque porttitor tempus mi nec dapibus. Nulla vitae tellus sit amet leo aliquam bibendum. Nulla eget ex posuere enim rutrum auctor.",
      client: "Amanda Mcenery",
    },
    {
      msg: "Maecenas sed varius justo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse quam mi, elementum vel accumsan vel, vulputate id massa.",
      client: "Aaron",
    },
    {
      msg: "Aenean pellentesque aliquam consequat. Pellentesque porttitor tempus mi nec dapibus. Nulla vitae tellus sit amet leo aliquam bibendum. Nulla eget ex posuere enim rutrum auctor.",
      client: "Amanda Mcenery",
    },
    {
      msg: "Maecenas sed varius justo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse quam mi, elementum vel accumsan vel, vulputate id massa.",
      client: "Aaron",
    },
  ];

  const infiniteContent = [
    "All Natural Ingredients",
    "Non-GMO",
    "Chef-tested recipes",
    "Easy-to-follow instructions",
    "Gluten-free versions",
    "Socially responsible",
  ];

  const dispatch = useDispatch();

  const [apiStatus, setApiStatus] = useState(API_STATUS.LOADING);

  const [pageData, setPageData] = useState<any>({});

  const [activeTab, setActiveTab] = useState("");

  const [tabData, setTabData] = useState<any>(null);

  const home = useSelector((state: any) => state?.home?.data);

  useSelector((state) => {});

  const master = useSelector((state: any) => state?.master?.data);

  useEffect(() => {
    dispatch(homeAction());
  }, []);

  useSelector((state: any) => {
    if (state?.home?.type === HOME_REQUEST) {
      if (apiStatus !== API_STATUS.LOADING) {
        setApiStatus(API_STATUS.LOADING);
      }
    } else if (
      state?.home?.data?.statusCode === SUCCESS_RESPONSE_CODE &&
      state?.home?.type === HOME_SUCCESS
    ) {
      if (apiStatus !== API_STATUS.SUCCESS) {
        setApiStatus(API_STATUS.SUCCESS);
        localStorage.removeItem(localStorageConstant.CONFIGURABLE_DATA);
        localStorage.removeItem(localStorageConstant.PRODUCTQUERY);
      }
    } else if (state?.home?.type === HOME_LONG) {
      if (apiStatus !== API_STATUS.LONG) {
        setApiStatus(API_STATUS.LONG);
      }
    } else if (state?.home?.type === HOME_FAILD) {
      if (apiStatus !== API_STATUS.FAILED) {
        setApiStatus(API_STATUS.FAILED);
      }
    }
  });

  useEffect(() => {
    let componentData: any = {};
    home?.component?.forEach((component: any) => {
      componentData[component?.componentId] = component;
      if (
        component?.componentId === COMPONENT_CATEGORY_PRODUCT &&
        component?.categoryProduct?.length
      ) {
        setActiveTab(component?.categoryProduct[0]?.title);
        setTabData([...component?.categoryProduct[0]?.products]);
      }
    });
    setPageData({ ...componentData });
  }, [home]);

  const setActiveTabData = (tab: string) => {
    let tabData = pageData[COMPONENT_CATEGORY_PRODUCT]?.categoryProduct?.find(
      (category: any) => category?.title === tab
    )?.products;
    setTabData(tabData);
    setActiveTab(tab);
  };

  const createElements = (number: number, currentIndex: any) => {
    var elements = [];
    for (let i = 0; i < 5; i++) {
      if (i >= number) {
        elements.push(
          <img src={BlankCupcake} key={"star" + currentIndex + i} alt="" />
        );
      } else {
        elements.push(
          <img src={Cupcake} key={"star" + currentIndex + i} alt="" />
        );
      }
    }
    return elements;
  };

  switch (apiStatus) {
    case API_STATUS.LOADING:
      return <Loader></Loader>;
    case API_STATUS.SUCCESS:
      return (
        <div className="home-page">
          <img src={P1} className="P1" alt="p1" />
          <img src={P2} className="P2" alt="p2" />
          <section className="home-banner">
            <div className="overlay-content">
              <Container>
                <div className="data-hidden">
                  <h1 data-aos="fade-up">
                    {pageData[COMPONENT_BANNER_DATA]?.bannerData?.Title}
                  </h1>
                </div>
                <div className="data-hidden">
                  <p className="bl" data-aos="fade-up">
                    {pageData[COMPONENT_BANNER_DATA]?.bannerData?.subTitle}
                  </p>
                </div>
                <div className="data-hidden">
                  <CustomeButton
                    bg="fill"
                    animatioName="fade-up"
                    onClick={() => navigate(PRODUCTLIST)}
                  >
                    {pageData[COMPONENT_BANNER_DATA]?.bannerData?.buttonText}
                  </CustomeButton>
                </div>
              </Container>
            </div>
            <div
              className="web-banner"
              style={{
                backgroundImage: `url(${pageData[COMPONENT_BANNER_DATA]?.bannerData?.Image})`,
              }}
            ></div>
            <div
              className="mobile-banner"
              style={{
                backgroundImage: `url(${pageData[COMPONENT_BANNER_DATA]?.bannerData?.responsiveImage})`,
              }}
            ></div>
            {/* <img src={WebBanner} alt="" className="web-banner"/>
            <img src={MobileBanner} alt="" className="mobile-banner"/> */}
          </section>

          <div className="enjoyable">
            <Container>
              <div className="data-hidden">
                <h4 data-aos="fade-up">
                  {pageData[COMPONENT_PRIMARY_USP]?.primaryUspTitle}
                </h4>
              </div>
            </Container>
            <div className="enjoyable-content" data-aos="fade-up">
              <img src={P3} className="P3" alt="p3" />
              <img src={P4} className="P4" alt="p4" />
              <Container>
                <div className="E-row">
                  {pageData[COMPONENT_PRIMARY_USP]?.primaryUsp?.map(
                    (items: any, index: number) => (
                      <div className="E-column" key={"enjoyable-" + index}>
                        <img
                          src={items?.main_image}
                          alt=""
                          className="web-img"
                        />
                        <img
                          src={items?.mobile_image}
                          alt=""
                          className="mobile-img"
                        />
                      </div>
                    )
                  )}
                </div>
              </Container>
            </div>
          </div>

          <div className="parent--tab-simple">
            <img src={P5} className="P5" alt="p5" />
            <img src={P6} className="P6" alt="p6" />
            <div className="tab-section">
              <Container>
                <Row>
                  <Col md={12} lg={{ span: 10, offset: 1 }}>
                    <div className="data-hidden">
                      <h4 data-aos="fade-up">
                        {
                          pageData[COMPONENT_CATEGORY_PRODUCT]
                            ?.mainCategoryTitle
                        }
                      </h4>
                    </div>
                    <div className="tab-wrapper">
                      <ul>
                        {pageData[
                          COMPONENT_CATEGORY_PRODUCT
                        ]?.categoryProduct?.map((items: any, index: number) => (
                          <li
                            className={
                              items?.title === activeTab ? "active" : ""
                            }
                            onClick={() => setActiveTabData(items?.title)}
                            key={"category-" + index}
                          >
                            <a className="tab-links">{items?.title}</a>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {pageData[COMPONENT_CATEGORY_PRODUCT]?.categoryProduct?.map(
                      (items: any, index2: number) => (
                        <React.Fragment key={"category-Tab-" + index2}>
                          {activeTab === items.title ? (
                            <OwlCarousel className="owl-theme" {...options}>
                              {items?.products?.map(
                                (items: any, index: number) => (
                                  <div
                                    className="item"
                                    key={"category-product-" + index}
                                  >
                                    <ProductBox
                                      wishListedFlg={items?.isWishlisted}
                                      value={items}
                                    />
                                  </div>
                                )
                              )}
                            </OwlCarousel>
                          ) : null}
                        </React.Fragment>
                      )
                    )}
                  </Col>
                </Row>
              </Container>
            </div>

            <Container>
              <Row>
                <Col md={12} lg={{ span: 10, offset: 1 }}>
                  <SimpleSteps
                    title={pageData[COMPONENT_STEPS_DATA]?.stepsDataTitle}
                    steps={pageData[COMPONENT_STEPS_DATA]?.StepsData}
                  ></SimpleSteps>
                </Col>
              </Row>
            </Container>
          </div>

          <div className="infinite-carousel">
            <Marquee speed={50}>
              {pageData[COMPONENT_SECONDARY_USP]?.secondaryUsp?.map(
                (items: any, index: number) => (
                  <div
                    className="flex-content"
                    key={"infinite-carousel-" + index}
                  >
                    <p className="tl">{items}</p>
                    <div className="square-dot"></div>
                  </div>
                )
              )}
            </Marquee>
          </div>

          {pageData[COMPONENT_MORE_SUPPORT_VIDEO] ? (
            <div className="video-section">
              <Container>
                <div className="data-hidden">
                  <h4 data-aos="fade-up">
                    {
                      pageData[COMPONENT_MORE_SUPPORT_VIDEO]?.moreSupportVideo
                        ?.title
                    }
                  </h4>
                </div>
                <div className="data-hidden">
                  <p className="bl" data-aos="fade-up">
                    {
                      pageData[COMPONENT_MORE_SUPPORT_VIDEO]?.moreSupportVideo
                        ?.titleIntro
                    }
                  </p>
                </div>
                <Row>
                  <Col sm={12} md={6} lg={8}>
                    <div className="big-video">
                      <div className="video-wrapper" data-aos="fade-right">
                        <div className="iframe-container">
                          <iframe
                            width="100%"
                            height="100%"
                            src={
                              pageData[COMPONENT_MORE_SUPPORT_VIDEO]
                                ?.moreSupportVideo?.largeSection?.Video
                            }
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      </div>
                      <h6 data-aos="fade-up">
                        {
                          pageData[COMPONENT_MORE_SUPPORT_VIDEO]
                            ?.moreSupportVideo?.largeSection?.title
                        }
                      </h6>
                      <span className="bl" data-aos="fade-up">
                        {
                          pageData[COMPONENT_MORE_SUPPORT_VIDEO]
                            ?.moreSupportVideo?.largeSection?.titleIntro
                        }
                      </span>
                    </div>
                  </Col>
                  <Col sm={12} md={6} lg={4}>
                    <div className="small-video">
                      <div className="video-wrapper" data-aos="fade-left">
                        <div className="iframe-container">
                          <iframe
                            width="100%"
                            height="100%"
                            src={
                              pageData[COMPONENT_MORE_SUPPORT_VIDEO]
                                ?.moreSupportVideo?.smallSection?.Video
                            }
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      </div>
                      <h6 data-aos="fade-up">
                        {
                          pageData[COMPONENT_MORE_SUPPORT_VIDEO]
                            ?.moreSupportVideo?.smallSection?.title
                        }
                      </h6>
                      <span className="bl" data-aos="fade-up">
                        {
                          pageData[COMPONENT_MORE_SUPPORT_VIDEO]
                            ?.moreSupportVideo?.smallSection?.titleIntro
                        }{" "}
                      </span>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          ) : (
            ""
          )}

          <div className="parent--happy-creation">
            <img src={P7} className="P7" alt="p7" />
            <img src={P8} className="P8" alt="p8" />
            <img src={P9} className="P9" alt="p9" />
            <img src={P10} className="P10" alt="p10" />

            <div className="happy-bakers">
              <Container>
                <div className="data-hidden">
                  <h4 data-aos="fade-up">
                    {pageData[COMPONENT_REVIEW]?.reviewDataTitle}
                  </h4>
                </div>
                <Row>
                  <Col sm={12} md={{ span: 10, offset: 1 }}>
                    {pageData[COMPONENT_REVIEW]?.Review?.length ? (
                      <OwlCarousel className="owl-theme" {...HBoptions}>
                        {pageData[COMPONENT_REVIEW]?.Review?.map(
                          (items: any, index: number) => (
                            <div className="item" key={"carousel-" + index}>
                              <div className="HB-review">
                                <div className="reviews-box">
                                  {createElements(items?.rating, index)}
                                </div>
                                <p className="bl blur-color">
                                  {items.description}
                                </p>
                                <p className="tm">{items.name}</p>
                              </div>
                            </div>
                          )
                        )}
                      </OwlCarousel>
                    ) : (
                      ""
                    )}
                  </Col>
                </Row>
              </Container>
            </div>

            <div className="creations-with-us">
              <Container>
                <Row>
                  <Col md={12} lg={{ span: 10, offset: 1 }}>
                    <div className="CWU-box">
                      <div className="img-block">
                        <Row>
                          {pageData[
                            COMPONENT_SHARE_YOUR_CREATION
                          ]?.shareYourCreation?.images?.map(
                            (items: any, index: number) => (
                              <Col
                                xs={6}
                                className="data-hidden"
                                key={"creation-" + index}
                              >
                                <div className="img-wrapper" data-aos="fade-up">
                                  <img src={items} alt="" />
                                </div>
                              </Col>
                            )
                          )}
                        </Row>
                      </div>
                      <div className="creation-content">
                        <div className="data-hidden">
                          <h4 data-aos="fade-up">
                            {
                              pageData[COMPONENT_SHARE_YOUR_CREATION]
                                ?.shareYourCreation?.title
                            }
                          </h4>
                        </div>
                        <div className="data-hidden">
                          <div className="hastags" data-aos="fade-up">
                            <span className="bl">
                              {
                                pageData[COMPONENT_SHARE_YOUR_CREATION]
                                  ?.shareYourCreation?.hashTags
                              }
                            </span>
                          </div>
                        </div>
                        <div className="data-hidden">
                          <p className="bl" data-aos="fade-up">
                            {
                              pageData[COMPONENT_SHARE_YOUR_CREATION]
                                ?.shareYourCreation?.titleIntro
                            }
                          </p>
                        </div>
                        <div className="data-hidden">
                          <div className="social-block" data-aos="fade-up">
                            {/* <a
                              target={"_blank"}
                              href={master?.footerData?.TWITTER}
                              className="social-links"
                            >
                              <img src={TW} alt="" />
                            </a> */}
                            <a
                              target={"_blank"}
                              href={master?.footerData?.FACEBOOK}
                              className="social-links"
                            >
                              <img src={FB} alt="" />
                            </a>
                            <a
                              target={"_blank"}
                              href={master?.footerData?.INSTAGRAM}
                              className="social-links"
                            >
                              <img src={INSTA} alt="" />
                            </a>
                            {/* <a
                              target={"_blank"}
                              href={master?.footerData?.PINTEREST}
                              className="social-links"
                            >
                              <img src={PIN} alt="" />
                            </a> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
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

export default HomePage;
