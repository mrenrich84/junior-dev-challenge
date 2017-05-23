import React, { Component } from 'react';
import axios from 'axios'

export default class ApiCall extends Component {
  constructor(props) {
    super(props);
    this.state = {persons: []};
  }

  componentDidMount() {
    this.UserList();
  }

  UserList() {
    const uri = '/api/clients'
    // return $.getJSON(uri)
    //   .then((data) => {
    //
    //   });
    axios.get(uri)
    .then((response) => {
      this.setState({ persons: response.data });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    const persons = this.state.persons.map((person, i) => {
      return <div>
        <h1>{person.name}</h1>
        <span>{person.postcode}, {person.locations}</span>
      </div>
    });

    console.log(this.state.persons);
    return <div id="layout-content" className="layout-content-wrapper">
      <div className="panel-list">{ persons }</div>
    </div>
  }
}
