import React, { Component } from 'react'
import { Form, Input, Button, Row, Col, message, Modal } from 'antd';
import Captcha from '@/components/Captcha'
import models from '@/models/common'
import { withRouter } from 'react-router-dom'


class MobileLogin extends Component {
  state = {
    token: "",
    key: "",
    expire: 0,
    isModalVisible: false,
    requestId: "",
    mobileValue: "",
    count: 60
  }
  //短信验证码验证
  onFinish = (values) => {
    const { requestId } = this.state
    values["requestId"] = requestId
    if (requestId) {
      models.mobileLogin(values).then(res => {
        if (res.errNo === 0) {
          message.success(res.message, 1, () => {
            this.props.history.push("/dashboard")
          });
        } else {
          message.error(res.errText)
        }
      })
    } else {
      message.error("请输入正确的手机验证码 ")
    }
  }

  //短信验证码发送
  getCode = () => {
    const { token, expire, mobileValue, count } = this.state
    let isMobile = (/^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/).test(mobileValue)
    if (count === 60) {
      if (isMobile) {
        if (token && Date.now() / 1000 <= expire) {
          const values = {}
          values["token"] = token
          values["mobile"] = mobileValue
          values["type"] = 0
          this.setCount()
          console.log(values);
          models.mobileSend(values).then(res => {
            if (res.errNo === 0) {
              this.setState({ requestId: res.requestId })
            } else {
              message.error(res.errText)
            }
          })
        } else {
          this.showModal()
        }
      } else {
        message.error("请输入正确的手机号")
      }
    }

  }
  //当手机号改变时需要重新验证
  mobileChange = (event) => {
    const { mobileValue } = this.state
    let mobileEvent = event.target.value
    mobileValue !== mobileEvent && this.setState({ mobileValue: mobileEvent, expire: "" })
  }
  showModal = () => {
    this.setState({
      isModalVisible: true
    }, () => {
      this.Child.loadCaptcha()
    })

  };

  handleOk = () => {
    const { key, } = this.state
    const values = {}
    values["key"] = key
    values["captcha"] = this.captcha.input.value
    //验证码的校验
    models.captchaLogin(values).then(res => {
      if (res.errNo === 0) {
        message.success(res.message, 1, () => {
          this.setState({ isModalVisible: false, token: res.context.token, expire: res.context.expire }, () => {
            this.getCode()
          })
        })

      } else {
        this.Child.loadCaptcha()
        message.error(res.errText)
        console.log(this);
        this.captcha.setState(() => {
          return {
            value: "",
            prevValue: ""
          }
        })
      }

    })

  };
  handleCancel = () => {
    this.setState({
      isModalVisible: false
    })
  };
  setKeys = (key) => {
    this.setState({ key })
  }
  //设置定时器
  setCount = () => {
    const { count } = this.state
    if (count === 0) {
      this.setState({ count: 60 })
    } else {
      this.setState((state) => {
        return {
          count: state.count - 1
        }
      })
      setTimeout(() => {
        this.setCount()
      }, 1000)
    }
  }
  render() {
    return (
      <div>
        <Form
          name="login"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}

          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >
          <Form.Item
            label={"手\xa0\xa0机\xa0\xa0号"}
            name="mobile"
            rules={[
              {
                required: true,
                message: '请输入您的手机号',
              }, {
                pattern: /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
                message: '请输入正确的手机号'
              }
            ]}
          >
            <Input onChange={this.mobileChange} />
          </Form.Item>


          <Form.Item label="短信验证码" >
            <Row gutter={10}>
              <Col span={14}>
                <Form.Item
                  name="code"
                  rules={[
                    {
                      required: true,
                      message: '请输入验证码',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Button block onClick={this.getCode} >
                  {this.state.count === 60 ? "获取验证码" : this.state.count + "秒后获取"}
                </Button>
              </Col>
            </Row>
          </Form.Item>



          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 24,
            }}
          >
            <Button type="primary" htmlType="submit" block>
              登录
            </Button>
          </Form.Item>
        </Form>

        <Modal title="请输入图形验证" visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel} cancelText="取消" okText="确定">
          <Form>
            <Form.Item label="验证码" >
              <Row gutter={10}>
                <Col span={14}>
                  <Form.Item
                    name="captcha"
                    noStyle
                    rules={[
                      {
                        required: true,
                        message: '请输入验证码',
                      },
                    ]}
                  >
                    <Input ref={c => this.captcha = c} />
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Captcha height={"32px"} setKeys={this.setKeys} ref={c => this.Child = c} />
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </Modal>
      </div >
    )
  }
}
export default withRouter(MobileLogin)


