import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { API_STATUS } from '../../Constant/Api';
import cmsPageAction from '../../Redux/CmsPage/CmsPageAction';
import { generateQuery } from '../../Utility/General';
import { SUCCESS_RESPONSE_CODE } from '../../Constant/Status';
import { CMS_PAGE_FAILD, CMS_PAGE_LONG, CMS_PAGE_NO_DATA, CMS_PAGE_REQUEST, CMS_PAGE_SUCCESS } from '../../Redux/CmsPage/CmsPageTypes';
import Loader from '../Loader/Loader';
import NoDataFound from '../NoDataFound/NoDataFound';
import SomethingWrong from '../SomethingWrong/SomethingWrong';

const TermsAndCondition = () => {

  const dispatch = useDispatch();
  const [cmsPageData, setCmsPageData] = useState<any>({});
  const [apiStatus, setApiStatus] = useState(API_STATUS.SUCCESS);
  const termsAndCondition = useSelector((state: any) => state?.cmsPage?.data);

  useEffect(() => {
    dispatch(cmsPageAction(generateQuery({ urlKey: 'terms-conditions' })))
  }, []);

  useSelector((state: any) => {
  });

  useSelector((state: any) => {
    if (state?.cmsPage?.type === CMS_PAGE_REQUEST) {
      if (apiStatus !== API_STATUS.LOADING) {
        setApiStatus(API_STATUS.LOADING);
      }
    } else if (
      state?.cmsPage?.data?.statusCode === SUCCESS_RESPONSE_CODE &&
      state?.cmsPage?.type === CMS_PAGE_SUCCESS
    ) {
      if (apiStatus !== API_STATUS.SUCCESS) {
        setApiStatus(API_STATUS.SUCCESS);
      }
    } else if (state?.cmsPage?.type === CMS_PAGE_LONG) {
      if (apiStatus !== API_STATUS.LONG) {
        setApiStatus(API_STATUS.LONG);
      }
    } else if (state?.cmsPage?.type === CMS_PAGE_NO_DATA) {
      if (apiStatus !== API_STATUS.NO_DATA) {
        setApiStatus(API_STATUS.NO_DATA)
      }
    } else if (state?.cmsPage?.type === CMS_PAGE_FAILD) {
      if (apiStatus !== API_STATUS.FAILED) {
        setApiStatus(API_STATUS.FAILED);
      }
    }
  });

  useEffect(() => {
    let componentData: any = {}
    termsAndCondition?.component?.forEach((component: any) => {
      componentData[component?.componentId] = component
    });
    setCmsPageData({ ...componentData })
  }, [termsAndCondition]);
  switch (apiStatus) {
    case API_STATUS.LOADING:
      return (<Loader></Loader>);
    case API_STATUS.SUCCESS:
      return (
        <div className="PT-pages">
          <Container>
            <Row>
              <h2 className="text-center">{cmsPageData?.data?.data?.title}</h2>
              <div dangerouslySetInnerHTML={{ __html: cmsPageData?.data?.data?.content }} ></div>
            </Row>
          </Container>
        </div>
      );
    case API_STATUS.LONG:
      return (<SomethingWrong></SomethingWrong>);
    case API_STATUS.NO_DATA:
      return (<NoDataFound></NoDataFound>);
    case API_STATUS.FAILED:
      return (<SomethingWrong></SomethingWrong>);
    default:
      return (<Loader></Loader>);
  }
}

export default TermsAndCondition;
