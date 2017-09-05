/**
 * 新闻详情路由组件
 */
import React,{Component} from 'react'
import {Row,Col,BackTop} from 'antd'
import NewsImageBlock from './news_image_block'
import NewsComment from './news_comments'
import axios from 'axios'



export default class NewsDetail extends Component{

  state={
    news:{}
  }

  componentDidMount () {
    //发送ajax请求获取新闻详细内容
    const {uniquekey}=this.props.params
    this.showNewsDetail(uniquekey)

  }


  componentWillReceiveProps (newProps) {
    const {uniquekey}=newProps.params
    this.showNewsDetail(uniquekey)

  }
  showNewsDetail (uniquekey){
    const url=`http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${uniquekey}`
    axios.get(url)
      .then(response => {
        const news=response.data
        this.setState({news})
        document.title=news.title

      })


  }



  render () {
    const {news}=this.state;
    let {type,uniquekey}=this.props.params;
    return (
      <Row>
        <Col span={1}> </Col>
        <Col span={16}>
          <div dangerouslySetInnerHTML={{__html:news.pagecontent}}></div>

          <NewsComment uniquekey={uniquekey} ></NewsComment>
          <BackTop/>
        </Col>
        <Col span={6}>
          <NewsImageBlock count={40} type={type} cardWidth='100%' cardTitle="相关新闻" imageWidth="150px"></NewsImageBlock>
        </Col>
        <Col span={1}></Col>
      </Row>


    )

  }

}