import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import CustomeButton from "../../Common/CustomeButton/CustomeButton";
import Browse from "../../../Assets/img/browse.svg";
import CloseIcon from "../../../Assets/img/close.svg";
import { INSPIRATIONCATEGORY } from "../../../Constant/Route";
import { Link } from "react-router-dom";
import COMMON from "../../../Language/Common";

const BrowseBy = (props: any) => {
  const [toggleBrowse, setBrowseSide] = useState(false);

  const toggleBrowseMenu = () => {
    setBrowseSide(!toggleBrowse);
  };

  return (
    <div className="browse-by-section">
      <div className="browse-btn-wrapper">
        <div className="browse-btn" onClick={() => toggleBrowseMenu()}>
          <img src={Browse} alt="" />
          <p className="ts">{COMMON.BROWSE_BY}</p>
        </div>
      </div>
      <div className={`i-filter ${toggleBrowse ? "active" : ""}`}>
        <div className="i-filter-header">
          <p className="tl">{COMMON.BROWSE_BY}</p>
          <img src={CloseIcon} alt="" onClick={() => toggleBrowseMenu()} />
        </div>

        {/* Web View 2 Start */}
        <div className="dropdown-wrapper">

          {props?.data?.map((items: any, key: any) => (
            items?.childData?.list?.length ?
            <Dropdown className="i-dropdown">
              <Dropdown.Toggle>
                {/* <p className="ts">{items.name}</p> */}
                <Link to={INSPIRATIONCATEGORY + '/' + items.urlKey} key={'recipte-category-' + key} className="ts">{items.name}</Link>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {items?.childData?.list?.map((subItem: any, subKey: any) => {
                  //return <Dropdown.Item href={INSPIRATIONCATEGORY + '/' + subItem.urlKey}>{subItem.name}</Dropdown.Item>
                  return <Link to={INSPIRATIONCATEGORY + '/' + subItem.urlKey} key={'recipte-category-' + key} className="dropdown-item">{subItem.name}</Link>
                })}
              </Dropdown.Menu>
            </Dropdown>
            :
            <Link to={INSPIRATIONCATEGORY + '/' + items.urlKey} key={'recipte-category-' + key} className="ts">{items.name}</Link>
          ))
          }
        </div>


        <div className="mobile-dropdown-wrapper">

          {props?.data?.map((items: any, key: any) => {
            return (
              <>
                <p className="tm">{items.name}</p>
                <ul>
                  {items?.childData?.list?.map((subItem: any, subKey: any) => {
                    return (<li key={'child-' + subKey}>
                      <Link to={INSPIRATIONCATEGORY + '/' + subItem.urlKey} key={'recipte-category-' + key} className="D-link bm">{subItem.name}</Link>
                    </li>)
                  })}
                </ul>
              </>
            )
          })
          }
        </div>


      </div>
    </div>
  );
};

export default BrowseBy;
