import React, { Component } from 'react';
import { render } from 'react-dom';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import Control from 'react-leaflet-control';
import {  STATIC_PATH } from '../../shared/config'
import L from 'leaflet';

const mapCenter = [51.4839337, -0.2549888];
const zoomLevel = 9;
const iconSize = 24

const MarkerContainer = (props) => {
  const markerIcon = L.divIcon({html: '<div>asdsa</div>'});
  return (
    <Marker key={`marker-${props.idx}`} position={props.position} icon={markerIcon}>
      <Popup>
        <span>A pretty CSS3 popup. <br/> Easily customizable.</span>
      </Popup>
    </Marker>
  )
}

const ControlArrow = (props) => {
  const height = '29px'
  return (
    <button onClick={props.clickHandle} style={{ height: height }}>
      <img src={props.icon} width={iconSize} height={iconSize}/>
    </button>
  )
}

export default class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
        markers: [[51.4839337, -0.2549888]],
        currentZoomLevel: zoomLevel
      }
  }

  addMarker = (e) => {
     let markers = this.state.markers
     markers.push(e.latlng)
     this.setState({markers})
   }

  componentDidMount() {
      const leafletMap = this.leafletMap.leafletElement;
      leafletMap.on('zoomend', () => {
          const updatedZoomLevel = leafletMap.getZoom();
          this.handleZoomLevelChange(updatedZoomLevel);
      });
  }

  handleZoomLevelChange(newZoomLevel) {
      this.setState({ currentZoomLevel: newZoomLevel });
  }

  panMap = (dir) => {
    const leafletMap = this.leafletMap.leafletElement;
    const panStep = 100
    const pan = {
      up: [0, -panStep],
      down: [0, panStep],
      left: [-panStep, 0],
      right: [panStep, 0],
    }
    leafletMap.panBy(pan[dir])

  }


  render() {
    const mapOpts = {
      className: "col s12",
      ref: m => { this.leafletMap = m; },
      center: mapCenter,
      zoom: zoomLevel,
      onClick: this.addMarker,
    }
    const tileOpts = {
      attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
      url: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
    }

    const arrowOpts = {}
    const directions = ['up', 'down', 'left', 'right']
    directions.forEach ( dir => {
      arrowOpts[dir] = {
        clickHandle: () => this.panMap(dir),
        icon: STATIC_PATH + "/pictures/icons/arrows/"+ dir + ".png"
      }
    })

    return (
      <div>
        <Map {...mapOpts}>
        <TileLayer{...tileOpts}/>
        <Control position="topright">
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
        {this.state.markers.map((position, idx) =>
          <MarkerContainer position={position} idx={idx} />
        )}
        </Map>
      </div>
    );
  }
}
