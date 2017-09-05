import React,{Component} from 'react'
import axios from 'axios'
import NewsComment from './news_comments'
import {BackTop} from 'antd'
export default class MobileNewsDetail extends Component{
  state={
    news:{}
  }
  componentDidMount (){
    const uniquekey =this.props.params.uniquekey;
    //发送请求，获取新闻详细内容
    const url=`http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${uniquekey}`
    axios.get(url)
      .then(response =>{
        const news=response.data
        this.setState({news})
        document.title=news.title
      })
  }

  render () {
    const {news} = this.state
    const {uniquekey} =this.props.params
    return (
      <div style={{padding:"10px"}}>
        <div className="mobileDetailsContainer" dangerouslySetInnerHTML={{__html:news.pagecontent}}></div>
        <hr/>
        <NewsComment uniquekey={uniquekey}/>
        <BackTop/>
      </div>
    )
  }

}
