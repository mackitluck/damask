import React from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PRODUCTLIST } from '../../../Constant/Route';
import { showMinicart } from '../../../Redux/General/GeneralAction';
import CustomeButton from '../../Common/CustomeButton/CustomeButton';

const FrostingPopup = (props: any) => {
  return (
    <Modal
      {...props}
      centered
      className="frosting-popup"
    >
      <Modal.Body>
        <h6>Do you want to add Frosting?</h6>
        <p className="bm">Cakes and Cupcakes do not come with frostings.</p>
        <div className="this-btn-block">
          <CustomeButton onClick={() => props.onYes()} bg="fill">Yes</CustomeButton>
          <CustomeButton onClick={() => props.onNo()}>No</CustomeButton>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default FrostingPopup;
