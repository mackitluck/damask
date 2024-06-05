import React, { useEffect, useRef, useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MMI1 from "../../../Assets/img/MMI-1.png";
import { HOME, PRODUCTDETAIL, PRODUCTLIST } from "../../../Constant/Route";
import { useNavigate } from 'react-router-dom';
import { API_STATUS } from "../../../Constant/Api";
import megaMenuAction from "../../../Redux/Header/HeaderAction";
import { MEGA_MENU_FAILD, MEGA_MENU_LONG, MEGA_MENU_NO_DATA, MEGA_MENU_REQUEST, MEGA_MENU_SUCCESS } from "../../../Redux/Header/HeaderTypes";
import { SUCCESS_RESPONSE_CODE } from "../../../Constant/Status";
import { megaMenu } from "../../../Redux/Header/HeaderReducer";
import { COMPONENT_MEGA_MENU_CATEGORY_TAB } from "../../../Constant/Component";
import LazyImage from "../../Common/LazyImage/LazyImage";

const WebMegaMenu = () => {


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [apiStatus, setApiStatus] = useState(API_STATUS.LOADING);
  const megaMenuList = useSelector((state: any) => state?.megaMenu?.data);
  const wrapperRef: any = useRef(null);
  const [isMegamenu, setIsMegamenu] = useState(false);
  const [activePath, setActivePath] = useState(HOME);
  const [backgroundImage, setBackgroundImage] = useState();
  const [megaMenuData, setMegaMenuData] = useState<any>({});
  const [isLevel2Menu, setIsLevel2Menu] = useState(false);
  const [isLevel3Menu, setIsLevel3Menu] = useState(false);
  const [isActiveMenu, setIsActiveMenu] = useState(true);
  const [level2MenuData, setLevel2MenuData] = useState<any>({});
  const [level3MenuData, setLevel3MenuData] = useState<any>({});
  const [query, setQuery] = useState<any>({});
  const [urlKey, setUrlKey] = useState<any>({});
  const [mapKey, setMapKey] = useState<any>({});

  const setData = (image: any, item: any, urlKey: any, mapKey: any) => {
    // alert(image);
    setBackgroundImage(image);
    setUrlKey(urlKey);
    setLevel2MenuData(item);
    setMapKey(mapKey);
    setIsLevel2Menu(true);
    setIsLevel3Menu(false);
    setIsActiveMenu(false);
  }

  const handleClickOutside = (event: any) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setIsMegamenu(false);
    }
  };

  const setInitialMegamenuData = (data: any) => {
    if (data && data.component?.length) {
      if (data?.component?.length) {
        setBackgroundImage(
          data?.component[0]?.list[0]?.backgroundImage
        );
      }
      setUrlKey(data?.component[0]?.list[0]?.urlKey);
      setMapKey(data?.component[0]?.list[0]?.mapPath);
      setLevel2MenuData(data?.component[0]?.list[0]?.level2);
      setLevel3MenuData(data?.component[0]?.list[0]?.level2[0]?.level3);
      setIsLevel2Menu(true);
      setIsLevel3Menu(true);
      setIsActiveMenu(true);
    }

  }


  const onLevel2MouseOver = (items2: any) => {
    setLevel3MenuData(items2);
    setIsLevel3Menu(true);
  }

  const onLevel2MouseLeave = () => {
    // setIsLevel3Menu(false);
  }



  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

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
        setInitialMegamenuData(state?.megaMenu?.data);
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
    <Dropdown ref={wrapperRef} className="web-mega-menu" onClick={() => setIsMegamenu(!isMegamenu)} show={isMegamenu}>
      <Dropdown.Toggle>
        <p className="ts">BROWSE</p>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <div className="mega-menu-inner">
          <div className="mega-menu-content">
            <div className="dropdown-row">
              <div className="level-1">
                <ul className="level_one_tab">
                  {megaMenuData[COMPONENT_MEGA_MENU_CATEGORY_TAB]?.list?.map((items1: any, index: number) => (
                    <li
                      key={index}
                      onMouseOver={() =>
                        setData(
                          items1?.backgroundImage,
                          items1?.level2,
                          items1?.urlKey,
                          items1?.mapPath)}
                      onClick={() => setIsMegamenu(false)}
                    >
                      <Link to={PRODUCTLIST + '/' + items1.mapPath} onClick={() => setIsMegamenu(false)}
                        className={`mega-links ${items1?.level2?.length ? "arrow" : ""} ${isActiveMenu && index == 0 ? "active" : ""}`}
                        state={{ categoryId: items1.categoryId }} key={index}>{items1.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="level-1 levels-2">
                <ul className="level_one_tab">
                  {isLevel2Menu && level2MenuData?.length > 0 ?
                    level2MenuData?.map((items2: any, index2: number) => (
                      <li
                        onMouseOver={() => onLevel2MouseOver(items2?.level3)}
                        onMouseLeave={() => onLevel2MouseLeave()}
                        onClick={() => setIsMegamenu(false)}
                        key={index2}
                      >
                        {items2.isProduct == "0" ?
                          <Link to={PRODUCTLIST + '/' + items2.mapPath} onClick={() => setIsMegamenu(false)}
                            className={`mega-links ${items2?.level3?.length ? "arrow" : ""} ${isActiveMenu && index2 == 0 ? "active" : ""}`}
                            state={{ categoryId: items2.categoryId }} key={index2}>{items2.title}</Link>
                          :
                          <Link
                            to={PRODUCTDETAIL + '/' + items2.urlKey} onClick={() => setIsMegamenu(false)}
                            className={`mega-links ${isActiveMenu && index2 == 0 ? "active" : ""}`} key={index2}>{items2.title}</Link>
                        }
                      </li>
                    )) : ""}
                  {/* <li>
                    <Link to={PRODUCTLIST} onClick={() => setIsMegamenu(false)} className="mega-links arrow">Gluten Free</Link>
                  </li> */}
                </ul>
              </div>
              <div className="level-1 levels-3">
                <ul className="level_one_tab">
                  {isLevel3Menu && level3MenuData?.length > 0 ?
                    level3MenuData?.map((items3: any, index3: number) => (
                      <li
                        onMouseLeave={() => onLevel2MouseLeave()}
                        onClick={() => setIsMegamenu(false)}
                        key={index3}
                      >
                        <Link
                          to={PRODUCTDETAIL + '/' + items3.urlKey} onClick={() => setIsMegamenu(false)}
                          className={`mega-links ${isActiveMenu && index3 == 0 ? "active" : ""}`} key={index3}>{items3.title}</Link>
                      </li>
                    )) : ""}
                </ul>
              </div>
            </div>
          </div>
          <div className="mega-menu-img">
            <LazyImage src={backgroundImage} type="type" alt="" />
          </div>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default WebMegaMenu;
