import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CustomeButton from "../Common/CustomeButton/CustomeButton";
import BrowseBy from "../Common/BrowseBy/BrowseBy";
import First1 from "../../Assets/img/first1.png";
import First2 from "../../Assets/img/first2.png";
import First3 from "../../Assets/img/first3.png";
import Second from "../../Assets/img/second.png";
import Pin from "../../Assets/img/pin.svg";
import FB from "../../Assets/img/fb-round.svg";
import TW from "../../Assets/img/twitter.svg";
import Share from "../../Assets/img/share.svg";
import Third1 from "../../Assets/img/third1.png";
import Third2 from "../../Assets/img/third2.png";
import Third3 from "../../Assets/img/third3.png";
import Fourth1 from "../../Assets/img/Fourth1.png";
import Fourth2 from "../../Assets/img/Fourth2.png";
import Fourth3 from "../../Assets/img/Fourth3.png";
import Fourth4 from "../../Assets/img/Fourth4.png";
import Fourth5 from "../../Assets/img/Fourth5.png";
import Fourth6 from "../../Assets/img/Fourth6.png";
import Fifth1 from "../../Assets/img/fifth1.png";
import Fifth2 from "../../Assets/img/fifth2.png";
import Fifth3 from "../../Assets/img/fifth3.png";
import Fifth4 from "../../Assets/img/fifth4.png";
import Recipe1 from "../../Assets/img/recipe1.png";
import Recipe2 from "../../Assets/img/recipe2.png";
import { Link, useNavigate } from 'react-router-dom';
import { INSPIRATIONCATEGORY, INSPIRATIONDETAILS } from "../../Constant/Route";
import LazyImage from "../Common/LazyImage/LazyImage";
import { useDispatch, useSelector } from "react-redux";
import { getInspirationList } from "../../Redux/Inspiration/InspirationAction";
import { SUCCESS_RESPONSE_CODE } from "../../Constant/Status";
import { INSPIRATION_FAILD, INSPIRATION_LONG, INSPIRATION_REQUEST, INSPIRATION_SUCCESS } from "../../Redux/Inspiration/InspirationTypes";
import { API_STATUS } from "../../Constant/Api";
import Loader from "../Loader/Loader";
import SomethingWrong from "../SomethingWrong/SomethingWrong";
import { INSPIRATION_LISTING } from "../../Language/Inspiration";
import { COMPONENT_INSPIRATION_BEST_BAKING_DATA, COMPONENT_INSPIRATION_BLOG_ON_LANDING_DATA, COMPONENT_INSPIRATION_OCCATION_DATA, COMPONENT_INSPIRATION_RESOURCE_CENTER, COMPONENT_INSPIRATION_TOP_INSPIRATION_DATA, COMPONENT_INSPIRATION_SEASONS_DATA, COMPONENT_INSPIRATION_RECIPE_OF_THE_MONTH_DATA } from "../../Constant/Component";
import { FacebookShareButton, PinterestShareButton, PinterestShareCount, TwitterShareButton } from "react-share";
import COMMON from "../../Language/Common";

const InspirationListing = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [inspirations, setInspirations] = useState<any>({});
  const [inspirationApiStatus, setInspirationApiStatus] = useState<any>({});
  const inspirationsData = useSelector((state: any) => state?.getInspirationList?.data);

  useEffect(() => {
    dispatch(getInspirationList())
  }, [])

  useEffect(() => {
    let componentData: any = {}
    inspirationsData?.component?.forEach((component: any) => {
      componentData[component?.componentId] = component
    });
    setInspirations({ ...componentData })
  }, [inspirationsData]);

  useSelector(((state: any) => {
    if (state?.getInspirationList?.type === INSPIRATION_REQUEST) {
      if (inspirationApiStatus !== API_STATUS.LOADING) {
        setInspirationApiStatus(API_STATUS.LOADING)
      }
    }
    else if (state?.getInspirationList?.data?.statusCode === SUCCESS_RESPONSE_CODE && state?.getInspirationList?.type === INSPIRATION_SUCCESS) {
      if (inspirationApiStatus !== API_STATUS.SUCCESS) {
        setInspirationApiStatus(API_STATUS.SUCCESS)
      }
    }
    else if (state?.getInspirationList?.type === INSPIRATION_LONG) {
      if (inspirationApiStatus !== API_STATUS.LONG) {
        setInspirationApiStatus(API_STATUS.LONG)
      }
    }
    else if (state?.getInspirationList?.type === INSPIRATION_FAILD) {
      if (inspirationApiStatus !== API_STATUS.FAILED) {
        setInspirationApiStatus(API_STATUS.FAILED)
      }
    }
  }))

  const obj1: any = [
    {
      imgs: First1,
      title: "Days That Are Better With Cake",
    },
    {
      imgs: First2,
      title: "Cookies & Cream Pie (Oreo)",
    },
    {
      imgs: First3,
      title: "Blueberry Oatmeal Muffins",
    },
  ];

  const obj2: any = [
    {
      imgs: Third1,
      title: "Cake pan sizes & conversions",
      content:
        "Aliquam sit amet luctus elit. Ut malesuada vulputate dolor sed interdum. Sed non enim ut lacus auctor vulputate.",
    },
    {
      imgs: Third2,
      title: "Beginner’s guide to yeast",
      content:
        "Aliquam sit amet luctus elit. Ut malesuada vulputate dolor sed interdum. Sed non enim ut lacus auctor vulputate.",
    },
    {
      imgs: Third3,
      title: "Homemade vanilla extract",
      content:
        "Aliquam sit amet luctus elit. Ut malesuada vulputate dolor sed interdum. Sed non enim ut lacus auctor vulputate.",
    },
  ];

  const obj3: any = [
    {
      imgs: Fourth1,
      title: "Birthday",
    },
    {
      imgs: Fourth2,
      title: "Christmas",
    },
    {
      imgs: Fourth3,
      title: "Easter",
    },
    {
      imgs: Fourth4,
      title: "Halloween",
    },
    {
      imgs: Fourth5,
      title: "Thanksgiving",
    },
    {
      imgs: Fourth6,
      title: "Valentine’s Day",
    },
  ];

  const obj4: any = [
    {
      imgs: Fifth1,
      title: "Fall",
    },
    {
      imgs: Fifth2,
      title: "Spring",
    },
    {
      imgs: Fifth3,
      title: "Summer",
    },
    {
      imgs: Fifth4,
      title: "Winter",
    },
  ];

  const toggleReadMore = (e:any) => {
    let contains = e.target.closest(".bl").classList;
    if (contains.contains("review-ellipsis")) {
      contains.remove('review-ellipsis')
      e.target.innerHTML = 'Read Less'
    } else {
      contains.add('review-ellipsis')
      e.target.innerHTML = 'Read More'
    }
  }

  switch (inspirationApiStatus) {
    case API_STATUS.LOADING:
      return (<Loader></Loader>);
    case API_STATUS.SUCCESS:
      return (
        <div className="inspiration-listing">
          <Container>
            <Row>
              <Col lg={12} xl={{ span: 10, offset: 1 }}>
                <div className="IL-wrapper">
                  <h2>{INSPIRATION_LISTING.INSPIRATION}</h2>

                  <BrowseBy data={inspirations[COMPONENT_INSPIRATION_RESOURCE_CENTER]?.resourceCenterData?.list} />

                  <div className="first-block">
                    <Row>
                      {inspirations[COMPONENT_INSPIRATION_TOP_INSPIRATION_DATA]?.topInspirationData?.list?.map((items: any, index: number) => (
                        <Col xs={12} sm={6} md={4} key={index}>
                          <Link to={INSPIRATIONDETAILS + '/' + items.inspirationurlKey} className="product-and-title">
                            <div className="img">
                              <LazyImage type="rectangle" src={items.inspirationimage} alt=""></LazyImage>
                            </div>
                            <div className="content">
                              <p className="bm">{items.inspirationName}</p>
                            </div>
                          </Link>
                        </Col>
                      ))}
                    </Row>
                  </div>
                  <div className="second-block">
                    <div className="img-wrapper">
                      <LazyImage type="rectangle" src={inspirations[COMPONENT_INSPIRATION_BLOG_ON_LANDING_DATA]?.blogOnLandingData?.blogOnLandingImage} alt=""></LazyImage>
                      {/* <img src={Second} alt="" /> */}
                    </div>
                    <div className="content-wrapper">
                      <Link to={INSPIRATIONDETAILS + '/' + inspirations[COMPONENT_INSPIRATION_BLOG_ON_LANDING_DATA]?.blogOnLandingData?.blogOnLandingUrlKey}>
                        <h3>
                          {inspirations[COMPONENT_INSPIRATION_BLOG_ON_LANDING_DATA]?.blogOnLandingData?.blogOnLandingName}
                        </h3>
                      </Link>
                      <span className="bm">{inspirations[COMPONENT_INSPIRATION_BLOG_ON_LANDING_DATA]?.blogOnLandingData?.creationDate}</span>
                      <p className="bl review-ellipsis">
                        {inspirations[COMPONENT_INSPIRATION_BLOG_ON_LANDING_DATA]?.blogOnLandingData?.blogOnLandingSortDes}
                        <div className="review-read-more">
                          <a className="read-more-txt pages-link" onClick={(e) => toggleReadMore(e)}>Read More</a>
                        </div>
                      </p>
                      <div className="social-box-wrapper">
                        <div className="social-boxes">

                          <CustomeButton>
                            <PinterestShareButton url={window.location.href} media={inspirations[COMPONENT_INSPIRATION_BLOG_ON_LANDING_DATA]?.blogOnLandingData?.blogOnLandingImage}>
                              <img src={Pin} alt="" />
                              <p className="ts">
                                {
                              //inspirations[COMPONENT_INSPIRATION_BLOG_ON_LANDING_DATA]?.blogOnLandingData?.socialMedia?.pinterest
                              <PinterestShareCount
                                    url={inspirations[COMPONENT_INSPIRATION_BLOG_ON_LANDING_DATA]?.blogOnLandingData?.blogOnLandingImage}
                                  />
                              }</p>
                            </PinterestShareButton>
                          </CustomeButton>

                          <CustomeButton>
                            <FacebookShareButton url={window.location.href}>
                              <img src={FB} alt="" />
                              {/* <p className="ts">
                                {inspirations[COMPONENT_INSPIRATION_BLOG_ON_LANDING_DATA]?.blogOnLandingData?.socialMedia?.facebook}
                              </p> */}
                            </FacebookShareButton>
                          </CustomeButton>

                          <CustomeButton>
                            <TwitterShareButton url={window.location.href} title={inspirations[COMPONENT_INSPIRATION_BLOG_ON_LANDING_DATA]?.blogOnLandingData?.blogOnLandingName}>
                              <img src={TW} alt="" />
                              {/* <p className="ts">
                                {inspirations[COMPONENT_INSPIRATION_BLOG_ON_LANDING_DATA]?.blogOnLandingData?.socialMedia?.twitter}
                              </p> */}
                            </TwitterShareButton>
                          </CustomeButton>

                        </div>
                        <div className="share-block d-none">
                          <a className="share-data">
                            <img src={Share} alt="" />
                            <div className="share-content">
                              <p className="bm">{inspirations[COMPONENT_INSPIRATION_BLOG_ON_LANDING_DATA]?.blogOnLandingData?.socialMedia?.totalShare}</p>
                              <span className="ls">{COMMON.SHARES}</span>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="third-block">
                    <div className="this-header">
                      <h4>{INSPIRATION_LISTING.BEST_BAKING_TIPS}</h4>
                      {/* <a className="pages-link">{COMMON.READ_ALL}</a> */}
                      <Link to={INSPIRATIONCATEGORY + '/' + inspirations[COMPONENT_INSPIRATION_BEST_BAKING_DATA]?.urlKey} className="pages-link">{COMMON.READ_ALL}</Link>
                    </div>
                    <Row>
                      {inspirations[COMPONENT_INSPIRATION_BEST_BAKING_DATA]?.bestBakingData?.list?.map((items: any, index: number) => (
                        <Col sm={12} md={6} lg={4} key={index}>
                          <div className="tips-box">
                            <Link to={INSPIRATIONDETAILS + '/' + items.bestBakingTipKey} className="img">
                              <LazyImage type="rectangle" src={items.bestBakingTipImage} alt=""></LazyImage>
                            </Link>
                            <div className="content">
                              <Link to={INSPIRATIONDETAILS + '/' + items.bestBakingTipKey} className="title">
                                <h6>{items.bestBakingTipName}</h6>
                              </Link>
                              <p className="bm">{items.bestBakingTipSortDes}</p>
                            </div>
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </div>

                  <div className="fourth-block">
                    <div className="this-header">
                      <h4>{INSPIRATION_LISTING.OCCATIONS}</h4>
                      {/* <a className="pages-link">{COMMON.VIEW_ALL}</a> */}
                      <Link to={INSPIRATIONCATEGORY + '/' + inspirations[COMPONENT_INSPIRATION_OCCATION_DATA]?.urlKey} className="pages-link">{COMMON.VIEW_ALL}</Link>
                    </div>
                    <Row>
                      {inspirations[COMPONENT_INSPIRATION_OCCATION_DATA]?.occasionsData?.list?.map((items: any, index: number) => (
                        <Col xs={12} sm={6} md={4} key={index}>
                          <Link to={INSPIRATIONCATEGORY + '/' + items.urlKey} className="product-and-title">
                            <div className="img">
                              <img src={items.image} alt="" />
                            </div>
                            <div className="content">
                              <p className="bm">{items.name}</p>
                            </div>
                          </Link>
                        </Col>
                      ))}
                    </Row>
                  </div>

                  <div className="fifth-block">
                    <div className="this-header">
                      <h4>{INSPIRATION_LISTING.SESSONS}</h4>
                      {/* <a className="pages-link">{COMMON.VIEW_ALL}</a> */}
                      <Link to={INSPIRATIONCATEGORY + '/' + inspirations[COMPONENT_INSPIRATION_SEASONS_DATA]?.urlKey} className="pages-link">{COMMON.VIEW_ALL}</Link>
                    </div>
                    <Row>
                      {inspirations[COMPONENT_INSPIRATION_SEASONS_DATA]?.seasonsData?.list?.map((items: any, index: number) => (
                        <Col xs={6} sm={6} md={3} key={index}>
                          <Link to={INSPIRATIONCATEGORY + '/' + items.urlKey} className="product-and-title">
                            <div className="img">
                              <img src={items.image} alt="" />
                            </div>
                            <div className="content">
                              <p className="bm">{items.name}</p>
                            </div>
                          </Link>
                        </Col>
                      ))}
                    </Row>
                  </div>

                  <div className="recipe-of-month">
                    <div className="ROM-wrapper">
                      <div className="top-block">
                        <h4>{inspirations[COMPONENT_INSPIRATION_RECIPE_OF_THE_MONTH_DATA]?.recipiesOfTheMonthData?.inspirationTitle}</h4>
                        <p className="bl">{inspirations[COMPONENT_INSPIRATION_RECIPE_OF_THE_MONTH_DATA]?.recipiesOfTheMonthData?.inspirationDetails}</p>
                      </div>
                      <div className="left-block">
                        <a className="product-and-title">
                          <div className="img">
                            <img src={inspirations[COMPONENT_INSPIRATION_RECIPE_OF_THE_MONTH_DATA]?.recipiesOfTheMonthData?.inspirationImage} alt="" />
                          </div>
                          <div className="content">
                            <p className="bm">{inspirations[COMPONENT_INSPIRATION_RECIPE_OF_THE_MONTH_DATA]?.recipiesOfTheMonthData?.inspirationPostTitle}</p>
                          </div>
                        </a>
                      </div>
                      <div className="right-block">
                        <a className="product-and-title">
                          <div className="img">
                            <img src={inspirations[COMPONENT_INSPIRATION_RECIPE_OF_THE_MONTH_DATA]?.recipiesOfTheMonthData?.inspirationCustomerImage} alt="" />
                          </div>
                          <div className="content">
                            <p className="bm">{inspirations[COMPONENT_INSPIRATION_RECIPE_OF_THE_MONTH_DATA]?.recipiesOfTheMonthData?.inspirationCustomerName}</p>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      );
    case API_STATUS.LONG:
      return (<SomethingWrong></SomethingWrong>);
    case API_STATUS.FAILED:
      return (<SomethingWrong></SomethingWrong>);
    default:
      return (<Loader></Loader>);
  }
};

export default InspirationListing;
