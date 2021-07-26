import React, { Component } from 'react'
import { Form, Input, Select, message } from 'antd';
import models from '@/models/user'

const { Option } = Select;
export default class EditUser extends Component {
  onFinish = (values) => {
    const { username, email, gender, mobile } = values
    if (!values.password) {
      values = { username, email, gender, mobile }
    }
    console.log(this.props.editId, values);
    models.editUser(this.props.editId, values).then(res => {
      if (res.errNo === 0) {
        message.success(res.message, 1, () => {
          this.props.loadData()
        })
      } else {
        message.error("修改失败")
      }
    })
  };

  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  componentDidMount() {
    this.init()
  }
  init = () => {
    const { setFieldsValue } = this.formRef;
    const { username, email, gender, mobile } = this.props.userInfo
    // 这里就能实现指定表单设置value
    setFieldsValue({
      username,
      email,
      gender,
      mobile
    })
  }
  componentDidUpdate() {
    this.init()
  }


  render() {
    return (
      <Form
        name="userInfo"
        ref={c => this.formRef = c}
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 14,
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
              message: '请填写您的用户名',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="邮箱"
          name="email"
          rules={[
            {
              required: true,
              message: '请输入正确的邮箱',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="性别"
          name="gender"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select style={{ width: 300 }} >
            <Option value="1">男</Option>
            <Option value="2">女</Option>
            <Option value="3">保密</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="手机号"
          name="mobile"
          rules={[
            {
              required: true,
              message: '请输入正确的手机',
            },
          ]}
        >
          <Input />
        </Form.Item>

      </Form>
    )
  }
}
