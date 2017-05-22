import React from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import {  STATIC_PATH } from '../../../shared/config'
import L from 'leaflet';

const iconSize = 35

const MarkerContainer = (props) => {
  const icon = `<img src=${STATIC_PATH}/pictures/icons/placeholder.png heigth=${iconSize} width=${iconSize} />`
  const markerIcon = L.divIcon({
    className: 'my-div-icon',
    html: `
      <div style="display: flex; height: 35px;">
        ${icon}
        <span style="padding-top: 9px;">${props.data[0]}</span>
      </div>
    `})

  return (
    <Marker key={`marker-${props.idx}`} position={props.position} icon={markerIcon}>
      <Popup>
        <span>
          <h5>
            {props.data[0]}<br/>
        </h5>
            {props.data[1]}
        </span>
      </Popup>
    </Marker>
  )
}

export default MarkerContainer
