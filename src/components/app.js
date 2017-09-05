/**
 * 主组件
 */
import React,{Component} from 'react'
import NewsFooter from './new_footer'
import NewsHeader from './new_header'


import '../componentsCss/pc.css'

export default class App extends Component{


  render () {
    return (
      <div>
        <NewsHeader />
        {this.props.children}
        <NewsFooter />
      </div>
    )
  }

}
