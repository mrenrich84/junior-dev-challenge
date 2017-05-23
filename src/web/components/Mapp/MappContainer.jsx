import React, { Component } from 'react';
import Mapp from './Mapp'

export default class MappContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markersList: this.createMarkersList(this.props.clients)
    }
  }

  createMarkersList(clients) {
    let markersList = []
    clients.forEach (client => {
      markersList.push({
        latlng: client.location,
        data: [client.name, client.postcode]
      })
    })
    return markersList
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ markersList: this.createMarkersList(nextProps.clients) })

  }

  render = () => {
        // const markersList = [
    //   {
    //     data: ["Ale", "xzc 2"],
    //     latlng: [51.525694, -0.071331]
    //   },
    //   {
    //     data: ["VBT", "sdf 2"],
    //     latlng: [51.495462, -0.154713],
    //   },
    //   {
    //     data: ["ZZZ", "hnh 2"],
    //     latlng: [51.469328, -0.065747]
    //   },
    // ]

    const tileOpts = {
      attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
      url: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
    }

    const mappOpts = {
      markersList: this.state.markersList,
      addMarker: false,
      panControl: true,
      initialZoom: 5,
      className: "col s12",
      tileOpts: tileOpts,
      panControl: true,
      panControlStepBy: 100
    }

    return (
      <Mapp  {...mappOpts} />
    )
  }
}
