import React from "react";
import PropsTypes from "prop-types";

import "./index.css";

export default class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static defaultProps={
    times: null,
    onEnd: () => {}
  }
  static contextTypes={
      TIMESDIFF: PropsTypes.number
  }
  tick(curProps) {
    let endTime = curProps.endTime;
    this.context.TIMESDIFF = 0;
    const nowTime = new Date().valueOf() + this.context.TIMESDIFF;
    let timespan = Math.max((endTime - nowTime) / 1000, 0); // gte 0
    if (curProps.times) {
      curProps.times.forEach((t, i) => {
        if (Math.floor((t - nowTime) / 1000) === 0) {
          curProps.onTime(t, i);
        }
      });
    }
    let clockData = {
      day: Math.floor(timespan / (3600 * 24)),
      hour: Math.floor((timespan / 3600) % 24),
      minute: Math.floor((timespan / 60) % 60),
      second: Math.floor(timespan % 60)
    };
    this.setState({
      clockData
    });
    if (timespan < 1) {
      curProps.onEnd();
      return;
    }
    this.timerID = setTimeout(() => this.tick(curProps), 1000);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.endTime !== this.props.endTime) {
      clearTimeout(this.timerID);
      this.tick(nextProps);
    }
  }

  componentWillMount() {
    this.tick(this.props);
  }
  componentWillUnmount() {
    clearTimeout(this.timerID);
  }

  render() {
    let clockData = this.state.clockData;
    return (
      <span className="times">
        <span className="prefix" />
        <span className="time__hours">
          {clockData.hour >= 10 ? clockData.hour : "0" + clockData.hour}
        </span>
        <span className="time__hours__text"> : </span>
        <span className="time__minutes">
          {clockData.minute >= 10 ? clockData.minute : "0" + clockData.minute}
        </span>
        <span className="time__minutes__text"> : </span>
        <span className="time__seconds">
          {clockData.second >= 10 ? clockData.second : "0" + clockData.second}
        </span>
      </span>
    );
  }
}


/**
 * usage examples
 * import Clock from '../clock';
 * <Clock onEnd={this.onEnd} endTime={1234555} />//定义onEnd 方法和设定结束时间
 */
