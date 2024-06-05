import React from 'react';
import { Modal } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { COMPONENT_COUNTRY_LIST, COMPONENT_STATE_LIST } from '../../../Constant/Component';
import { isLoading } from '../../../Utility/General';
import CustomeButton from "../../Common/CustomeButton/CustomeButton";
import InputGroups from "../../Common/InputGroups/InputGroups";
import SelectGroups from '../../Common/SelectGroups/SelectGroups';

const AddNewAddressPopup = (props: any) => {

  const country: any = ['United States', 'India'];

  return (
    <Modal {...props} centered className="add-address-popup">
      <Modal.Header closeButton onHide={()=>{props.setIsAddAddressDataForLoggedInUserFormValidated(false);
      props.setAddAddressDataForLoggedInUser(props.initialDataForAddAddress);
      props.getStatesForAddAddress('');
      }}>
        <Modal.Title id="contained-modal-title-vcenter">
          Add new address
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col xs={12} sm={6}>
            <InputGroups
              onChange={(e: any) => props.setAddAddressData("firstName", e.target.value)}
              error={props.isAddAddressDataForLoggedInUserFormValidated && props.addAddressDataForLoggedInUserError.firstName ? props.addAddressDataForLoggedInUserError.firstName : null}
              label="First Name*" />
          </Col>
          <Col xs={12} sm={6}>
            <InputGroups
              onChange={(e: any) => props.setAddAddressData("lastName", e.target.value)}
              error={props.isAddAddressDataForLoggedInUserFormValidated && props.addAddressDataForLoggedInUserError.lastName ? props.addAddressDataForLoggedInUserError.lastName : null}
              label="Last Name*" />
          </Col>
          <Col xs={12} sm={12}>
            <InputGroups
              onChange={(e: any) => props.setAddAddressData("address", e.target.value)}
              error={props.isAddAddressDataForLoggedInUserFormValidated && props.addAddressDataForLoggedInUserError.address ? props.addAddressDataForLoggedInUserError.address : null}
              label="Address*" />
          </Col>
          <Col xs={12} sm={6}>
            <SelectGroups label="Country*"
              defaultSelect={props.addAddressDataForLoggedInUser.addressData.countryId.value}
              error={props.isAddAddressDataForLoggedInUserFormValidated && props.addAddressDataForLoggedInUserError.countryId ? props.addAddressDataForLoggedInUserError.countryId : null}
              value={props.countryDataForAddAddress[COMPONENT_COUNTRY_LIST]?.list?.map((country: any) => ({ id: country.id, name: country.country }))}
              onChange={(e: any) => (
                props.getStatesForAddAddress(e.target.value),
                props.setAddAddressData("countryId", e.target.value)
              )}
            />
          </Col>
          <Col xs={12} sm={6}>
            <SelectGroups
              defaultSelect={props.addAddressDataForLoggedInUser.addressData.states.value}
              onChange={(e: any) => props.setAddAddressData("states", e.target.value)}
              error={props.isAddAddressDataForLoggedInUserFormValidated && props.addAddressDataForLoggedInUserError.states ? props.addAddressDataForLoggedInUserError.states : null}
              label="State*"
              value={props.stateDataForAddAddress[COMPONENT_STATE_LIST]?.list?.map((states: any) => ({ id: states.id, name: states.title }))}
            />
          </Col>
          <Col xs={12} sm={6}>
            <InputGroups
              onChange={(e: any) => props.setAddAddressData("city", e.target.value)}
              error={props.isAddAddressDataForLoggedInUserFormValidated && props.addAddressDataForLoggedInUserError.city ? props.addAddressDataForLoggedInUserError.city : null}
              label="City*" />
          </Col>
          <Col xs={12} sm={6}>
            <InputGroups
              onChange={(e: any) => props.setAddAddressData("zipCode", e.target.value)}
              error={props.isAddAddressDataForLoggedInUserFormValidated && props.addAddressDataForLoggedInUserError.zipCode ? props.addAddressDataForLoggedInUserError.zipCode : null}
              label="Zip Code*" />
          </Col>
          <Col xs={12} sm={6}>
            <InputGroups
              onChange={(e: any) => props.setAddAddressData("phonenumber", e.target.value)}
              error={props.isAddAddressDataForLoggedInUserFormValidated && props.addAddressDataForLoggedInUserError.phonenumber ? props.addAddressDataForLoggedInUserError.phonenumber : null}
              label="Phone Number" />
          </Col>
        </Row>
        <CustomeButton isLoading={isLoading(props.addAddressDataForLoggedInUserApiStatus)} onClick={() => props.onSubmitAddAddress()} bg="fill">SAVE</CustomeButton>
      </Modal.Body>
    </Modal>
  );
}

export default AddNewAddressPopup;
