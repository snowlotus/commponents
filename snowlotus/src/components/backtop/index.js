import React from 'react';
import throttle from '../../lib/utils/throttle';

import './index.css';

export default class BackTop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isTopHidden:true
    };
    this.handleScroll = this.handleScroll.bind(this);
  }
  
  handleScroll(e) {
    let scrollTop = window.document.body.scrollTop || document.documentElement.scrollTop;
    if (scrollTop >800) {
      this.setState({
          isTopHidden:false
      })
    }else{
       this.setState({
          isTopHidden:true
      }) 
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', throttle(this.handleScroll));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', throttle(this.handleScroll));
  }


  render() {
      return (
        <div className={`back-top backtop-${this.state.isTopHidden}`} onClick={()=>{window.scrollTo(0,0);}} >
            <img src="https://jp.juancdn.com/jpwebapp_v2/app/images/common/goTop.png?2" alt=""/>
        </div>
      )
  }
}
