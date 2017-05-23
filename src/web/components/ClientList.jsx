import React, { Component } from 'react';
import axios from 'axios'

import MappContainer from './Mapp/MappContainer'
import Client from './Client'

export default class ClientList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clients: [],
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

  render() {
    const clients = this.state.clients.map((person, i) => {
      return <Client handleClick={this.clientClick} name={person.name} postcode={person.postcode} mapIndex={i}/>
    });

    let mapp = this.state.isMapEnabled ? <MappContainer clients={this.state.clients}/> : ''
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
    </div>
    )
  }

}
