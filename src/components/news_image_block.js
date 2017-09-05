/*图片新闻组件*/

import React,{Component,PropTypes} from 'react'
import {Card} from 'antd'
import {Link} from 'react-router'
import axios from 'axios'
export default class NewsImageBlock extends Component{
  static propTypes={
    count:PropTypes.number.isRequired,
    type:PropTypes.string.isRequired,
    imageWidth:PropTypes.string.isRequired,
    cardWidth:PropTypes.string.isRequired,
    cardTitle:PropTypes.string.isRequired
  };
  state={
    newsArr:null
  };

  componentDidMount(){
    const {type,count}=this.props
    let url=`http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`
    axios.get(url)
      .then(rensponse=>{
        const newsArr=rensponse.data.map(({uniquekey,thumbnail_pic_s,author_name})=>({uniquekey,thumbnail_pic_s,author_name}))
        this.setState({
          newsArr
        })
    })

  }

  render () {
    const {newsArr} =this.state

    const{cardTitle,imageWidth,cardWidth,type}=this.props

    const imageStyle={
      width:imageWidth,
      height:"90px",
      display:'block',

    }
    const wordStyle={
      "width": imageWidth,
      "whiteSpace": "nowrap",
      "overflow": "hidden",
      "textOverflow": "ellipsis"
    }

    const contentUI= !newsArr
      ? <p>暂时没有新闻列表</p>
      :(
        <ul>
          {
            newsArr.map((news,index) =>(
              <div key={index}  className="imageblock">
                <Link to={`/news_detail/${news.uniquekey}/${type}`}>
                  <div >
                    <img src={news.thumbnail_pic_s} alt="logo" style={imageStyle}/>
                  </div>
                  <div className="custom-card">
                    <h3 style={wordStyle}>{news.title}</h3>
                    <p>{news.author_name}</p>
                  </div>
                </Link>
              </div>
            ))
          }
        </ul>
        )
    return (
      <Card className="topNewsList" title={cardTitle} style={{width:cardWidth}}>
        {contentUI}
      </Card>
    )


  }
}
