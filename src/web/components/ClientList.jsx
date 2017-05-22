import React from 'react'
import Mapp from './Mapp/Mapp'
import Client from './Client'

const ClientList = () => (
  <div>
    <div className="row">
      <div className="col s12">
        <h2>Clients</h2>
    </div>
    <Mapp />
    <div className="row">
      <div className="col s12">
        <ul className="collection">
          <Client name="Ale" postcode="B21 15G" mapIndex="1"/>
          <Client name="Kroner" postcode="B11 15G" mapIndex="2"/>
          <Client name="Berg" postcode="B29 15G" mapIndex="3"/>
        </ul>
      </div>
    </div>
  </div>
</div>
)

export default ClientList
