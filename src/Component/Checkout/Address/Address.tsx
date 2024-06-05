import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import ReactInputMask from "react-input-mask";
import {
  COMPONENT_COUNTRY_LIST,
  COMPONENT_STATE_LIST,
} from "../../../Constant/Component";
import { isLoading } from "../../../Utility/General";
import CheckboxLabel from "../../Common/CheckboxLabel/CheckboxLabel";
import CustomeButton from "../../Common/CustomeButton/CustomeButton";
import InputGroups from "../../Common/InputGroups/InputGroups";
import SelectGroups from "../../Common/SelectGroups/SelectGroups";

function Address(props: any) {
  const [deliveryState, setDeliveryState] = useState(props.deliveryState);
  const [billingState, setBillingState] = useState(props.billingState);
  const [sameAddress, setSameAddress] = useState(props.isBothAddressSame);
  useEffect(() => {
    setDeliveryState(props.deliveryState);
    setBillingState(props.billingState);
    setSameAddress(props.isBothAddressSame);
  }, [props]);
  return (
    <>
      <div className="delivery-address">
        <p className="tl">DELIVERY ADDRESS</p>
        <Row>
          <Col sm={12} md={6} lg={6}>
            <InputGroups
              label="Email Address*"
              className="mb-27"
              onChange={(e: any) =>
                props.setBillingShippingAddressData(
                  "email",
                  e.target.value,
                  "fieldValueChanged"
                )
              }
              error={
                props.isAddressDataFormValidated && props.addressDataError.email
                  ? props.addressDataError.email
                  : null
              }
              value={props.addressData.address.email.value}
            />
          </Col>
          <Col sm={12} md={6} lg={6}>
            {/* <InputGroups label="Birthday (MM/YYYY)*" className="mb-27"
                            onChange={(e: any) => props.setOrderData("birthDate", e.target.value)}
                            error={props.isOrderPlaceDataFormValidated && props.orderPlaceDataError.birthDate ? props.orderPlaceDataError.birthDate : null}
                            value={props.orderPlaceData.data.birthDate.value}
                        /> */}

            <div className="input-groups mb-27">
              <label>Birthday (MM/DD)</label>
              <ReactInputMask
                mask="99/99"
                onChange={(e: any) =>
                  props.setOrderData("birthDate", e.target.value)
                }
                value={props.orderPlaceData.data.birthDate.value}
                type="text"
              />
              {props.isOrderPlaceDataFormValidated &&
                props.orderPlaceDataError.birthDate && (
                  <span className="error">
                    {props.orderPlaceDataError.birthDate}
                  </span>
                )}
            </div>
          </Col>
          <Col sm={12} md={12} lg={12} className="mb-32">
            <CheckboxLabel
              checked={
                props.addressData.address.isNewsletter.value === "1"
                  ? true
                  : false
              }
              onChange={(e: any) => {
                props.setBillingShippingAddressData(
                  "isNewsletter",
                  e.target.checked ? "1" : "0",
                  "fieldValueChanged"
                );
              }}
            >
              Sign up for secret recipes and sneak peeks.{" "}
            </CheckboxLabel>
          </Col>
          <Col sm={12} md={6} lg={6}>
            <InputGroups
              label="First Name*"
              onChange={(e: any) =>
                props.setBillingShippingAddressData(
                  "firstName",
                  e.target.value,
                  "fieldValueChanged"
                )
              }
              error={
                props.isAddressDataFormValidated &&
                props.addressDataError.firstName
                  ? props.addressDataError.firstName
                  : null
              }
              value={props.addressData.address.firstName.value}
            />
          </Col>
          <Col sm={12} md={6} lg={6}>
            <InputGroups
              label="Last Name*"
              onChange={(e: any) =>
                props.setBillingShippingAddressData(
                  "lastName",
                  e.target.value,
                  "fieldValueChanged"
                )
              }
              error={
                props.isAddressDataFormValidated &&
                props.addressDataError.lastName
                  ? props.addressDataError.lastName
                  : null
              }
              value={props.addressData.address.lastName.value}
            />
          </Col>
          <Col md={12} lg={12}>
            <InputGroups
              label="Address*"
              onChange={(e: any) =>
                props.setBillingShippingAddressData(
                  "street",
                  e.target.value,
                  "fieldValueChanged"
                )
              }
              error={
                props.isAddressDataFormValidated &&
                props.addressDataError.street
                  ? props.addressDataError.street
                  : null
              }
              value={props.addressData.address.street.value}
            />
          </Col>
          <Col sm={12} md={6} lg={6}>
            <SelectGroups
              label="Country*"
              defaultSelect={props.addressData.address.countryId.value}
              error={
                props.isAddressDataFormValidated &&
                props.addressDataError.countryId
                  ? props.addressDataError.countryId
                  : null
              }
              value={props.country[COMPONENT_COUNTRY_LIST]?.list?.map(
                (country: any) => ({ id: country.id, name: country.country })
              )}
              onChange={(e: any) => {
                props.getDeliveryState(e.target.value);
                props.setBillingShippingAddressData(
                  "countryId",
                  e.target.value,
                  "fieldValueChanged"
                );
              }}
            />
          </Col>
          <Col sm={12} md={6} lg={6}>
            <SelectGroups
              label="State*"
              defaultSelect={props.addressData.address.states.value}
              error={
                props.isAddressDataFormValidated &&
                props.addressDataError.states
                  ? props.addressDataError.states
                  : null
              }
              value={deliveryState?.[COMPONENT_STATE_LIST]?.list?.map(
                (states: any) => ({ id: states.id, name: states.title })
              )}
              onChange={(e: any) => {
                props.setBillingShippingAddressData(
                  "states",
                  e.target.value,
                  "fieldValueChanged"
                );
              }}
            />
          </Col>
          <Col sm={12} md={6} lg={6}>
            <InputGroups
              label="City*"
              onChange={(e: any) =>
                props.setBillingShippingAddressData(
                  "city",
                  e.target.value,
                  "fieldValueChanged"
                )
              }
              error={
                props.isAddressDataFormValidated && props.addressDataError.city
                  ? props.addressDataError.city
                  : null
              }
              value={props.addressData.address.city.value}
            />
          </Col>
          <Col sm={12} md={6} lg={6}>
            <InputGroups
              label="Zip Code*"
              onChange={(e: any) =>
                props.setBillingShippingAddressData(
                  "zipCode",
                  e.target.value,
                  "fieldValueChanged"
                )
              }
              error={
                props.isAddressDataFormValidated &&
                props.addressDataError.zipCode
                  ? props.addressDataError.zipCode
                  : null
              }
              value={props.addressData.address.zipCode.value}
            />
          </Col>
          <Col sm={12} md={6} lg={6}>
            <InputGroups
              label="Phone Number"
              onChange={(e: any) =>
                props.setBillingShippingAddressData(
                  "phonenumber",
                  e.target.value,
                  "fieldValueChanged"
                )
              }
              error={
                props.isAddressDataFormValidated &&
                props.addressDataError.phonenumber
                  ? props.addressDataError.phonenumber
                  : null
              }
              value={props.addressData.address.phonenumber.value}
            />
          </Col>
        </Row>
      </div>

      <div className="add-billing-address">
        <p className="tl">BILLING ADDRESS</p>
        <Row>
          <Col sm={12} md={12} lg={12} className="mb-32">
            <CheckboxLabel
              checked={sameAddress}
              onChange={() => {
                props.setIsBothAddressSame(sameAddress === true ? false : true);
                props.setBillingShippingAddressData(
                  "isBilingSelect",
                  sameAddress === true ? "0" : "1",
                  "fieldValueChanged"
                );
              }}
            >
              Bill to delivery address
            </CheckboxLabel>
          </Col>
          {!sameAddress ? (
            <>
              <Col sm={12} md={6} lg={6}>
                <InputGroups
                  label="First Name*"
                  onChange={(e: any) =>
                    props.setBillingShippingAddressData(
                      "b_firstName",
                      e.target.value,
                      "fieldValueChanged"
                    )
                  }
                  error={
                    props.isAddressDataFormValidated &&
                    props.addressDataError.b_firstName
                      ? props.addressDataError.b_firstName
                      : null
                  }
                  value={props.addressData.address.b_firstName.value}
                />
              </Col>
              <Col sm={12} md={6} lg={6}>
                <InputGroups
                  label="Last Name*"
                  onChange={(e: any) =>
                    props.setBillingShippingAddressData(
                      "b_lastName",
                      e.target.value,
                      "fieldValueChanged"
                    )
                  }
                  error={
                    props.isAddressDataFormValidated &&
                    props.addressDataError.b_lastName
                      ? props.addressDataError.b_lastName
                      : null
                  }
                  value={props.addressData.address.b_lastName.value}
                />
              </Col>
              <Col md={12} lg={12}>
                <InputGroups
                  label="Address*"
                  onChange={(e: any) =>
                    props.setBillingShippingAddressData(
                      "b_street",
                      e.target.value,
                      "fieldValueChanged"
                    )
                  }
                  error={
                    props.isAddressDataFormValidated &&
                    props.addressDataError.b_street
                      ? props.addressDataError.b_street
                      : null
                  }
                  value={props.addressData.address.b_street.value}
                />
              </Col>
              <Col sm={12} md={6} lg={6}>
                <SelectGroups
                  label="Country*"
                  defaultSelect={props.addressData.address.b_countryId.value}
                  error={
                    props.isAddressDataFormValidated &&
                    props.addressDataError.b_countryId
                      ? props.addressDataError.b_countryId
                      : null
                  }
                  value={props.country[COMPONENT_COUNTRY_LIST]?.list?.map(
                    (country: any) => ({
                      id: country.id,
                      name: country.country,
                    })
                  )}
                  onChange={(e: any) => {
                    props.getBillingState(e.target.value);
                    props.setBillingShippingAddressData(
                      "b_countryId",
                      e.target.value,
                      "fieldValueChanged"
                    );
                  }}
                />
              </Col>
              <Col sm={12} md={6} lg={6}>
                <SelectGroups
                  label="State*"
                  defaultSelect={props.addressData.address.b_states.value}
                  error={
                    props.isAddressDataFormValidated &&
                    props.addressDataError.b_states
                      ? props.addressDataError.b_states
                      : null
                  }
                  value={billingState?.[COMPONENT_STATE_LIST]?.list?.map(
                    (states: any) => ({ id: states.id, name: states.title })
                  )}
                  onChange={(e: any) => {
                    props.setBillingShippingAddressData(
                      "b_states",
                      e.target.value,
                      "fieldValueChanged"
                    );
                  }}
                />
              </Col>
              <Col sm={12} md={6} lg={6}>
                <InputGroups
                  label="City*"
                  onChange={(e: any) =>
                    props.setBillingShippingAddressData(
                      "b_city",
                      e.target.value,
                      "fieldValueChanged"
                    )
                  }
                  error={
                    props.isAddressDataFormValidated &&
                    props.addressDataError.b_city
                      ? props.addressDataError.b_city
                      : null
                  }
                  value={props.addressData.address.b_city.value}
                />
              </Col>
              <Col sm={12} md={6} lg={6}>
                <InputGroups
                  label="Zip Code*"
                  onChange={(e: any) =>
                    props.setBillingShippingAddressData(
                      "b_zipCode",
                      e.target.value,
                      "fieldValueChanged"
                    )
                  }
                  error={
                    props.isAddressDataFormValidated &&
                    props.addressDataError.b_zipCode
                      ? props.addressDataError.b_zipCode
                      : null
                  }
                  value={props.addressData.address.b_zipCode.value}
                />
              </Col>
              <Col sm={12} md={6} lg={6}>
                <InputGroups
                  label="Phone Number"
                  onChange={(e: any) =>
                    props.setBillingShippingAddressData(
                      "b_phonenumber",
                      e.target.value,
                      "fieldValueChanged"
                    )
                  }
                  error={
                    props.isAddressDataFormValidated &&
                    props.addressDataError.b_phonenumber
                      ? props.addressDataError.b_phonenumber
                      : null
                  }
                  value={props.addressData.address.b_phonenumber.value}
                />
              </Col>
            </>
          ) : null}
        </Row>
        {props.isAddressFill ? (
          ""
        ) : (
          /* <CustomeButton isLoading={isLoading(props.addAddressApiStatus)} bg="fill" onClick={()=>props.setIsAddressFill(true)}>Continue</CustomeButton> */
          <CustomeButton
            isLoading={isLoading(props.addAddressApiStatus)}
            disabled={props.isAddressFormButtonDisabled}
            bg="fill"
            onClick={props.onSubmit}
          >
            Continue
          </CustomeButton>
        )}
      </div>
    </>
  );
}

export default Address;
