//判断用户是否登录的高阶组件
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import models from '@/models/common'

const CheckLogin = (Cmp) => {
  return class HOC extends Component {
    state = {
      isFinish: false,
      isLogin: false
    }
    componentDidMount() {
      let jwt = localStorage.getItem('jwt')
      if (jwt) {
        models.jwtCheck().then(res => {
          if (res.errNo === 0) {
            this.setState({
              isFinish: true,
              isLogin: true
            })
          } else {
            this.setState({ isFinish: true })
          }
        })
      } else {
        this.setState({ isFinish: true })
      }
    }
    render() {
      const { isFinish, isLogin } = this.state
      return (
        <>
          {isFinish ? isLogin ? <Cmp {...this.props} /> : <Redirect to="/login" /> : <div />}
        </>
      )
    }
  }

}

export default CheckLogin
