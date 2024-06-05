import { useEffect, useState } from "react";
import "./App.scss";
import Routesconfig from "./Routes/Routesconfig";
import { useDispatch, useSelector } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css";
import Loader from "./Component/Loader/Loader";
import {
  defaultParameterAction,
  getMaster,
} from "./Redux/General/GeneralAction";
import { SUCCESS_RESPONSE_CODE } from "./Constant/Status";
import {
  MASTER_FAILD,
  MASTER_LONG,
  MASTER_REQUEST,
  MASTER_SUCCESS,
} from "./Redux/General/GeneralType";
import { API_STATUS } from "./Constant/Api";
import SomethingWrong from "./Component/SomethingWrong/SomethingWrong";
import moment from "moment";
import { lastLogin, showToast } from "./Utility/General";
import * as localStorageConstant from "./Constant/LocalStorage";
import { LOGIN_SUCCESS } from "./Redux/Auth/AuthType";
AOS.init({
  offset: 80,
  duration: 500,
  disable: "mobile",
  easing: "ease-in-out",
  delay: 10,
  once: true,
});
let quoteId = localStorage.getItem(localStorageConstant.QUOTE_ID)
  ? localStorage.getItem(localStorageConstant.QUOTE_ID)
  : "";
function App() {
  const dispatch = useDispatch();
  const [apiStatus, setApiStatus] = useState(API_STATUS.LOADING);
  useEffect(() => {
    if (localStorage.getItem("session_expire") === "true") {
      showToast("error", "Session Expired");
      localStorage.removeItem("session_expire");
    }
    const user = localStorage.getItem(localStorageConstant.USER);
    if (user) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { data: JSON.parse(user), type: LOGIN_SUCCESS },
      });
    }
    dispatch(
      getMaster({
        quoteId: quoteId,
        frontWebsiteBaseUrl: window.location.origin,
      })
    );
    lastLogin();
  }, []);

  useSelector((state: any) => {
    if (state?.master?.type === MASTER_REQUEST) {
      if (apiStatus !== API_STATUS.LOADING) {
        setApiStatus(API_STATUS.LOADING);
      }
    } else if (
      state?.master?.data?.statusCode === SUCCESS_RESPONSE_CODE &&
      state?.master?.type === MASTER_SUCCESS
    ) {
      if (apiStatus !== API_STATUS.SUCCESS) {
        setApiStatus(API_STATUS.SUCCESS);
      }
    } else if (state?.master?.type === MASTER_LONG) {
      if (apiStatus !== API_STATUS.LONG) {
        setApiStatus(API_STATUS.LONG);
      }
    } else if (state?.master?.type === MASTER_FAILD) {
      if (apiStatus !== API_STATUS.FAILED) {
        setApiStatus(API_STATUS.FAILED);
      }
    }

    // if (state?.login?.isLoggedIn) {
    //   let defaultParameter = Object.assign({}, state?.defaultParameter)
    //   if (defaultParameter.customerId !== state?.login?.data?.customerId) {
    //     defaultParameter.customerId = state?.login?.data?.customerId
    //     dispatch(defaultParameterAction(defaultParameter))
    //   }
    // }

    if (state?.login?.isLoggedIn) {
      let defaultParameter = Object.assign({}, state?.defaultParameter);
      if (
        defaultParameter.customerToken !== state?.login?.data?.customerToken
      ) {
        defaultParameter.customerToken = state?.login?.data?.customerToken;
        dispatch(defaultParameterAction(defaultParameter));
      }
    }
  });

  // return (
  //   <>
  //     <Routesconfig></Routesconfig>
  //   </>
  // );

  switch (apiStatus) {
    case API_STATUS.LOADING:
      return <Loader></Loader>;
    case API_STATUS.SUCCESS:
      return (
        <>
          <Routesconfig></Routesconfig>
        </>
      );
    case API_STATUS.LONG:
      return <SomethingWrong></SomethingWrong>;
    case API_STATUS.FAILED:
      return <SomethingWrong></SomethingWrong>;
    default:
      return <Loader></Loader>;
  }
}

export default App;
