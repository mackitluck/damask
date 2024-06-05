import { useNavigate } from "react-router-dom";
import { END_POINTS, MAX_CALLS } from "../../Constant/Api";
import { USER } from "../../Constant/LocalStorage";
import { NO_DATA_ERROR_CODE, SUCCESS_RESPONSE_CODE } from "../../Constant/Status";
import api from "../../Service/Axios";
import { showToast } from "../../Utility/General";
import { CMS_PAGE_FAILD, CMS_PAGE_LONG, CMS_PAGE_REQUEST, CMS_PAGE_SUCCESS, CMS_PAGE_NO_DATA } from "./CmsPageTypes";


export default function cmsPageAction(param: any) {
    let recallCount = 0;
    return (dispatch: any) => {
        dispatch({
            type: CMS_PAGE_REQUEST,
            payload: { type: CMS_PAGE_REQUEST },
        });
        function recursiveCall() {
            api.get(`${END_POINTS.cmsPage + param}`, {}).then((result) => {
                if (result.data.statusCode === SUCCESS_RESPONSE_CODE) {
                    dispatch({
                        type: CMS_PAGE_SUCCESS,
                        payload: { data: result.data, type: CMS_PAGE_SUCCESS },
                    });
                }
                else if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: CMS_PAGE_LONG,
                        payload: { data: {}, type: CMS_PAGE_LONG },
                    });
                }
                else if (result.data.errorCode === NO_DATA_ERROR_CODE) {
                    dispatch({
                        type: CMS_PAGE_NO_DATA,
                        payload: { data: result.data, type: CMS_PAGE_NO_DATA },
                    });
                }
                else {
                    dispatch({
                        type: CMS_PAGE_FAILD,
                        payload: { data: {}, type: CMS_PAGE_FAILD },
                    });
                }
            }).catch((error) => {
                showToast('error', error)
                if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: CMS_PAGE_LONG,
                        payload: { data: {}, type: CMS_PAGE_LONG },
                    });
                }
                else {
                    dispatch({
                        type: CMS_PAGE_FAILD,
                        payload: { data: {}, type: CMS_PAGE_FAILD },
                    });
                }
            });
        }
        recursiveCall()
    };
}
