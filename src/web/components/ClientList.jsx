import React, { Component } from 'react';
import axios from 'axios'

import MappContainerCandidates from './MappCandidates/MappContainer'
import MappContainer from './Mapp/MappContainer'
import Client from './Client'
import Candidate from './Candidate'

export default class ClientList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clients: [],
      candidates: false,
      isMapEnabled: true
    }
  }

  componentDidMount() {
    this.getClientsList();
  }

  getCandidatesList(client_id) {
    const uri = '/api/client/' + client_id
    axios.get(uri)
    .then((response) => {
      this.setState({ candidates: response.data });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  getClientsList() {
    const uri = '/api/clients'
    axios.get(uri)
    .then((response) => {
      this.setState({ clients: response.data });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  clientClick = (i) => {
    const client = this.state.clients[i]
    this.setState({
      clients: [client],
      isMapEnabled: false
    })
    this.getCandidatesList(i)
  }

  showCandidates = () => {
    const candidatesData = this.state.candidates.candidates
    let candidatesEl = candidatesData.map((person, i) => {
      const transportType = person.modeOfTransport ? person.modeOfTransport.type : 'walk'
      return <Candidate
        name={person.name}
        postcode={person.postcode}
        metersToClient={person.meters_to_client}
        secondsToClient={person.seconds_to_client}
        transportType={transportType}
        mapIndex={i}/>
    });

    return (
      <div className="row">
        <div className="col s12">
          <h2>Candidates</h2>
        </div>
        <MappContainer data={ candidatesData }/>
        <div className="row">
          <div className="col s12">
            <ul className="collection">
              {candidatesEl}
            </ul>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const clients = this.state.clients.map((person, i) => {
      return <Client handleClick={this.clientClick} name={person.name} postcode={person.postcode} mapIndex={i}/>
    });

    let mapp = this.state.isMapEnabled ? <MappContainer data={this.state.clients}/> : ''

    let candidates = this.state.candidates ? this.showCandidates() : ''

    return (
      <div>
        <div className="row">
          <div className="col s12">
            <h2>Clients</h2>
        </div>
        {mapp}
        <div className="row">
          <div className="col s12">
            <ul className="collection">
              { clients }
            </ul>
          </div>
        </div>
      </div>
      {candidates}
    </div>
    )
  }

}
