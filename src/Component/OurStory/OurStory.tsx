import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import OurStoryImg from "../../Assets/img/our-story.png";
import OurStoryBoxImg from "../../Assets/img/our-story.png";
import { API_STATUS } from '../../Constant/Api';
import { COMPONENT_OUR_STORY } from '../../Constant/Component';
import { SUCCESS_RESPONSE_CODE } from '../../Constant/Status';
import cmsPageAction from '../../Redux/CmsPage/CmsPageAction';
import { CMS_PAGE_FAILD, CMS_PAGE_LONG, CMS_PAGE_NO_DATA, CMS_PAGE_REQUEST, CMS_PAGE_SUCCESS } from '../../Redux/CmsPage/CmsPageTypes';
import { generateQuery } from '../../Utility/General';
import Loader from '../Loader/Loader';
import NoDataFound from '../NoDataFound/NoDataFound';
import SomethingWrong from '../SomethingWrong/SomethingWrong';
import DocumentMeta from 'react-document-meta';


const OurStory = () => {

  const meta = {
    title: 'Our Story',
  };

  const dispatch = useDispatch();
  const [cmsPageData, setCmsPageData] = useState<any>({});
  const [apiStatus, setApiStatus] = useState(API_STATUS.SUCCESS);
  const ourStory = useSelector((state: any) => state?.cmsPage?.data);

  useEffect(() => {
    dispatch(cmsPageAction(generateQuery({ urlKey: 'the-damask-story' })))
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
    ourStory?.component?.forEach((component: any) => {
      componentData[component?.componentId] = component
    });
    setCmsPageData({ ...componentData })
  }, [ourStory]);


  const obj: any = [
    {
      img: OurStoryBoxImg,
      content: 'First, we sourced the finest, all natural, non-gmo and gluten-free ingredients. We’re talking about velvety chocolate, bursts of fresh fruit goodness and the homey taste of real vanilla.'
    },
    {
      img: OurStoryBoxImg,
      content: 'Next, we collected a team of pastry chefs to develop a range of fun and flavorful cakes, making sure that every recipe would be just as successful in a gluten-free version.'
    },
    {
      img: OurStoryBoxImg,
      content: 'The icing on the cake? That has to be our truly fresh frosting. (We don’t even want to think about what comes out of those little plastic tubes.) Our frosting is rich, creamy and flavorful because you make it when you need it, and not a minute before.'
    },
    {
      img: OurStoryBoxImg,
      content: 'Then came the hard part. We tested, tested, re-tested, then tested again. Our recipes and measurements had to be exactly right because we’re promising that every cake, every cupcake and every batch of frosting you make at home will be delicious every time.'
    },
  ]
  switch (apiStatus) {
    case API_STATUS.LOADING:
      return (<Loader></Loader>);
    case API_STATUS.SUCCESS:
      return (
        // <DocumentMeta {...meta}>
        <div className="our-story PT-pages">
          <Container>
            <div className="layout-808">
              <h1>{cmsPageData?.data?.data?.title}</h1>
              <div dangerouslySetInnerHTML={{ __html: cmsPageData?.data?.data?.content }} >
              </div>
            </div>
          </Container>
        </div>
        // </DocumentMeta>
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

export default OurStory;
