//定义响应和请求参数的类型
//登录请求类型约束
 interface LoginApireq{
    username:string,
    password:string
}
//响应请求类型约束
 interface LoginApires{
    code: number,
    message: string,
    data: {
        token: string,
        role: string
}

}