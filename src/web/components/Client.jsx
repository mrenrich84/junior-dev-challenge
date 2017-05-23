import React, { Component } from 'react';
import {  STATIC_PATH } from '../../shared/config'

const iconSize = 32

export default class Client extends Component {
  handleClick = () => {
    this.props.handleClick(this.props.mapIndex)
  }

  render () {
    return (
      <li className="collection-item avatar">
        <i className="circle" style={{fontStyle: 'normal'}}>{this.props.mapIndex + 1}</i>
        <span className="title">{this.props.name}</span>
        <p>{this.props.postcode}</p>
        <div className="secondary-content">
          <a onClick={this.handleClick} className="waves-effect waves-teal btn-flat btn-large">
            <div style={{textAlign: 'center'}}>
              <img src={STATIC_PATH + "/pictures/icons/find.png"} width={iconSize} height={iconSize}/>
              <br /><p style={{marginTop: '-37px'}}>Find candidates</p>
            </div>
          </a>
        </div>
      </li>
    )
  }
}
