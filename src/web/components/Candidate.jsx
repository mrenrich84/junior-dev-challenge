import React, { Component } from 'react';
import {  STATIC_PATH } from '../../shared/config'

const iconSize = 32

export default class Candidate extends Component {
  convertToTime = (seconds) => {
    var date = new Date(null);
    date.setSeconds(seconds); // specify value for SECONDS here
    const hours = date.getHours()
    const min = date.getMinutes()
    return `${hours} h ${min} mins`
  }

  render () {
    const time = this.convertToTime(this.props.secondsToClient)
    const distance = ( this.props.metersToClient / 1000.0 ).toFixed(1)+ ' km'
    const iconTransport = `${STATIC_PATH}/pictures/icons/${this.props.transportType}.png`
    const iconDistance = `${STATIC_PATH}/pictures/icons/distance.png`
    const iconTime = `${STATIC_PATH}/pictures/icons/time.png`
    return (
      <li className="collection-item avatar">
        <i className="circle" style={{fontStyle: 'normal'}}>{this.props.mapIndex + 1}</i>
        <span className="title">{this.props.name}</span>
        <p>{this.props.postcode}</p>
        <div className="secondary-content" style={{display: '-webkit-inline-box'}}>
            <div style={{textAlign: 'center', marginRight:'10px'}}>
              <img src={iconTransport} width={iconSize} height={iconSize}/>
              <br />{this.props.transportType}
            </div>
            <div style={{textAlign: 'center', marginRight:'10px'}}>
              <img src={iconDistance} width={iconSize} height={iconSize}/>
              <br />{distance}
            </div>
            <div style={{textAlign: 'center', marginRight:'10px'}}>
              <img src={iconTime} width={iconSize} height={iconSize}/>
              <br />{time}
            </div>
        </div>
      </li>
    )
  }
}
