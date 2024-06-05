import moment from "moment";
import { API_STATUS } from "../Constant/Api";
import { toast } from "react-toastify";
import { USER } from "../Constant/LocalStorage";
import { checkCookie, setCookie } from "./Cookie";
import BlankCupcake from "../Assets/img/blank-cupcake.svg";
import Cupcake from "../Assets/img/cupcake.svg";

const OUR_STORY = 'our-story';
const PRIVACY_POLICY = 'privacy-policy';
const TERMS_AND_CONDITIONS = 'terms-conditions';
const PRODUCTS = 'products';

export function getComponentData(cid: string, cdata: any) {
  return cdata?.find((c: any) => c.componentId === cid);
}

export function getUrl(query: string, params: any) {
  let queryString = query;
  let isQuestionMark = false;
  if (query && params) {
    if (query.includes("?")) {
      for (let param in params) {
        queryString += "&" + param + "=" + params[param];
      }
    } else {
      for (let param in params) {
        if (!isQuestionMark) {
          queryString += "?" + param + "=" + params[param];
          isQuestionMark = true;
        } else {
          queryString += "&" + param + "=" + params[param];
        }
      }
    }
  }
  return queryString;
}

export function setRememberMe(cname: string, user: string) {
  if (!checkCookie(cname)) {
    setCookie(cname, user, 30);
  }
}

export function removeRememberMe(cname: string) {
  if (checkCookie(cname)) {
    setCookie(cname, "", -30);
  }
}

export function lastLogin() {
  let user: any = localStorage.getItem(USER);
  let userData: any = JSON.parse(user);
  var today: any = moment().utc().format("YYYY-MM-DD hh:mm:ss");
  var lastLogin: any = userData?.dateTime;
  return moment(today).diff(moment(lastLogin), "minutes");
}

export function isLoading(apiStatus: string) {
  return apiStatus === API_STATUS.LOADING || apiStatus === API_STATUS.LONG
    ? true
    : false;
}

export function showToast(type: string, messge: string) {
  if (type === "success") {
    toast.success(messge, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } else if (type === "error") {
    toast.error(messge, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } else if (type === "info") {
    toast.info(messge, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } else if (type === "warning") {
    toast.warning(messge, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } else if (type === "default") {
    toast(messge, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
}

export function getStarRating(number: number) {
  var elements = [];
  for (let i = 0; i < 5; i++) {
    if (i >= number) {
      elements.push(<img src={BlankCupcake} alt="" />);
    } else {
      elements.push(<img src={Cupcake} alt="" />);
    }
  }
  return elements;
}

export function generateQuery(params: any) {
  let queryString = "";
  let isQuestionMark = false;
  if (params) {
    for (let param in params) {
      if (!isQuestionMark) {
        queryString += "?" + param + "=" + params[param];
        isQuestionMark = true;
      } else {
        queryString += "&" + param + "=" + params[param];
      }
    }
  }
  return queryString;
}

export const getIPFromIPFY = async () => {
  try {
    const response = await fetch(`https://api.ipify.org/`);
    let res = await response.text();
    return { ip: res };
  } catch (error) {
    console.error("ERORR ", error);
    return null;
  }
};

export function getPayloadOnMoreChunk(urlArr:any) {
  console.log('urlArr', urlArr)
  let type = ''

  let urlKey = ''
      let payload = {
         "store": urlArr?.[0],
         "lang": urlArr?.[1],
         "type": "static",
         "urlKey": urlArr?.[urlArr?.length - 1]
     };

  switch (true) {
      case urlArr.length === 1:
          type = 'static';
          urlKey = urlArr[0];
          if (urlArr[0] === OUR_STORY || urlArr[0] === PRIVACY_POLICY || urlArr[0] === TERMS_AND_CONDITIONS) {
              type = 'cms';
          } else {
              urlKey = urlArr[0].replace('-', '_');
          }
          payload = {
              "store": "main_website_store",
              "lang": "en",
              "type": type,
              "urlKey": urlKey
          };
          break;
      case urlArr.length === 2:
          payload = {
              "store": "main_website_store",
              "lang": "en",
              "type": urlArr[0],
              "urlKey": urlArr[1]
          };
          break;
  }
  return payload;
}


export function getUrlMetaPayload (url:any){
  const urlArr = url.split("/").filter((e:any) => e);
    let payload = {};
    switch (true) {
        case urlArr.length === 0:
            payload = {
                "store": "main_website_store",
                "lang": "en",
                "type": "static",
                "urlKey": "homepage"
            }
            break
        case urlArr.length > 0:
            payload = getPayloadOnMoreChunk(urlArr);
            break;

        default:
            payload = {
                "store": "main_website_store",
                "lang": "en",
                "type": "static",
                "urlKey": "homepage"
            }
            break;
    }
    return payload;
} 