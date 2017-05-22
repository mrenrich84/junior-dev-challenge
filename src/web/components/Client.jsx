import React from 'react'
import {  STATIC_PATH } from '../../shared/config'

const iconSize = 32

const Client = (props) => (
    <li className="collection-item avatar">
      <i className="circle" style={{fontStyle: 'normal'}}>{props.mapIndex}</i>
      <span className="title">{props.name}</span>
      <p>{props.postcode}</p>
      <div className="secondary-content">
        <a href="#!">
          <div style={{textAlign: 'center'}}>
            <img src={STATIC_PATH + "/pictures/icons/find.png"} width={iconSize} height={iconSize}/>
          </div>
          <p>Find candidates</p>
      </a>
      </div>
    </li>
)

export default Client
