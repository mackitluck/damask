import React from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PRODUCTLIST } from '../../../Constant/Route';
import { showMinicart } from '../../../Redux/General/GeneralAction';
import CustomeButton from '../../Common/CustomeButton/CustomeButton';

const LoginAlertPopup = (props: any) => {
  return (
    <Modal
      {...props}
      centered
      className="frosting-popup"
    >
      <Modal.Body>
        <h6></h6>
        <p className="bm">{props.message}</p>
        <div className="this-btn-block">
          <CustomeButton onClick={() => props.onLoginYes()} bg="fill">Yes</CustomeButton>
          <CustomeButton onClick={() => props.onHide()}>No</CustomeButton>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default LoginAlertPopup;
