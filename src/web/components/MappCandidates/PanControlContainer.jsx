import React from 'react';
import Control from 'react-leaflet-control';
import ControlArrow from './ControlArrow'
import {  STATIC_PATH } from '../../../shared/config'

const iconPath = STATIC_PATH + "/pictures/icons/arrows/"
const iconSuffix = ".png"
const iconSize = 24
const marginLeft = '21px'

const PanControlContainer = (props) => {
  const arrowOpts = {}
  const directions = ['up', 'down', 'left', 'right']
  directions.forEach ( dir => {
    arrowOpts[dir] = {
      clickHandle: () => props.handlePan(dir),
      icon: iconPath + dir + iconSuffix,
      iconSize: iconSize
    }
  })

  return (
    <Control position={props.position}>
      <div>
        <div style={{ marginLeft: marginLeft }}>
          <ControlArrow  {...arrowOpts.up} />
        </div>
        <div>
          <ControlArrow {...arrowOpts.left} />
          <ControlArrow {...arrowOpts.right}  />
        </div>
        <div style={{ marginLeft: marginLeft }}>
          <ControlArrow {...arrowOpts.down} />
        </div>
      </div>
    </Control>
  )
}

export default PanControlContainer
