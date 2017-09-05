/*新闻列表路由组件*/
import React,{Component} from 'react'
import {Row,Col,Carousel,Tabs,Card } from 'antd';

import NewsImageBlock from './news_image_block'
import NewsBlock from './news_block'
import NewsProducts from './news_products'

import carousel_1 from '../images/carousel_1.jpg'
import carousel_2 from '../images/carousel_2.jpg'
import carousel_3 from '../images/carousel_3.jpg'
import carousel_4 from '../images/carousel_4.jpg'



const TabPane = Tabs.TabPane;

export default class NewsContainer extends Component{

  render () {
    return (
      <div>
        <Row className="container">
          <Col span={1}> </Col>
          <Col span={22}>
            <div className="leftContainer" style={{width:"35%"}}>
              <Carousel autoplay >
                  <div>
                    <img src={carousel_1} alt="image"/>
                  </div>
                  <div>
                    <img src={carousel_2} alt="image"/>
                  </div>
                  <div>
                    <img src={carousel_3} alt="image"/>
                  </div>
                  <div>
                    <img src={carousel_4} alt="image"/>
                  </div>
                </Carousel>
              <NewsImageBlock type="guoji" count={6} imageWidth="112px" cardWidth="100%" cardTitle="国际新闻"></NewsImageBlock>
            </div>
            <Tabs className='tabs_news' defaultActiveKey="1" style={{width:"35%"}}>
              <TabPane tab="头条新闻" key="1">
                <NewsBlock type="top" count={21}></NewsBlock>
              </TabPane>
              <TabPane tab="国际新闻" key="2">
                <NewsBlock type="guoji" count={21}></NewsBlock>
              </TabPane>
            </Tabs>
            <Tabs className='tabs_news' defaultActiveKey="1" style={{width:"30%"}}>
              <TabPane tab="React News 产品" key="1">
                <NewsProducts></NewsProducts>
              </TabPane>
            </Tabs>
            <div>
              <NewsImageBlock type="guonei" count={8} imageWidth="132px" cardWidth="100%" cardTitle="国内新闻"></NewsImageBlock>
              <NewsImageBlock type="yule" count={16} imageWidth="132px" cardWidth="100%" cardTitle="娱乐新闻"></NewsImageBlock>
            </div>



          </Col>
          <Col span={1}> </Col>
        </Row>
      </div>
    )
  }

}