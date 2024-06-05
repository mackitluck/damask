import { Container } from 'react-bootstrap';
import InputGroups from '../Common/InputGroups/InputGroups';
import TextareaGroups from '../Common/TextareaGroups/TextareaGroups';
import CustomeButton from '../Common/CustomeButton/CustomeButton';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { API_STATUS } from '../../Constant/Api';
import CONTACTUS from '../../Language/ContactUs';
import { NAME, EMAIL, PHONE, MESSAGE } from '../../Language/Validation';
import validate from '../../Utility/Validation';
import contactUsAction from '../../Redux/ContactUs/ContactUsAction';
import { HOME } from "../../Constant/Route";
import { CONTACT_US_CLEAR, CONTACT_US_FAILD, CONTACT_US_LONG, CONTACT_US_REQUEST, CONTACT_US_SUCCESS } from '../../Redux/ContactUs/ContactUsTypes';
import { SUCCESS_RESPONSE_CODE } from '../../Constant/Status';
import { isLoading } from '../../Utility/General';

const ContactUs = () => {
  let fullName = useSelector((state: any) => state?.login?.data ? state?.login?.data?.firstName + ' ' + state?.login?.data?.lastName : '');
  let isLoggedInEmail = useSelector((state: any) => state?.login?.data?.email ? state?.login?.data?.email : '');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
  }, [])
  const INITIAL_CONTACT_DATA: any = {
    name: { value: fullName, validation: ["required"], errors: [NAME.Required] },
    email: { value: isLoggedInEmail, validation: ["email", "required"], errors: [EMAIL.Valid, EMAIL.Required] },
    phone: { value: "", validation: ["required"], errors: [PHONE.Required] },
    message: { value: "", validation: ["required"], errors: [MESSAGE.Required] },
  }

  const [contactData, setContactData] = useState(INITIAL_CONTACT_DATA)
  let demo: any = {}
  const [contactDataError, setContactDataError] = useState(demo)
  const [isFormValidated, setIsFormValidated] = useState(false)
  const [apiStatus, setApiStatus] = useState(API_STATUS.SUCCESS)
  const [isContactUsFormButtonDisabled, setIsContactUsFormButtonDisabled] = useState(false)

  const onSubmit = () => {
    if (validate(contactData).isValidated === true) {
      setIsContactUsFormButtonDisabled(true)
      dispatch(contactUsAction({ name: contactData.name.value, email: contactData.email.value, phone: contactData.phone.value, message: contactData.message.value, }))

    }
    else {
      setContactDataError({ ...validate(contactData)?.errors })
      setIsFormValidated(true)
    }
  }

  const setData = (field: string, value: string) => {
    let contactDetails = Object.assign({}, contactData)
    contactDetails[field].value = value
    setContactData({ ...contactDetails })
  }
  useEffect(() => {
    setContactDataError({ ...validate(contactData)?.errors })
  }, [contactData])

  useSelector((state: any) => {
    if (state?.contactUs?.type === CONTACT_US_REQUEST) {
      if (apiStatus !== API_STATUS.LOADING) {
        setApiStatus(API_STATUS.LOADING);
      }
    } else if (
      state?.contactUs?.data?.statusCode === SUCCESS_RESPONSE_CODE &&
      state?.contactUs?.type === CONTACT_US_SUCCESS
    ) {
      if (apiStatus !== API_STATUS.SUCCESS) {
        setApiStatus(API_STATUS.SUCCESS);
        //navigate(HOME);
        dispatch({
          type: CONTACT_US_CLEAR,
          payload: { type: CONTACT_US_CLEAR },
        });
        setContactData(INITIAL_CONTACT_DATA)
        setIsContactUsFormButtonDisabled(false)
      }
    } else if (state?.contactUs?.type === CONTACT_US_LONG) {
      if (apiStatus !== API_STATUS.LONG) {
        setApiStatus(API_STATUS.LONG);
      }
    } else if (state?.contactUs?.type === CONTACT_US_FAILD) {
      if (apiStatus !== API_STATUS.FAILED) {
        setApiStatus(API_STATUS.FAILED);
      }
    }
  });

  return (
    <div className="contact-us form-section">
      <Container>
        <div className="max-352">
          <h2>{CONTACTUS?.CONTACTUS}</h2>
          <div>
            <InputGroups label={CONTACTUS?.LABEL_NAME}
              value={contactData.name.value}
              onChange={(e: any) => setData("name", e.target.value)}
              error={isFormValidated && contactDataError['name'] ? contactDataError['name'] : null}
            />
            <InputGroups label={CONTACTUS?.LABEL_EMAIL} type="email"
              value={contactData.email.value}
              onChange={(e: any) => setData("email", e.target.value)}
              error={isFormValidated && contactDataError['email'] ? contactDataError['email'] : null}
            />
            <InputGroups label={CONTACTUS?.LABEL_PHONE} type="number"
              onChange={(e: any) => setData("phone", e.target.value)}
              value={contactData.phone.value}
              error={isFormValidated && contactDataError['phone'] ? contactDataError['phone'] : null}
            />
            <TextareaGroups label={CONTACTUS?.LABEL_MESSAGE}
              onChange={(e: any) => setData("message", e.target.value)}
              value={contactData.message.value}
              error={isFormValidated && contactDataError['message'] ? contactDataError['message'] : null}
            />
          </div>
          <CustomeButton bg="fill" disabled={isContactUsFormButtonDisabled} isLoading={isLoading(apiStatus)} onClick={() => onSubmit()}>{CONTACTUS?.BUTTON_SUBMIT}</CustomeButton>
        </div>
      </Container>
    </div>
  );
}

export default ContactUs;
