import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import CustomeButton from '../Common/CustomeButton/CustomeButton';
import Payment1 from "../../Assets/img/payment-1.svg";
import Payment2 from "../../Assets/img/payment-2.svg";
import Payment3 from "../../Assets/img/payment-3.svg";
import Payment4 from "../../Assets/img/payment-4.svg";
import Payment5 from "../../Assets/img/payment-5.svg";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { CONTACT_US, INSPIRATIONLISTING, LOGIN, OURSTORY, PRIVACYPOLICY, PRODUCTLIST, RECIPELANDING, TERMSANDCONDITION } from '../../Constant/Route';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import InputGroups from '../Common/InputGroups/InputGroups';
import validate from '../../Utility/Validation';
import { newsletterSubscriptionAction, newsletterSubscriptionForFooterAction } from '../../Redux/General/GeneralAction';
import { NEWSLETTER_SUBSCRIPTION_FAILD, NEWSLETTER_SUBSCRIPTION_FOR_FOOTER_FAILD, NEWSLETTER_SUBSCRIPTION_FOR_FOOTER_LONG, NEWSLETTER_SUBSCRIPTION_FOR_FOOTER_REQUEST, NEWSLETTER_SUBSCRIPTION_FOR_FOOTER_SUCCESS, NEWSLETTER_SUBSCRIPTION_LONG, NEWSLETTER_SUBSCRIPTION_REQUEST, NEWSLETTER_SUBSCRIPTION_SUCCESS } from '../../Redux/General/GeneralType';
import { SUCCESS_RESPONSE_CODE } from '../../Constant/Status';
import { API_STATUS } from '../../Constant/Api';
import { isLoading } from '../../Utility/General';
import LoginAlertPopup from '../ProductDetails/LoginAlertPopup/LoginAlertPopup';
import P11 from "../../Assets/img/P11.svg";
import P12 from "../../Assets/img/P12.svg";


const FooterWithMenu = (props: any) => {
  const navigate = useNavigate();
  const loginAlertPopup = useSelector((state: any) => state?.loginAlertPopup?.data);
  const [loginAlertModalShow, setLoginAlertModalShow] = useState<any>(false);
  const [loginAlertMessage, setLoginAlertMessage] = useState<any>('');
  
  useEffect(() => {
    if (loginAlertPopup) {
      setLoginAlertModalShow(loginAlertPopup.flag)
      setLoginAlertMessage(loginAlertPopup.message)
    }
  }, [loginAlertPopup])

  const onLoginYes = () => {
    setLoginAlertModalShow(false);
    navigate(LOGIN);
  };

  const [smallFooter, setSmallFooter] = useState(false)

  const dispatch = useDispatch();

  const master = useSelector(((state: any) => state?.master?.data))

  const INITIAL_NEWSLETTER_DATA: any = {
    email: { value: null, validation: ["email", "required"], errors: ["Please enter valid email.", "Email is required."] },
  }

  const [newsletterData, setNewsletterData] = useState(INITIAL_NEWSLETTER_DATA)

  const [newsletterDataError, setNewsletterDataError] = useState<any>({})

  const [isNewsletterFormInFooterButtonDisabled, setIsNewsletterFormInFooterButtonDisabled] = useState(false)

  const [isFormValidated, setIsFormValidated] = useState(false)

  const [apiStatus, setApiStatus] = useState(API_STATUS.SUCCESS)

  const setData = (field: string, value: string) => {
    let loginDetails = Object.assign({}, newsletterData)
    loginDetails[field].value = value
    setNewsletterData({ ...loginDetails })
  }

  useEffect(() => {
    setNewsletterDataError({ ...validate(newsletterData)?.errors })
  }, [newsletterData])


  useSelector(((state: any) => {
    if (state?.newsletterSubscriptionForFooter?.type === NEWSLETTER_SUBSCRIPTION_FOR_FOOTER_REQUEST) {
      if (apiStatus !== API_STATUS.LOADING) {
        setApiStatus(API_STATUS.LOADING)
      }
    }
    else if (state?.newsletterSubscriptionForFooter?.data?.statusCode === SUCCESS_RESPONSE_CODE && state?.newsletterSubscriptionForFooter?.type === NEWSLETTER_SUBSCRIPTION_FOR_FOOTER_SUCCESS) {
      if (apiStatus !== API_STATUS.SUCCESS) {
        setApiStatus(API_STATUS.SUCCESS)
        setData("email", "");
        setIsNewsletterFormInFooterButtonDisabled(false);
      }
    }
    else if (state?.newsletterSubscriptionForFooter?.type === NEWSLETTER_SUBSCRIPTION_FOR_FOOTER_LONG) {
      if (apiStatus !== API_STATUS.LONG) {
        setApiStatus(API_STATUS.LONG)
      }
    }
    else if (state?.newsletterSubscriptionForFooter?.type === NEWSLETTER_SUBSCRIPTION_FOR_FOOTER_FAILD) {
      if (apiStatus !== API_STATUS.FAILED) {
        setApiStatus(API_STATUS.FAILED)
        setIsNewsletterFormInFooterButtonDisabled(false);
      }
    }
  }))

  const onNewsletter = () => {
    if (validate(newsletterData).isValidated === true) {
      setIsNewsletterFormInFooterButtonDisabled(true)
      dispatch(newsletterSubscriptionForFooterAction({ email: newsletterData.email.value }))
      setIsFormValidated(false)
      //setData("email", "")
    }
    else {
      setNewsletterDataError({ ...validate(newsletterData)?.errors })
      setIsFormValidated(true)
    }
  }

  const location: any = useLocation()
  const [currentLocation, setCurrentLocation] = useState<any>('');

  useEffect(() => {
    setCurrentLocation(location.pathname)
  }, [location])

  return (
    <div className={`footer-with-menu ${smallFooter ? 'smallFooter' : ''}`}>
      {currentLocation == '/' ? 
      <>
      <img src={P11} className="P11" alt="p11" />
      <img src={P12} className="P12" alt="p12" />
      </>
      : '' }
      <Container>
        <div className="footer-row">
          <div className="footer-column">
            <ul>
              <li><Link to={OURSTORY} className="footer-links">Our Story</Link></li>
              <li><Link to={CONTACT_US} className="footer-links">Contact</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <ul>
              <li><Link to={INSPIRATIONLISTING} className="footer-links">Inspiration</Link></li>
              <li><Link to={RECIPELANDING} className="footer-links">Recipes</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <ul>
              {master?.category?.map((items: any, index: number) => (
                <li key={index}><Link to={PRODUCTLIST+'/'+items.urlKey} className="footer-links">{items?.title}</Link></li>
              ))}
              {/* <li><Link to={PRODUCTLIST} className="footer-links">Cupcakes</Link></li>
              <li><Link to={PRODUCTLIST} className="footer-links">Cake Pops</Link></li>
              <li><Link to={PRODUCTLIST} className="footer-links">Baking Tools</Link></li>
              <li><Link to={PRODUCTLIST} className="footer-links">Decorations</Link></li> */}
            </ul>
          </div>
          <div className="footer-column">
            <ul>
              {/* <li><a target={'_blank'} href={master?.footerData?.TWITTER} className="footer-links">Twitter</a></li> */}
              <li><a target={'_blank'} href={master?.footerData?.FACEBOOK} className="footer-links">Facebook</a></li>
              <li><a target={'_blank'} href={master?.footerData?.INSTAGRAM} className="footer-links">Instagram</a></li>
              {/* <li><a target={'_blank'} href={master?.footerData?.PINTEREST} className="footer-links">Pinterest</a></li> */}
            </ul>
          </div>
          <div className="footer-column last-column">
            <p className="bl">Signup for our newsletter.</p>
            <InputGroups 
              placeholder="Email Address"
              onChange={(e: any) => setData("email", e.target.value)} 
              value={newsletterData.email.value}
              error={isFormValidated && newsletterDataError['email'] ? newsletterDataError['email'] : null}
            />
            {/* <input
              onChange={(e: any) => setData("email", e.target.value)}
              className={`input ${isFormValidated && newsletterDataError['email'] ? "error" : ""}`}
              value={newsletterData.email.value}
              placeholder="Email Address" />
            {isFormValidated && newsletterDataError['email'] ? newsletterDataError['email'] : null} */}
            <CustomeButton isLoading={isLoading(apiStatus)} disabled={isNewsletterFormInFooterButtonDisabled} onClick={() => onNewsletter()}>Sign Up</CustomeButton>
            <span className="bm">By clicking above, you agree to our <Link to={TERMSANDCONDITION} className="pages-link"> Terms of Use </Link> and consent to or <Link to={PRIVACYPOLICY} className="pages-link"> Privacy Policy</Link>.</span>
          </div>
        </div>
        <div className="copy-right-section">
          <ul>
            <li><Link to={PRIVACYPOLICY} className="footer-links">Privacy Policy</Link></li>
            <li><Link to={TERMSANDCONDITION} className="footer-links">Terms & Conditions</Link></li>
          </ul>
          <div className="copy-content">
            <p className="bs blur-color f-date">© {moment().year()} Damask</p>
            <div className="card-imgs">
              <a className="card-links">
                <img src={Payment1} alt="" />
              </a>
              <a className="card-links">
                <img src={Payment2} alt="" />
              </a>
              <a className="card-links">
                <img src={Payment3} alt="" />
              </a>
              <a className="card-links">
                <img src={Payment4} alt="" />
              </a>
              <a className="card-links">
                <img src={Payment5} alt="" />
              </a>
            </div>
            <p className="bs blur-color made-by">Made by <a className="a" href="https://magnetoitsolutions.com/" target="_blank"> Magneto IT Solutions</a></p>
          </div>
        </div>
      </Container>
      <LoginAlertPopup
            show={loginAlertModalShow}
            onHide={() => setLoginAlertModalShow(false)}
            onLoginYes={() => onLoginYes()}
            /* onLoginYes={() => onLoginYes()}
            onNo={() => onNo()} */
            message={loginAlertMessage}
          />
    </div>
  );
}

export default FooterWithMenu;
