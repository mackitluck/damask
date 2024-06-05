import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import ProductBox from "../../Common/ProductBox/ProductBox";
import PB4 from "../../../Assets/img/PB4.png";
import PB5 from "../../../Assets/img/PB5.png";
import PB6 from "../../../Assets/img/PB6.png";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_STATUS } from '../../../Constant/Api';
import wishListAction from '../../../Redux/WishList/WishListAction';
import { SUCCESS_RESPONSE_CODE } from '../../../Constant/Status';
import { WISH_LIST_FAILD, WISH_LIST_LONG, WISH_LIST_NO_DATA, WISH_LIST_REQUEST, WISH_LIST_SUCCESS } from '../../../Redux/WishList/WishListTypes';
import { stat } from 'fs';
import { wishList } from '../../../Redux/WishList/WishListReducer';
import SomethingWrong from '../../SomethingWrong/SomethingWrong';
import NoDataFound from '../../NoDataFound/NoDataFound';
import Loader from "../../Loader/Loader";
import { COMPONENT_WISH_LIST } from '../../../Constant/Component';
import { ORDER_LIST_NO_DATA } from '../../../Redux/Order/OrderTypes';
import WISH_LIST from '../../../Language/Wishlist';

const Favorites = () => {

  const dispatch = useDispatch();
  const [wishListData, setwishListData] = useState<any>({});
  const [apiStatus, setApiStatus] = useState(API_STATUS.SUCCESS);
  const wishList = useSelector((state: any) => state?.wishList?.data);

  useEffect(() => {
    dispatch(wishListAction({  }))
  }, []);
  
  useSelector((state: any) => {
    if (state?.wishList?.type === WISH_LIST_REQUEST) {
      if (apiStatus !== API_STATUS.LOADING) {
        setApiStatus(API_STATUS.LOADING);
      }
    } else if (
      state?.wishList?.data?.statusCode === SUCCESS_RESPONSE_CODE &&
      state?.wishList?.type === WISH_LIST_SUCCESS
    ) {
      if (apiStatus !== API_STATUS.SUCCESS) {
        setApiStatus(API_STATUS.SUCCESS);
      }
    } else if (state?.wishList?.type === WISH_LIST_LONG) {
      if (apiStatus !== API_STATUS.LONG) {
        setApiStatus(API_STATUS.LONG);
      }
    }else if (state?.wishList?.type === WISH_LIST_NO_DATA) {
      if (apiStatus !== API_STATUS.NO_DATA) {
        setApiStatus(API_STATUS.NO_DATA)
      }
    }else if (state?.wishList?.type === WISH_LIST_FAILD) {
      if (apiStatus !== API_STATUS.FAILED) {
        setApiStatus(API_STATUS.FAILED);
      }
    }
  });


  useEffect(() => {
    let componentData: any = {}
    wishList?.component?.forEach((component: any) => {
      componentData[component?.componentId] = component
    });
    setwishListData({ ...componentData })
  }, [wishList]);

  const obj = [
    {
      img: PB4,
      title: "Brown Cupcakes",
      deletePrice: "$14.90",
      price: "$12.10",
      ingredients: [
        "CHOCOLATE",
        "SUGAR",
        "VANILLA",
        "CHERRY",
        "COCOA BUTTER",
        "STRAWBERRY JAM",
      ],
    },
    {
      img: PB5,
      title: "Choco Coffee Cupcakes",
      price: "$16.30",
      ingredients: [
        "CHOCOLATE",
        "SUGAR",
        "VANILLA",
        "CHERRY",
        "COCOA BUTTER",
        "STRAWBERRY JAM",
      ],
    },
    {
      img: PB6,
      title: "Rainbow Cupcakes",
      price: "$18.60",
      ingredients: [
        "CHOCOLATE",
        "SUGAR",
        "VANILLA",
        "CHERRY",
        "COCOA BUTTER",
        "STRAWBERRY JAM",
      ],
    },
  ];

  switch (apiStatus) {
    case API_STATUS.LOADING:
      return (<Loader></Loader>);
    case API_STATUS.SUCCESS:
      return (
        <div className="favorites">
          <h4>{WISH_LIST.HEADING}</h4>
          <div className="favorites-boxes">
            <Row>
              {wishListData[COMPONENT_WISH_LIST]?.componentProductListData.list?.map((items: any, index: number) => (
                <Col xs={12} sm={6} md={6} lg={4} key={index}>
                  <ProductBox wishListedFlg={items?.isWishlisted} value={items} />
                </Col>
              ))}
            </Row>
          </div>
        </div>
      );
      case API_STATUS.LONG:
        return (<SomethingWrong></SomethingWrong>);
      case API_STATUS.NO_DATA:
        return (<NoDataFound></NoDataFound>);
      case API_STATUS.FAILED:
        return (<SomethingWrong></SomethingWrong>);
      default:
        return (<Loader></Loader>);
   }
}

export default Favorites;
