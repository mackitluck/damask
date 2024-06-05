import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import CustomeButton from "../Common/CustomeButton/CustomeButton";
import ProductBox from "../Common/ProductBox/ProductBox";
import SimpleSteps from "../Common/SimpleSteps/SimpleSteps";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { PRODUCTDETAIL } from "../../Constant/Route";
import { API_STATUS } from "../../Constant/Api";
import { useDispatch, useSelector } from "react-redux";
import {
  categoryListAction,
  productListAction,
} from "../../Redux/ProductList/ProductListAction";
import {
  PRODUCT_LIST_CLEAR,
  PRODUCT_LIST_FAILD,
  PRODUCT_LIST_LONG,
  PRODUCT_LIST_NO_DATA,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../../Redux/ProductList/ProductListTypes";
import { SUCCESS_RESPONSE_CODE } from "../../Constant/Status";
import { generateQuery } from "../../Utility/General";
import {
  COMPONENT_PRODUCT_LIST,
  COMPONENT_PRODUCT_LIST_BANNER_DATA,
  COMPONENT_PRODUCT_LIST_SIMPLE_STEP,
  COMPONENT_PRODUCT_LIST_SORT_FILTER_BAR,
} from "../../Constant/Component";
import Loader from "../Loader/Loader";
import SomethingWrong from "../SomethingWrong/SomethingWrong";
import NoDataFound from "../NoDataFound/NoDataFound";
import { sortAndDeduplicateDiagnostics } from "typescript";
import { useParams } from "react-router-dom";
import PRODUCT_LIST from "../../Language/ProductList";
import * as localStorageConstant from "../../Constant/LocalStorage";

const ProductListing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location: any = useLocation();
  const [apiStatus, setApiStatus] = useState(API_STATUS.LOADING);
  const [productListData, setProductListData] = useState<any>({});
  const productList = useSelector((state: any) => state?.productList?.data);
  const [categoryList, setCategoryList] = useState<any>({});
  const categoryListData = useSelector(
    (state: any) => state?.categoryList?.data
  );
  const master = useSelector((state: any) => state?.master?.data);
  const [listData, setListData] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [totalProductCount, setTotalProductCount] = useState(12);
  const [urlKey, setUrlKey] = useState<string>();
  const urlParams = useParams();
  let category: any = urlParams.subcat ? urlParams.subcat : urlParams.category;

  if (typeof category === "undefined") {
    category = master?.shopNowUrl;
  }

  const [queryParam, setQueryParam] = useState({
    categoryUrlkey: category,
    brandId: "",
    sortId: 4,
    pageSize: 12,
    page: 1,
  });

  useEffect(() => {
    let queryParamLocal = Object.assign({}, queryParam);
    queryParamLocal.categoryUrlkey = category;
    if (queryParam.categoryUrlkey != category)
      setQueryParam({ ...queryParamLocal });
    dispatch(categoryListAction({ categoryUrlkey: category }));
  }, [category]);

  useEffect(() => {
    dispatch(productListAction(generateQuery(queryParam)));
  }, [queryParam]);

  useEffect(() => {}, [listData]);

  useSelector((state: any) => {
    if (state?.productList?.type === PRODUCT_LIST_REQUEST) {
      if (apiStatus !== API_STATUS.LOADING) {
        setApiStatus(API_STATUS.LOADING);
      }
    } else if (
      state?.productList?.data?.statusCode === SUCCESS_RESPONSE_CODE &&
      state?.productList?.type === PRODUCT_LIST_SUCCESS
    ) {
      if (apiStatus !== API_STATUS.SUCCESS) {
        setApiStatus(API_STATUS.SUCCESS);
        localStorage.removeItem(localStorageConstant.CONFIGURABLE_DATA);
        localStorage.removeItem(localStorageConstant.PRODUCTQUERY);
      }
    } else if (state?.productList?.type === PRODUCT_LIST_LONG) {
      if (apiStatus !== API_STATUS.LONG) {
        setApiStatus(API_STATUS.LONG);
      }
    } else if (state?.productList?.type === PRODUCT_LIST_NO_DATA) {
      if (apiStatus !== API_STATUS.NO_DATA) {
        setApiStatus(API_STATUS.NO_DATA);
      }
    } else if (state?.productList?.type === PRODUCT_LIST_FAILD) {
      if (apiStatus !== API_STATUS.FAILED) {
        setApiStatus(API_STATUS.FAILED);
      }
    }
  });

  useEffect(() => {
    let componentData: any = {};
    productList?.component?.forEach((component: any) => {
      componentData[component?.componentId] = component;
      if (component?.componentId === COMPONENT_PRODUCT_LIST) {
        setListData(component?.componentProductListData);
      }
      setProductListData({ ...componentData });
      setTotalProductCount(productList.totalItem);
    });
  }, [productList]);

  const sortData = (event: any) => {
    let queryParamLocal = Object.assign({}, queryParam);
    queryParamLocal.sortId = event.target.value;
    queryParamLocal.page = 1;
    setPage(1);
    //dispatch(productListAction(generateQuery(queryParamLocal)));
    setQueryParam({ ...queryParamLocal });
  };

  const filterData = (event: any) => {
    let queryParamLocal = Object.assign({}, queryParam);
    queryParamLocal.categoryUrlkey = event.target.value;
    queryParamLocal.page = 1;
    setPage(1);
    setQueryParam({ ...queryParamLocal });
  };

  const fetchMoreData = () => {
    let queryParamLocal = Object.assign({}, queryParam);
    queryParamLocal.page = queryParamLocal.page + 1;
    setPage(queryParamLocal.page);
    setQueryParam({ ...queryParamLocal });
    dispatch(productListAction(generateQuery(queryParamLocal)));
  };

  switch (apiStatus) {
    case API_STATUS.LOADING:
      return <Loader></Loader>;
    case API_STATUS.SUCCESS:
      return (
        <div className="product-listing">
          <Container>
            <Row>
              <Col lg={12} xl={{ span: 10, offset: 1 }}>
                {productListData[COMPONENT_PRODUCT_LIST_BANNER_DATA] &&
                productListData[COMPONENT_PRODUCT_LIST_BANNER_DATA]
                  .bannerData &&
                productList?.titleNavigationBar != "All Cakes" ? (
                  <div className="product-listing-header">
                    <Row>
                      <Col sm={12} md={6}>
                        <img
                          src={
                            productListData[COMPONENT_PRODUCT_LIST_BANNER_DATA]
                              .bannerData.image
                          }
                          alt=""
                        />
                      </Col>
                      <Col sm={12} md={6}>
                        <div className="this-content-wrapper">
                          <div className="this-content" data-aos="fade-up">
                            <h1>
                              {
                                productListData[
                                  COMPONENT_PRODUCT_LIST_BANNER_DATA
                                ].bannerData.title
                              }
                            </h1>
                            <p className="bl">
                              {
                                productListData[
                                  COMPONENT_PRODUCT_LIST_BANNER_DATA
                                ].bannerData.titleIntro
                              }
                            </p>
                            {/* <CustomeButton bg="fill">GET STARTED</CustomeButton> */}
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                ) : (
                  ""
                )}
                <div className="filter-section">
                  {categoryListData?.component?.list?.length > 0 ? (
                    <select className="category" onChange={filterData}>
                      <option value={category}>{PRODUCT_LIST.CATEGORY}</option>
                      {categoryListData?.component?.list.map(
                        (items: any, index: number) => (
                          <option
                            value={items.urlKey}
                            selected={
                              queryParam.categoryUrlkey == items.urlKey
                                ? true
                                : false
                            }
                            key={index}
                          >
                            {items.title}
                          </option>
                        )
                      )}
                    </select>
                  ) : (
                    ""
                  )}
                  <h3>{productList?.titleNavigationBar}</h3>
                  {productListData[COMPONENT_PRODUCT_LIST_SORT_FILTER_BAR]
                    ?.sortTitleData ? (
                    <select className="sortby" onChange={sortData}>
                      {/* <option>{PRODUCT_LIST.SORT_BY}</option> */}
                      {productListData[
                        COMPONENT_PRODUCT_LIST_SORT_FILTER_BAR
                      ].sortTitleData.map((items: any, index: number) => (
                        <option
                          selected={
                            queryParam.sortId == items.id ? true : false
                          }
                          value={items.id}
                          key={index}
                        >
                          {items.sort}
                        </option>
                      ))}
                    </select>
                  ) : (
                    ""
                  )}
                </div>
                {listData.length >= 0 ? (
                  <div className="product-listing-data">
                    <Row>
                      {listData?.map((items: any, index: number) => (
                        <Col xs={12} sm={6} md={4} key={index}>
                          {/* <ProductBox value={items} onClick={() => navigate(PRODUCTDETAIL)} /> */}
                          <ProductBox
                            wishListedFlg={items?.isWishlisted}
                            value={items}
                          />
                        </Col>
                      ))}
                    </Row>
                    {page * 12 < totalProductCount ? (
                      <div className="load-more-btn">
                        <CustomeButton
                          bg="fill"
                          onClick={() => fetchMoreData()}
                        >
                          {PRODUCT_LIST.LOAD_MORE}
                        </CustomeButton>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  ""
                )}

                {productListData[COMPONENT_PRODUCT_LIST_SIMPLE_STEP] &&
                productListData[COMPONENT_PRODUCT_LIST_SIMPLE_STEP]
                  .componentSimpleStepsData.length >= 0 ? (
                  <SimpleSteps
                    steps={
                      productListData[COMPONENT_PRODUCT_LIST_SIMPLE_STEP]
                        .componentSimpleStepsData
                    }
                  />
                ) : (
                  ""
                )}
              </Col>
            </Row>
          </Container>
        </div>
      );
    case API_STATUS.LONG:
      return <SomethingWrong></SomethingWrong>;
    case API_STATUS.NO_DATA:
      return <NoDataFound></NoDataFound>;
    case API_STATUS.FAILED:
      return <SomethingWrong></SomethingWrong>;
    default:
      return <Loader></Loader>;
  }
};

export default ProductListing;
