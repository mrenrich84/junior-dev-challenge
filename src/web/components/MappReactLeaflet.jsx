import React, { Component } from 'react';
import { render } from 'react-dom';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import Control from 'react-leaflet-control';
import {  STATIC_PATH } from '../../shared/config'

const stamenTonerTiles = 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
const stamenTonerAttr = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
const mapCenter = [51.4839337, -0.2549888];
const zoomLevel = 9;

const iconSize = 24

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          markers: [[51.505, -0.09]],
          currentZoomLevel: zoomLevel
        }
        this.handleUpPanClick = this.handleUpPanClick.bind(this);
        this.handleRightPanClick = this.handleRightPanClick.bind(this);
        this.handleLeftPanClick = this.handleLeftPanClick.bind(this);
        this.handleDownPanClick = this.handleDownPanClick.bind(this);
    }

    addMarker = (e) => {
      console.log(this.state);
      console.log(e);
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
    handleUpPanClick() {
        const leafletMap = this.leafletMap.leafletElement;
        leafletMap.panBy([0, -100]);
        window.console.log('Panning up');
    }
    handleRightPanClick() {
        const leafletMap = this.leafletMap.leafletElement;
        leafletMap.panBy([100, 0]);
        window.console.log('Panning right');
    }
    handleLeftPanClick() {
        const leafletMap = this.leafletMap.leafletElement;
        leafletMap.panBy([-100, 0]);
        window.console.log('Panning left');
    }
    handleDownPanClick() {
        const leafletMap = this.leafletMap.leafletElement;
        leafletMap.panBy([0, 100]);
        window.console.log('Panning down');
    }

    render() {
    window.console.log('this.state.currentZoomLevel ->', this.state.currentZoomLevel);
        return (
            <div>
                <Map
                    className="col s12"
                    ref={m => { this.leafletMap = m; }}
                    center={mapCenter}
                    zoom={zoomLevel}
                    onClick={this.addMarker}
                >
                    <TileLayer
                        attribution={stamenTonerAttr}
                        url={stamenTonerTiles}
                    />
                    <Control position="topright">
                        <div>
                            <div style={{ marginLeft: '21px' }}>
                              <button onClick={this.handleUpPanClick} style={{ height: '29px' }}>
                                    <img src={STATIC_PATH + "/pictures/icons/arrows/up.png"} width={iconSize} height={iconSize}/>
                                </button>
                            </div>
                            <div>
                                <button onClick={this.handleLeftPanClick}style={{ height: '29px' }}>
                                      <img src={STATIC_PATH + "/pictures/icons/arrows/left.png"} width={iconSize} height={iconSize}/>
                                </button>
                                <button onClick={this.handleRightPanClick}style={{ height: '29px' }}>
                                      <img src={STATIC_PATH + "/pictures/icons/arrows/right.png"} width={iconSize} height={iconSize}/>
                                </button>
                            </div>
                            <div style={{ marginLeft: '21px' }}>
                                <button onClick={this.handleDownPanClick} style={{ height: '29px' }}>
                                    <img src={STATIC_PATH + "/pictures/icons/arrows/down.png"} width={iconSize} height={iconSize}/>
                                </button>
                            </div>
                        </div>
                    </Control>
                    {this.state.markers.map((position, idx) =>
                      <Marker key={`marker-${idx}`} position={position}>
                        <Popup>
                          <span>A pretty CSS3 popup. <br/> Easily customizable.</span>
                        </Popup>
                    </Marker>
                    )}
                </Map>
            </div>
        );
  }
}
