/**
 * 主组件
 */
import React,{Component} from 'react'
import {Form,Modal,Button,Tabs,Input,Icon,message} from 'antd'
import {Link} from 'react-router'
import logo from '../images/logo.png'
import axios from 'axios'

const FormItem=Form.Item;

const TabPane = Tabs.TabPane;
 class MobileHeader extends Component{

  state={
    username:null,
    visible: false  //模态框默认情况不显示
  };
  componentDidMount () {
    //读取保存在localStorage中的username
    const username=localStorage.getItem("username")
    if(username){
      this.setState({
        username
      })
    }
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = () => {
    this.setState({
      visible: false,
    });
  }
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }
  change =()=>{
     this.props.form.resetFields()
  }

  handleSubmit =(isLogin,event)=>{

    event.preventDefault();
    const {username,password,r_username,r_password,r_confirmPassword}=this.props.form.getFieldsValue()
    let url='http://newsapi.gugujiankong.com/Handler.ashx?'
    if(isLogin){
      // 登录的url
      url +=`action=login&username=${username}&password=${password}`
    } else {
      // 注册的url
      url +=`action=register&r_userName=${r_username}&r_password=${r_password}&r_confirmPassword=${r_confirmPassword}`
    }
    axios.get(url)
      .then(response =>{
        this.props.form.resetFields()
        const result=response.data;
        if(isLogin){// 登录返回的数据

          if(!result){
            // 登录失败
           message.error("登录失败")
          }else{
            // 成功的数据
            message.success("登录成功")
            const username=result.NickUserName;
            const userId=result.UserId
            this.setState({username})
            localStorage.setItem("username",username)
            localStorage.setItem("userId",userId)
          }
        }else{
          message.success("注册成功")
        }
      })
     this.setState({visible:false})
   }

  render () {
    const {getFieldDecorator} =this.props.form
    const {username} = this.state
    const userUI = ! username
      ? (
        <Icon onClick={this.showModal} type="setting"></Icon>
      )
      :(
        <Link to="/user_center">
          <Icon type="home"></Icon>
        </Link>
      )
    return (
      <div id="mobileheader">
        <header>
          <Link to="/">
            <img src={logo} alt="logo"/>
            <span>React News2</span>
          </Link>
          {userUI}
        </header>
        <Modal
          title="用户中心"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="关闭"
        >
          <Tabs defaultActiveKey="1" onChange={this.change}  type="card">
            <TabPane tab="登录" key="1">
              <Form onSubmit={this.handleSubmit.bind(this,true)}>
                <FormItem label="用户名">
                  {getFieldDecorator('username')(
                    <Input placeholder="请输入用户名" />
                  )}
                </FormItem>
                <FormItem label="密码">
                  {getFieldDecorator('password')(
                    <Input type="password"  placeholder="请输入密码" />
                  )}
                </FormItem>
                <Button type="primary" htmlType="submit">登录</Button>
              </Form>
            </TabPane>
            <TabPane tab="注册" key="2">
              <Form onSubmit={this.handleSubmit.bind(this,false)}>
                <FormItem label="用户名">
                  {getFieldDecorator('r_username')(
                    <Input type="text" placeholder="请输入用户名" />
                  )}
                </FormItem>
                <FormItem label="密码">
                  {getFieldDecorator('r_password')(
                    <Input type="password" placeholder="请输入密码" />
                  )}
                </FormItem>
                <FormItem label="确认密码">
                  {getFieldDecorator('r_confirmPassword')(
                    <Input type="password" placeholder="请输入确认密码" />
                  )}
                </FormItem>
                <Button type="primary" htmlType="submit">注册</Button>
              </Form>
            </TabPane>
          </Tabs>
        </Modal>

      </div>
    )
  }
}

export default Form.create()(MobileHeader);
