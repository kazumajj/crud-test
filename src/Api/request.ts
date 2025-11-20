import axios from "axios"
const service = axios.create({
    baseURL: 'http://120.24.185.26:8081',
    timeout: 10000,
})
service.interceptors.request.use(
    (config) => {
         
        return config
    },
    err => {
        return Promise.reject(err)
    }
)
service.interceptors.response.use(
    res => { return res.data },
    err => {
        return Promise.reject(err);
    }
)
export default service