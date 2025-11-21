import React, { useState, type ChangeEvent } from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { loginApi } from '../Api/log';
import { useNavigate } from 'react-router-dom';

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};


const Login: React.FC = function () {
    const [usernameVal, setUsenameVal] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const navigate=useNavigate()
    const gotoLogin = async () => {
        console.log("用户名和密码是", usernameVal, userPassword)
        //验证是否有空值
        if (!usernameVal.trim() || !userPassword.trim()) {
            message.error("请填写完整信息")
            return
        }
        const response:LoginApires= await loginApi(
            {
                username: usernameVal,
                password: userPassword
            }
        )
        const { code, message:msg, data } = response;
        if(code!==200)
        {
            message.error(msg||"登录失败")
            return
        }
        const token=data?.token
        const role=data?.role
        if(token){
            localStorage.setItem("my_token",token)
            localStorage.setItem("my_role",role)
            message.success("登录成功")
            navigate("/")
        } else {
            message.error("登录失败，未返回 token")
        }
    } 
    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item<FieldType>
                label="用户名"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setUsenameVal(e.target.value)
                } />
            </Form.Item>

            <Form.Item<FieldType>
                label="密码"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setUserPassword(e.target.value)
                } />
            </Form.Item>

            <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
                <Checkbox>记住</Checkbox>
            </Form.Item>

            <Form.Item label={null}>
                <Button type="primary" htmlType="submit" onClick={gotoLogin}>
                    登录
                </Button>
            </Form.Item>
        </Form>
    )
};

export default Login;