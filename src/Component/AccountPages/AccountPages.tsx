import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { USER } from "../../Constant/LocalStorage";
import { removeRememberMe, showToast } from "../../Utility/General";
import {
  MYORDERS,
  FAVORITES,
  MYACCOUNTS,
  MYADDRESSES,
  ADDNEWADDRESS,
  ACCOUNTINFORMATION,
  NEWSLETTER,
  HOME,
  DELETEACCOUNT,
  ORDERDETAILS,
} from "../../Constant/Route";
import {
  checkAuthorizationAction,
  logOutAction,
} from "../../Redux/Auth/AuthAction";
import { useDispatch, useSelector } from "react-redux";
import { SUCCESS_RESPONSE_CODE } from "../../Constant/Status";
import {
  LOGOUT_FAILD,
  LOGOUT_LONG,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
} from "../../Redux/Auth/AuthType";
import { defaultParameterAction } from "../../Redux/General/GeneralAction";
import { API_STATUS } from "../../Constant/Api";
import { DEFAULT_PARAMETER } from "../../Redux/General/GeneralType";
import { FACEBOOK_PIXEL_ID } from "../../Constant/Config";

const AccountPages = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [logoutApiStatus, setLogoutApiStatus] = useState(API_STATUS.SUCCESS);
  const location: any = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLogoutFormButtonDisabled, setIsLogoutFormButtonDisabled] =
    useState(false);

  const toggleToMenu = () => {
    setDropdownMenu(!dropdownMenu);
  };

  const onLogout = () => {
    //localStorage.removeItem(USER)
    setIsLogoutFormButtonDisabled(true);
    const localData = localStorage.getItem("user");
    if (localData) {
      let lD = JSON.parse(localData);
      typeof window.fbq === "function" &&
        window.fbq("init", FACEBOOK_PIXEL_ID, {
          external_id: lD.customerId,
          em: lD.email,
          fn: lD.firstName,
          ln: lD.lastName,
          country: "US",
        });
    } else {
      typeof window.fbq === "function" &&
        window.fbq("init", FACEBOOK_PIXEL_ID, {});
    }
    localStorage.clear();
    removeRememberMe(USER);
    dispatch(checkAuthorizationAction());
    if (isLogoutFormButtonDisabled === false) {
      dispatch(logOutAction({}));
    }
    //navigate(HOME)
  };

  useEffect(() => {}, []);

  useEffect(() => {
    setCurrentLocation(location.pathname);
  }, [location]);

  useSelector((state: any) => {
    if (state?.logout?.type === LOGOUT_REQUEST) {
      if (logoutApiStatus !== API_STATUS.LOADING) {
        setLogoutApiStatus(API_STATUS.LOADING);
      }
    } else if (
      state?.logout?.data?.statusCode === SUCCESS_RESPONSE_CODE &&
      state?.logout?.type === LOGOUT_SUCCESS
    ) {
      if (logoutApiStatus !== API_STATUS.SUCCESS) {
        setIsLogoutFormButtonDisabled(false);
        setLogoutApiStatus(API_STATUS.SUCCESS);
        let defaultParameter = Object.assign({}, state?.defaultParameter);
        defaultParameter.customerToken = "";
        //dispatch(defaultParameterAction(defaultParameter))
        dispatch({
          type: DEFAULT_PARAMETER,
          payload: { data: defaultParameter, type: DEFAULT_PARAMETER },
        });
        navigate(HOME);
      }
    } else if (state?.logout?.type === LOGOUT_LONG) {
      if (logoutApiStatus !== API_STATUS.LONG) {
        setLogoutApiStatus(API_STATUS.LONG);
      }
    } else if (state?.logout?.type === LOGOUT_FAILD) {
      if (logoutApiStatus !== API_STATUS.FAILED) {
        setLogoutApiStatus(API_STATUS.FAILED);
      }
    }
  });

  const sideLinks: any = [
    {
      name: "My Orders",
      links: [MYORDERS, ORDERDETAILS],
    },
    {
      name: "Favorites",
      links: [FAVORITES],
    },
    {
      name: "My Account",
      links: [MYACCOUNTS],
    },
    {
      name: "My Addresses",
      links: [MYADDRESSES, ADDNEWADDRESS],
    },
    {
      name: "Account Information",
      links: [ACCOUNTINFORMATION],
    },
    {
      name: "Newsletter Subscription",
      links: [NEWSLETTER],
    },
    {
      name: "Delete Account",
      links: [DELETEACCOUNT],
    },
    {
      name: "Logout",
    },
  ];

  return (
    <div className="account-page">
      <Container>
        <Row>
          <Col sm={12} md={4} lg={3} xl={3}>
            <div className="left-sides-bar">
              <div
                className={`dropdowns ${dropdownMenu ? "active" : ""} `}
                onClick={toggleToMenu}
              >
                {sideLinks.map((items: any, index: number) =>
                  items?.links?.includes(currentLocation) ? items?.name : ""
                )}
              </div>
              <ul
                className={`dropdowns-toggles ${dropdownMenu ? "active" : ""} `}
              >
                {sideLinks.map(
                  (items: any, index: number) => (
                    console.log(items?.links?.includes(currentLocation)),
                    (
                      <>
                        {items?.links ? (
                          <li
                            key={index}
                            className={
                              items?.links?.includes(currentLocation)
                                ? "active"
                                : ""
                            }
                          >
                            <Link
                              to={items?.links[0]}
                              className="sidebar-links"
                              onClick={toggleToMenu}
                            >
                              {items.name}
                            </Link>
                          </li>
                        ) : (
                          <>
                            {items?.name === "Logout" ? (
                              <li onClick={() => onLogout()} key={index}>
                                <a className="sidebar-links">{items.name}</a>
                              </li>
                            ) : (
                              <li key={index}>
                                <a className="sidebar-links">{items.name}</a>
                              </li>
                            )}
                          </>
                        )}
                      </>
                    )
                  )
                )}

                {/* <li>
                  <a className="sidebar-links">Favorites</a>
                </li>
                <li>
                  <a className="sidebar-links">My Account</a>
                </li>
                <li>
                  <a className="sidebar-links">My Addresses</a>
                </li>
                <li>
                  <a className="sidebar-links">Account Information</a>
                </li>
                <li>
                  <a className="sidebar-links">Newsletter Subscription</a>
                </li>
                <li>
                  <a className="sidebar-links">Logout</a>
                </li> */}
              </ul>
            </div>
          </Col>
          <Col sm={12} md={8} lg={9} xl={9}>
            <div className="right-side-content">
              <Outlet />
              {/* <Routes>
                <Route path="/" element={<MyOrder />} />
                <Route path={MYORDERS} element={<MyOrder />} />
                <Route path={ORDERDETAILS} element={<OrderDetails />} />
                <Route path={FAVORITES} element={<Favorites />} />
                <Route path={MYACCOUNTS} element={<MyAccount />} />
                <Route path={MYADDRESSES} element={<MyAddresses />} />
                <Route path={ADDNEWADDRESS} element={<AddNewAddress />} />
                <Route
                  path={ACCOUNTINFORMATION}
                  element={<AccountInformation />}
                />
                <Route path={NEWSLETTER} element={<NewsletterSubscription />} />
              </Routes> */}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AccountPages;
