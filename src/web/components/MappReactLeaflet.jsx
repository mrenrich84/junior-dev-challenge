import React, { Component } from 'react';
import { render } from 'react-dom';
import { Map, TileLayer } from 'react-leaflet';
import Control from 'react-leaflet-control';

const stamenTonerTiles = 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
const stamenTonerAttr = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
const mapCenter = [51.4839337, -0.2549888];
const zoomLevel = 9;

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = { currentZoomLevel: zoomLevel };
        this.handleUpPanClick = this.handleUpPanClick.bind(this);
        this.handleRightPanClick = this.handleRightPanClick.bind(this);
        this.handleLeftPanClick = this.handleLeftPanClick.bind(this);
        this.handleDownPanClick = this.handleDownPanClick.bind(this);

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
    window.console.log('this.state.currentZoomLevel ->',
        this.state.currentZoomLevel);
        return (
            <div>
                <Map
                    ref={m => { this.leafletMap = m; }}
                    center={mapCenter}
                    zoom={zoomLevel}
                >
                    <TileLayer
                        attribution={stamenTonerAttr}
                        url={stamenTonerTiles}
                    />
                    <Control position="topright">
                        <div
                            style={{
                                backgroundColor: 'black',
                                padding: '5px',
                            }}
                        >
                            <div style={{ marginLeft: '37px' }}>
                                <button onClick={this.handleUpPanClick}>
                                    Pan up
                                </button>
                            </div>
                            <div>
                                <button onClick={this.handleLeftPanClick}>
                                    Pan left
                                </button>
                                <button onClick={this.handleRightPanClick}>
                                    Pan right
                                </button>
                            </div>
                            <div style={{ marginLeft: '30px' }}>
                                <button onClick={this.handleDownPanClick}>
                                    Pan down
                                </button>
                            </div>
                        </div>
                    </Control>
                </Map>
            </div>
        );
  }
}
