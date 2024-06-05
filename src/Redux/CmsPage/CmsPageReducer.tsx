import { useNavigate } from "react-router-dom";
import { CMS_PAGE_FAILD, CMS_PAGE_LONG,CMS_PAGE_CLEAR ,CMS_PAGE_REQUEST, CMS_PAGE_SUCCESS, CMS_PAGE_NO_DATA } from "./CmsPageTypes";

export function cmsPage(state = {}, action:any) {
    switch (action.type) {
        case CMS_PAGE_REQUEST:
            return { ...action.payload };
        case CMS_PAGE_SUCCESS:
            return { ...action.payload };
        case CMS_PAGE_FAILD:
            return { ...action.payload };
        case CMS_PAGE_LONG:
            return { ...action.payload };
        case CMS_PAGE_NO_DATA:
            return { ...action.payload };        
        case CMS_PAGE_CLEAR:
            return {};
        default:
        return state;
    }
}