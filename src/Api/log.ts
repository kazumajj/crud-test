import request from './request'
export const loginApi = async(data: LoginApireq):Promise<LoginApires>=>{
    return request(
        {
            url:'/login',
            method:'POST',
            data
        }
    )
}   