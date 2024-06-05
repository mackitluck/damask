import React from 'react';
import { Modal } from 'react-bootstrap';
import COMMON from '../../../Language/Common';
import MYACCOUNT from '../../../Language/MyAccount';
import { isLoading } from '../../../Utility/General';
import CustomeButton from '../CustomeButton/CustomeButton';


const DeletePopup = (props: any) => {
  return (
    <Modal
      {...props}
      centered
      className="account-deletion-popup"
    >
      <Modal.Body>
        <h6>{COMMON.ARE_YOU_SURE}</h6>
        <p className="bm">{COMMON.REMOVE_ITEM}</p>
        <div className="this-btn-block">
          <CustomeButton isLoading={isLoading(props.isLoading)} onClick={() => props.onYes(props.moduleId)} bg="fill">{COMMON.YES}</CustomeButton>
          <CustomeButton onClick={() => props.onNo()}>{COMMON.NO}</CustomeButton>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default DeletePopup;
