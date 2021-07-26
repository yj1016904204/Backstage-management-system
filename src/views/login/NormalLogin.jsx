import React, { Component } from 'react'
import { Form, Input, Button, Row, Col, message } from 'antd';
import Captcha from '@/components/Captcha'
import models from '@/models/common'
import { withRouter } from 'react-router-dom'


class NormalLogin extends Component {
  state = {
    key: ""
  }
  onFinish = (values) => {

    const { key } = this.state
    values.key = key
    models.normalLogin(values).then(res => {
      if (res.errNo === 0) {
        message.success(res.message, 1, () => {
          this.props.history.push("/dashboard")
        });
      } else {
        message.error(res.errText)
        this.captcha()
      }
    })
  }
  /*   onFinishFailed = () => {
    } */
  setKeys = (key) => {
    this.setState({ key })
  }
  captcha = () => {
    this.Child.loadCaptcha()
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
            label="用户名"
            name="username"
            rules={[
              {
                required: true,
                message: '请输入您的用户名',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={"密 \xa0\xa0 码"}
            name="password"
            rules={[
              {
                required: true,
                message: '请输入您的密码',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

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
                  <Input />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Captcha height={"32px"} setKeys={this.setKeys} ref={c => this.Child = c} />
              </Col>
            </Row>
          </Form.Item>



          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div >
    )
  }
}
export default withRouter(NormalLogin)