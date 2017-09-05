import React,{Component,PropTypes} from 'react'
import {Card} from 'antd'
import {Link} from 'react-router'
import axios from 'axios'
export default class MobileNewsBlock extends Component{

  state={
    newsArr:null
  }
  static propTypes={
    count:PropTypes.number.isRequired,
    type:PropTypes.string.isRequired
  }

  componentDidMount (){
    const {type,count} =this.props
    let url=`http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`
    // 发送ajax请求获取新闻列表
    axios.get(url)
      .then(rensponse =>{
        const newsArr = rensponse.data
        this.setState({newsArr})
      })
  }
  render () {
    const {newsArr} = this.state
    const newsShow= !newsArr
      ?(
        <p>暂时还没有消息哈哈哈~~~~</p>

      )
      : (
          newsArr.map((news,index) =>(
            <Card key={index } className="m_article list-item special_section clearfix">
              <Link to={`/news_detail/${news.uniquekey}`}>
                <div className="m_article_img">
                  <img src={news.thumbnail_pic_s} alt="logo"/>
                </div>
                <div className="m_article_info">
                  <div className="m_article_title">
                    <span>{news.title}</span>
                  </div>
                  <div className="m_article_desc clearfix">
                    <div className="m_article_desc_l">
                      <div className="m_article_channel">{news.realtype}</div>
                      <div className="m_article_time">{news.date}</div>
                    </div>
                  </div>
                </div>
              </Link>
            </Card>
          ))
        )



    return (
      <div>
        {newsShow}

      </div>
    )
  }
}
