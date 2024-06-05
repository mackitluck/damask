import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import AddIcon from "../../../Assets/img/Add.svg";
import { PRODUCTDETAIL } from "../../../Constant/Route";
import IncDecBoxProductDetail from "../Inc-Dec-boxs-product-details/Inc-Dec-boxs-product-details";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAction } from "../../../Redux/ProductDetail/ProductDetailAction";
import * as localStorageConstant from "../../../Constant/LocalStorage";

function BoughtTogether(props: any) {
  const [state, setState] = useState(props);
  const dispatch = useDispatch();
  const cartData = useSelector((state: any) => state?.myCartGlobalData?.data);
  const [quoteId, setQuoteId] = useState(
    localStorage.getItem(localStorageConstant.QUOTE_ID)
      ? localStorage.getItem(localStorageConstant.QUOTE_ID)
      : ""
  );

  const addToCartFirst = (qty: any, action: any, datas: any) => {
    let cartFlag = action === "add" ? "1" : "0";
    let productQuery = {
      cartFlag: cartFlag,
      itemId: datas.itemId ? datas.itemId : "",
      productId: datas.id,
      urlKey: datas.urlKey,
      qty: "1",
      varientQuery: datas.variant ? datas.variant : [],
    };

    let productQueryData = {
      quoteId: quoteId,
      productQuery: [productQuery],
    };
    console.log("ADD ", datas);
    dispatch(
      addToCartAction(productQueryData, datas?.actualPrice.split("$")[1])
    );
  };

  useEffect(() => {
    setState(props);
  }, [props]);

  const navigate = useNavigate();

  return (
    <Row>
      {state?.boughtTogether?.map((items: any, index: number) => {
        return (
          <Col xs={6} key={"frequently-bought" + index}>
            <div className="FBT-box">
              <img src={items.image} alt="" />
              {/* <p className="bm" onClick={() => navigate(PRODUCTDETAIL + "/" + items.urlKey)}>{items.title}</p> */}
              <Link to={PRODUCTDETAIL + "/" + items?.urlKey}>
                <p className="bm">{items?.title}</p>
              </Link>
              <div className="product-price">
                {items.discountedPrice != "" ? (
                  <del className="bm blur-color">{items.price}</del>
                ) : (
                  <span className="bm">{items.price}</span>
                )}
                <span className="bm">{items.discountedPrice}</span>
              </div>
              {/* <button className="add-btn">
                <img src={AddIcon} alt="" />
            </button> */}

              {Number(items?.is_instock) === 1 ? (
                Number(items?.isConfigurable) === 1 ? (
                  <button
                    className="add-btn"
                    onClick={() => navigate(PRODUCTDETAIL + "/" + items.urlKey)}
                  >
                    <img src={AddIcon} alt="" />
                  </button>
                ) : state?.cartListData?.length > 0 &&
                  state?.cartListData?.find(
                    (x: any) => Number(x.id) === Number(items.id)
                  )?.selectedQuantity ? (
                  <IncDecBoxProductDetail
                    maxqty={items?.maxQuantity}
                    //value={items.cartQty}
                    value={() =>
                      state?.cartListData?.length > 0 &&
                      state?.cartListData?.find(
                        (x: any) => Number(x.id) === Number(items.id)
                      )?.selectedQuantity
                        ? state?.cartListData?.find(
                            (x: any) => Number(x.id) === Number(items.id)
                          )?.selectedQuantity
                        : 0
                    }
                    disableButton={state.disableButton}
                    onChange={state.onChange}
                    //data={items}
                    data={
                      state?.cartListData?.length > 0 &&
                      state?.cartListData?.find(
                        (x: any) => Number(x.id) === Number(items.id)
                      )
                        ? state?.cartListData?.find(
                            (x: any) => Number(x.id) === Number(items.id)
                          )
                        : {}
                    }
                    key={index}
                  />
                ) : (
                  <button className="add-btn">
                    <img
                      src={AddIcon}
                      alt=""
                      onClick={(data: any) => addToCartFirst(1, "add", items)}
                    />
                  </button>
                )
              ) : (
                "Out of Stock"
              )}
            </div>
          </Col>
        );
      })}
      {/* <Col xs={6}>
                <div className="FBT-box">
                    <img src={FBT2} alt="" />
                    <p className="bm">Fiesta Topper</p>
                    <div className="product-price">
                        <span className="bm">$3.90</span>
                    </div>
                    <IncDecBox value="1" />
                </div>
            </Col> */}
    </Row>
  );
}

export default BoughtTogether;
