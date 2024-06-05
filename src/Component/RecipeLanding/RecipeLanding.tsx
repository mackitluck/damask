import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import RBanner from "../../Assets/img/recipe-banner.png";
import CustomeButton from "../Common/CustomeButton/CustomeButton";
import TC1 from "../../Assets/img/TC1.png";
import TC2 from "../../Assets/img/TC2.png";
import TC3 from "../../Assets/img/TC3.png";
import Browse from "../../Assets/img/browse.svg";
import CloseIcon from "../../Assets/img/close.svg";
import { Link, useNavigate } from 'react-router-dom';
import { RECIPEDETAILS, RECIPELISTING } from "../../Constant/Route";
import { useDispatch, useSelector } from "react-redux";
import { getRecipesList } from "../../Redux/Recipe/RecipeAction";
import { COMPONENT_RECIPE_CATEGORY, COMPONENT_RECIPE_RECIPE_DETAILS, COMPONENT_RECIPE_TOP_CATEGORY, COMPONENT_RECIPE_TOP_RECIPE } from "../../Constant/Component";
import { API_STATUS } from "../../Constant/Api";
import Loader from "../Loader/Loader";
import SomethingWrong from "../SomethingWrong/SomethingWrong";
import { SUCCESS_RESPONSE_CODE } from "../../Constant/Status";
import { RECIPE_FAILD, RECIPE_LONG, RECIPE_REQUEST, RECIPE_SUCCESS } from "../../Redux/Recipe/RecipeTypes";
import { RECIPE_LANDING } from "../../Language/Recipe";

const RecipeLanding = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [receipes, setReceipes] = useState<any>({});
  const [receipeApiStatus, setReceipeApiStatus] = useState<any>({});
  const receipesData = useSelector((state: any) => state?.getRecipesList?.data);
  const [toggleBrowse, setBrowseSide] = useState(false);

  useEffect(() => {
    dispatch(getRecipesList())
  }, [])

  useEffect(() => {
    let componentData: any = {}
    receipesData?.component?.forEach((component: any) => {
      componentData[component?.componentId] = component
    });
    setReceipes({ ...componentData })
  }, [receipesData]);

  useSelector(((state: any) => {
    if (state?.getRecipesList?.type === RECIPE_REQUEST) {
      if (receipeApiStatus !== API_STATUS.LOADING) {
        setReceipeApiStatus(API_STATUS.LOADING)
      }
    }
    else if (state?.getRecipesList?.data?.statusCode === SUCCESS_RESPONSE_CODE && state?.getRecipesList?.type === RECIPE_SUCCESS) {
      if (receipeApiStatus !== API_STATUS.SUCCESS) {
        setReceipeApiStatus(API_STATUS.SUCCESS)
      }
    }
    else if (state?.getRecipesList?.type === RECIPE_LONG) {
      if (receipeApiStatus !== API_STATUS.LONG) {
        setReceipeApiStatus(API_STATUS.LONG)
      }
    }
    else if (state?.getRecipesList?.type === RECIPE_FAILD) {
      if (receipeApiStatus !== API_STATUS.FAILED) {
        setReceipeApiStatus(API_STATUS.FAILED)
      }
    }
  }))

  const toggleBrowseMenu = () => {
    setBrowseSide(!toggleBrowse);
  };

  const obj3: any = [
    {
      imgs: TC1,
      title: "Cakes",
    },
    {
      imgs: TC2,
      title: "Cupcakes",
    },
    {
      imgs: TC3,
      title: "Frosting",
    }
  ];


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


  switch (receipeApiStatus) {
    case API_STATUS.LOADING:
      return (<Loader></Loader>);
    case API_STATUS.SUCCESS:
      return (
        <div className="recipe-landing">
          <Container>
            <Row>
              <Col lg={12} xl={{ span: 10, offset: 1 }}>
                <div className="recipe-landing-header">
                  <Row>
                    <Col sm={12} md={6}>
                      <img src={receipes[COMPONENT_RECIPE_RECIPE_DETAILS]?.recipeDetails.recipe_logo} alt="" />
                    </Col>
                    <Col sm={12} md={6}>
                      <div className="this-content-wrapper">
                        <div className="this-content">
                          <h1>{receipes[COMPONENT_RECIPE_RECIPE_DETAILS]?.recipeDetails.recipe_title}</h1>
                          <p className="bl">
                            {receipes[COMPONENT_RECIPE_RECIPE_DETAILS]?.recipeDetails.recipe_details}
                          </p>
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
                        receipes[COMPONENT_RECIPE_CATEGORY]?.categoryData?.list?.map((items: any, key: any) => {
                          return <Link to={RECIPELISTING + '/' + items.urlKey} key={'recipte-category-' + key} className="tm">{items.name}</Link>
                        })
                      }
                    </div>
                  </div>
                </div>

                <div className="top-categories">
                  <div className="this-header">
                    <h4>{RECIPE_LANDING.TOP_CATEGORIES}</h4>
                    {/* <a className="pages-link">{RECIPE_LANDING.VIEW_ALL}</a> */}
                  </div>
                  <Row>
                    {receipes[COMPONENT_RECIPE_TOP_CATEGORY]?.topCategoriesData?.list?.map((items: any, index: number) => (
                      <Col xs={12} sm={6} md={4} key={index}>
                        {/* <a onClick={() => navigate(RECIPELISTING)} className="product-and-title"> */}
                        <Link to={RECIPELISTING + '/' + items.urlKey} className="product-and-title">
                          <div className="img">
                            <img src={items.image} alt="" />
                          </div>
                          <div className="content">
                            <p className="bm">{items.name}</p>
                          </div>
                        </Link>
                        {/* </a> */}
                      </Col>
                    ))}
                  </Row>
                </div>

                <div className="top-recipes">
                  <div className="this-header">
                    <h4>{RECIPE_LANDING.TOP_RECIPE}</h4>
                    {/* <a className="pages-link">{RECIPE_LANDING.VIEW_ALL}</a> */}
                  </div>
                  <Row>
                    {receipes[COMPONENT_RECIPE_TOP_RECIPE]?.topRecipesData?.list?.map((items: any, index: number) => (
                      <Col xs={12} sm={12} md={6} lg={4} key={index}>
                        <div className="video-boxes">
                          <div className="iframe-container">
                            {items.youTubeLink && items.youTubeLink != "" ?
                              <iframe
                                width="100%"
                                height="100%"
                                src={items.youTubeLink}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              ></iframe>
                              :
                              <Link to={RECIPEDETAILS + '/' + items.urlKey} className="product-and-title">
                              <img src={items.recipeImage} alt="" />
                              </Link>
                            }
                          </div>


                          <div className="content-wrapper">
                            <Link to={RECIPEDETAILS + '/' + items.urlKey} className="bl">{items.recipeName}</Link>
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


};

export default RecipeLanding;
