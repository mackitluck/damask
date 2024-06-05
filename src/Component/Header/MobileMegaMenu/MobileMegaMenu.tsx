import React, { useEffect, useRef, useState } from "react";
// import SideLogo from "../../../Assets/img/side-logo.svg";
import Logo from "../../../Assets/img/Logo.svg";
import DarkPin from "../../../Assets/img/dark-map-pin.svg";
import CloseIcon from "../../../Assets/img/close.svg";
import { Link, useNavigate } from "react-router-dom";
import {
  HOME,
  INSPIRATIONCATEGORY,
  INSPIRATIONLISTING,
  LOGIN,
  MYACCOUNTS,
  OURSTORY,
  PRODUCTDETAIL,
  PRODUCTLIST,
  RECIPELANDING,
} from "../../../Constant/Route";
import { useDispatch, useSelector } from "react-redux";
import { API_STATUS } from "../../../Constant/Api";
import megaMenuAction from "../../../Redux/Header/HeaderAction";
import { MEGA_MENU_FAILD, MEGA_MENU_LONG, MEGA_MENU_NO_DATA, MEGA_MENU_REQUEST, MEGA_MENU_SUCCESS } from "../../../Redux/Header/HeaderTypes";
import { SUCCESS_RESPONSE_CODE } from "../../../Constant/Status";
import { COMPONENT_MEGA_MENU_CATEGORY_TAB } from "../../../Constant/Component";

const MobileMegaMenu = (props: any) => {
  const navigate = useNavigate();
  let auth = useSelector((state: any) => state?.login?.isLoggedIn)

  const redirectFunction = (e: any) => {
    navigate(e);
    props.toggleMenu();
  };

  const toggleLevel = (e: any) => {
    e.target.classList.toggle("show");
  };


  const dispatch = useDispatch();

  const [apiStatus, setApiStatus] = useState(API_STATUS.LOADING);
  const megaMenuList = useSelector((state: any) => state?.megaMenu?.data);
  const wrapperRef: any = useRef(null);
  const [megaMenuData, setMegaMenuData] = useState<any>({});


  useEffect(() => {
    dispatch(megaMenuAction({}));
  }, []);

  useSelector((state: any) => {
    if (state?.megaMenu?.type === MEGA_MENU_REQUEST) {
      if (apiStatus !== API_STATUS.LOADING) {
        setApiStatus(API_STATUS.LOADING);
      }
    } else if (
      state?.megaMenu?.data?.statusCode === SUCCESS_RESPONSE_CODE &&
      state?.megaMenu?.type === MEGA_MENU_SUCCESS
    ) {
      if (apiStatus !== API_STATUS.SUCCESS) {
        setApiStatus(API_STATUS.SUCCESS);
      }
    } else if (state?.megaMenu?.type === MEGA_MENU_LONG) {
      if (apiStatus !== API_STATUS.LONG) {
        setApiStatus(API_STATUS.LONG);
      }
    } else if (state?.megaMenu?.type === MEGA_MENU_NO_DATA) {
      if (apiStatus !== API_STATUS.NO_DATA) {
        setApiStatus(API_STATUS.NO_DATA)
      }
    } else if (state?.megaMenu?.type === MEGA_MENU_FAILD) {
      if (apiStatus !== API_STATUS.FAILED) {
        setApiStatus(API_STATUS.FAILED);
      }
    }
  });

  useEffect(() => {
    let componentData: any = {}
    megaMenuList?.component?.forEach((component: any) => {
      componentData[component?.componentId] = component
    });
    setMegaMenuData({ ...componentData })
  }, [megaMenuList]);


  return (
    <>
      <div className={`side-menu ${props.toggleSide ? "active" : ""}`}>
        <div className="side-menu-header">
          <a onClick={(e) => redirectFunction(HOME)} className="side-logo">
            <img src={Logo} alt="" />
          </a>
          <div className="choose-link d-none">
            <img src={DarkPin} alt="" />
            <p className="bm">New York</p>
          </div>
          <img
            src={CloseIcon}
            alt=""
            className="close-sidebar"
            onClick={props.toggleMenu}
          />
        </div>
        <div className="scroll-side-menu">
          <ul className="level-1">
            {megaMenuData[COMPONENT_MEGA_MENU_CATEGORY_TAB]?.list?.map((items1: any, index: number) => (
              <li key={index + 'categoryTab'}>
                <div onClick={toggleLevel} className="links arrow">
                  <a onClick={(e) => redirectFunction(PRODUCTLIST + '/' + items1.mapPath)} className="p-0">
                    {items1.title}
                  </a>
                </div>
                <ul className="level-2">
                  {items1?.level2?.length > 0 ?
                    items1?.level2?.map((items2: any, index2: number) => (
                      <li key={index2 + 'categoryTabLevel2'}>
                        <div onClick={toggleLevel} className="links arrow">
                          {items2.isProduct == "0" ?
                          <a onClick={(e) => redirectFunction(PRODUCTLIST + '/' + items2.mapPath)} className="p-0">
                            {items2.title}
                          </a>
                          :
                          <a onClick={(e) => redirectFunction(PRODUCTDETAIL + '/' + items2.urlKey)} className="p-0">
                            {items2.title}
                          </a>
                          }
                        </div>
                        <ul className="level-3">
                          <li>
                            {items2?.level3?.length > 0 ?
                              items2?.level3?.map((items3: any, index3: number) => (
                                <div className="links" key={index3 + 'categoryTabLevel3'}>
                                  <a onClick={(e) => redirectFunction(PRODUCTDETAIL + '/' + items3.urlKey)} className="p-0">
                                    {items3.title}
                                  </a>
                                </div>
                              )) : ''}
                          </li>
                        </ul>
                      </li>
                    )) : ''}
                </ul>
              </li>
            ))}
          </ul>

          <ul className="header-menus">
            <li>
              <a onClick={(e) => redirectFunction(OURSTORY)}>Our Story</a>
            </li>
            {/* <li>
              <a>FEATURED ITEMS</a>
            </li> */}
            <li>
              <a onClick={(e) => redirectFunction(RECIPELANDING)}>Recipes</a>
            </li>
            <li>
              <a onClick={(e) => redirectFunction(INSPIRATIONCATEGORY + '/best-baking-tips')}>Baking Tips</a>
            </li>
            <li>
              <a onClick={(e) => redirectFunction(INSPIRATIONLISTING)}>Inspiration</a>
            </li>
            <li>
              {
                auth ?
                  <a onClick={(e) => redirectFunction(MYACCOUNTS)}>My Account</a>
                  :
                  <a onClick={(e) => redirectFunction(LOGIN)}>Log In</a>
              }
            </li>
          </ul>
        </div>
      </div>
      <div
        className={`side-back ${props.toggleSide ? "active" : ""}`}
        onClick={props.toggleMenu}
      ></div>
    </>
  );
};

export default MobileMegaMenu;
