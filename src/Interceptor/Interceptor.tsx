import axios from "axios";
import { END_POINTS } from "../Constant/Api";
import { USER } from "../Constant/LocalStorage";
import { LOGIN } from "../Constant/Route";
import { store } from "../Redux/Store";
import { getUrl } from "../Utility/General";
// For GET requests

export function getTokan() {
  return store.getState()?.master?.data?.authToken;
}

export function getDefaultParameters() {
  return store.getState()?.defaultParameter;
}

axios.interceptors.request.use(
  (req: any) => {
    // Add configurations here
    if (req.url !== END_POINTS.createPaypalExpression) {
      req.headers = { Authorization: getTokan() };
    }
    if (req.method !== "get") {
      req.data["defaultParameters"] = getDefaultParameters();
    } else if (req.method === "get") {
      if (!req.url.includes(".json")) {
        req.url = getUrl(req.url, getDefaultParameters());
      }
    }

    return req;
  },
  (err) => {
    // Add configurations here
    return Promise.reject(err);
  }
);

// For POST requests
axios.interceptors.response.use(
  (res) => {
    if (res.data.errorCode === "1050") {
      localStorage.removeItem(USER);
      localStorage.setItem("session_expire", "true");
      // window.location.reload();
      window.location.replace(LOGIN);
    } else if (res.data.errorCode === "1010") {
      localStorage.removeItem(USER);
      localStorage.setItem("session_expire", "true");
      // window.location.reload();
      window.location.replace(LOGIN);
    } else if (res.data.errorCode === "1500") {
      localStorage.removeItem(USER);
      localStorage.setItem("session_expire", "true");
      // window.location.reload();
      window.location.replace(LOGIN);
    } else {
      // Add configurations here
      return res;
    }
  },
  (err) => {
    // Add configurations here
    return Promise.reject(err);
  }
);
