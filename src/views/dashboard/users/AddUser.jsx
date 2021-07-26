import React, { Component } from 'react'
import { Form, Input, Select, message } from 'antd';
import models from '@/models/user'

const { Option } = Select;
export default class AddUser extends Component {
  onFinish = (values) => {
    console.log(values, "sucess");
    models.addListUser(values).then(res => {
      if (res.errNo === 0) {
        message.success(res.message, 1, () => {
          this.props.loadData()
        })
      } else {
        message.error("添加失败", 1, () => {
          this.props.loadData()
        })
      }
    })
  };

  onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
    message.error(errorInfo.errorFields[0].errors[0], 1, () => {
      this.props.loadData()
    })
  };



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
          rules={[
            {
              required: true,
              message: '请输入密码',
            }
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="邮箱"
          name="email"
          rules={[
            {
              pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
              required: true,
              message: '请输入邮箱',
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
              pattern: /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
              required: true,
              message: '请输入手机号',
            },
          ]}
        >
          <Input />
        </Form.Item>
        {/* 
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            确定修改
          </Button>
        </Form.Item> */}
      </Form>
    )
  }
}
