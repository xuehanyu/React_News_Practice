/**
 * Created by xhy on 2017/9/1.
 */
import React,{Component} from 'react'
import axios from 'axios'
import {Card} from 'antd'
import {Row,Col,Tabs, Upload, Icon, Modal} from 'antd'
import {Link} from 'react-router'

const TabPane = Tabs.TabPane;
export default class  UserCenter extends Component{

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
    }],

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
    const userId=localStorage.getItem('userId');
    let url =`http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=${userId}`;
    axios.get(url)
      .then(response => {
        const collections=response.data
        this.setState({
          collections
        })
      })

    url =`http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=${userId}`;
    axios.get(url)
      .then(response => {
        const commentsList=response.data
        this.setState({
          commentsList
        })
      })

  }


  render () {
    const {collections,commentsList}=this.state
    const {uniquekey} =this.props.params
    const showCollections = !collections
      ? (<p>您还没有相关收藏</p>)
      :(
        collections.map((colletion,index) => (
          <Card key={index} title={colletion.uniquekey} extra={<Link to={`/news_detail/${colletion.uniquekey}/top`}>查看</Link>}>
            {colletion.Title}
          </Card>
        ))
      )
    const showCommentsList = !commentsList
      ? <p>您还没有相关评论</p>
      :(
        commentsList.map((comment,index) => (
          <Card key={index} title={`于 ${comment.datetime} 评论了文章 ${comment.uniquekey}`}
                extra={<Link to={`/news_detail/${comment.uniquekey}/top`}>查看</Link>}>
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
        <Row>
          <Col span={1}></Col>
          <Col span={22}>
            <Tabs>
              <TabPane key="1" tab="我的收藏列表">
                {showCollections}
              </TabPane>
              <TabPane key="2" tab="我的评论列表">
                {showCommentsList}
              </TabPane>
              <TabPane key="3" tab="头像设置">
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


          </Col>
          <Col span={1}></Col>
        </Row>

      </div>
    )
  }

}