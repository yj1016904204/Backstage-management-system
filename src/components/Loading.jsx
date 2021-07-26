import React, { Component } from 'react'
import styled from 'styled-components'
import { Spin } from 'antd';

export default class Loading extends Component {
  render() {
    return (
      <Main>
        <Spin tip="请稍等片刻..." size="large" />
      </Main>
    )
  }
}

//通过styled来写css样式
const Main = styled.div`
  margin: 0;
  margin-bottom: 20px;
  padding: 20% 50px;
  text-align: center;
  border-radius: 4px;
`;