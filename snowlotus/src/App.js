import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Clock from './components/clock'
import BackTop from './components/backtop'

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      clockShow:true
    }
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <article>
          {!!this.state.clockShow && <Clock onEnd={()=>{this.setState({clockShow:false})} } endTime={new Date().getTime()+10000} />}
        </article>
        <BackTop />
      </div>
    );
  }
}

export default App;
