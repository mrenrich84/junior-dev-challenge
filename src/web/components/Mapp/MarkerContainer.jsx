import React from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

const MarkerContainer = (props) => {
  const markerIcon = L.divIcon({html: '<div>asdsa</div>'})
  return (
    <Marker key={`marker-${props.idx}`} position={props.position} icon={markerIcon}>
      <Popup>
        <span>A pretty CSS3 popup. <br/> Easily customizable.</span>
      </Popup>
    </Marker>
  )
}

export default MarkerContainer
