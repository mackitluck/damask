import React, { useEffect, useState } from "react";
import CustomeButton from "../../Common/CustomeButton/CustomeButton";
import AccountDeletionPopup from "./AccountDeletionPopup/AccountDeletionPopup";
import { useNavigate } from 'react-router-dom';
import { HOME } from "../../../Constant/Route";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getdeleteuser } from "../../../Redux/DeleteAccount/DeleteAccountAction";
import { API_STATUS } from "../../../Constant/Api";
import { DELETE_ACCOUNT_ACTION_FAILD, DELETE_ACCOUNT_ACTION_LONG, DELETE_ACCOUNT_ACTION_REQUEST, DELETE_ACCOUNT_ACTION_SUCCESS, DELETE_ACCOUNT_FAILD, DELETE_ACCOUNT_LONG, DELETE_ACCOUNT_REQUEST, DELETE_ACCOUNT_SUCCESS } from "../../../Redux/DeleteAccount/DeleteAccountTypes";
import { SUCCESS_RESPONSE_CODE } from "../../../Constant/Status";
import SomethingWrong from "../../SomethingWrong/SomethingWrong";
import Loader from "../../Loader/Loader";
import MYACCOUNT from "../../../Language/MyAccount";
import { COMPONENT_DELETE_ACCOUNT_DESC } from "../../../Constant/Component";
import { isLoading, removeRememberMe } from "../../../Utility/General";
import { USER } from "../../../Constant/LocalStorage";
import { checkAuthorizationAction } from "../../../Redux/Auth/AuthAction";
import { CHECK_AUTHORIZATION_FAILD } from "../../../Redux/Auth/AuthType";

const DeleteAccount = () => {
  const [deleteAccountData, setDeleteAccountData] = useState<any>('')
  const [accountApiStatus, setAccountApiStatus] = useState(API_STATUS.SUCCESS);
  const [accountDeleteApiStatus, setAccountDeleteApiStatus] = useState(API_STATUS.SUCCESS);
  const accountData = useSelector((state: any) => state?.getDeleteUser?.data);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [deletionModalShow, setDeletionModalShow] = React.useState(false);

  useEffect(() => {
    dispatch(getdeleteuser())
  }, []);

  useEffect(() => {
    let componentData: any = {}
    accountData?.component?.forEach((component: any) => {
      componentData[component?.componentId] = component
    });
    setDeleteAccountData({ ...componentData })
  }, [accountData]);

  useSelector((state: any) => {
    if (state?.getDeleteUser?.type === DELETE_ACCOUNT_REQUEST) {
      if (accountApiStatus !== API_STATUS.LOADING) {
        setAccountApiStatus(API_STATUS.LOADING)
      }
    }
    else if (state?.getDeleteUser?.data?.statusCode === SUCCESS_RESPONSE_CODE && state?.getDeleteUser?.type === DELETE_ACCOUNT_SUCCESS) {
      if (accountApiStatus !== API_STATUS.SUCCESS) {
        setAccountApiStatus(API_STATUS.SUCCESS)
      }
    }
    else if (state?.getDeleteUser?.type === DELETE_ACCOUNT_LONG) {
      if (accountApiStatus !== API_STATUS.LONG) {
        setAccountApiStatus(API_STATUS.LONG)
      }
    }
    else if (state?.getDeleteUser?.type === DELETE_ACCOUNT_FAILD) {
      if (accountApiStatus !== API_STATUS.FAILED) {
        setAccountApiStatus(API_STATUS.FAILED)
      }
    }


    if (state?.deleteUser?.type === DELETE_ACCOUNT_ACTION_REQUEST) {
      if (accountDeleteApiStatus !== API_STATUS.LOADING) {
        setAccountDeleteApiStatus(API_STATUS.LOADING)
      }
    }
    else if (state?.deleteUser?.data?.statusCode === SUCCESS_RESPONSE_CODE && state?.deleteUser?.type === DELETE_ACCOUNT_ACTION_SUCCESS) {
      if (accountDeleteApiStatus !== API_STATUS.SUCCESS) {
        setAccountDeleteApiStatus(API_STATUS.SUCCESS)

        dispatch({
          type: CHECK_AUTHORIZATION_FAILD,
          payload: { data: {}, type: CHECK_AUTHORIZATION_FAILD },
        });
        localStorage.removeItem(USER)
        removeRememberMe(USER)
        setDeletionModalShow(false)
        navigate(HOME)
      }
    }
    else if (state?.deleteUser?.type === DELETE_ACCOUNT_ACTION_LONG) {
      if (accountDeleteApiStatus !== API_STATUS.LONG) {
        setAccountDeleteApiStatus(API_STATUS.LONG)
      }
    }
    else if (state?.deleteUser?.type === DELETE_ACCOUNT_ACTION_FAILD) {
      if (accountDeleteApiStatus !== API_STATUS.FAILED) {
        setAccountDeleteApiStatus(API_STATUS.FAILED)
        setDeletionModalShow(false)
      }
    }
  })

  const onYes = () => {
    dispatch(deleteUser());
  }

  switch (accountApiStatus) {
    case API_STATUS.LOADING:
      return (<Loader></Loader>);
    case API_STATUS.SUCCESS:
      return (
        <>
          <div className="delete-account">
            <h4>{MYACCOUNT.DELETE_ACCOUNT_LABEL}</h4>
            <div className="NS-wrapper">
              <p className="bm">
                {deleteAccountData[COMPONENT_DELETE_ACCOUNT_DESC]?.description?.notifyText}
              </p>
              <div>
                <CustomeButton bg="fill" onClick={() => { setDeletionModalShow(true) }}>{MYACCOUNT.DELETE_ACCOUNT_YES}</CustomeButton>
              </div>
            </div>
          </div>

          <AccountDeletionPopup
            show={deletionModalShow}
            onHide={() => setDeletionModalShow(false)}
            onYes={() => onYes()}
            onNo={() => setDeletionModalShow(false)}
            isLoading={accountDeleteApiStatus}
          />
        </>
      );
    case API_STATUS.LONG:
      return (<SomethingWrong></SomethingWrong>);
    case API_STATUS.FAILED:
      return (<SomethingWrong></SomethingWrong>);
    default:
      return (<Loader></Loader>);
  }
};

export default DeleteAccount;
