/**
 * Created by xhy on 2017/9/1.
 */
import React,{Component} from 'react'
import logo from '../images/logo.png'
import '../componentsCss/pc.css'
import {Link} from 'react-router'
import axios from 'axios'
import {
  Row,
  Col,
  Menu,
  Icon,
  Modal,
  Button,
  Tabs,
  Form,
  Input,
  message

} from 'antd'

// 定义菜单项
const MenuItem=Menu.Item;
//定义页签项
const TabPane = Tabs.TabPane;
//定义表单项
const FormItem = Form.Item;


class NewsHeader extends Component{
  state={
    key:'top',
    username:null,
    showModal:false
  };
  handleClick = ({key})=> {
    if(key==="logout"){
      this.setState({
        showModal:true
      })
    }

    this.setState({
      key
    })
  };

  handleOk = (e) => {
    this.setState({
      showModal: false,
    });
  }
  handleCancel = (e) => {
    this.setState({
      showModal: false,
    });
  };
  logout =() => {
    this.setState({username:null})
    localStorage.removeItem('username')
    localStorage.removeItem('userId')
  };



  componentDidMount() {
    //读取保存在localStorage中的username
    const username=localStorage.getItem("username")
    if(username){
      this.setState({
        username
      })
    }
  }

  handleSubmit = (isLogin,event) =>{
    event.preventDefault()
    const {username,password,r_username,r_password,r_confirmPassword}=this.props.form.getFieldsValue();


     let url='http://newsapi.gugujiankong.com/Handler.ashx?'
    if(isLogin){
      url +=`action=login&username=${username}&password=${password}`
    }else {
      url +=`action=register&r_userName=${r_username}&r_password=${r_password}&r_confirmPassword=${r_confirmPassword}`
    }
    // 发送请求
    axios.get(url)
      .then(response =>{
        this.props.form.resetFields()
        const result =response.data

        if (isLogin){ // 登录返回的数据
          if(!result){  // 失败
            message.error("登录失败")
          }else { // 成功
            message.success("登录成功")
            const username=result.NickUserName
            const userId=result.UserId
             this.setState({username})
            console.log(username)
            //将数据保存到localStorage中
            localStorage.setItem("username",username)
            localStorage.setItem("userId",userId)
          }
        }else {
          message.success("注册成功")
        }
      })
      this.setState({
        showModal: false,
      });
  };

  render () {

    const {getFieldDecorator} = this.props.form;
    const {username}=this.state
    const userShow=username
      ?(
        <Menu.Item key="login" className="register">
          <Button type="primary">{username}</Button> &nbsp;&nbsp;
          <Link to='/user_center'><Button type="dashed">个人中心</Button></Link>&nbsp;&nbsp;
          <Button  onClick={this.logout}>退出</Button>
        </Menu.Item>
      )
      :(
        <MenuItem key="logout" className="register">
          <Icon type="appstore"/>登录/注册
        </MenuItem>
      )

    return (
      <header >
        <Row>
          <Col span={1}> </Col>
          <Col span={3}>
            <a href="#/" className="logo">
              <img src={logo} alt="logo"/>
              <span>ReactNews</span>
            </a>
          </Col>
          <Col span={19}>
            <Menu mode="horizontal" onClick={this.handleClick}
                  selectedKeys={[this.state.key]}>
              <MenuItem key="top">
                <Icon type="appstore"/>头条
              </MenuItem>
              <MenuItem key="shehui">
                <Icon type="appstore"/>社会
              </MenuItem>
              <MenuItem key="guonei">
                <Icon type="appstore"/>国内
              </MenuItem>
              <MenuItem key="guoji">
                <Icon type="appstore"/>国际
              </MenuItem>
              <MenuItem key="yule">
                <Icon type="appstore"/>娱乐
              </MenuItem>
              <MenuItem key="tiyu">
                <Icon type="appstore"/>体育
              </MenuItem>
              <MenuItem key="keji">
                <Icon type="appstore"/>科技
              </MenuItem>
              <MenuItem key="shishang">
                <Icon type="appstore"/>时尚
              </MenuItem>
              {userShow}
            </Menu>
            <Modal
              title="用户中心"
              visible={this.state.showModal}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              okText="关闭"
            >
              <Tabs  onChange={()=>this.props.form.resetFields()} type="card">
                <TabPane tab="登录" key="1">
                  <Form  onSubmit={this.handleSubmit.bind(this,true)}>
                    <FormItem label="用户名">
                      {
                        getFieldDecorator('username')(
                          <Input type='text' placeholder="请输入用户名"/>
                        )
                      }
                    </FormItem>
                    <FormItem label="密码">
                      {
                        getFieldDecorator('password')(
                          <Input type='password' placeholder="请输入密码"/>
                        )
                      }
                    </FormItem>
                    <Button type="primary" htmlType="submit">登录</Button>
                  </Form>

                </TabPane>
                <TabPane tab="注册" key="2">
                  <Form  onSubmit={this.handleSubmit.bind(this,false)}>
                    <FormItem label="用户名">
                      {
                        getFieldDecorator('r_username')(
                          <Input type='text' placeholder="请输入用户名"/>
                        )
                      }
                    </FormItem>
                    <FormItem label="密码">
                      {
                        getFieldDecorator('r_password')(
                          <Input type='password' placeholder="请输入密码"/>
                        )
                      }
                    </FormItem>
                    <FormItem label="确认密码">
                      {
                        getFieldDecorator('r_confirmPassword')(
                          <Input type='password' placeholder="请确认密码"/>
                        )
                      }
                    </FormItem>
                    <Button type="primary" htmlType="submit">注册</Button>
                  </Form>

                </TabPane>
              </Tabs>
            </Modal>
          </Col>
          <Col span={1}> </Col>


        </Row>

      </header>
    )
  }

}

//对NewsHeader组件进行包装产生一个新的组件类, 向NewsHeader传入一个属性: form
export default Form.create()(NewsHeader)
