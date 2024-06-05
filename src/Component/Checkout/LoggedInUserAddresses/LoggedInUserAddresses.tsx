import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { COMPONENT_COUNTRY_LIST, COMPONENT_GUEST_CHECKOUT_ADDRESS, COMPONENT_STATE_LIST } from '../../../Constant/Component'
import COMMON from '../../../Language/Common'
import { isLoading } from '../../../Utility/General'
import CheckboxLabel from '../../Common/CheckboxLabel/CheckboxLabel'
import CustomeButton from '../../Common/CustomeButton/CustomeButton'
import InputGroups from '../../Common/InputGroups/InputGroups'
import SelectGroups from '../../Common/SelectGroups/SelectGroups'

function LoggedInUserAddresses(props: any) {
    const [deliveryState, setDeliveryState] = useState(props.deliveryState);
    const [billingState, setBillingState] = useState(props.billingState);
    const [sameAddress, setSameAddress] = useState(props.isBothAddressSame)
    useEffect(() => {
        setDeliveryState(props.deliveryState);
        setBillingState(props.billingState);
        setSameAddress(props.isBothAddressSame);
    }, [props])

    const handleClickOfDeliveredAddress = (addressId:string, isDefaultShipping:string) => {
        props.setDeliveredAddress(addressId, isDefaultShipping)
    }
    return (
        <>
            <div className="DA-default">
                <p className="tl">DELIVERY ADDRESS</p>

                {
                    props.checkOutListData[COMPONENT_GUEST_CHECKOUT_ADDRESS]?.checkoutAddressData?.address?.list?.map((address: any, index: number) => {
                        let isActiveClass: any = address?.isSelected === '1' ? 'active' : '';
                        return <><div className={"DA-box " + isActiveClass} key={'loggedInUserList' + index}>
                            <p className="bm">{address?.firstName + ' ' + address?.lastName}</p>
                            <p className="bm">
                                {address?.streetName} {address?.city}, {address?.state}, {address?.postCode}
                            </p>
                            <p className="bm">{address?.phonenumber}</p>

                            <p onClick={() => handleClickOfDeliveredAddress(address.addressId, '1')} className="pages-link">{COMMON.DELIVER_HERE}</p>
                        </div></>
                    })
                }

                {/* <div className="DA-box active">
                    <p className="bm">Elma Burchfield</p>
                    <p className="bm">
                        1028 Harlem Rd, Buffalo, NY 14224, United States
                    </p>
                    <p className="bm">+1 234 567 8901</p>

                    <p className="pages-link">Deliver Here</p>
                </div>

                <div className="DA-box">
                    <p className="bm">Elma Burchfield</p>
                    <p className="bm">
                        1028 Harlem Rd, Buffalo, NY 14224, United States
                    </p>
                    <p className="bm">+1 234 567 8901</p>

                    <p className="pages-link">Deliver Here</p>
                </div> */}

                <CustomeButton onClick={() => props.setAddAddressModalShow(true)}>
                    Add New Address
                </CustomeButton>
            </div>
            <div className="add-billing-address">
                <p className="tl">BILLING ADDRESS</p>

                <Row>
                    <Col sm={12} md={12} lg={12} className="mb-32">
                        <CheckboxLabel checked={sameAddress} onChange={() => {
                            props.setIsBothAddressSame(sameAddress === true ? false : true);
                            props.setBillingShippingAddressData("isBilingSelect", sameAddress === true ? '0' : '1', "fieldValueChanged")
                        }}>Bill to delivery address</CheckboxLabel>
                    </Col>
                    {!sameAddress ?
                        <>
                            <Col sm={12} md={6} lg={6}>
                                <InputGroups label="First Name*"
                                    onChange={(e: any) => props.setBillingShippingAddressData("b_firstName", e.target.value, "fieldValueChanged")}
                                    error={props.isAddressDataFormValidated && props.addressDataError.b_firstName ? props.addressDataError.b_firstName : null}
                                    value={props.addressData.address.b_firstName.value}
                                />
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <InputGroups label="Last Name*"
                                    onChange={(e: any) => props.setBillingShippingAddressData("b_lastName", e.target.value, "fieldValueChanged")}
                                    error={props.isAddressDataFormValidated && props.addressDataError.b_lastName ? props.addressDataError.b_lastName : null}
                                    value={props.addressData.address.b_lastName.value}
                                />
                            </Col>
                            <Col md={12} lg={12}>
                                <InputGroups label="Address*"
                                    onChange={(e: any) => props.setBillingShippingAddressData("b_street", e.target.value, "fieldValueChanged")}
                                    error={props.isAddressDataFormValidated && props.addressDataError.b_street ? props.addressDataError.b_street : null}
                                    value={props.addressData.address.b_street.value}
                                />
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <SelectGroups label="Country*"
                                    defaultSelect={props.addressData.address.b_countryId.value}
                                    error={props.isAddressDataFormValidated && props.addressDataError.b_countryId ? props.addressDataError.b_countryId : null}
                                    value={props.country[COMPONENT_COUNTRY_LIST]?.list?.map((country: any) => ({ id: country.id, name: country.country }))}
                                    onChange={(e: any) => {
                                        props.getBillingState(e.target.value);
                                        props.setBillingShippingAddressData("b_countryId", e.target.value, "fieldValueChanged")
                                    }}
                                />
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <SelectGroups label="State*"
                                    defaultSelect={props.addressData.address.b_states.value}
                                    error={props.isAddressDataFormValidated && props.addressDataError.b_states ? props.addressDataError.b_states : null}
                                    value={billingState?.[COMPONENT_STATE_LIST]?.list?.map((states: any) => ({ id: states.id, name: states.title }))}
                                    onChange={(e: any) => {
                                        props.setBillingShippingAddressData("b_states", e.target.value, "fieldValueChanged")
                                    }}
                                />
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <InputGroups label="City*"
                                    onChange={(e: any) => props.setBillingShippingAddressData("b_city", e.target.value, "fieldValueChanged")}
                                    error={props.isAddressDataFormValidated && props.addressDataError.b_city ? props.addressDataError.b_city : null}
                                    value={props.addressData.address.b_city.value}
                                />
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <InputGroups label="Zip Code*"
                                    onChange={(e: any) => props.setBillingShippingAddressData("b_zipCode", e.target.value, "fieldValueChanged")}
                                    error={props.isAddressDataFormValidated && props.addressDataError.b_zipCode ? props.addressDataError.b_zipCode : null}
                                    value={props.addressData.address.b_zipCode.value}
                                />
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <InputGroups label="Phone Number*"
                                    onChange={(e: any) => props.setBillingShippingAddressData("b_phonenumber", e.target.value, "fieldValueChanged")}
                                    error={props.isAddressDataFormValidated && props.addressDataError.b_phonenumber ? props.addressDataError.b_phonenumber : null}
                                    value={props.addressData.address.b_phonenumber.value}
                                />
                            </Col>
                        </>
                        : null}
                </Row>
                {props.isAddressFill ? "" :
                    /* <CustomeButton isLoading={isLoading(props.addAddressApiStatus)} bg="fill" onClick={()=>props.setIsAddressFill(true)}>Continue</CustomeButton> */
                    <CustomeButton isLoading={isLoading(props.addAddressApiStatus)} disabled={props.isAddressFormButtonDisabled} bg="fill" onClick={props.onSubmit}>Continue</CustomeButton>
                }
            </div>
        </>
    )
}

export default LoggedInUserAddresses