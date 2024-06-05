import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useState } from "react";
import WebMegaMenu from "./WebMegaMenu/WebMegaMenu";
import MobileMegaMenu from "./MobileMegaMenu/MobileMegaMenu";
import Logo from "../../Assets/img/Logo.svg";
import MobileLogo from "../../Assets/img/Mobile-Logo.svg";
import Package from "../../Assets/img/package.svg";
import MenuIcon from "../../Assets/img/menu.svg";
import CheckoutBox from "../CheckoutBox/CheckoutBox";
import LoginPopup from "../LoginPopup/LoginPopup";
import { Link, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  HOME,
  OURSTORY,
  LOGIN,
  INSPIRATIONLISTING,
  RECIPELANDING,
  MYACCOUNTS,
  CHECKOUT,
  INSPIRATIONCATEGORY,
} from "../../Constant/Route";
import { useDispatch, useSelector } from "react-redux";
import { getMetaTitleDetail, hideMinicart, showMinicart } from "../../Redux/General/GeneralAction";
import { getUrlMetaPayload } from "../../Utility/General";
import { GET_META_TITLE_SUCCESS } from "../../Redux/General/GeneralType";

const Header = () => {
  const dispatch = useDispatch();
  const location: any = useLocation();

  useEffect(() => {
    console.log("FBQ :: TRACK EVENT --> PageView");
    typeof window.fbq === "function" && window.fbq("track", "PageView");
  }, [location?.pathname]);

  onscroll = () => {
    const scrollY = window.scrollY;
    var navbar = document.getElementById("navbar");
    if (window.pageYOffset >= 1) {
      navbar?.classList.add("boxShadow");
    } else {
      navbar?.classList.remove("boxShadow");
    }
  };

  const [toggleSide, setToggleSide] = useState(false);
  const [toggleCheckout, setToggleCheckout] = useState(false);

  let cartStatus = useSelector((state: any) => state?.cart);

  let auth = useSelector((state: any) => state?.login?.isLoggedIn);
  const metaTitleResponse = useSelector((state: any) => state?.getMetaTitleReducer);
  //let cartCount = useSelector((state: any) => state?.master?.data?.cartCount)
  let cartCount = useSelector((state: any) => state?.cartCountGlobalData?.data);

  useEffect(() => {
    setToggleCheckout(cartStatus);
  }, [cartStatus]);

  const toggleMenu = () => {
    setToggleSide(!toggleSide);
  };

  const toggleCheckoutMenu = () => {
    cartStatus ? dispatch(hideMinicart) : dispatch(showMinicart);
    // setToggleCheckout(!toggleCheckout);
  };
  useEffect(() => {
    if (metaTitleResponse?.type === GET_META_TITLE_SUCCESS) {
        document.title = metaTitleResponse?.data?.metaInfo?.metaTitle || "Damask";
    }
  }, [metaTitleResponse]);


  useEffect(() => {
    if (location.pathname) {
      const payload = getUrlMetaPayload(location.pathname);
      dispatch(getMetaTitleDetail(payload));
    }
  }, [location.pathname]);

  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <header id="navbar">
        <Container>
          <div className="header-wrapper custome-one">
            <img
              src={MenuIcon}
              alt=""
              className="menu-icon"
              onClick={toggleMenu}
            />
            {/* for mobile view */}
            <MobileMegaMenu toggleSide={toggleSide} toggleMenu={toggleMenu} />
            <ul className="left-nav-menu">
              <li>
                {/* for web view */}
                <WebMegaMenu />
              </li>
              {/* <li>
                <Link to={OURSTORY} className="links ts">
                  FEATURED ITEMS
                </Link>
              </li> */}
              <li>
                <Link to={OURSTORY} className="links ts">
                  OUR STORY
                </Link>
              </li>
              <li>
                <Link to={RECIPELANDING} className="links ts">
                  Recipes
                </Link>
              </li>
            </ul>
            <Link to={"/"} className="logo">
              <img src={Logo} className="web-logo" alt="" />
              <img src={Logo} className="mobile-logo" alt="" />
            </Link>
            <ul className="right-nav-menu">
              <li>
                <Link
                  to={INSPIRATIONCATEGORY + "/best-baking-tips"}
                  className="links ts"
                >
                  Baking Tips
                </Link>
              </li>
              <li>
                <Link to={INSPIRATIONLISTING} className="links ts">
                  Inspiration
                </Link>
              </li>
              <li>
                {auth ? (
                  <Link
                    to={MYACCOUNTS}
                    className={`links ts ${
                      location.pathname === CHECKOUT ? "mobile-account" : ""
                    }`}
                  >
                    ACCOUNT
                  </Link>
                ) : (
                  <Link
                    to={LOGIN}
                    className={`links ts ${
                      location.pathname === CHECKOUT ? "mobile-account" : ""
                    }`}
                  >
                    Log In
                  </Link>
                )}
              </li>
              <li>
                <>
                  {location.pathname !== CHECKOUT && (
                    <a
                      className="links ts add-cart"
                      onClick={toggleCheckoutMenu}
                    >
                      <img src={Package} alt="" /> {cartCount}
                    </a>
                  )}
                </>
              </li>
            </ul>
            <CheckoutBox
              toggleCheckout={toggleCheckout}
              toggleCheckoutMenu={toggleCheckoutMenu}
            />
          </div>
          <ToastContainer />
        </Container>
      </header>
      <LoginPopup
        show={modalShow}
        onHide={() => setModalShow(false)}
      ></LoginPopup>
    </>
  );
};

export default Header;
