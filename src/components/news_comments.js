/**
 * 获取评论信息的组件
 */
import React,{Component,PropTypes} from 'react'
import {Form,Button,Input,Card,notification} from 'antd'
import axios from 'axios'
import {Link} from 'react-router'

const FormItem = Form.Item;
 class NewsComment extends Component{
   static propTypes = {
     uniquekey: PropTypes.string.isRequired
   }

  state={
    comments:null
  };
  componentDidMount () {
    const {uniquekey}=this.props
    this.commentShow(uniquekey)

  }
  componentWillReceiveProps (newProps) {
    const {uniquekey}=newProps
    this.commentShow(uniquekey)
  }


  commentShow (uniquekey){
    let url=`http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=${uniquekey}`

    // 发送Ajax请求获取对应文章的评论内容
    axios.get(url)
      .then(response =>{
        const comments=response.data
        this.setState({comments})
      })
  }


   handleClick =() => {
    const {uniquekey}=this.props
    const userId=localStorage.getItem("userId")
     if(!userId){
       alert("请先登录")
       return
     }
     // 发送请求进行收藏文章
     let url=`http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=${userId}&uniquekey=${uniquekey}`
      axios.get(url)
        .then(response =>{
          notification.success({
            message:"收藏成功"
          })
        })
  };

   handleSubmit =(event) =>{
      event.preventDefault()
     const userId=localStorage.getItem("userId");
     if(!userId){
       alert("请先登录")
       return
     }
     const comment=this.props.form.getFieldValue("comment")

     const {uniquekey}=this.props
   // 提交评论
      let url=`http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=${userId}&uniquekey=${uniquekey}&commnet=${comment}`
      axios.get(url)
        .then(response =>{
          //更新评论列表
          this.componentDidMount ()
          notification.success({
            message:"评论成功"
          })
          // 清除数据
           this.props.form.resetFields()
        })

   };

  render () {

    const {comments}= this.state
    const showComments= !comments
      ? (<p>该文章还没有人评论撒~~~~</p>)
      :(
        comments.map((comment,index) => (
          <Card key={index} title={comment.UserName}
                extra={comment.datatime}>
            {comment.Comments}
          </Card>
        ))
      )

    const {getFieldDecorator} = this.props.form;
    return(
      <div style={{padding:"10px"}}>
        {showComments}
        <Form onSubmit={this.handleSubmit} >
          <FormItem label="您的评论">
            {getFieldDecorator('comment')(
              <Input type="textarea" placeholder="请输入评论内容" />
            )}
          </FormItem>

          <Button type="primary" htmlType='submit' >提交评论</Button>
          <Button  onClick={this.handleClick} type="primary">收藏文章</Button>
        </Form>
      </div>

    )

  }
}

export  default Form.create()(NewsComment);
