import React, { useEffect, useState } from 'react';
import '../style/App.scss'
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, message, theme } from 'antd';
import { useNavigate, Outlet } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('图书管理', '/page1', <PieChartOutlined />),//这里边的栏目1是指的显示内容，sub1，3，4，5指的是key
    getItem('图书查询', '/re', <DesktopOutlined />),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('退出登录', '/login', <FileOutlined />),
];

const App: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [openKeys,setOpenkeys]=useState([''])
    const navigate = useNavigate()
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const handleChange = (openKeys: string[]) => {
        setOpenkeys([openKeys[openKeys.length-1]])
    }
    useEffect(()=>{
        if(!localStorage.getItem("my_token"))
        {
            navigate('/login')
            alert("请先完成登录")
        }
    },[navigate])
    const menuClick=(e:{key:string})=>{
        if(e.key==="/login")
        {
            localStorage.removeItem("my_role")
            localStorage.removeItem("my_token")
            message.success("退出登录成功")
            navigate("/login")
        }
        else{
            navigate(e.key)
        }
    }
    return (
        <Layout style={{ minHeight: '100vh'}}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu theme="dark" defaultSelectedKeys={['/p']} mode="inline" items={items} 
                onClick={menuClick} 
                onOpenChange={handleChange} 
                openKeys={openKeys}/>
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }} />
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: 'User' }, { title: 'Bill' }]} />
                    <div
                        style={{
                            padding: 24,
                            height: "100%",
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        Bill is a cat.
                    </div>
                    <Outlet />
                </Content>
                <Footer style={{ textAlign: 'center', height: "48px" }}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};

export default App;