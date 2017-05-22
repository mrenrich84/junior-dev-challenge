import React from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import {  STATIC_PATH } from '../../../shared/config'


const MarkerContainer = (props) => {
  const icon = "<img src=" + STATIC_PATH + "/pictures/icons/arrows/up.png />"
  const markerIcon = L.divIcon({html: `
    <div>
      ${icon}
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
