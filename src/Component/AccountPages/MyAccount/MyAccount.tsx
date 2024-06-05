import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { API_STATUS } from '../../../Constant/Api';
import { COMPONENT_BILLING_ADDRESS, COMPONENT_SHIPPING_ADDRESS } from '../../../Constant/Component';
import { ACCOUNTINFORMATION, ADDNEWADDRESS, MYADDRESSES } from '../../../Constant/Route';
import { SUCCESS_RESPONSE_CODE } from '../../../Constant/Status';
import { getMyaccount } from '../../../Redux/MyAccount/MyAccountAction';
import { MYACCOUNT_FAILD, MYACCOUNT_LONG, MYACCOUNT_REQUEST, MYACCOUNT_SUCCESS } from '../../../Redux/MyAccount/MyAccountTypes';
import Loader from '../../Loader/Loader';
import SomethingWrong from '../../SomethingWrong/SomethingWrong';
import { default as MYADDRESSESS } from '../../../Language/MyAddresses';
import MYACCOUNT from '../../../Language/MyAccount';


const MyAccount = () => {

  const dispatch = useDispatch();

  const [myAccountData, setMyAccountData] = useState<any>([]);
  const [apiStatus, setApiStatus] = useState(API_STATUS.SUCCESS);
  const accountData = useSelector((state: any) => state?.getMyaccount?.data);

  useEffect(() => {
    dispatch(getMyaccount())
  }, []);

  useEffect(() => {
    let componentData: any = {}
    accountData?.component?.forEach((component: any) => {
      componentData[component?.componentId] = component
    });
    setMyAccountData({ ...componentData })
  }, [accountData]);

  useSelector((state: any) => {
    if (state?.getMyaccount?.type === MYACCOUNT_REQUEST) {
      if (apiStatus !== API_STATUS.LOADING) {
        setApiStatus(API_STATUS.LOADING)
      }
    }
    else if (state?.getMyaccount?.data?.statusCode === SUCCESS_RESPONSE_CODE && state?.getMyaccount?.type === MYACCOUNT_SUCCESS) {
      if (apiStatus !== API_STATUS.SUCCESS) {
        setApiStatus(API_STATUS.SUCCESS)
      }
    }
    else if (state?.getMyaccount?.type === MYACCOUNT_LONG) {
      if (apiStatus !== API_STATUS.LONG) {
        setApiStatus(API_STATUS.LONG)
      }
    }
    else if (state?.getMyaccount?.type === MYACCOUNT_FAILD) {
      if (apiStatus !== API_STATUS.FAILED) {
        setApiStatus(API_STATUS.FAILED)
      }
    }
  })

  const billingAddress = myAccountData[COMPONENT_BILLING_ADDRESS]?.billingAddress;
  const isBilling = billingAddress ? ((Object.keys(billingAddress).length > 0) ? true : false) : false;

  const shippingAddress = myAccountData[COMPONENT_SHIPPING_ADDRESS]?.shippingAddress;
  const isShipping = shippingAddress ? ((Object.keys(shippingAddress).length > 0) ? true : false) : false;

  switch (apiStatus) {
    case API_STATUS.LOADING:
      return (<Loader></Loader>);
    case API_STATUS.SUCCESS:
      return (
        <div className="my-account">
          <h4>My Account</h4>
          <div className="account-information">
            <p className="tl">{MYACCOUNT.MYACCOUNT}</p>
            <Row>
              <Col sm={12}>
                <div className="this-box-wrapper">
                  <p className="tm">{MYACCOUNT.MYACCOUNT_CONTACT_INFO}</p>
                  <p className="bl">{myAccountData?.myProfile?.myProfile?.firstName + ' ' + myAccountData?.myProfile?.myProfile?.lastName}</p>
                  <p className="bl">{myAccountData?.myProfile?.myProfile?.email}</p>
                  <div className="redirect-links">
                    <Link to={ACCOUNTINFORMATION} className="pages-link bl">{MYACCOUNT.MYACCOUNT_EDIT}</Link>
                    <Link to={ACCOUNTINFORMATION} state={{ isChangepassword: '1' }} className="pages-link bl">{MYACCOUNT.MYACCOUNT_CHANGE_PASSWORD}</Link>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          <div className="my-address-box">
            <div className="header-and-link">
              <p className="tl">{MYACCOUNT.MYACCOUNT_MY_ADDRESSES}</p>
              <Link to={MYADDRESSES} className="pages-link bl">{MYACCOUNT.MYACCOUNT_MANAGE_ADDRESSES}</Link>
            </div>
            <Row>
              <Col xs={12} sm={6} md={6}>
                <div className="this-box-wrapper">
                  <p className="tm">{MYADDRESSESS.DEFAULT_BILLING_ADDRESS}</p>
                  {
                    isBilling ?
                      <>
                        <p className="bl">{myAccountData[COMPONENT_BILLING_ADDRESS]?.billingAddress?.firstName + ' ' + myAccountData[COMPONENT_BILLING_ADDRESS]?.billingAddress?.lastName}</p>
                        <p className="bl">{myAccountData[COMPONENT_BILLING_ADDRESS]?.billingAddress?.streetName}</p><p className="bl">{myAccountData[COMPONENT_BILLING_ADDRESS]?.billingAddress?.city}, {myAccountData[COMPONENT_BILLING_ADDRESS]?.billingAddress?.state}, {myAccountData[COMPONENT_BILLING_ADDRESS]?.billingAddress?.postCode}</p>
                        <div className="redirect-links">
                          <Link to={ADDNEWADDRESS} state={{ addressData: myAccountData[COMPONENT_BILLING_ADDRESS]?.billingAddress }} className="pages-link bl">{MYADDRESSESS.EDIT_ADDRESS}</Link>
                        </div>
                      </>
                      : <><p className="bl">{MYADDRESSESS.DEFAULT_BILLING_ADDRESS_NOT_SET}</p>
                        <div className="redirect-links">
                          <Link to={ADDNEWADDRESS} state={{ defaultBillingShipping: { isDB: '1' } }} className="pages-link bl">{MYADDRESSESS.ADD_BILLING_ADDRESS}</Link>
                        </div>
                      </>
                  }
                </div>
              </Col>
              <Col xs={12} sm={6} md={6}>
                <div className="this-box-wrapper">
                  <p className="tm">{MYADDRESSESS.DEFAULT_SHIPPING_ADDRESS}</p>
                  {
                    isShipping ?
                      <>
                        <p className="bl">{myAccountData[COMPONENT_SHIPPING_ADDRESS]?.shippingAddress?.firstName + ' ' + myAccountData[COMPONENT_SHIPPING_ADDRESS]?.shippingAddress?.lastName}</p>
                        <p className="bl">{myAccountData[COMPONENT_SHIPPING_ADDRESS]?.shippingAddress?.streetName}</p>
                        <p className="bl">{myAccountData[COMPONENT_SHIPPING_ADDRESS]?.shippingAddress?.city}, {myAccountData[COMPONENT_SHIPPING_ADDRESS]?.shippingAddress?.state}, {myAccountData[COMPONENT_SHIPPING_ADDRESS]?.shippingAddress?.postCode}</p>
                        <div className="redirect-links">
                          <Link to={ADDNEWADDRESS} state={{ addressData: myAccountData[COMPONENT_SHIPPING_ADDRESS]?.shippingAddress }} className="pages-link bl">{MYADDRESSESS.EDIT_ADDRESS}</Link>
                        </div>
                      </>
                      : <><p className="bl">{MYADDRESSESS.DEFAULT_SHIPPING_ADDRESS_NOT_SET}</p>
                        <div className="redirect-links">
                          <Link to={ADDNEWADDRESS} state={{ defaultBillingShipping: { isDS: '1' } }} className="pages-link bl">{MYADDRESSESS.ADD_SHIPPING_ADDRESS}</Link>
                        </div>
                      </>
                  }
                </div>
              </Col>
            </Row>
          </div>
        </div>
      );
    case API_STATUS.LONG:
      return (<SomethingWrong></SomethingWrong>);
    case API_STATUS.FAILED:
      return (<SomethingWrong></SomethingWrong>);
    default:
      return (<Loader></Loader>);
  }


}

export default MyAccount;
