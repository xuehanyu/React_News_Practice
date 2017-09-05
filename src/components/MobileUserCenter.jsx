import React,{Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router'

import {Tabs,Card,Upload, Icon, Modal} from 'antd'
const TabPane = Tabs.TabPane;

export default class MobileUserCenter extends Component{

  state={
    collections:null,
    commentsList:null,
    previewVisible: false,
    previewImage: '',
    fileList: [{
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }]
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList }) => this.setState({ fileList })

  componentDidMount () {
   // 发送请求获取收藏列表
    const userId=localStorage.getItem("userId")
    let url=`http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=${userId}`
    axios.get(url)
      .then(response =>{
        const collections=response.data
        this.setState({collections})
      })
     url=`http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=${userId}`
    axios.get(url)
      .then(response =>{
        const  commentsList=response.data
        this.setState({commentsList})
      })
  }

  render () {
    const {collections,commentsList}=this.state
    const showCollection= !collections
      ? <p>您暂时还没有评论任何内容哟~~~</p>

      :(
        collections.map((colletion,index) =>(
          <Card key={index} title={colletion.uniquekey} extra={<Link to={`/news_detail/${colletion.uniquekey}`}>查看</Link>}>
            {colletion.Title}
          </Card>
        ))
      )
    const showcommentsList = !commentsList
      ? <p>您还没有评论任何内容撒~~~~~</p>
      :(
        commentsList.map((comment,index) => (
          <Card key={index} title={comment.uniquekey} extra={<Link to={`/news_detail/${comment.uniquekey}`}>查看</Link>}>
            {comment.Comments}
          </Card>
        ))
      )


    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (

      <div>
        <Tabs>
          <TabPane tab="我的收藏列表" key="1">
            {showCollection}
          </TabPane>
          <TabPane tab="我的评论列表" key="2">
            {showcommentsList}
          </TabPane>
          <TabPane tab="头像设置" key="3">
            <div className="clearfix">
              <Upload
                action="//jsonplaceholder.typicode.com/posts/"
                listType="picture-card"
                fileList={fileList}
                onPreview={this.handlePreview}
                onChange={this.handleChange}
              >
                {fileList.length >= 3 ? null : uploadButton}
              </Upload>
              <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
              </Modal>
            </div>

          </TabPane>
        </Tabs>


      </div>
    )


  }
}
