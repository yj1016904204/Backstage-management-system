//该组件为图片验证模块，主要功能为提供图形验证码。
//该组件需要传递两个参数：setKey(主动向父组件提供验证码的key值)、height(设置图形验证码的高度)
import React, { Component, Fragment } from 'react'
import axios from 'axios'

export default class Captcha extends Component {
  state = {
    img: ""
  }

  render() {
    const { img } = this.state
    const { height } = this.props
    return (
      <Fragment>
        <img src={img} alt="captcha" onClick={this.loadCaptcha} height={height} />
      </Fragment>
    )
  }
  //请求数据
  componentDidMount() {
    this.loadCaptcha()
  }
  loadCaptcha = () => {
    axios.get("https://reactapi.iynn.cn/captcha/api/math").then(res => {
      this.setState({ img: res.img })
      this.props.setKeys(res.key)
    })
  }
}
