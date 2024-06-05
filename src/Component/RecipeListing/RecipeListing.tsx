import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import RL from "../../Assets/img/RL.png";
import CustomeButton from "../Common/CustomeButton/CustomeButton";
import Browse from "../../Assets/img/browse.svg";
import CloseIcon from "../../Assets/img/close.svg";
import { Link, useParams } from 'react-router-dom';
import { RECIPEDETAILS, RECIPELISTING } from "../../Constant/Route";
import { useDispatch, useSelector } from "react-redux";
import { SUCCESS_RESPONSE_CODE } from "../../Constant/Status";
import { getRecipesCategoryDetails } from "../../Redux/RecipeCategory/RecipeCategoryAction";
import { API_STATUS } from "../../Constant/Api";
import { RECIPE_CATEGORY_FAILD, RECIPE_CATEGORY_LONG, RECIPE_CATEGORY_REQUEST, RECIPE_CATEGORY_SUCCESS } from "../../Redux/RecipeCategory/RecipeCategoryTypes";
import Loader from "../Loader/Loader";
import SomethingWrong from "../SomethingWrong/SomethingWrong";
import { generateQuery } from "../../Utility/General";
import { COMPONENT_RECIPE_CATEGORY_CATEGORY_DETAIL, COMPONENT_RECIPE_CATEGORY_CHILD_CATEGORY_DETAIL, COMPONENT_RECIPE_CATEGORY_POST_DATA } from "../../Constant/Component";

const RecipeListing = () => {

  const dispatch = useDispatch();
  const [recipeCategoryData, setRecipeCategoryData] = useState<any>({});
  const [receipeCategoryApiStatus, setReceipeCategoryApiStatus] = useState<any>({});
  const recipeCategory = useSelector((state: any) => state?.getRecipesCategoryDetails?.data);
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
      dispatch(getRecipesCategoryDetails(generateQuery(queryParam)));
    }
  }, [queryParam]);

  useEffect(() => {
    let componentData: any = {}
    recipeCategory?.component?.forEach((component: any) => {
      componentData[component?.componentId] = component
    });
    setRecipeCategoryData({ ...componentData })
  }, [recipeCategory]);

  useSelector(((state: any) => {
    if (state?.getRecipesCategoryDetails?.type === RECIPE_CATEGORY_REQUEST) {
      if (receipeCategoryApiStatus !== API_STATUS.LOADING) {
        setReceipeCategoryApiStatus(API_STATUS.LOADING)
      }
    }
    else if (state?.getRecipesCategoryDetails?.data?.statusCode === SUCCESS_RESPONSE_CODE && state?.getRecipesCategoryDetails?.type === RECIPE_CATEGORY_SUCCESS) {
      if (receipeCategoryApiStatus !== API_STATUS.SUCCESS) {
        setReceipeCategoryApiStatus(API_STATUS.SUCCESS)
      }
    }
    else if (state?.getRecipesCategoryDetails?.type === RECIPE_CATEGORY_LONG) {
      if (receipeCategoryApiStatus !== API_STATUS.LONG) {
        setReceipeCategoryApiStatus(API_STATUS.LONG)
      }
    }
    else if (state?.getRecipesCategoryDetails?.type === RECIPE_CATEGORY_FAILD) {
      if (receipeCategoryApiStatus !== API_STATUS.FAILED) {
        setReceipeCategoryApiStatus(API_STATUS.FAILED)
      }
    }
  }))

  const toggleBrowseMenu = () => {
    setBrowseSide(!toggleBrowse);
  };

  const obj4: any = [
    {
      video: 'https://www.youtube.com/embed/qtlhdIfojmc',
      title: 'Chocolate Truffle Cupcake Instructions'
    },
    {
      video: 'https://www.youtube.com/embed/H-PxDQf-_Zg',
      title: 'Gluten Free Vanilla Cake Instructions'
    },
    {
      video: 'https://www.youtube.com/embed/AriLkH_5JTk',
      title: 'Chocolate-Espresso Frosting Instructions'
    },
    {
      video: 'https://www.youtube.com/embed/2utgqRCAIr4',
      title: 'Raspberry Cake Instructions'
    },
    {
      video: 'https://www.youtube.com/embed/cYo8j29B2-A',
      title: 'Red Velvet Cupcake Instructions'
    },
    {
      video: 'https://www.youtube.com/embed/qbfEJqZamdw',
      title: 'Gluten Free Confetti Cake Instructions'
    }
  ];


  switch (receipeCategoryApiStatus) {
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
                      <img src={recipeCategoryData[COMPONENT_RECIPE_CATEGORY_CATEGORY_DETAIL]?.categoryDetails.image} alt="" />
                    </Col>
                    <Col sm={12} md={6}>
                      <div className="this-content-wrapper">
                        <div className="this-content">
                          <h1>{recipeCategoryData[COMPONENT_RECIPE_CATEGORY_CATEGORY_DETAIL]?.categoryDetails.name}</h1>
                          <p className="bl">{recipeCategoryData[COMPONENT_RECIPE_CATEGORY_CATEGORY_DETAIL]?.categoryDetails.description}</p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>

                <div className="BBSW-deropdown">
                  <div className="browse-btn-wrapper">
                    <div className="browse-btn" onClick={() => toggleBrowseMenu()}>
                      <img src={Browse} alt="" />
                      <p className="ts">Browse by</p>
                    </div>
                  </div>
                  <div className={`i-filter ${toggleBrowse ? "active" : ""}`}>
                    <div className="i-filter-header">
                      <p className="tl">Browse by</p>
                      <img
                        src={CloseIcon}
                        alt=""
                        onClick={() => toggleBrowseMenu()}
                      />
                    </div>

                    <div className="menu-wrapper">
                      {
                        recipeCategoryData[COMPONENT_RECIPE_CATEGORY_CHILD_CATEGORY_DETAIL]?.childCategoryDetails?.list?.map((items: any, key: any) => {
                          //return <p key={'recipte-child-category-' + key} className="tm">{items.childCategoryName}</p>
                          return <Link to={RECIPELISTING + '/' + items.childCategorUrl} key={'recipte-child-category-' + key} className="tm">{items.childCategoryName}</Link>
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
                    {recipeCategoryData[COMPONENT_RECIPE_CATEGORY_POST_DATA]?.postData?.list?.map((items: any, index: number) => (
                      <Col xs={12} sm={12} md={6} lg={4} key={index}>
                        <div className="video-boxes">
                          <div className="iframe-container">
                            {items.youtubeLink && items.youtubeLink != "" ?
                              <iframe
                                width="100%"
                                height="100%"
                                src={items.youtubeLink}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              ></iframe>
                              :
                              <Link to={RECIPEDETAILS + '/' + items.postUrlkey} className="product-and-title">
                                <img src={items.recipeImage} alt="" />
                              </Link>
                            }
                          </div>
                          <div className="content-wrapper">
                            <Link to={RECIPEDETAILS + '/' + items.postUrlkey} className="bl">{items.postName}</Link>
                          </div>
                        </div>
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

export default RecipeListing;
