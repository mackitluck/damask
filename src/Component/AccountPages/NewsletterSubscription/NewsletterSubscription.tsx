import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API_STATUS } from '../../../Constant/Api';
import CheckboxLabel from '../../Common/CheckboxLabel/CheckboxLabel';
import CustomeButton from '../../Common/CustomeButton/CustomeButton';
import { MY_SETTING_REQUEST, MY_SETTING_SUCCESS, MY_SETTING_FAILD, MY_SETTING_LONG, MY_SETTING_UPDATE_REQUEST, MY_SETTING_UPDATE_SUCCESS, MY_SETTING_UPDATE_LONG, MY_SETTING_UPDATE_FAILD } from '../../../Redux/MySetting/MySettingTypes';
import { SUCCESS_RESPONSE_CODE } from '../../../Constant/Status';
import { getMySetting, mySettingUpdate } from '../../../Redux/MySetting/MySettingAction';
// import { compose } from '@mui/material/node_modules/@mui/system';
import { isLoading } from '../../../Utility/General';
import Loader from '../../Loader/Loader';
import SomethingWrong from '../../SomethingWrong/SomethingWrong';
import NEWSLETTER_SUBSCRIPTION from '../../../Language/NewsletterSubscription';

const NewsletterSubscription = () => {

  const dispatch = useDispatch();
  const initialState = {
    newsletterSubscription: { value: '0' },
  };

  const [subscriptionData, setSubscriptionData] = useState(initialState);
  const [apiStatus, setApiStatus] = useState(API_STATUS.SUCCESS);
  const [updateApiStatus, setUpdateApiStatus] = useState(API_STATUS.SUCCESS);

  const setData = (field: string, value: string) => {
    setSubscriptionData({
      ...subscriptionData,
      [field]: {
        value: value
      }
    })
  }

  useEffect(() => {
    dispatch(getMySetting())
  }, [])

  const onSubmit = () => {
    dispatch(mySettingUpdate({ newsletterSubscription: subscriptionData.newsletterSubscription.value}));
  }

  useSelector(((state: any) => {
    if (state?.getMySetting?.type === MY_SETTING_REQUEST) {
      if (apiStatus !== API_STATUS.LOADING) {
        setApiStatus(API_STATUS.LOADING)
      }
    }
    else if (state?.getMySetting?.data?.statusCode === SUCCESS_RESPONSE_CODE && state?.getMySetting?.type === MY_SETTING_SUCCESS) {
      if (apiStatus !== API_STATUS.SUCCESS) {
        setApiStatus(API_STATUS.SUCCESS)
        setData("newsletterSubscription", state?.getMySetting?.data?.isActive);
      }
    }
    else if (state?.getMySetting?.type === MY_SETTING_LONG) {
      if (apiStatus !== API_STATUS.LONG) {
        setApiStatus(API_STATUS.LONG)
      }
    }
    else if (state?.getMySetting?.type === MY_SETTING_FAILD) {
      if (apiStatus !== API_STATUS.FAILED) {
        setApiStatus(API_STATUS.FAILED)
      }
    }

    if (state?.mySettingUpdate?.type === MY_SETTING_UPDATE_REQUEST) {
      if (updateApiStatus !== API_STATUS.LOADING) {
        setUpdateApiStatus(API_STATUS.LOADING)
      }
    }
    else if (state?.mySettingUpdate?.data?.statusCode === SUCCESS_RESPONSE_CODE && state?.mySettingUpdate?.type === MY_SETTING_UPDATE_SUCCESS) {
      if (updateApiStatus !== API_STATUS.SUCCESS) {
        setUpdateApiStatus(API_STATUS.SUCCESS)
       // setData("newsletterSubscription", state?.mySettingUpdate?.data?.isActive);
      }
    }
    else if (state?.mySettingUpdate?.type === MY_SETTING_UPDATE_LONG) {
      if (updateApiStatus !== API_STATUS.LONG) {
        setUpdateApiStatus(API_STATUS.LONG)
      }
    }
    else if (state?.mySettingUpdate?.type === MY_SETTING_UPDATE_FAILD) {
      if (updateApiStatus !== API_STATUS.FAILED) {
        setUpdateApiStatus(API_STATUS.FAILED)
      }
    }
  }))

  switch (apiStatus) {
    case API_STATUS.LOADING:
      return (<Loader></Loader>);
    case API_STATUS.SUCCESS:
      return (
        <div className="newsletter-subscription">
          <h4>{NEWSLETTER_SUBSCRIPTION.NEWSLETTER_SUBSCRIPTION}</h4>
          <div className="NS-wrapper">
            <p className="tl">{NEWSLETTER_SUBSCRIPTION.NEWSLETTER_SUBSCRIPTION_OPTION}</p>
            <CheckboxLabel checked={subscriptionData.newsletterSubscription.value == '1' ? true : false} onChange={(e: any) => setData("newsletterSubscription", e.target.checked ? '1' : '0')}>{NEWSLETTER_SUBSCRIPTION.NEWSLETTER_SUBSCRIPTION_GENERAL}</CheckboxLabel>
            <div>
              <CustomeButton isLoading={isLoading(updateApiStatus)} onClick={() => onSubmit()} bg="fill">{NEWSLETTER_SUBSCRIPTION.NEWSLETTER_SUBSCRIPTION_SAVE}</CustomeButton>
            </div>
          </div>
        </div>
      );
    case API_STATUS.LONG:
      return (<SomethingWrong></SomethingWrong>);
    case API_STATUS.FAILED:
      return (<SomethingWrong></SomethingWrong>);
    default:
      return (<Loader></Loader>);
  }

  
}

export default NewsletterSubscription;
