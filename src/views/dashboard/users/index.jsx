import React, { Component } from 'react'
import EditUser from './EditUser'
import AddUser from './AddUser'
import models from '@/models/user'

import { PageHeader, Button, Table, Tag, Space, Pagination, Modal, message } from 'antd';
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components';
import {
  PieChart
} from 'echarts/charts';
import {
  CanvasRenderer
} from 'echarts/renderers';
echarts.use(
  [TitleComponent, TooltipComponent, LegendComponent, PieChart, CanvasRenderer]
);

export default class index extends Component {
  state = {
    routes: [
      {
        breadcrumbName: '后台首页',
      },
      {
        breadcrumbName: '用户管理',
      },
      {
        breadcrumbName: '用户列表',
      },
    ],
    columns: [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: '性别',
        dataIndex: 'gender',
        key: 'gender',
        render: gender => {
          switch (gender) {
            case "1":
              return "男"
            case "2":
              return "女"
            default:
              return "保密"
          }
        }
      },
      {
        title: '状态',
        key: 'status',
        dataIndex: 'status',
        render: status => (
          <>
            {status === "1" ? (<Tag color="green">
              正常
            </Tag>) : <Tag color="red" >
              禁用
            </Tag>}
          </>
        ),
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => {
          // console.log(text, record);
          return (
            <Space size="middle">
              <a onClick={() => {
                this.EditUser(text.id)
              }}>编辑</a>
              <a onClick={() => {
                this.deleteUser(text.id)
              }}>删除</a>
            </Space>
          )
        },
      },
    ],
    paginate: {},
    page: 1,
    links: [],
    keyword: "",
    visible: false,
    visibleEdit: false,
    visibleAdd: false,
    userInfo: {},
    editId: "",
    genderData: []
  }
  componentDidMount() {
    this.loadData()
  }
  loadData = () => {
    const { keyword, page } = this.state
    let values = { keyword, page }
    models.getUserInfo(values).then(res => {
      this.setState({ paginate: res.paginate })
    })
  }
  pageChange = (page, pagesize) => {
    this.setState({ page }, () => {
      this.loadData()
    })
  }
  modalChange = () => {
    models.getUserStatistics().then(res => {
      this.setState({ visible: true })
      if (res.errNo === 0) {
        this.setState({ genderData: res.data }, () => {
          var chartDom = document.getElementById('canvers');
          var myChart = echarts.init(chartDom);
          var option;
          option = {
            title: {
              text: 'vip用户男女比例图',
              left: 'center'
            },
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
              orient: 'vertical',
              left: 'left',
            },
            series: [
              {
                name: '访问来源',
                type: 'pie',
                radius: '70%',
                data: this.state.genderData,
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          };
          option && myChart.setOption(option);
        })
      }
    })
  }
  deleteUser(id) {
    models.deleteUser(id).then(res => {
      if (res.errNo === 0) {
        message.success(res.message)
      } else {
        message.error(res.message)
      }
    })
  }
  EditUser(id) {
    this.setState({ editId: id })
    models.getUserId(id).then(res => {
      if (res.errNo === 0) {
        this.setState({ userInfo: res.userInfo, visibleEdit: true })
      } else {
        message.error(res.message)
      }
    })
  }

  addUser = () => {
    this.setState({ visibleAdd: true })
  }


  render() {
    const { routes, columns, paginate, page, visible, visibleEdit, userInfo, editId, visibleAdd } = this.state
    return (
      <div >
        <PageHeader
          ghost={false}
          title="用户管理"
          subTitle="这是一个用户管理模块，当前实现的功能是用户列表"
          breadcrumb={{ routes }}
          extra={[
            <Button key="2" onClick={this.modalChange}>统计数据</Button>,
            <Button key="1" type="primary" onClick={this.addUser}>
              新增
            </Button>,
          ]}
        >
        </PageHeader>

        <Table columns={columns} dataSource={paginate.data} pagination={false} rowKey={(a) => a.id} />
        <div style={{ marginTop: "20px", textAlign: "center" }} >
          <Pagination defaultCurrent={page} current={page} total={paginate.total} onChange={this.pageChange} showSizeChanger={false} />
        </div>

        <Modal
          title="男女会员比例"
          centered
          visible={visible}
          onOk={() => this.setState({ visible: false })}
          onCancel={() => this.setState({ visible: false })}
          width={1000}
        >
          <div id="canvers" style={{ height: "600px" }}></div>
        </Modal>

        <Modal
          title="用户编辑界面"
          centered
          visible={visibleEdit}
          onOk={() => {
            this.editUser.formRef.submit()
            this.setState({ visibleEdit: false })
          }}
          onCancel={() => this.setState({ visibleEdit: false })}
          width={700}
        >
          <EditUser style={{ height: "600px" }} loadData={this.loadData} editId={editId} userInfo={userInfo} ref={c => this.editUser = c}></EditUser>
        </Modal>

        <Modal
          title="用户添加界面"
          centered
          visible={visibleAdd}
          onOk={() => {
            this.addUserList.formRef.submit()
            this.setState({ visibleAdd: false })
          }}
          onCancel={() => this.setState({ visibleAdd: false })}
          width={700}
        >
          <AddUser style={{ height: "600px" }} loadData={this.loadData} ref={c => this.addUserList = c}></AddUser>
        </Modal>
      </div>

    )
  }
}
