import { Container } from 'react-bootstrap';
import InputGroups from '../Common/InputGroups/InputGroups';
import CheckboxLabel from '../Common/CheckboxLabel/CheckboxLabel';
import CustomeButton from '../Common/CustomeButton/CustomeButton';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../../Redux/Auth/AuthAction';
import validate from '../../Utility/Validation';
import SIGNIN from '../../Language/Signin';
import { Link, useNavigate } from 'react-router-dom';
import { HOME, MYACCOUNTS, MYORDERS, SIGNUP } from '../../Constant/Route';
import { SUCCESS_RESPONSE_CODE } from '../../Constant/Status';
import { LOGIN_FAILD, LOGIN_LONG, LOGIN_REQUEST, LOGIN_SUCCESS } from '../../Redux/Auth/AuthType';
import { FORGOTPASSWORD, ACCOUNT } from '../../Constant/Route';
import { API_STATUS } from '../../Constant/Api';
import { isLoading, removeRememberMe, setRememberMe } from '../../Utility/General';
import * as localStorageConstant from "../../Constant/LocalStorage";

const Login = (props: any) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  useEffect(() => {

  }, [])
  const INITIAL_LOGIN_DATA: any = {
    email: { value: null, validation: ["email", "required"], errors: ["Please enter valid email.", "Email is required."] },
    password: { value: null, validation: ["required"], errors: ["Password is required."] },
  }
  const [loginData, setLoginData] = useState(INITIAL_LOGIN_DATA)
  let demo: any = {}
  const [loginDataError, setLoginDataError] = useState(demo)
  const [isFormValidated, setIsFormValidated] = useState(false)
  const [isRememberMe, setIsRememberMe] = useState(false)
  const [apiStatus, setApiStatus] = useState(API_STATUS.SUCCESS)
  const [quoteId, setQuoteId] = useState(
    localStorage.getItem(localStorageConstant.QUOTE_ID)
      ? localStorage.getItem(localStorageConstant.QUOTE_ID)
      : ""
  );
  const [isLoginFormButtonDisabled, setIsLoginFormButtonDisabled] = useState(false)
  const onLogin = () => {
    if (validate(loginData).isValidated === true) {
      setIsLoginFormButtonDisabled(true)
      dispatch(loginAction({ email: loginData.email.value, password: loginData.password.value, loginType: "0", "quoteId" : quoteId }))
      // navigate(MYORDERS);

    }
    else {
      setLoginDataError({ ...validate(loginData)?.errors })
      setIsFormValidated(true)
    }
  }
  const setData = (field: string, value: string) => {
    let loginDetails = Object.assign({}, loginData)
    loginDetails[field].value = value
    setLoginData({ ...loginDetails })
  }
  useEffect(() => {
    setLoginDataError({ ...validate(loginData)?.errors })
  }, [loginData])

  useSelector(((state: any) => {
    if (state?.login?.type === LOGIN_REQUEST) {
      if (apiStatus !== API_STATUS.LOADING) {
        setApiStatus(API_STATUS.LOADING)
      }
    }
    else if (state?.login?.data?.statusCode === SUCCESS_RESPONSE_CODE && state?.login?.type === LOGIN_SUCCESS) {
      if (apiStatus !== API_STATUS.SUCCESS) {
        setApiStatus(API_STATUS.SUCCESS)
        setIsLoginFormButtonDisabled(false)
      }
      if (isRememberMe) {
        setRememberMe('user', JSON.stringify(state?.login?.data))
      }
      //navigate(HOME)
      navigate(MYACCOUNTS)
    }
    else if (state?.login?.type === LOGIN_LONG) {
      if (apiStatus !== API_STATUS.LONG) {
        setApiStatus(API_STATUS.LONG)
      }
    }
    else if (state?.login?.type === LOGIN_FAILD) {
      if (apiStatus !== API_STATUS.FAILED) {
        setApiStatus(API_STATUS.FAILED)
        setIsLoginFormButtonDisabled(false)
      }
    }
  }))

  return (
    <div className="login form-section">
      <Container>
        <div className="max-352">
          <h2>{SIGNIN?.LOG_IN}</h2>
          <div>
            <InputGroups
              onChange={(e: any) => setData("email", e.target.value)}
              label="Email Address*"
              error={isFormValidated && loginDataError['email'] ? loginDataError['email'] : null} />
            <InputGroups
              onChange={(e: any) => setData("password", e.target.value)}
              label="Password*" type="password"
              error={isFormValidated && loginDataError['password'] ? loginDataError['password'] : null} />
          </div>
          <div className="remember-forgot">
            <CheckboxLabel onChange={(e: any) => setIsRememberMe(e.target.checked)}>{SIGNIN?.REMEMBER_ME}</CheckboxLabel>
            <Link to={FORGOTPASSWORD} className="pages-link">{SIGNIN?.FORGOT_PASSWORD}</Link>
          </div>
          <CustomeButton disabled={isLoginFormButtonDisabled} isLoading={isLoading(apiStatus)} onClick={() => onLogin()} bg="fill">{SIGNIN?.LOG_IN}</CustomeButton>

          <p className="bm content-link">{SIGNIN?.NO_ACCOUNT}</p>

        </div>
      </Container>
    </div>
  );
}

export default Login;
