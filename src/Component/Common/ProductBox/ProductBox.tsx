import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { API_STATUS } from "../../../Constant/Api";
import { PRODUCTDETAIL } from "../../../Constant/Route";
import { SUCCESS_RESPONSE_CODE } from "../../../Constant/Status";
import COMMON from "../../../Language/Common";
import { addRemoveWishListAction } from "../../../Redux/General/GeneralAction";
import { addRemoveWishList } from "../../../Redux/General/GeneralReducer";
import { ADD_REMOVE_WISH_LIST_CLEAR, ADD_REMOVE_WISH_LIST_FAILD, ADD_REMOVE_WISH_LIST_LONG, ADD_REMOVE_WISH_LIST_REQUEST, ADD_REMOVE_WISH_LIST_SUCCESS, LOGIN_POPUP_SHOW } from "../../../Redux/General/GeneralType";
import wishListAction from "../../../Redux/WishList/WishListAction";
import { WISH_LIST_CLEAR } from "../../../Redux/WishList/WishListTypes";
import Loader from "../../Loader/Loader";
import NoDataFound from "../../NoDataFound/NoDataFound";
import SomethingWrong from "../../SomethingWrong/SomethingWrong";
import HeartLabel from "../HeartLabel/HeartLabel";
import LazyImage from "../LazyImage/LazyImage";
const ProductBox = (props: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector((state: any) => state?.login?.isLoggedIn);
  const onWishListToggle = (e: any, urlkey: string, flag: number, itemId: any) => {
    if (!isLogin) {
      e.preventDefault();
      e.target.checked = false;
      //console.log("E",e.target.checked);
      dispatch({
        type: LOGIN_POPUP_SHOW,
        payload: { data: { flag: true, message: COMMON.MESSAGE_IN_LOGIN_POPUP_FOR_WISHLIST } },
      });
    } else {
      setWishListFlag(flag)
      setIsFavButtonDisabled(true)
      if(isFavButtonDisabled == false){
      dispatch(addRemoveWishListAction({ urlKey: urlkey, flag: flag, WishlistItemId: itemId ? itemId : "" }));
      }
    }

  }

  useEffect(() => {
    setWishListFlag(props?.wishListedFlg)
  }, [props])

  const [wishListFlag, setWishListFlag] = useState(props?.wishListedFlg);
  const [apiStatus, setApiStatus] = useState(API_STATUS.SUCCESS);
  const isWishListed = false;
  const [isFavButtonDisabled, setIsFavButtonDisabled] = useState(false)

  useSelector((state: any) => {
    if (state?.addRemoveWishList?.type === ADD_REMOVE_WISH_LIST_REQUEST) {
      if (apiStatus !== API_STATUS.LOADING) {
        setApiStatus(API_STATUS.LOADING);
      }
    } else if (
      state?.addRemoveWishList?.data?.statusCode === SUCCESS_RESPONSE_CODE &&
      state?.addRemoveWishList?.type === ADD_REMOVE_WISH_LIST_SUCCESS
    ) {
      if (apiStatus !== API_STATUS.SUCCESS) {
        setIsFavButtonDisabled(false)
        dispatch({
          type: ADD_REMOVE_WISH_LIST_CLEAR,
          payload: { type: ADD_REMOVE_WISH_LIST_CLEAR },
        });
        dispatch(wishListAction({}));
        setApiStatus(API_STATUS.SUCCESS);
      }
    } else if (state?.addRemoveWishList?.type === ADD_REMOVE_WISH_LIST_LONG) {
      if (apiStatus !== API_STATUS.LONG) {
        setApiStatus(API_STATUS.LONG);
      }
    } else if (state?.addRemoveWishList?.type === ADD_REMOVE_WISH_LIST_FAILD) {
      if (apiStatus !== API_STATUS.FAILED) {
        setApiStatus(API_STATUS.FAILED);
      }
    }
  });

  return (
    <div className="product-box" onClick={props.onClick}>
      {props.value?.recipeImage ? (
        <div className="product-box-img-effect">
          <LazyImage
            onClick={() => navigate(PRODUCTDETAIL + "/" + props.value?.urlKey)}
            type="square"
            src={props.value?.image}
            alt=""
          ></LazyImage>
          <LazyImage
            onClick={() => navigate(PRODUCTDETAIL + "/" + props.value?.urlKey)}
            type="square"
            src={props.value?.recipeImage}
            alt=""
          ></LazyImage>
        </div>
      ) : (
        <div className="product-box-img">
          <LazyImage
            onClick={() => navigate(PRODUCTDETAIL + "/" + props.value?.urlKey)}
            type="square"
            src={props.value?.image}
            alt=""
          ></LazyImage>
        </div>
      )}
      <div className="product-box-content">
        <Link to={PRODUCTDETAIL + "/" + props.value?.urlKey}>
          <p className="bm">{props.value?.title}</p>
        </Link>
        <div className="product-box-price">
          {
            props.value?.discountedPrice ?
              (
                <del className="bm blur-color">{props.value?.price}</del>
              )
              :
              (
                <span className="bm">{props.value?.price}</span>
              )
          }

          <span className="bm">{props.value?.discountedPrice}</span>
        </div>
      </div>
      {/* <div className="product-ingrediant">
        {
          props.value?.ingredients?.length ?
            <>
              {
                props.value?.ingredients?.map((items: string, index: number) => (
                  <p className="tm" key={index}>
                    {items}
                  </p>
                ))
              }
            </>
            :
            null
        }

      </div> */}
      <HeartLabel checked={wishListFlag == 1 ? true : false} onChange={(e: any) => onWishListToggle(e, props.value?.urlKey, e.target.checked ? 1 : 0, props.value?.wishlistItemId)} />
    </div>
  );

};

export default ProductBox;
