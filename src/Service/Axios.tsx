import axios from "axios";

const api = {
    get(url: string, params: any) {
      return axios.get(url, { params })
    },
  
    post(url: string, data: any, header?: any) {
      if (header) {
        return axios.post(url , data, {
          headers: header
        })
      }
      return axios.post(url, data)
    }
  }
  
  export default api