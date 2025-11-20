import request from './request'
export const loginApi = (data: LoginApireq)=>{
    return request(
        {
            url:'/login',
            method:'POST',
            data
        }
    )
}   