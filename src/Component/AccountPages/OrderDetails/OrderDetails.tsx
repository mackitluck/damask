import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import BackIcon from "../../../Assets/img/arrow-left.svg";
import ItemsOrder1 from "../../../Assets/img/big-img.png";
import ItemsOrder2 from "../../../Assets/img/fbt2.png";
import { API_STATUS } from "../../../Constant/Api";
import { COMPONENT_ORDER_DETAIL, COMPONENT_ORDER_ITEM_DETAIL, COMPONENT_ORDER_SUMMARY } from "../../../Constant/Component";
import { PRODUCTDETAIL } from "../../../Constant/Route";
import { NO_DATA_ERROR_CODE, SUCCESS_RESPONSE_CODE } from "../../../Constant/Status";
import GENERAL from "../../../Language/General";
import ORDER from "../../../Language/Order";
import { getOrderDetailAction } from "../../../Redux/Order/OrderAction";
import { ORDER_DETAIL_FAILD, ORDER_DETAIL_LONG, ORDER_DETAIL_NO_DATA, ORDER_DETAIL_REQUEST, ORDER_DETAIL_SUCCESS } from "../../../Redux/Order/OrderTypes";
import Loader from "../../Loader/Loader";
import NoDataFound from "../../NoDataFound/NoDataFound";
import SomethingWrong from "../../SomethingWrong/SomethingWrong";

const OrderDetails = () => {

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const location: any = useLocation()

  useEffect(() => {
    dispatch(getOrderDetailAction({ orderId: location?.state?.orderId }))
  }, [])

  const [pageData, setPageData] = useState<any>({})

  const orderDetail = useSelector((state: any) => state?.orderDetail?.data)

  const [apiStatus, setApiStatus] = useState(API_STATUS.LOADING)

  useSelector(((state: any) => {
    // setRememberMe(`user_${state?.login?.data?.customerId}`, state?.login?.data?.customerId)
    // removeRememberMe(`user_${state?.login?.data?.customerId}`, state?.login?.data?.customerId)
    if (state?.orderDetail?.type === ORDER_DETAIL_REQUEST) {
      if (apiStatus !== API_STATUS.LOADING) {
        setApiStatus(API_STATUS.LOADING)
      }
    }
    else if ((state?.orderDetail?.data?.statusCode === SUCCESS_RESPONSE_CODE || state?.orderDetail?.data?.errorCode === NO_DATA_ERROR_CODE) && state?.orderDetail?.type === ORDER_DETAIL_SUCCESS) {
      if (apiStatus !== API_STATUS.SUCCESS) {
        setApiStatus(API_STATUS.SUCCESS)
      }
    }
    else if (state?.orderDetail?.type === ORDER_DETAIL_LONG) {
      if (apiStatus !== API_STATUS.LONG) {
        setApiStatus(API_STATUS.LONG)
      }
    }
    else if (state?.orderDetail?.type === ORDER_DETAIL_NO_DATA) {
      if (apiStatus !== API_STATUS.NO_DATA) {
        setApiStatus(API_STATUS.NO_DATA)
      }
    }
    else if (state?.orderDetail?.type === ORDER_DETAIL_FAILD) {
      if (apiStatus !== API_STATUS.FAILED) {
        setApiStatus(API_STATUS.FAILED)
      }
    }
  }))

  useEffect(() => {
    let componentData: any = {}
    orderDetail?.component?.forEach((component: any) => {
      componentData[component?.componentId] = component
    });
    setPageData({ ...componentData })
  }, [orderDetail])

  switch (apiStatus) {
    case API_STATUS.LOADING:
      return (<Loader></Loader>);
    case API_STATUS.SUCCESS:
      return (
        <div className="order-details">
          <div className="back-btn-header">
            <a className="back-btn" onClick={() => navigate(-1)}>
              <img src={BackIcon} alt="" />
            </a>
            <h4>{GENERAL.ORDER_WITH_HASH} {pageData[COMPONENT_ORDER_DETAIL]?.data?.orderId}</h4>
          </div>

          <div className="status-date">
            <p className="bl date">{pageData[COMPONENT_ORDER_DETAIL]?.data?.orderDate}</p>
            <div className="key-value">
              <div className="key">
                <p className="ll">{GENERAL.STATUS}</p>
              </div>
              <div className="value">
                <span className="bl">{pageData[COMPONENT_ORDER_DETAIL]?.data?.status}</span>
              </div>
            </div>
            <div className="key-value">
              <div className="key">
                <p className="ll">{GENERAL.UPDATES_SENT_TO}</p>
              </div>
              <div className="value">
                <span className="bl">{pageData[COMPONENT_ORDER_DETAIL]?.data?.updatesSentTo}</span>
              </div>
            </div>
            <div className="key-value">
              <div className="key">
                <p className="ll">{GENERAL.PAYMENT_MODE}</p>
              </div>
              <div className="value">
                <span className="bl">{pageData[COMPONENT_ORDER_DETAIL]?.data?.paymentMode}</span>
              </div>
            </div>
          </div>

          <div className="delivery-address">
            <div className="key-value">
              <div className="key">
                <p className="ll">{GENERAL.DELIVERY_ADDRESS}</p>
              </div>
              <div className="value">
                <span className="bl">
                  {pageData[COMPONENT_ORDER_DETAIL]?.data?.firstName} {pageData[COMPONENT_ORDER_DETAIL]?.data?.lastName}
                </span>
                <span className="bl">
                  {pageData[COMPONENT_ORDER_DETAIL]?.data?.delieveryAddress}
                </span>
                <span className="bl">{pageData[COMPONENT_ORDER_DETAIL]?.data?.phone}</span>
              </div>
            </div>
          </div>

          <div className="items-ordered">
            <p className="tl">{GENERAL.ITEMS_ORDERED}</p>

            {pageData[COMPONENT_ORDER_ITEM_DETAIL]?.items?.map((items: any, index: number) => (
              <div className="rac-table-wrapper" key={index}>
                <img onClick={() => navigate(PRODUCTDETAIL + "/" + items?.urlKey)} src={items?.image} alt="" />
                <div className="rac-table">
                  <div className="rac-row">
                    <div className="rac-column">
                      <Link to={PRODUCTDETAIL + "/" + items?.urlKey}><p className="bl">{items?.title}</p></Link>
                    </div>
                    <div className="rac-column">
                      <p className="bl">{GENERAL.QTY_WITH_COLON} {items?.qty}</p>
                    </div>
                    <div className="rac-column">
                      <p className="tm">{items?.itemAmount}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}


            {/* <div className="rac-table-wrapper">
              <img src={ItemsOrder1} alt="" />
              <div className="rac-table">
                <div className="rac-row">
                  <div className="rac-column">
                    <p className="bl">Pastel Sprinkles Cupcakes</p>
                  </div>
                  <div className="rac-column">
                    <p className="bl">Qty: 1</p>
                  </div>
                  <div className="rac-column">
                    <p className="tm">$14.50</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="rac-table-wrapper">
              <img src={ItemsOrder2} alt="" />
              <div className="rac-table">
                <div className="rac-row">
                  <div className="rac-column">
                    <p className="bl">Fiesta Topper</p>
                  </div>
                  <div className="rac-column">
                    <p className="bl">Qty: 1</p>
                  </div>
                  <div className="rac-column">
                    <p className="tm">$3.90</p>
                  </div>
                </div>
              </div>
            </div> */}
          </div>

          <div className="order-summary">
            <p className="tl">{ORDER.ORDER_SUMMARY}</p>
            <table className="value-table">
              <tbody>
                <tr>
                  <td>
                    <p className="bl">{GENERAL.SUBTOTAL}</p>
                  </td>
                  <td>
                    <p className="bl">{pageData[COMPONENT_ORDER_SUMMARY]?.orderSummary?.subTotal}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="bl">{GENERAL.TAX}</p>
                  </td>
                  <td>
                    <p className="bl">{pageData[COMPONENT_ORDER_SUMMARY]?.orderSummary?.tax}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="bl">{GENERAL.DELIVERY}</p>
                  </td>
                  <td>
                    <p className="bl">{pageData[COMPONENT_ORDER_SUMMARY]?.orderSummary?.delivery}</p>
                  </td>
                </tr>
                {pageData[COMPONENT_ORDER_SUMMARY]?.orderSummary?.discountedPrice ?
                  <tr>
                    <td>
                      <p className="bl">{GENERAL.DISCOUNT}</p>
                    </td>
                    <td>
                      <p className="bl">
                        {pageData[COMPONENT_ORDER_SUMMARY]?.orderSummary?.discountedPrice}
                      </p>
                    </td>
                  </tr> : ""}
              </tbody>
            </table>
            <div className="hr"></div>
            <table className="total-table">
              <tbody>
                <tr>
                  <td>
                    <p className="tm">{GENERAL.TOTAL}</p>
                  </td>
                  <td>
                    <p className="tm">{pageData[COMPONENT_ORDER_SUMMARY]?.orderSummary?.total}</p>
                  </td>
                </tr>
              </tbody>
            </table>
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

};

export default OrderDetails;
