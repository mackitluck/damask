import { useNavigate } from "react-router-dom";
import { END_POINTS, MAX_CALLS } from "../../Constant/Api";
import { USER } from "../../Constant/LocalStorage";
import { SUCCESS_RESPONSE_CODE } from "../../Constant/Status";
import api from "../../Service/Axios";
import { showToast } from "../../Utility/General";
import { MEGA_MENU_FAILD, MEGA_MENU_LONG, MEGA_MENU_REQUEST, MEGA_MENU_SUCCESS } from "./HeaderTypes";


export default function megaMenuAction(param: any) {
    let recallCount = 0;
    return (dispatch: any) => {
        dispatch({
            type: MEGA_MENU_REQUEST,
            payload: { type: MEGA_MENU_REQUEST },
        });
        function recursiveCall() {
            api.post(`${END_POINTS.megaMenu}`, param).then((result) => {
                if (result.data.statusCode === SUCCESS_RESPONSE_CODE) {
                    dispatch({
                        type: MEGA_MENU_SUCCESS,
                        payload: { data: result.data, type: MEGA_MENU_SUCCESS },
                    });
                }
                else if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: MEGA_MENU_LONG,
                        payload: { data: {}, type: MEGA_MENU_LONG },
                    });
                }
                else {
                    showToast('error', result.data.message)
                    dispatch({
                        type: MEGA_MENU_FAILD,
                        payload: { data: {}, type: MEGA_MENU_FAILD },
                    });
                }
            }).catch((error) => {
                if (recallCount < MAX_CALLS) {
                    recursiveCall()
                    recallCount++;
                    dispatch({
                        type: MEGA_MENU_LONG,
                        payload: { data: {}, type: MEGA_MENU_LONG },
                    });
                }
                else {
                    dispatch({
                        type: MEGA_MENU_FAILD,
                        payload: { data: {}, type: MEGA_MENU_FAILD },
                    });
                }
            });
        }
        recursiveCall()
    };
}
