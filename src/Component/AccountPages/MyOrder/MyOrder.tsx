import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { API_STATUS } from "../../../Constant/Api";
import { ORDERDETAILS } from "../../../Constant/Route";
import { NO_DATA_ERROR_CODE, SUCCESS_RESPONSE_CODE } from "../../../Constant/Status";
import Loader from "../../Loader/Loader";
import SomethingWrong from "../../SomethingWrong/SomethingWrong";
import { getOrderListAction } from "../../../Redux/Order/OrderAction";
import { ORDER_LIST_FAILD, ORDER_LIST_LONG, ORDER_LIST_NO_DATA, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS } from "../../../Redux/Order/OrderTypes";
import NoDataFound from "../../NoDataFound/NoDataFound";
import { COMPONENT_ORDER_LIST } from "../../../Constant/Component";
import ORDER from "../../../Language/Order";
import GENERAL from "../../../Language/General";

const MyOrder = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getOrderListAction())
  }, [])

  const [pageData, setPageData] = useState<any>({})

  const [apiStatus, setApiStatus] = useState(API_STATUS.LOADING)

  const orderList = useSelector((state: any) => state?.orderList?.data)

  useSelector(((state: any) => {
    if (state?.orderList?.type === ORDER_LIST_REQUEST) {
      if (apiStatus !== API_STATUS.LOADING) {
        setApiStatus(API_STATUS.LOADING)
      }
    }
    else if ((state?.orderList?.data?.statusCode === SUCCESS_RESPONSE_CODE || state?.orderList?.data?.errorCode === NO_DATA_ERROR_CODE) && state?.orderList?.type === ORDER_LIST_SUCCESS) {
      if (apiStatus !== API_STATUS.SUCCESS) {
        setApiStatus(API_STATUS.SUCCESS)
      }
    }
    else if (state?.orderList?.type === ORDER_LIST_LONG) {
      if (apiStatus !== API_STATUS.LONG) {
        setApiStatus(API_STATUS.LONG)
      }
    }
    else if (state?.orderList?.type === ORDER_LIST_NO_DATA) {
      if (apiStatus !== API_STATUS.NO_DATA) {
        setApiStatus(API_STATUS.NO_DATA)
      }
    }
    else if (state?.orderList?.type === ORDER_LIST_FAILD) {
      if (apiStatus !== API_STATUS.FAILED) {
        setApiStatus(API_STATUS.FAILED)
      }
    }
  }))

  useEffect(() => {
    let componentData: any = {}
    orderList?.component?.forEach((component: any) => {
      componentData[component?.componentId] = component
    });
    setPageData({ ...componentData })
  }, [orderList])

  switch (apiStatus) {
    case API_STATUS.LOADING:
      return (<Loader></Loader>);
    case API_STATUS.SUCCESS:
      return (
        <div className="my-order">
          <h4>{ORDER.MY_ORDERS}</h4>
          <div className="rac-table-wrapper">
            <div className="rac-table">
              <div className="rac-row">
                <div className="rac-column">
                  <p className="ll">{GENERAL.ORDER_WITH_HASH}</p>
                </div>
                <div className="rac-column">
                  <p className="ll">{GENERAL.DATE}</p>
                </div>
                <div className="rac-column">
                  <p className="ll">{GENERAL.DELIVER_TO}</p>
                </div>
                <div className="rac-column">
                  <p className="ll">{ORDER.ORDER_TOTAL}</p>
                </div>
                <div className="rac-column">
                  <p className="ll">{GENERAL.STATUS}</p>
                </div>
                <div className="rac-column">
                  <p className="ll"></p>
                </div>
              </div>
              {pageData[COMPONENT_ORDER_LIST]?.list?.map((items: any, index: number) => (
                <div className="rac-row" key={index}>
                  <div className="rac-column">
                    <p className="ll">{GENERAL.ORDER_WITH_HASH}</p>
                    <p className="bl">{items?.textOrderId}</p>
                  </div>
                  <div className="rac-column">
                    <p className="ll">{GENERAL.DATE}</p>
                    <p className="bl">{items?.orderDate}</p>
                  </div>
                  <div className="rac-column">
                    <p className="ll">{GENERAL.DELIVER_TO}</p>
                    <p className="bl">{items?.delieverTo}</p>
                  </div>
                  <div className="rac-column">
                    <p className="ll">{ORDER.ORDER_TOTAL}</p>
                    <p className="bl">{items?.orderAmount}</p>
                  </div>
                  <div className="rac-column">
                    <p className="ll">{GENERAL.STATUS}</p>
                    <p className="bl">{items?.status}</p>
                  </div>
                  <div className="rac-column">
                    <Link to={ORDERDETAILS} state={{ orderId: items?.orderId }}
                      className="view-order pages-link">
                      {ORDER.VIEW_ORDER}
                    </Link>
                  </div>
                </div>
              ))}

              {/* <div className="rac-row">
                <div className="rac-column">
                  <p className="ll">Order #</p>
                  <p className="bl">1100008185</p>
                </div>
                <div className="rac-column">
                  <p className="ll">Date</p>
                  <p className="bl">16/01/2022</p>
                </div>
                <div className="rac-column">
                  <p className="ll">Deliver to</p>
                  <p className="bl">James Smith</p>
                </div>
                <div className="rac-column">
                  <p className="ll">Order Total</p>
                  <p className="bl">$21.67</p>
                </div>
                <div className="rac-column">
                  <p className="ll">Status</p>
                  <p className="bl">Pending</p>
                </div>
                <div className="rac-column">
                  <Link to={ORDERDETAILS} className="view-order pages-link">View Order</Link>
                </div>
              </div>
              <div className="rac-row">
                <div className="rac-column">
                  <p className="ll">Order #</p>
                  <p className="bl">1100008185</p>
                </div>
                <div className="rac-column">
                  <p className="ll">Date</p>
                  <p className="bl">16/01/2022</p>
                </div>
                <div className="rac-column">
                  <p className="ll">Deliver to</p>
                  <p className="bl">James Smith</p>
                </div>
                <div className="rac-column">
                  <p className="ll">Order Total</p>
                  <p className="bl">$21.67</p>
                </div>
                <div className="rac-column">
                  <p className="ll">Status</p>
                  <p className="bl">Pending</p>
                </div>
                <div className="rac-column">
                  <Link to={ORDERDETAILS} className="view-order pages-link">View Order</Link>
                </div>
              </div>
              <div className="rac-row">
                <div className="rac-column">
                  <p className="ll">Order #</p>
                  <p className="bl">1100008185</p>
                </div>
                <div className="rac-column">
                  <p className="ll">Date</p>
                  <p className="bl">16/01/2022</p>
                </div>
                <div className="rac-column">
                  <p className="ll">Deliver to</p>
                  <p className="bl">James Smith</p>
                </div>
                <div className="rac-column">
                  <p className="ll">Order Total</p>
                  <p className="bl">$21.67</p>
                </div>
                <div className="rac-column">
                  <p className="ll">Status</p>
                  <p className="bl">Pending</p>
                </div>
                <div className="rac-column">
                  <Link to={ORDERDETAILS} className="view-order pages-link">View Order</Link>
                </div>
              </div> */}
            </div>
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

export default MyOrder;
