import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import InputGroups from "../../Common/InputGroups/InputGroups";
import CheckboxLabel from "../../Common/CheckboxLabel/CheckboxLabel";
import CustomeButton from "../../Common/CustomeButton/CustomeButton";
import { useDispatch, useSelector } from "react-redux";
import { API_STATUS } from "../../../Constant/Api";
import { SUCCESS_RESPONSE_CODE } from "../../../Constant/Status";
import {
  MYPROFILE_FAILD,
  MYPROFILE_LONG,
  MYPROFILE_REQUEST,
  MYPROFILE_SUCCESS,
  MYPROFILE_UPDATE_FAILD,
  MYPROFILE_UPDATE_LONG,
  MYPROFILE_UPDATE_REQUEST,
  MYPROFILE_UPDATE_SUCCESS,
} from "../../../Redux/MyProfile/MyProfileTypes";
import {
  myProfile,
  updateProfileAction,
} from "../../../Redux/MyProfile/MyProfileAction";
import Loader from "../../Loader/Loader";
import SomethingWrong from "../../SomethingWrong/SomethingWrong";
import { isLoading } from "../../../Utility/General";
import validate from "../../../Utility/Validation";
import {
  FIRST_NAME,
  LAST_NAME,
  EMAIL,
  NEW_PASSWORD,
  CURRENT_PASSWORD,
  REPEAT_PASSWORD,
  BIRTH_DATE,
} from "../../../Language/Validation";
import ACCOUNTINFO from "../../../Language/AccountInfo";
import { COMPONENT_MY_PROFILE } from "../../../Constant/Component";
import { useLocation, useNavigate } from "react-router-dom";
import ReactInputMask from "react-input-mask";
import { MYACCOUNTS } from "../../../Constant/Route";

const AccountInformation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const INITIAL_PROFILE_DATA: any = {
    myProfile: {
      firstName: {
        value: null,
        validation: ["required"],
        errors: [FIRST_NAME.Required],
      },
      lastName: {
        value: null,
        validation: ["required"],
        errors: [LAST_NAME.Required],
      },
      email: {
        value: null,
        validation: ["email", "requiredIf:isChangeEmail"],
        errors: [EMAIL.Valid, EMAIL.Required],
      },
      birthDate: {
        value: null,
        validation: ["validateBirthDate", "required"],
        errors: [BIRTH_DATE.Valid, BIRTH_DATE.Required],
      },
      isChangeEmail: { value: "0" },
      isChangepassword: { value: "0" },
      password: {
        value: null,
        validation: ["requiredIf:isChangepassword"],
        errors: [CURRENT_PASSWORD.Required],
      },
      newPassword: {
        value: null,
        validation: ["requiredIf:isChangepassword"],
        errors: [NEW_PASSWORD.Required],
      },
      repeatPassword: {
        value: null,
        validation: ["sameAs:newPassword,isChangepassword"],
        errors: [REPEAT_PASSWORD.sameAs],
      },
    },
  };
  const location: any = useLocation();
  const [profileData, setProfileData] = useState(INITIAL_PROFILE_DATA);
  const [profileDataError, setProfileDataError] = useState<any>({});
  const [isFormValidated, setIsFormValidated] = useState(false);
  const [apiStatus, setApiStatus] = useState(API_STATUS.SUCCESS);
  const [updateApiStatus, setUpdataApiStatus] = useState(API_STATUS.SUCCESS);
  const accountData = useSelector((state: any) => state?.getMyProfile?.data);
  const [isFormButtonDisabled, setIsFormButtonDisabled] = useState(false);

  useEffect(() => {
    let componentData: any = {};

    accountData?.component?.forEach((component: any) => {
      if (component?.componentId == COMPONENT_MY_PROFILE) {
        let nData = component?.myProfile;
        Object.keys(nData).forEach((componentN: any) => {
          setData(componentN, nData[componentN]);
        });
        //componentData[component?.componentId] = component
      }
    });

    if (location?.state?.isChangepassword) {
      let isChangepassword = location?.state?.isChangepassword;
      setData("isChangepassword", isChangepassword);
    }
    //setProfileData({ ...componentData })
  }, [accountData]);

  useSelector((state: any) => {
    if (state?.getMyProfile?.type === MYPROFILE_REQUEST) {
      if (apiStatus !== API_STATUS.LOADING) {
        setApiStatus(API_STATUS.LOADING);
      }
    } else if (
      state?.getMyProfile?.data?.statusCode === SUCCESS_RESPONSE_CODE &&
      state?.getMyProfile?.type === MYPROFILE_SUCCESS
    ) {
      if (apiStatus !== API_STATUS.SUCCESS) {
        setApiStatus(API_STATUS.SUCCESS);
        //let profileDetails = Object.assign({}, state?.getMyProfile?.data);
        //setDataIntoState(profileDetails);
      }
    } else if (state?.getMyProfile?.type === MYPROFILE_LONG) {
      if (apiStatus !== API_STATUS.LONG) {
        setApiStatus(API_STATUS.LONG);
      }
    } else if (state?.getMyProfile?.type === MYPROFILE_FAILD) {
      if (apiStatus !== API_STATUS.FAILED) {
        setApiStatus(API_STATUS.FAILED);
      }
    }

    if (state?.myProfileUpdate?.type === MYPROFILE_UPDATE_REQUEST) {
      if (updateApiStatus !== API_STATUS.LOADING) {
        setUpdataApiStatus(API_STATUS.LOADING);
      }
    } else if (state?.myProfileUpdate?.type === MYPROFILE_UPDATE_SUCCESS) {
      if (updateApiStatus !== API_STATUS.SUCCESS) {
        setUpdataApiStatus(API_STATUS.SUCCESS);
        setIsFormButtonDisabled(false);
        navigate(MYACCOUNTS);
      }
    } else if (state?.myProfileUpdate?.type === MYPROFILE_UPDATE_LONG) {
      if (updateApiStatus !== API_STATUS.LONG) {
        setUpdataApiStatus(API_STATUS.LONG);
      }
    } else if (state?.myProfileUpdate?.type === MYPROFILE_UPDATE_FAILD) {
      if (updateApiStatus !== API_STATUS.FAILED) {
        setUpdataApiStatus(API_STATUS.FAILED);
        setIsFormButtonDisabled(false);
      }
    }
  });

  /* const setDataIntoState: any = (allData: any) => {
    Object.keys(allData).forEach((component: any) => {
      setData(component, allData[component])
    });
  } */

  const setData = (field: string, value: string) => {
    let profileDetails = Object.assign({}, profileData);
    if (profileDetails.myProfile[field]) {
      profileDetails.myProfile[field].value = value;
    }
    setProfileData({ ...profileDetails });
  };

  useEffect(() => {
    dispatch(myProfile());
  }, []);

  useEffect(() => {
    setProfileDataError({ ...validate(profileData.myProfile)?.errors });
  }, [profileData]);

  const onSubmit = () => {
    const validateForm = validate(profileData.myProfile);
    if (validateForm.isValidated) {
      setIsFormButtonDisabled(true);
      dispatch(
        updateProfileAction({
          firstName: profileData.myProfile.firstName.value,
          lastName: profileData.myProfile.lastName.value,
          email: profileData.myProfile.email.value,
          birthDate: profileData.myProfile.birthDate.value,
          isChangeEmail: profileData.myProfile.isChangeEmail.value,
          isChangepassword: profileData.myProfile.isChangepassword.value,
          password: profileData.myProfile.password.value,
          newPassword: profileData.myProfile.newPassword.value,
          repeatPassword: profileData.myProfile.repeatPassword.value,
        })
      );
      setIsFormValidated(true);
      /* setData('isChangeEmail', '0');
      setData('isChangepassword', '0'); */
    } else {
      setProfileDataError({ ...validateForm?.errors });
      setIsFormValidated(true);
    }
  };

  switch (apiStatus) {
    case API_STATUS.LOADING:
      return <Loader></Loader>;
    case API_STATUS.SUCCESS:
      return (
        <div className="AI-wrapper">
          <h4>{ACCOUNTINFO.ACCOUNTINFO}</h4>
          <div className="AI-box-wrapper">
            <Row>
              <Col xs={12} sm={12} md={12} lg={6}>
                <div className="account-info">
                  <p className="tl">{ACCOUNTINFO.ACCOUNTINFO}</p>
                  <InputGroups
                    onChange={(e: any) => setData("firstName", e.target.value)}
                    error={
                      isFormValidated && profileDataError["firstName"]
                        ? profileDataError["firstName"]
                        : null
                    }
                    label={ACCOUNTINFO.LABEL_FIRST_NAME}
                    value={profileData[COMPONENT_MY_PROFILE]?.firstName?.value}
                    type="text"
                  />

                  <InputGroups
                    onChange={(e: any) => setData("lastName", e.target.value)}
                    error={
                      isFormValidated && profileDataError["lastName"]
                        ? profileDataError["lastName"]
                        : null
                    }
                    label={ACCOUNTINFO.LABEL_LAST_NAME}
                    value={profileData[COMPONENT_MY_PROFILE]?.lastName?.value}
                    type="text"
                  />

                  {/*  <InputGroups
                    onChange={(e: any) => setData("birthDate", e.target.value)}
                    label={ACCOUNTINFO.LABEL_BIRTH_DATE}
                    error={isFormValidated && profileDataError['birthDate'] ? profileDataError['birthDate'] : null}
                    value={profileData[COMPONENT_MY_PROFILE]?.birthDate?.value} type="text" /> */}

                  <div className="input-groups">
                    <label>Birthday (MM/DD)*</label>
                    <ReactInputMask
                      mask="99/99"
                      onChange={(e: any) =>
                        setData("birthDate", e.target.value)
                      }
                      value={
                        profileData[COMPONENT_MY_PROFILE]?.birthDate?.value
                      }
                      type="text"
                    />
                    {isFormValidated && profileDataError["birthDate"] && (
                      <span className="error">
                        {profileDataError["birthDate"]}
                      </span>
                    )}
                  </div>

                  <div className="ck-wrapper">
                    <CheckboxLabel
                      value={1}
                      onChange={(e: any) =>
                        setData("isChangeEmail", e.target.checked ? "1" : "0")
                      }
                    >
                      {ACCOUNTINFO.LABEL_CHANGE_EMAIL}
                    </CheckboxLabel>
                    <br />
                    <CheckboxLabel
                      checked={
                        profileData[COMPONENT_MY_PROFILE]?.isChangepassword
                          ?.value === "1"
                          ? true
                          : false
                      }
                      value={1}
                      onChange={(e: any) =>
                        setData(
                          "isChangepassword",
                          e.target.checked ? "1" : "0"
                        )
                      }
                    >
                      {ACCOUNTINFO.LABEL_CHANGE_PASSWORD}
                    </CheckboxLabel>
                  </div>
                </div>
              </Col>

              <Col xs={12} sm={12} md={12} lg={6}>
                <div className="change-email-address">
                  {/* <p className={`tl ${profileData?.isChangeEmail?.value == 1 ? '' : 'd-none'}`}>Change Email Address</p> */}
                  <p className="tl">
                    {profileData[COMPONENT_MY_PROFILE]?.isChangeEmail?.value ==
                      1 ||
                    profileData[COMPONENT_MY_PROFILE]?.isChangepassword
                      ?.value == 1
                      ? "Change "
                      : ""}
                    {profileData[COMPONENT_MY_PROFILE]?.isChangeEmail?.value ===
                    "1"
                      ? "Email Address"
                      : ""}
                    {profileData[COMPONENT_MY_PROFILE]?.isChangeEmail?.value ===
                      "1" &&
                    profileData[COMPONENT_MY_PROFILE]?.isChangepassword
                      ?.value === "1"
                      ? " & "
                      : ""}
                    {profileData[COMPONENT_MY_PROFILE]?.isChangepassword
                      ?.value === "1"
                      ? "Password"
                      : ""}
                  </p>

                  <InputGroups
                    className={
                      profileData[COMPONENT_MY_PROFILE]?.isChangeEmail
                        ?.value === "1"
                        ? ""
                        : "d-none"
                    }
                    onChange={(e: any) => setData("email", e.target.value)}
                    label={ACCOUNTINFO.LABEL_EMAIL}
                    value={profileData[COMPONENT_MY_PROFILE]?.email?.value}
                    error={
                      isFormValidated && profileDataError["email"]
                        ? profileDataError["email"]
                        : null
                    }
                    type="text"
                  />

                  <InputGroups
                    className={
                      profileData[COMPONENT_MY_PROFILE]?.isChangepassword
                        ?.value === "1" ||
                      profileData[COMPONENT_MY_PROFILE]?.isChangeEmail
                        ?.value === "1"
                        ? ""
                        : "d-none"
                    }
                    onChange={(e: any) => setData("password", e.target.value)}
                    type="password"
                    error={
                      isFormValidated && profileDataError["password"]
                        ? profileDataError["password"]
                        : null
                    }
                    label={ACCOUNTINFO.LABEL_CURRENT_PASSWORD}
                  />

                  <InputGroups
                    className={
                      profileData[COMPONENT_MY_PROFILE]?.isChangepassword
                        ?.value === "1"
                        ? ""
                        : "d-none"
                    }
                    onChange={(e: any) =>
                      setData("newPassword", e.target.value)
                    }
                    error={
                      isFormValidated && profileDataError["newPassword"]
                        ? profileDataError["newPassword"]
                        : null
                    }
                    type="password"
                    label={ACCOUNTINFO.LABEL_NEW_PASSWORD}
                  />

                  <InputGroups
                    className={
                      profileData[COMPONENT_MY_PROFILE]?.isChangepassword
                        ?.value === "1"
                        ? ""
                        : "d-none"
                    }
                    error={
                      isFormValidated && profileDataError["repeatPassword"]
                        ? profileDataError["repeatPassword"]
                        : null
                    }
                    onChange={(e: any) =>
                      setData("repeatPassword", e.target.value)
                    }
                    type="password"
                    label={ACCOUNTINFO.LABEL_REPEAT_PASSWORD}
                  />
                </div>
              </Col>

              <Col xs={12} sm={12} md={12} lg={6}>
                <CustomeButton
                  disabled={isFormButtonDisabled}
                  isLoading={isLoading(updateApiStatus)}
                  onClick={() => onSubmit()}
                  bg="fill"
                >
                  {ACCOUNTINFO.BUTTON_SAVE}
                </CustomeButton>
              </Col>
            </Row>
          </div>
        </div>
      );
    case API_STATUS.LONG:
      return <SomethingWrong></SomethingWrong>;
    case API_STATUS.FAILED:
      return <SomethingWrong></SomethingWrong>;
    default:
      return <Loader></Loader>;
  }
};

export default AccountInformation;
