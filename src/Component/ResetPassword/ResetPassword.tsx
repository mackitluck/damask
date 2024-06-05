import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import InputGroups from '../Common/InputGroups/InputGroups';
import CustomeButton from '../Common/CustomeButton/CustomeButton';
import { useNavigate } from 'react-router-dom';
import { HOME } from '../../Constant/Route';
import { useParams } from "react-router-dom";
import { NEW_PASSWORD, REPEAT_PASSWORD } from '../../Language/Validation';
import { API_STATUS } from '../../Constant/Api';
import { resetPasswordAction } from '../../Redux/Auth/AuthAction';
import validate from '../../Utility/Validation';
import { useDispatch, useSelector } from 'react-redux';
import { SUCCESS_RESPONSE_CODE } from '../../Constant/Status';
import { RESET_PASSWORD_CLEAR, RESET_PASSWORD_FAILD, RESET_PASSWORD_LONG, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS } from '../../Redux/Auth/AuthType';
import { isLoading } from '../../Utility/General';

const ResetPassword = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const urlParams = useParams();
  let token = urlParams.token ? urlParams.token : "";

  const INITIAL_PASSWORD_DATA: any = {
    password: { value: null, validation: ["required"], errors: [NEW_PASSWORD.Required] },
    confirmPassword: { value: null, validation: ["sameAs:password"], errors: [REPEAT_PASSWORD.sameAs] },
  }

  const [passwordData, setPasswordData] = useState(INITIAL_PASSWORD_DATA)
  let demo: any = {}
  const [passwordDataError, setpasswordDataError] = useState(demo)
  const [isFormValidated, setIsFormValidated] = useState(false)
  const [apiStatus, setApiStatus] = useState(API_STATUS.SUCCESS)

  const onSubmit = () => {
    if (validate(passwordData).isValidated === true) {
      dispatch(resetPasswordAction({ token: token, new_password: passwordData.password.value, confirm_password: passwordData.confirmPassword.value }))

    }
    else {
      setpasswordDataError({ ...validate(passwordData)?.errors })
      setIsFormValidated(true)
    }
  }

  const setData = (field: string, value: string) => {
    let passwordDetails = Object.assign({}, passwordData)
    passwordDetails[field].value = value
    setPasswordData({ ...passwordDetails })
  }

  useSelector((state: any) => {
    if (state?.resetPassword?.type === RESET_PASSWORD_REQUEST) {
      if (apiStatus !== API_STATUS.LOADING) {
        setApiStatus(API_STATUS.LOADING);
      }
    } else if (
      state?.resetPassword?.data?.statusCode === SUCCESS_RESPONSE_CODE &&
      state?.resetPassword?.type === RESET_PASSWORD_SUCCESS
    ) {
      if (apiStatus !== API_STATUS.SUCCESS) {
        setApiStatus(API_STATUS.SUCCESS);
        navigate(HOME);
        dispatch({
          type: RESET_PASSWORD_CLEAR,
          payload: { type: RESET_PASSWORD_CLEAR },
        });
      }
    } else if (state?.resetPassword?.type === RESET_PASSWORD_LONG) {
      if (apiStatus !== API_STATUS.LONG) {
        setApiStatus(API_STATUS.LONG);
      }
    } else if (state?.resetPassword?.type === RESET_PASSWORD_FAILD) {
      if (apiStatus !== API_STATUS.FAILED) {
        setApiStatus(API_STATUS.FAILED);
      }
    }
  });

  return (
    <div className="reset-password form-section">
      <Container>
        <div className="max-352">
          <h2>Reset Password</h2>
          <div>
            <InputGroups label="New Password*"
              type="password"
              onChange={(e: any) => setData("password", e.target.value)}
              error={isFormValidated && passwordDataError['password'] ? passwordDataError['password'] : null}
            />
            <InputGroups label="Confirm Password*"
              type="password"
              onChange={(e: any) => setData("confirmPassword", e.target.value)}
              error={isFormValidated && passwordDataError['confirmPassword'] ? passwordDataError['confirmPassword'] : null}
            />
          </div>
          <CustomeButton bg="fill"
            // onClick={() => navigate(HOME)}
            onClick={() => onSubmit()}
            isLoading={isLoading(apiStatus)}
          >RESET</CustomeButton>
        </div>
      </Container>
    </div>
  );
}

export default ResetPassword;
