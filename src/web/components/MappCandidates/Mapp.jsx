import React, { Component } from 'react';
import { Map, Popup, TileLayer } from 'react-leaflet';

import PanControlContainer from './PanControlContainer'
import MarkerContainer from './MarkerContainer'

const mapCenterDefault = [54.376381, -2.289520]

export default class Mapp extends Component {
  constructor(props) {
      super(props)
      const mapCenter = props.markersList[0] ? props.markersList[0].latlng : mapCenterDefault
      this.state = {
        markersList: this.props.markersList,
        zoomLevel: props.initialZoom,
        mapCenter: mapCenter
      }
  }

  addMarker = (e) => {
     let markersList = this.state.markersList
     const newMarker = {
       latlng: e.latlng,
       data: ['','']
     }
     markersList.push(newMarker)
     this.setState({markersList})
   }

  componentDidMount() {
      const leafletMap = this.leafletMap.leafletElement;
      leafletMap.on('zoomend', () => {
        const updatedZoomLevel = leafletMap.getZoom();
        this.handleZoomLevelChange(updatedZoomLevel);
      });
      leafletMap.on('moveend', () => {
        const updatedCenter = leafletMap.getCenter();
        this.handleCenterChange(updatedCenter);
      });
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.setState({markersList: nextProps.markersList })
  }

  handleZoomLevelChange(newZoomLevel) {
      this.setState({ zoomLevel: newZoomLevel });
  }

  handleCenterChange(newCenter) {
      this.setState({ mapCenter: newCenter });
  }

  panMap = (dir) => {
    const leafletMap = this.leafletMap.leafletElement;
    const panStep = this.props.panControlStepBy
    const pan = {
      up: [0, -panStep],
      down: [0, panStep],
      left: [-panStep, 0],
      right: [panStep, 0],
    }
    leafletMap.panBy(pan[dir])
  }


  render = () => {
    const mapOpts = {
      ref: m => { this.leafletMap = m; },
      center: this.state.mapCenter,
      zoom: this.state.zoomLevel,
      className: this.props.className,
    }
    if (this.props.addMarker) { mapOpts['onClick'] = this.addMarker }

    const panControlEl = (<PanControlContainer  handlePan={this.panMap} position="topright" />)
    const panControl = this.props.panControl ? panControlEl : ''


    return (
      <div>
        <Map {...mapOpts}>
        <TileLayer {...this.props.tileOpts}/>
        {panControl}
        {this.state.markersList.map((marker, idx) =>
          <MarkerContainer
            position={marker.latlng}
            data={marker.data}
            idx={idx}
          />
        )}
        </Map>
      </div>
    );
  }
}
