import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Browse from "../../Assets/img/browse.svg";
import CloseIcon from "../../Assets/img/close.svg";
import { Link, useParams } from 'react-router-dom';
import { INSPIRATIONCATEGORY, INSPIRATIONDETAILS } from "../../Constant/Route";
import { useDispatch, useSelector } from "react-redux";
import { SUCCESS_RESPONSE_CODE } from "../../Constant/Status";
import { API_STATUS } from "../../Constant/Api";
import Loader from "../Loader/Loader";
import SomethingWrong from "../SomethingWrong/SomethingWrong";
import { generateQuery } from "../../Utility/General";
import { COMPONENT_RECIPE_CATEGORY_CATEGORY_DETAIL, COMPONENT_RECIPE_CATEGORY_CHILD_CATEGORY_DETAIL, COMPONENT_RECIPE_CATEGORY_POST_DATA } from "../../Constant/Component";
import { getInspirationCategoryDetails } from "../../Redux/InspirationCategory/InspirationCategoryAction";
import { INSPIRATION_CATEGORY_FAILD, INSPIRATION_CATEGORY_LONG, INSPIRATION_CATEGORY_REQUEST, INSPIRATION_CATEGORY_SUCCESS } from "../../Redux/InspirationCategory/InspirationCategoryTypes";
import COMMON from "../../Language/Common";
import LazyImage from "../Common/LazyImage/LazyImage";

const InspirationCategory = () => {

  const dispatch = useDispatch();
  const [inspirationCategoryData, setInspirationCategoryData] = useState<any>({});
  const [inspirationCategoryApiStatus, setInspirationCategoryApiStatus] = useState<any>({});
  const inspirationCategory = useSelector((state: any) => state?.getInspirationCategoryDetails?.data);
  const urlParams = useParams();
  let urlKey = urlParams.category;
  const [queryParam, setQueryParam] = useState({
    urlKey: urlParams.category,
  });
  const [toggleBrowse, setBrowseSide] = useState(false);
  useEffect(() => {
    let queryParamLocal = Object.assign({}, queryParam);
    queryParamLocal.urlKey = urlKey;
    if (queryParam.urlKey != urlKey) setQueryParam({ ...queryParamLocal });
    // dispatch(productDetailAction(generateQuery(queryParam)));
  }, [urlKey]);

  useEffect(() => {
    if (queryParam) {
      dispatch(getInspirationCategoryDetails(generateQuery(queryParam)));
    }
  }, [queryParam]);  

  useEffect(() => {
    let componentData: any = {}
    inspirationCategory?.component?.forEach((component: any) => {
      componentData[component?.componentId] = component
    });
    setInspirationCategoryData({ ...componentData })
  }, [inspirationCategory]);

  useSelector(((state: any) => {
    if (state?.getInspirationCategoryDetails?.type === INSPIRATION_CATEGORY_REQUEST) {
      if (inspirationCategoryApiStatus !== API_STATUS.LOADING) {
        setInspirationCategoryApiStatus(API_STATUS.LOADING)
      }
    }
    else if (state?.getInspirationCategoryDetails?.data?.statusCode === SUCCESS_RESPONSE_CODE && state?.getInspirationCategoryDetails?.type === INSPIRATION_CATEGORY_SUCCESS) {
      if (inspirationCategoryApiStatus !== API_STATUS.SUCCESS) {
        setInspirationCategoryApiStatus(API_STATUS.SUCCESS)
      }
    }
    else if (state?.getInspirationCategoryDetails?.type === INSPIRATION_CATEGORY_LONG) {
      if (inspirationCategoryApiStatus !== API_STATUS.LONG) {
        setInspirationCategoryApiStatus(API_STATUS.LONG)
      }
    }
    else if (state?.getInspirationCategoryDetails?.type === INSPIRATION_CATEGORY_FAILD) {
      if (inspirationCategoryApiStatus !== API_STATUS.FAILED) {
        setInspirationCategoryApiStatus(API_STATUS.FAILED)
      }
    }
  }))

  const toggleBrowseMenu = () => {
    setBrowseSide(!toggleBrowse);
  };

  


  switch (inspirationCategoryApiStatus) {
    case API_STATUS.LOADING:
      return (<Loader></Loader>);
    case API_STATUS.SUCCESS:
      return (
        <div className="recipe-listing">
          <Container>
            <Row>
              <Col lg={12} xl={{ span: 10, offset: 1 }}>
                <div className="recipe-listing-header">
                  <Row>
                    <Col sm={12} md={6}>
                      <img src={inspirationCategoryData[COMPONENT_RECIPE_CATEGORY_CATEGORY_DETAIL]?.categoryDetails.image} alt="" />
                    </Col>
                    <Col sm={12} md={6}>
                      <div className="this-content-wrapper">
                        <div className="this-content">
                          <h1>{inspirationCategoryData[COMPONENT_RECIPE_CATEGORY_CATEGORY_DETAIL]?.categoryDetails.name}</h1>
                          <p className="bl">{inspirationCategoryData[COMPONENT_RECIPE_CATEGORY_CATEGORY_DETAIL]?.categoryDetails.description}</p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
    
                <div className="BBSW-deropdown">
                  <div className="browse-btn-wrapper">
                    <div className="browse-btn" onClick={() => toggleBrowseMenu()}>
                      <img src={Browse} alt="" />
                      <p className="ts">{COMMON.BROWSE_BY}</p>
                    </div>
                  </div>
                  <div className={`i-filter ${toggleBrowse ? "active" : ""}`}>
                    <div className="i-filter-header">
                      <p className="tl">{COMMON.BROWSE_BY}</p>
                      <img
                        src={CloseIcon}
                        alt=""
                        onClick={() => toggleBrowseMenu()}
                      />
                    </div>
    
                    <div className="menu-wrapper">
                      {
                        inspirationCategoryData[COMPONENT_RECIPE_CATEGORY_CHILD_CATEGORY_DETAIL]?.childCategoryDetails?.list?.map((items: any, key: any) => {
                          //return <p key={'recipte-child-category-' + key} className="tm">{items.childCategoryName}</p>
                          return <Link to={INSPIRATIONCATEGORY + '/' + items.childCategorUrl} key={'recipte-child-category-' + key} className="tm">{items.childCategoryName}</Link>
                        })
                      }
                    </div>
    
                    {/* <div className="i-filter-footer">
                      <CustomeButton bg="fill">Apply</CustomeButton>
                      <CustomeButton>Clear</CustomeButton>
                    </div> */}
                  </div>
                </div>
    
    
                <div className="recipe-listing-content">
                  <Row>
                    {inspirationCategoryData[COMPONENT_RECIPE_CATEGORY_POST_DATA]?.postData?.list?.map((items: any, index: number) => (
                      <Col xs={12} sm={12} md={6} lg={4} key={index}>
                        <Link to={INSPIRATIONDETAILS + '/' + items.postUrlkey} className="product-and-title">
                        <div className="video-boxes">
                        <LazyImage type="rectangle" src={items.postImage} alt=""></LazyImage>
                          <div className="content-wrapper">
                            <p className="bl">{items.postName}</p>
                          </div>
                        </div>
                        </Link>
                      </Col>
                    ))}
                  </Row>
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

  
}

export default InspirationCategory;
