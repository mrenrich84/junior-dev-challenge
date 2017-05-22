import React from 'react';
import Control from 'react-leaflet-control';
import ControlArrow from './ControlArrow'

import {  STATIC_PATH } from '../../../shared/config'

const PanControlContainer = (props) => {
  const arrowOpts = {}
  const directions = ['up', 'down', 'left', 'right']
  directions.forEach ( dir => {
    arrowOpts[dir] = {
      clickHandle: () => props.handlePan(dir),
      icon: STATIC_PATH + "/pictures/icons/arrows/" + dir + ".png",
      iconSize: 24
    }
  })

  return (
    <Control position={props.position}>
      <div>
        <div style={{ marginLeft: '21px' }}>
          <ControlArrow  {...arrowOpts.up} />
        </div>
        <div>
          <ControlArrow {...arrowOpts.left} />
          <ControlArrow {...arrowOpts.right}  />
        </div>
        <div style={{ marginLeft: '21px' }}>
          <ControlArrow {...arrowOpts.down} />
        </div>
      </div>
    </Control>
  )
}

export default PanControlContainer
