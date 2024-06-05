import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { ADDNEWADDRESS } from '../../../Constant/Route';
import CustomeButton from '../../Common/CustomeButton/CustomeButton';
import MYADDRESSES from '../../../Language/MyAddresses';
import { useDispatch, useSelector } from 'react-redux';
import { API_STATUS } from '../../../Constant/Api';
import { deleteAddress, getAllAddress } from '../../../Redux/MyAddresses/MyAddressesAction';
import { MYADDRESSES_LONG, MYADDRESSES_CLEAR, MYADDRESSES_FAILD, MYADDRESSES_REQUEST, MYADDRESSES_SUCCESS, MYADDRESSES_DELETE_REQUEST, MYADDRESSES_DELETE_SUCCESS, MYADDRESSES_DELETE_LONG, MYADDRESSES_DELETE_FAILD } from '../../../Redux/MyAddresses/MyAddressesTypes';
import { SUCCESS_RESPONSE_CODE } from '../../../Constant/Status';
import { COMPONENT_ALL_ADDRESSES, COMPONENT_BILLING_ADDRESS, COMPONENT_SHIPPING_ADDRESS } from '../../../Constant/Component';
import Loader from '../../Loader/Loader';
import SomethingWrong from '../../SomethingWrong/SomethingWrong';
import DeleteAccount from '../DeleteAccount/DeleteAccount';
import DeletePopup from '../../Common/DeletePopup/DeletePopup';
import COMMON from '../../../Language/Common';

const MyAddresses = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const [addressesData, setAddressesData] = useState<any>([]);
  const [apiStatus, setApiStatus] = useState(API_STATUS.SUCCESS);
  const [deleteAddressApiStatus, setDeleteAddressApiStatus] = useState(API_STATUS.SUCCESS);
  const addresses = useSelector((state: any) => state?.getAllAddress?.data);
  const [deleteModalShow, setDeleteModalShow] = React.useState(false);
  const [moduleId, setModuleId] = React.useState('');

  useEffect(() => {
    dispatch(getAllAddress())
  }, []);

  useEffect(() => {
    let componentData: any = {}
    addresses?.component?.forEach((component: any) => {
      componentData[component?.componentId] = component
    });
    setAddressesData({ ...componentData })
  }, [addresses]);

  const deleteAdd = (addressId: any) => {
    setModuleId(addressId)
    setDeleteModalShow(true)
  }

  const onYes = (id: any) => {
    dispatch(deleteAddress({ addressId: id }))
  }

  useSelector((state: any) => {
    if (state?.getAllAddress?.type === MYADDRESSES_REQUEST) {
      if (apiStatus !== API_STATUS.LOADING) {
        setApiStatus(API_STATUS.LOADING)
      }
    }
    else if (state?.getAllAddress?.data?.statusCode === SUCCESS_RESPONSE_CODE && state?.getAllAddress?.type === MYADDRESSES_SUCCESS) {
      if (apiStatus !== API_STATUS.SUCCESS) {
        setApiStatus(API_STATUS.SUCCESS)
      }
    }
    else if (state?.getAllAddress?.type === MYADDRESSES_LONG) {
      if (apiStatus !== API_STATUS.LONG) {
        setApiStatus(API_STATUS.LONG)
      }
    }
    else if (state?.getAllAddress?.type === MYADDRESSES_FAILD) {
      if (apiStatus !== API_STATUS.FAILED) {
        setApiStatus(API_STATUS.FAILED)
      }
    }

    if (state?.deleteAddress?.type === MYADDRESSES_DELETE_REQUEST) {
      if (deleteAddressApiStatus !== API_STATUS.LOADING) {
        setDeleteAddressApiStatus(API_STATUS.LOADING)
      }
    }
    else if (state?.deleteAddress?.data?.statusCode === SUCCESS_RESPONSE_CODE && state?.deleteAddress?.type === MYADDRESSES_DELETE_SUCCESS) {
      if (deleteAddressApiStatus !== API_STATUS.SUCCESS) {
        setDeleteAddressApiStatus(API_STATUS.SUCCESS)
        setDeleteModalShow(false)
      }
    }
    else if (state?.deleteAddress?.type === MYADDRESSES_DELETE_LONG) {
      if (deleteAddressApiStatus !== API_STATUS.LONG) {
        setDeleteAddressApiStatus(API_STATUS.LONG)
      }
    }
    else if (state?.deleteAddress?.type === MYADDRESSES_DELETE_FAILD) {
      if (deleteAddressApiStatus !== API_STATUS.FAILED) {
        setDeleteAddressApiStatus(API_STATUS.FAILED)
        setDeleteModalShow(false)
      }
    }
  })

  const billingAddress = addressesData[COMPONENT_BILLING_ADDRESS]?.billingAddress;
  const isBilling = billingAddress ? ((Object.keys(billingAddress).length > 0) ? true : false) : false;

  const shippingAddress = addressesData[COMPONENT_SHIPPING_ADDRESS]?.shippingAddress;
  const isShipping = shippingAddress ? ((Object.keys(shippingAddress).length > 0) ? true : false) : false;

  const allAddress = addressesData[COMPONENT_ALL_ADDRESSES]?.allAddress;
  const isAllAddress = allAddress ? ((Object.keys(allAddress).length > 0) ? true : false) : false;

  switch (apiStatus) {
    case API_STATUS.LOADING:
      return (<Loader></Loader>);
    case API_STATUS.SUCCESS:
      return (
        <div className="my-addresses">
          <h4>{MYADDRESSES.MYADDRESS}</h4>
          <div className="default-address">
            <p className="tl">{MYADDRESSES.DEFAULT_ADDRESSES}</p>
            <Row>
              <Col xs={12} sm={6} md={6}>
                <div className="this-box-wrapper">
                  <p className="tm">{MYADDRESSES.DEFAULT_BILLING_ADDRESS}</p>

                  {
                    isBilling ?
                      <>
                        <p className="bl">{addressesData[COMPONENT_BILLING_ADDRESS]?.billingAddress?.firstName + ' ' + addressesData[COMPONENT_BILLING_ADDRESS]?.billingAddress?.lastName}</p>
                        <p className="bl">{addressesData[COMPONENT_BILLING_ADDRESS]?.billingAddress?.streetName}</p><p className="bl">{addressesData[COMPONENT_BILLING_ADDRESS]?.billingAddress?.city}, {addressesData[COMPONENT_BILLING_ADDRESS]?.billingAddress?.state}, {addressesData[COMPONENT_BILLING_ADDRESS]?.billingAddress?.postCode}</p>
                        <div className="redirect-links">
                          <Link to={ADDNEWADDRESS} state={{ addressData: addressesData[COMPONENT_BILLING_ADDRESS]?.billingAddress }} className="pages-link bl">{MYADDRESSES.EDIT_ADDRESS}</Link>

                          {/* <a onClick={() => deleteAdd(addressesData[COMPONENT_BILLING_ADDRESS]?.billingAddress?.addressId)} className="pages-link bl">{MYADDRESSES.DELETE_ADDRESS}</a> */}
                        </div>
                      </>
                      : <><p className="bl">{MYADDRESSES.DEFAULT_BILLING_ADDRESS_NOT_SET}</p>
                        <div className="redirect-links">
                          <Link to={ADDNEWADDRESS} state={{ defaultBillingShipping: { isDB: '1' } }} className="pages-link bl">{MYADDRESSES.ADD_BILLING_ADDRESS}</Link>
                        </div>
                      </>
                  }
                </div>
              </Col>
              <Col xs={12} sm={6} md={6}>
                <div className="this-box-wrapper">
                  <p className="tm">{MYADDRESSES.DEFAULT_SHIPPING_ADDRESS}</p>
                  {
                    isShipping ?
                      <>
                        <p className="bl">{addressesData[COMPONENT_SHIPPING_ADDRESS]?.shippingAddress?.firstName + ' ' + addressesData[COMPONENT_SHIPPING_ADDRESS]?.shippingAddress?.lastName}</p>
                        <p className="bl">{addressesData[COMPONENT_SHIPPING_ADDRESS]?.shippingAddress?.streetName}</p>
                        <p className="bl">{addressesData[COMPONENT_SHIPPING_ADDRESS]?.shippingAddress?.city}, {addressesData[COMPONENT_SHIPPING_ADDRESS]?.shippingAddress?.state}, {addressesData[COMPONENT_SHIPPING_ADDRESS]?.shippingAddress?.postCode}</p>
                        <div className="redirect-links">
                          <Link to={ADDNEWADDRESS} state={{ addressData: addressesData[COMPONENT_SHIPPING_ADDRESS]?.shippingAddress }} className="pages-link bl">{MYADDRESSES.EDIT_ADDRESS}</Link>

                          {/* <a onClick={() => deleteAdd(addressesData[COMPONENT_SHIPPING_ADDRESS]?.shippingAddress?.addressId)} className="pages-link bl">{MYADDRESSES.DELETE_ADDRESS}</a> */}
                        </div>
                      </>
                      : <><p className="bl">{MYADDRESSES.DEFAULT_SHIPPING_ADDRESS_NOT_SET}</p>
                        <div className="redirect-links">
                          <Link to={ADDNEWADDRESS} state={{ defaultBillingShipping: { isDS: '1' } }} className="pages-link bl">{MYADDRESSES.ADD_SHIPPING_ADDRESS}</Link>
                        </div></>
                  }
                </div>
              </Col>
            </Row>
          </div>
          <div className="additional-address">
            <p className="tl">{MYADDRESSES.ADDITIONAL_ADDRESSES}</p>
            {
              isAllAddress ?
                addressesData[COMPONENT_ALL_ADDRESSES]?.allAddress.map((address: any, index: number) => {
                  return <>
                    <div className="this-box-wrapper" key={index}>
                      <p className="bl">{address?.firstName + ' ' + address?.lastName}</p>
                      <p className="bl">{address?.streetName}</p>
                      <p className="bl">{address?.city}, {address?.state}, {address?.postCode}</p>
                      <div className="redirect-links">
                        <Link to={ADDNEWADDRESS} state={{ addressData: address }} className="pages-link bl">{MYADDRESSES.EDIT_ADDRESS}</Link>

                        <a onClick={() => deleteAdd(address?.addressId)} className="pages-link bl">{MYADDRESSES.DELETE_ADDRESS}</a>
                      </div>
                    </div>
                  </>
                })
                : <p className="bl">{MYADDRESSES.ADDITIONAL_ADDRESSES_NOT_SET}</p>
            }

            <CustomeButton bg="fill" onClick={() => navigate(ADDNEWADDRESS)}>{MYADDRESSES.ADD_ADDRESS}</CustomeButton>
          </div>
          <DeletePopup
            show={deleteModalShow}
            onHide={() => setDeleteModalShow(false)}
            onYes={() => onYes(moduleId)}
            onNo={() => setDeleteModalShow(false)}
            isLoading={deleteAddressApiStatus}
            moduleId={moduleId}
          />
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

export default MyAddresses;
