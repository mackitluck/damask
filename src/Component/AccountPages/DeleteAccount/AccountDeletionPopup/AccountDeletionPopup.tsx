import React from 'react';
import { Modal } from 'react-bootstrap';
import MYACCOUNT from '../../../../Language/MyAccount';
import { isLoading } from '../../../../Utility/General';
import CustomeButton from '../../../Common/CustomeButton/CustomeButton';

const AccountDeletionPopup = (props: any) => {
  return (
    <Modal
      {...props}
      centered
      className="account-deletion-popup"
    >
      <Modal.Body>
        <h6>{MYACCOUNT.DELETE_ACCOUNT_POPUP_LABEL}</h6>
        <p className="bm">{MYACCOUNT.DELETE_ACCOUNT_POPUP_DESC}</p>
        <div className="this-btn-block">
          <CustomeButton isLoading={isLoading(props.isLoading)} onClick={() => props.onYes()} bg="fill">{MYACCOUNT.DELETE_ACCOUNT_POPUP_DELETE_YES}</CustomeButton>
          <CustomeButton onClick={() => props.onNo()}>{MYACCOUNT.DELETE_ACCOUNT_POPUP_DELETE_NO}</CustomeButton>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default AccountDeletionPopup;
