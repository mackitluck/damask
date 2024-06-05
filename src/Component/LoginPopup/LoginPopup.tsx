import React from 'react';
import { Modal } from 'react-bootstrap';
import CustomeButton from '../Common/CustomeButton/CustomeButton';
import InputGroups from '../Common/InputGroups/InputGroups';

const CheckoutPopup = (props:any) => {
  return (
    <Modal
      {...props}
      centered
      className="login-popup"
    >
      {/* <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header> */}
      <Modal.Body>
        <CustomeButton bg="fill">CONTINUE AS A GUEST</CustomeButton>
        <div className="or">
          <p className="bm">OR</p>
        </div>
        <div>
          <InputGroups label="Email Address*" />
          <InputGroups label="Password*" type="password" />
        </div>
        <div className="text-right">
          <a className="pages-link">Forgot password?</a>
        </div>
        <CustomeButton bg="fill">Log In</CustomeButton>
      </Modal.Body>
      {/* <Modal.Footer>
        <button onClick={props.onHide}>Close</button>
      </Modal.Footer> */}
    </Modal>
  );
}

export default CheckoutPopup;
