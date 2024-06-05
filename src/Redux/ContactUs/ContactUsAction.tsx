import { useNavigate } from "react-router-dom";
import { END_POINTS, MAX_CALLS } from "../../Constant/Api";
import { USER } from "../../Constant/LocalStorage";
import { SUCCESS_RESPONSE_CODE } from "../../Constant/Status";
import api from "../../Service/Axios";
import { showToast } from "../../Utility/General";
import {
  CONTACT_US_FAILD,
  CONTACT_US_LONG,
  CONTACT_US_REQUEST,
  CONTACT_US_SUCCESS,
} from "./ContactUsTypes";

export default function contactUsAction(param: any) {
  let recallCount = 0;
  return (dispatch: any) => {
    dispatch({
      type: CONTACT_US_REQUEST,
      payload: { type: CONTACT_US_REQUEST },
    });
    function recursiveCall() {
      api
        .post(`${END_POINTS.contactUs}`, param)
        .then((result) => {
          if (result.data.statusCode === SUCCESS_RESPONSE_CODE) {
            console.log("FBQ :: TRACK EVENT --> Contact");
            typeof window.fbq === "function" &&
              window.fbq("track", "Contact", param);
            showToast("success", result.data.message);
            dispatch({
              type: CONTACT_US_SUCCESS,
              payload: { data: result.data, type: CONTACT_US_SUCCESS },
            });
          } else if (recallCount < MAX_CALLS) {
            recursiveCall();
            recallCount++;
            dispatch({
              type: CONTACT_US_LONG,
              payload: { data: {}, type: CONTACT_US_LONG },
            });
          } else {
            showToast("error", result.data.message);
            dispatch({
              type: CONTACT_US_FAILD,
              payload: { data: {}, type: CONTACT_US_FAILD },
            });
          }
        })
        .catch((error) => {
          showToast("error", error);
          if (recallCount < MAX_CALLS) {
            recursiveCall();
            recallCount++;
            dispatch({
              type: CONTACT_US_LONG,
              payload: { data: {}, type: CONTACT_US_LONG },
            });
          } else {
            dispatch({
              type: CONTACT_US_FAILD,
              payload: { data: {}, type: CONTACT_US_FAILD },
            });
          }
        });
    }
    recursiveCall();
  };
}
