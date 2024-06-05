import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import InputGroups from '../Common/InputGroups/InputGroups';
import CustomeButton from '../Common/CustomeButton/CustomeButton';
import { useNavigate } from 'react-router-dom';
import validate from '../../Utility/Validation';
import { API_STATUS } from '../../Constant/Api';
import { useDispatch, useSelector } from 'react-redux';
import forgotPasswordAction from '../../Redux/Auth/AuthAction';
import FORGOTPASSWORD from '../../Language/ForgotPassword';
import {EMAIL} from '../../Language/Validation';
import { FORGOT_PASSWORD_CLEAR, FORGOT_PASSWORD_FAILD, FORGOT_PASSWORD_LONG, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS } from '../../Redux/Auth/AuthType';
import { SUCCESS_RESPONSE_CODE } from '../../Constant/Status';
import { HOME } from '../../Constant/Route';
import { isLoading } from '../../Utility/General';

const ForgotPassword = (props: any) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const INITIAL_DATA: any = {
    email: { value: null, validation: ["email", "required"], errors: [EMAIL.Valid,EMAIL.Required] },
  }

  let demo: any = {}
  const [forgotPasswordDataError, setForgotPasswordDataError] = useState(demo)
  const [forgotPasswordData, setforgotPasswordData] = useState(INITIAL_DATA)
  const [isFormValidated, setIsFormValidated] = useState(false)
  const [apiStatus, setApiStatus] = useState(API_STATUS.SUCCESS)
  
  const onReset = () => {
    if (validate(forgotPasswordData).isValidated === true) {
      dispatch(forgotPasswordAction({ email: forgotPasswordData.email.value }))
      // navigate(MYORDERS);
    }
    else {
      setForgotPasswordDataError({ ...validate(forgotPasswordData)?.errors })
      setIsFormValidated(true)
    }
  }

  const setData = (field: string, value: string) => {
    let resetDetails = Object.assign({}, forgotPasswordData)
    resetDetails[field].value = value
    setforgotPasswordData({ ...resetDetails })
  }
  useEffect(() => {
    setForgotPasswordDataError({ ...validate(forgotPasswordData)?.errors })
  }, [forgotPasswordData])

  useSelector((state: any) => {
    if (state?.forgotPassword?.type === FORGOT_PASSWORD_REQUEST) {
      if (apiStatus !== API_STATUS.LOADING) {
        setApiStatus(API_STATUS.LOADING);
      }
    } else if (
      state?.forgotPassword?.data?.statusCode === SUCCESS_RESPONSE_CODE &&
      state?.forgotPassword?.type === FORGOT_PASSWORD_SUCCESS
    ) {
      if (apiStatus !== API_STATUS.SUCCESS) {
        setApiStatus(API_STATUS.SUCCESS);
        navigate(HOME);
        dispatch({
          type: FORGOT_PASSWORD_CLEAR,
          payload: { type: FORGOT_PASSWORD_CLEAR },
        });
      }
    } else if (state?.forgotPassword?.type === FORGOT_PASSWORD_LONG) {
      if (apiStatus !== API_STATUS.LONG) {
        setApiStatus(API_STATUS.LONG);
        dispatch({
          type: FORGOT_PASSWORD_CLEAR,
          payload: { type: FORGOT_PASSWORD_CLEAR },
        });
        navigate(HOME);
      }
    } else if (state?.forgotPassword?.type === FORGOT_PASSWORD_FAILD) {
      if (apiStatus !== API_STATUS.FAILED) {
        setApiStatus(API_STATUS.FAILED);
      }
    }
  });

  return (
    <div className="forgot-password form-section">
      <Container>
        <div className="max-352">
          <h2>{FORGOTPASSWORD?.FORGOT_PASSWORD}</h2>
          <p className="bm">{FORGOTPASSWORD?.NOTE}</p>
          <div>
            <InputGroups label={FORGOTPASSWORD?.LABEL_EMAIL} type="email"
            onChange={(e: any) => setData("email", e.target.value)} 
            error={isFormValidated && forgotPasswordDataError['email'] ? forgotPasswordDataError['email'] : null} />
          </div>
          <CustomeButton bg="fill" isLoading={isLoading(apiStatus)} onClick={() => onReset()}>{FORGOTPASSWORD?.BUTTON_SUBMIT}</CustomeButton>
        </div>
      </Container>
    </div>
  );
}

export default ForgotPassword;
