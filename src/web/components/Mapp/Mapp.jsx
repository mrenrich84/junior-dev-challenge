import React, { Component } from 'react';
import { render } from 'react-dom';
import { Map, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';

import PanControlContainer from './PanControlContainer'
import MarkerContainer from './MarkerContainer'

export default class Mapp extends Component {
  constructor(props) {
      super(props);
      this.state = {
        markers: [[51.4839337, -0.2549888]],
        currentZoomLevel: 9,
        mapCenter: [51.4839337, -0.2549888]
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
      center: this.state.mapCenter,
      zoom: this.state.currentZoomLevel,
      onClick: this.addMarker,
    }

    const tileOpts = {
      attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
      url: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
    }

    return (
      <div>
        <Map {...mapOpts}>
        <TileLayer{...tileOpts}/>
        <PanControlContainer  handlePan={this.panMap} position="topright" />
        {this.state.markers.map((position, idx) =>
          <MarkerContainer position={position} idx={idx} />
        )}
        </Map>
      </div>
    );
  }
}
