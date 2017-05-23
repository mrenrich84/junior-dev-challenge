import React, { Component } from 'react';
import axios from 'axios'

import MappContainer from './Mapp/MappContainer'
import Client from './Client'

export default class ClientList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clients: []
    }
  }

  componentDidMount() {
    this.getClientsList();
  }

  getClientsList() {
    const uri = '/api/clients'
    // return $.getJSON(uri)
    //   .then((data) => {
    //
    //   });
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
      clients: [client]
    })
  }

  render() {
    const clients = this.state.clients.map((person, i) => {
      return <Client handleClick={this.clientClick} name={person.name} postcode={person.postcode} mapIndex={i}/>
    });

    return (
      <div>
        <div className="row">
          <div className="col s12">
            <h2>Clients</h2>
        </div>
        <MappContainer clients={this.state.clients}/>
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
