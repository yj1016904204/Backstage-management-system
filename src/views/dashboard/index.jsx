import React, { Component } from 'react'
import CheckLogin from '@/hoc/CheckLogin'
import models from '@/models/common'
import Routes from '@/router/nest'
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import '@/assets/css/layout.css'
import Logo from '@/assets/img/logo.jpg'
import user from '@/assets/img/user.jpg'
const { Header, Sider, Content } = Layout;

class Dashboard extends Component {
  state = {
    collapsed: false,
    adminInfo: { last_login_addr: {} },
  };
  componentDidMount() {
    models.getAdminInfo().then(res => {
      this.setState({ adminInfo: res.accountInfo })
    })
  }
  userCheck = () => {
    this.props.history.push("/dashboard/user")
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  render() {
    const { adminInfo } = this.state
    return (
      <Layout >
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" >
            <img src={Logo} alt="" width="100%" />
          </div>
          <Menu theme="dark" mode="inline" >
            <Menu.Item key="1" icon={<UserOutlined />} onClick={this.userCheck}>
              用户管理
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              视频管理
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              上传管理
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: "0 20px" }}>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })}
            <span>{" "}欢迎您：{adminInfo.username}！您上次登录于{" " + adminInfo.last_login_addr.state + " " + adminInfo.last_login_addr.isp + "  "} ({adminInfo.last_ip})</span>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 650,
              backgroundImage: `url(${user}) `,
              backgroundSize: "cover"
            }}
          >
            <Routes />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default CheckLogin(Dashboard)
