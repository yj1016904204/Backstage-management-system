import React, { Component } from 'react'
import { Tabs } from 'antd';
import { LockOutlined, ShakeOutlined } from '@ant-design/icons';

import NormalLogin from './NormalLogin'
import MobileLogin from './MobileLogin'

import Background from '@/assets/img/background.jpg'

import styled from 'styled-components'

const { TabPane } = Tabs;


const Main = styled.div`
    margin: 0 auto;
    width: 400px;
    padding-top: 5%;
`

export default class Login extends Component {
  render() {
    return (
      <div style={{ height: "100%", background: `url(${Background}) center center`, paddingRight: "80px" }}>
        <Main>
          <Tabs defaultActiveKey="1" centered="true" size="large">
            <TabPane
              tab={
                <span>
                  <LockOutlined />
                  常规登录
                </span>
              }
              key="1"
            >
              <NormalLogin />
            </TabPane>
            <TabPane
              tab={
                <span>
                  <ShakeOutlined />
                  短信登录
                </span>
              }
              key="2"
            >
              <MobileLogin />
            </TabPane>
          </Tabs>
        </Main>
      </div>
    )
  }
}



