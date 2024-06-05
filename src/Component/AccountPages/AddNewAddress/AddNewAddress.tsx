import React, { useEffect, useState } from 'react';
import BackIcon from "../../../Assets/img/arrow-left.svg";
import { Row, Col } from 'react-bootstrap';
import InputGroups from '../../Common/InputGroups/InputGroups';
import SelectGroups from '../../Common/SelectGroups/SelectGroups';
import CheckboxLabel from '../../Common/CheckboxLabel/CheckboxLabel';
import CustomeButton from '../../Common/CustomeButton/CustomeButton';
import { useDispatch, useSelector } from 'react-redux';
import { ADDRESS, CITY, COUNTRY, FIRST_NAME, LAST_NAME, PHONE, STATE, ZIP_CODE } from '../../../Language/Validation';
import { API_STATUS } from '../../../Constant/Api';
import { getAllCountry } from '../../../Redux/Country/CountryAction';
import { SUCCESS_RESPONSE_CODE } from '../../../Constant/Status';
import { COUNTRY_FAILD, COUNTRY_LONG, COUNTRY_REQUEST, COUNTRY_SUCCESS } from '../../../Redux/Country/CountryTypes';
import { COMPONENT_COUNTRY_LIST, COMPONENT_STATE_LIST } from '../../../Constant/Component';
import Loader from '../../Loader/Loader';
import SomethingWrong from '../../SomethingWrong/SomethingWrong';
import { isLoading } from '../../../Utility/General';
import { getAllState } from '../../../Redux/State/StateAction';
import { STATE_FAILD, STATE_LONG, STATE_REQUEST, STATE_SUCCESS } from '../../../Redux/State/StateTypes';
import validate from '../../../Utility/Validation';
import { updateAddress } from '../../../Redux/MyAddresses/MyAddressesAction';
import { ACCOUNTINFORMATION, MYADDRESSES } from '../../../Constant/Route';
import { MYADDRESSES_ADD_UPDATE_CLEAR, MYADDRESSES_ADD_UPDATE_FAILD, MYADDRESSES_ADD_UPDATE_LONG, MYADDRESSES_ADD_UPDATE_REQUEST, MYADDRESSES_ADD_UPDATE_SUCCESS } from '../../../Redux/MyAddresses/MyAddressesTypes';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const AddNewAddress = (props: any) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location: any = useLocation()
  let getDefaultBillingShipping = location?.state?.defaultBillingShipping;
  const INITIAL_ADDRESS_DATA: any = {
    addressData: {
      firstName: { value: null, validation: ["required"], errors: [FIRST_NAME.Required] },
      lastName: { value: null, validation: ["required"], errors: [LAST_NAME.Required] },
      phonenumber: { value: null, validation: ["number","required"], errors: [PHONE.Valid,PHONE.Required] },
      address: { value: null, validation: ["required"], errors: [ADDRESS.Required] },
      countryId: { value: null, validation: ["required"], errors: [COUNTRY.Required] },
      states: { value: null, validation: ["required"], errors: [STATE.Required] },
      city: { value: null, validation: ["required"], errors: [CITY.Required] },
      zipCode: { value: null, validation: ["required"], errors: [ZIP_CODE.Required] },
      isDefaultShipping: { value: getDefaultBillingShipping && getDefaultBillingShipping.isDS ? getDefaultBillingShipping.isDS :  '0' },
      isDefaultBilling: { value: getDefaultBillingShipping && getDefaultBillingShipping.isDB ? getDefaultBillingShipping.isDB : '0' },
      isUpdate: { value: '0' },
      addressId: { value: null },
    },
  }

  

  const [addressData, setAddressData] = useState(INITIAL_ADDRESS_DATA);
  const [addressDataError, setAddressDataError] = useState<any>({});
  const [isFormValidated, setIsFormValidated] = useState(false);
  const [countryApiStatus, setCountryApiStatus] = useState(API_STATUS.SUCCESS);
  const [stateApiStatus, setStateApiStatus] = useState(API_STATUS.SUCCESS);
  const [addAddressApiStatus, setAddAddressApiStatus] = useState(API_STATUS.SUCCESS);
  const [countryData, setCountryData] = useState<any>([]);
  const [stateData, setStateData] = useState<any>([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [billingAddreesSameAsDelivery, setBillingAddreesSameAsDelivery] = useState(true);
  const [isFormButtonDisabled, setIsFormButtonDisabled] = useState(false)

  const country = useSelector((state: any) => {
    return state?.getAllCountry?.data
  });
  const states = useSelector((state: any) => {
    return state?.getAllState?.data
  });


  useEffect(() => {
    dispatch(getAllCountry())
    let requiredData = ['firstName', 'lastName', 'phonenumber', 'address', 'countryId', 'state', 'city', 'zipCode', 'isDefaultShipping', 'isDefaultBilling','addressId'];
    let requiredRename = { 'postCode': 'zipCode', 'lastName': 'lastName', 'stateId': 'states', 'streetName':'address' } as any;
    let addressData = location?.state?.addressData;
    if (addressData) {
      getStates(addressData.countryId);
      setData('isUpdate', '1')
      Object.keys(addressData).forEach((component: any) => {
        if (requiredData.includes(component)) {
          setData(component, addressData[component])
        } else if (requiredRename[component]) {
          setData(requiredRename[component], addressData[component])
        }
      });
      
    }
  }, []);

  useEffect(() => {
    let componentData: any = {}
    country?.component?.forEach((component: any) => {
      componentData[component?.componentId] = component
    });
    setCountryData({ ...componentData })
  }, [country]);

  useEffect(() => {
    setData("state", null);
    let componentData: any = {}
    states?.component?.forEach((component: any) => {
      componentData[component?.componentId] = component
    });
    setStateData({ ...componentData })
  }, [states]);

  const getStates = (value: string) => {
    dispatch(getAllState({ countryCode: value }))
  }

  const setData = (field: string, value: any) => {
    let addressDetails = Object.assign({}, addressData)
    if (addressDetails.addressData[field]) {
      addressDetails.addressData[field].value = value;
    }
    setAddressData({ ...addressDetails })
  }

  useEffect(() => {
    setAddressDataError({ ...validate(addressData.addressData)?.errors })
  }, [addressData])

  const onSubmit = () => {
    if (validate(addressData.addressData).isValidated === true) {
      setIsFormButtonDisabled(true)
      dispatch(updateAddress({ addressData: { firstName: addressData.addressData.firstName.value, lastName: addressData.addressData.lastName.value, phonenumber: addressData.addressData.phonenumber.value, address: addressData.addressData.address.value, countryId: addressData.addressData.countryId.value, state: addressData.addressData.states.value, city: addressData.addressData.city.value, zipCode: addressData.addressData.zipCode.value, isDefaultShipping: addressData.addressData.isDefaultShipping.value, isDefaultBilling: addressData.addressData.isDefaultBilling.value }, isUpdate: addressData.addressData.isUpdate.value, addressId: addressData.addressData.addressId.value }))
    }
    else {
      setAddressDataError({ ...validate(addressData.addressData)?.errors })
      setIsFormValidated(true)
    }
  }

  useSelector((state: any) => {
    if (state?.getAllCountry?.type === COUNTRY_REQUEST) {
      if (countryApiStatus !== API_STATUS.LOADING) {
        setCountryApiStatus(API_STATUS.LOADING)
      }
    }
    else if (state?.getAllCountry?.data?.statusCode === SUCCESS_RESPONSE_CODE && state?.getAllCountry?.type === COUNTRY_SUCCESS) {
      if (countryApiStatus !== API_STATUS.SUCCESS) {
        setCountryApiStatus(API_STATUS.SUCCESS)
      }
    }
    else if (state?.getAllCountry?.type === COUNTRY_LONG) {
      if (countryApiStatus !== API_STATUS.LONG) {
        setCountryApiStatus(API_STATUS.LONG)
      }
    }
    else if (state?.getAllCountry?.type === COUNTRY_FAILD) {
      if (countryApiStatus !== API_STATUS.FAILED) {
        setCountryApiStatus(API_STATUS.FAILED)
      }
    }

    if (state?.getAllState?.type === STATE_REQUEST) {
      if (stateApiStatus !== API_STATUS.LOADING) {
        setStateApiStatus(API_STATUS.LOADING)
      }
    }
    else if (state?.getAllState?.data?.statusCode === SUCCESS_RESPONSE_CODE && state?.getAllState?.type === STATE_SUCCESS) {
      if (stateApiStatus !== API_STATUS.SUCCESS) {
        setStateApiStatus(API_STATUS.SUCCESS)
      }
    }
    else if (state?.getAllState?.type === STATE_LONG) {
      if (stateApiStatus !== API_STATUS.LONG) {
        setStateApiStatus(API_STATUS.LONG)
      }
    }
    else if (state?.getAllState?.type === STATE_FAILD) {
      if (stateApiStatus !== API_STATUS.FAILED) {
        setStateApiStatus(API_STATUS.FAILED)
      }
    }

    if (state?.updateAddress?.type === MYADDRESSES_ADD_UPDATE_REQUEST) {
      if (addAddressApiStatus !== API_STATUS.LOADING) {
        setAddAddressApiStatus(API_STATUS.LOADING)
      }
    }
    else if (state?.updateAddress?.data?.statusCode === SUCCESS_RESPONSE_CODE && state?.updateAddress?.type === MYADDRESSES_ADD_UPDATE_SUCCESS) {
      if (addAddressApiStatus !== API_STATUS.SUCCESS) {
        setAddAddressApiStatus(API_STATUS.SUCCESS)
        setIsFormButtonDisabled(false)
        dispatch({
          type: MYADDRESSES_ADD_UPDATE_CLEAR,
          payload: { type: MYADDRESSES_ADD_UPDATE_CLEAR },
        });
        navigate(MYADDRESSES)
      }
    }
    else if (state?.updateAddress?.type === MYADDRESSES_ADD_UPDATE_LONG) {
      if (addAddressApiStatus !== API_STATUS.LONG) {
        setAddAddressApiStatus(API_STATUS.LONG)
      }
    }
    else if (state?.updateAddress?.type === MYADDRESSES_ADD_UPDATE_FAILD) {
      if (addAddressApiStatus !== API_STATUS.FAILED) {
        setAddAddressApiStatus(API_STATUS.FAILED)
        setIsFormButtonDisabled(false)
      }
    }
  })

  

  switch (countryApiStatus) {
    case API_STATUS.LOADING:
      return (<Loader></Loader>);
    case API_STATUS.SUCCESS:
      return (
        <div className="add-new-address">
          <div className="back-btn-header">
            <Link to={MYADDRESSES} className="back-btn"><img src={BackIcon} alt="" /></Link>
            <h4>Add New Address</h4>
          </div>
          <div className="ANA-wrapper">
            <Row>
              <Col xs={12} sm={12} md={12} lg={6}>
                <div className="contact-info">
                  <p className="tl">Contact Information</p>
                  <InputGroups
                    onChange={(e: any) => setData("firstName", e.target.value)}
                    error={isFormValidated && addressDataError.firstName ? addressDataError.firstName : null}
                    value={addressData.addressData.firstName.value}
                    label="First Name*" />
                  <InputGroups
                    onChange={(e: any) => setData("lastName", e.target.value)}
                    error={isFormValidated && addressDataError.lastName ? addressDataError.lastName : null}
                    value={addressData.addressData.lastName.value}
                    label="Last Name*" />
                  <InputGroups
                    onChange={(e: any) => setData("phonenumber", e.target.value)}
                    error={isFormValidated && addressDataError.phonenumber ? addressDataError.phonenumber : null}
                    value={addressData.addressData.phonenumber.value}
                    label="Phone Number*" />
                </div>
              </Col>
              <Col xs={12} sm={12} md={12} lg={6}>
                <div className="address">
                  <p className="tl">Address</p>
                  <InputGroups
                    onChange={(e: any) => setData("address", e.target.value)}
                    error={isFormValidated && addressDataError.address ? addressDataError.address : null}
                    value={addressData.addressData.address.value}
                    label="Address*" />
    
                  <SelectGroups label="Country*"
                    defaultSelect={addressData.addressData.countryId.value}
                    error={isFormValidated && addressDataError.countryId ? addressDataError.countryId : null}
                    value={countryData[COMPONENT_COUNTRY_LIST]?.list?.map((country: any) => ({ id: country.id, name: country.country }))}
                    onChange={(e: any) => (
                      getStates(e.target.value),
                      setData("countryId", e.target.value)
                    )}
                  />
                  <SelectGroups
                    defaultSelect={addressData.addressData.states.value}
                    onChange={(e: any) => setData("states", e.target.value)}
                    error={isFormValidated && addressDataError.states ? addressDataError.states : null}
                    label="State*"
                    value={stateData[COMPONENT_STATE_LIST]?.list?.map((states: any) => ({ id: states.id, name: states.title }))}
                  />
    
                  <InputGroups
                    onChange={(e: any) => setData("city", e.target.value)}
                    value={addressData.addressData.city.value}
                    error={isFormValidated && addressDataError.city ? addressDataError.city : null}
                    label="City*" />
    
                  <InputGroups
                    onChange={(e: any) => setData("zipCode", e.target.value)}
                    value={addressData.addressData.zipCode.value}
                    error={isFormValidated && addressDataError.zipCode ? addressDataError.zipCode : null}
                    label="Zip Code*" />
                      
                  <CheckboxLabel checked={addressData.addressData.isDefaultShipping.value==='1'?true:false} onChange={(e: any) => setData("isDefaultShipping", e.target.checked ? '1' : '0')}>Use as my default delivery address</CheckboxLabel>
                  <br />
                  <CheckboxLabel checked={addressData.addressData.isDefaultBilling.value==='1'?true:false} onChange={(e: any) => setData("isDefaultBilling", e.target.checked ? '1' : '0')}>Use as my default billing address</CheckboxLabel>
                </div>
              </Col>
              <Col xs={12} sm={12} md={12} lg={6}>
                <CustomeButton disabled={isFormButtonDisabled} isLoading={isLoading(addAddressApiStatus)} onClick={() => onSubmit()} bg="fill">Save Address</CustomeButton>
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

export default AddNewAddress;
